from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.db import models

# Create your models here.
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email обязателен")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True, verbose_name='Почта')
    name = models.CharField(max_length=120, verbose_name='Имя')
    surname = models.CharField(max_length=120, verbose_name='Фамилия')
    phone = models.CharField(max_length=255, unique=True, verbose_name='Номер телефона')
    avatar = models.ImageField(upload_to='avatars', default='avatars/default_avatar.png')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False, verbose_name='Администратор')
    rules = models.BooleanField(default=False, verbose_name='Соглашение с политикой')

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    class Meta:
        verbose_name = 'Пользователи'

    def get_full_name(self):
        return f"{self.name} {self.surname}"

    def __str__(self):
        return self.email

class Booking(models.Model):
    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('confirmed', 'Подтверждена'),
        ('canceled', 'Отменена'),
        ('completed', 'Завершена'),
    ]
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, blank=True, related_name='users')
    name = models.CharField(max_length=120, verbose_name='Имя')
    phone = models.CharField(max_length=120, verbose_name='Номер телефона')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new', verbose_name='Статус')
    comment = models.TextField(blank=True, null=True, verbose_name='Комментарий')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания заявки')

    class Meta:
        verbose_name = 'Заявки'

    def __str__(self):
        return f'Заявка #{self.id}'

class HomeBooking(models.Model):
    booking = models.OneToOneField('Booking', on_delete=models.SET_NULL, null=True, related_name='home_booking', verbose_name='Бронирование')
    check_in = models.DateField(verbose_name='Дата заселения')
    check_out = models.DateField(verbose_name='Дата выселения')
    guests_count = models.PositiveIntegerField(verbose_name='Количество человек')
    extra_place = models.BooleanField(verbose_name='Дополнительное место', default=False)
    with_pet = models.BooleanField(verbose_name='С животными', default=False)

    class Meta:
        verbose_name = 'Заявки на бронирование дома'

    def __str__(self):
        return f'Домик | Заявка #{self.booking.id}'

class BathBooking(models.Model):
    DURATION_CHOICES = [
    (2, '2 часа'),
    (3, '3 часа'),
    (4, '4 часа'),
    ]
    WHISK_CHOICES = [
        ('oak', 'Дуб'),
        ('fir', 'Пихта'),
        ('birch', 'Береза'),
    ]
    steam_program = models.ForeignKey('BathProgram', on_delete=models.SET_NULL, null=True, blank=True, related_name='steam_program', verbose_name='Программы парения')
    check_in = models.DateTimeField()
    booking = models.OneToOneField('Booking', on_delete=models.SET_NULL, null=True, verbose_name='Бронирование', related_name='bath_booking')
    duration = models.PositiveSmallIntegerField(choices=DURATION_CHOICES, verbose_name='Продолжительность бани', null=True)
    bath_tub = models.BooleanField(default=False, verbose_name='Купель')
    bath_tub_filling = models.BooleanField(max_length=120, blank=True, default=False, verbose_name='Наполнение')
    steaming = models.BooleanField(default=False)
    whisk = models.CharField(max_length=20, choices=WHISK_CHOICES, blank=True, null=True)

    class Meta:
        verbose_name = 'Заявки на бронирование бани'

    def __str__(self):
        return f'Баня | Заявка #{self.booking.id}'

class BathProgram(models.Model):
    name = models.CharField(max_length=255, verbose_name='Название банной программы')
    price = models.IntegerField(verbose_name='Стоимость программы', default=6000)
    description = models.TextField(verbose_name='Описание программы', blank=True, null=True)
    list = models.TextField(verbose_name='Перечисление, что включает в себя программа', blank=True, null=True)
    is_active = models.BooleanField(default=True, verbose_name='Доступность программы')
    duration = models.PositiveIntegerField(verbose_name='Продолжительность программы (часы)', default=2)

    class Meta:
        verbose_name = 'Программы парения'

    def __str__(self):
        return self.name

class Review(models.Model):
    booking = models.OneToOneField('Booking', on_delete=models.CASCADE, null=True, related_name='bookingReview')
    user = models.ForeignKey('User', on_delete=models.CASCADE, null=True, related_name='userReview')
    rating = models.PositiveSmallIntegerField(verbose_name='Оценка посещения')
    text = models.TextField(verbose_name='Текст отзыва')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
    is_published = models.BooleanField(default=True, verbose_name='Опубликовано')

    class Meta:
        verbose_name = 'Отзывы'

    def __str__(self):
        return f'Отзыв #{self.id}'

class ServicePrice(models.Model):
    bath_time = models.ForeignKey('BathTime', on_delete=models.SET_NULL, null=True, related_name='priceTime')
    bath_cup = models.ForeignKey('BathCup', on_delete=models.SET_NULL, null=True, related_name='priceCup')
    bath_option = models.ForeignKey('BathOption', on_delete=models.SET_NULL, null=True, related_name='priceOption')
    home_price = models.ForeignKey('HomePrice', on_delete=models.SET_NULL, null=True, related_name='priceHome')

    class Meta:
        verbose_name = 'Стоимость услуг'


class BathTime(models.Model):
    text = models.TextField(verbose_name='аренда бани по времени')

    class Meta:
        verbose_name = 'Стоимость аренды бани'

    def __str__(self):
        return self.text

class BathCup(models.Model):
    text = models.TextField(verbose_name='аренда купели')

    class Meta:
        verbose_name = 'Стоимость аренды купели'

    def __str__(self):
        return self.text

class BathOption(models.Model):
    text = models.TextField(verbose_name='Дополнительные услуги')
    modal = models.CharField(max_length=100, blank=True, null=True)
    class Meta:
        verbose_name = 'Дополнительные банные услуги'

    def __str__(self):
        return self.text


class HomePrice(models.Model):
    text = models.TextField( verbose_name='опции аренды дома')

    class Meta:
        verbose_name = 'Опции аренды дома'

    def __str__(self):
        return self.text


class Gallery(models.Model):
    image = models.ImageField(upload_to='gallery/')
    title = models.CharField(max_length=120, blank=True, null=True, verbose_name='Название')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Галерея'

    def __str__(self):
        return self.title or 'image'