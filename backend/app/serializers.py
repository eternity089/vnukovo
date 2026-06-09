from collections import defaultdict
from datetime import timedelta

from django.utils import timezone
from rest_framework import serializers
from app.models import *


class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name',read_only=True)
    avatar = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = ['id','user_name','avatar','rating','text','created_at',]
    def get_avatar(self, obj):
        request = self.context.get("request")
        if obj.user.avatar:
            if request:
                return request.build_absolute_uri(
                    obj.user.avatar.url
                )
            return obj.user.avatar.url
        return None

class ServicePriceSerializer(serializers.ModelSerializer):
    bath_time_text = serializers.CharField(source='bath_time.text', read_only=True)
    bath_cup_text = serializers.CharField(source='bath_cup.text', read_only=True)
    bath_option_text = serializers.CharField(source='bath_option.text', read_only=True)
    home_price_text = serializers.CharField(source='home_price.text', read_only=True)
    class Meta:
        model = ServicePrice
        fields = [
            'id',
            'bath_time_text',
            'bath_cup_text',
            'bath_option_text',
            'home_price_text',
        ]

class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = ['id', 'title', 'image']



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['name', 'surname', 'email', 'phone', 'password', 'password2']
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password2': 'Пароли не совпадают'})
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = [
            "name",
            "surname",
            "email",
            "phone",
            "avatar"
        ]
    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request")
        if instance.avatar:
            data["avatar"] = request.build_absolute_uri(
                instance.avatar.url
            )
        return data

class HomeBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeBooking
        exclude = ['booking']

class BathProgramSerializer(serializers.ModelSerializer):
    steam_program_name = serializers.CharField(
        source='steam_program.name',
        read_only=True
    )
    class Meta:
        model = BathProgram
        fields = '__all__'

class BathBookingSerializer(serializers.ModelSerializer):
    steam_program = BathProgramSerializer(read_only=True)
    steam_program_name = serializers.CharField(
        source='steam_program.name',
        read_only=True
    )

    class Meta:
        model = BathBooking
        exclude = ['booking']


class BookingCreateSerializer(serializers.ModelSerializer):
    home_booking = HomeBookingSerializer(required=False, allow_null=True)
    bath_booking = BathBookingSerializer(required=False, allow_null=True)

    class Meta:
        model = Booking
        fields = [
            'comment',
            'home_booking',
            'bath_booking'
        ]

    def validate(self, attrs):
        home_data = attrs.get('home_booking')
        bath_data = attrs.get('bath_booking')

        if not home_data and not bath_data:
            raise serializers.ValidationError(
                'Выберите хотя бы один тип бронирования'
            )

        if home_data:
            check_in = home_data.get('check_in')
            check_out = home_data.get('check_out')
            if check_in and check_in < timezone.localdate():
                raise serializers.ValidationError({
                    'home_booking': 'Нельзя выбрать прошедшую дату'
                })
            if check_in and check_out and check_out <= check_in:
                raise serializers.ValidationError({
                    'home_booking': 'Дата выезда должна быть позже заезда'
                })
            occupied = defaultdict(int)
            existing = HomeBooking.objects.filter(
                booking__status__in=['new', 'confirmed']
            )
            for b in existing:
                d = b.check_in
                while d < b.check_out:
                    occupied[d] += 1
                    d += timedelta(days=1)
            d = check_in
            while d < check_out:
                if occupied[d] >= 2:
                    raise serializers.ValidationError({
                        'home_booking': f'Нет свободных домиков на {d}'
                    })
                d += timedelta(days=1)

        if bath_data:
            start = bath_data.get('check_in')
            if start and start < timezone.now():
                raise serializers.ValidationError({
                    'bath_booking': 'Нельзя выбрать прошедшее время'
                })
            program = bath_data.get('steam_program')
            if program:
                duration = program.duration
            else:
                duration = bath_data.get('duration')
            if not duration:
                raise serializers.ValidationError({
                    'bath_booking': 'Не указана продолжительность бани'
                })
            duration = int(duration)
            if start:
                end = start + timedelta(hours=duration)
                existing = BathBooking.objects.filter(
                    booking__status__in=['new', 'confirmed']
                )
                for b in existing:
                    ex_start = b.check_in
                    ex_program = getattr(b, 'steam_program', None)
                    ex_duration = (
                        ex_program.duration
                        if ex_program
                        else b.duration
                    )
                    if not ex_duration:
                        continue  # защита от битых данных
                    ex_end = ex_start + timedelta(hours=int(ex_duration))
                    if start < ex_end and end > ex_start:
                        raise serializers.ValidationError({
                            'bath_booking': 'Это время уже занято'
                        })
        return attrs

    def create(self, validated_data):
        request = self.context['request']
        home_data = validated_data.pop('home_booking', None)
        bath_data = validated_data.pop('bath_booking', None)
        booking = Booking.objects.create(
            **validated_data,
            user=request.user,
            name=request.user.name,
            phone=request.user.phone
        )
        if home_data:
            HomeBooking.objects.create(booking=booking, **home_data)
        if bath_data:
            BathBooking.objects.create(booking=booking, **bath_data)
        return booking

class UserBookingSerializer(serializers.ModelSerializer):
    home_booking= HomeBookingSerializer(read_only=True, allow_null=True)
    bath_booking= BathBookingSerializer(read_only=True, allow_null=True)
    class Meta:
        model = Booking
        fields = [
            'id',
            'status',
            'comment',
            'created_at',
            'home_booking',
            'bath_booking'
        ]