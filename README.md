# Хутор Внуково

Веб-приложение для глэмпинга **«Хутор Внуково»**, разработанное в рамках дипломного проекта.

Проект позволяет пользователям ознакомиться с услугами базы отдыха, забронировать дом или баню, оставить отзыв, а администраторам — управлять контентом и бронированиями через административную панель.

---

## Возможности

### Для пользователей

- Просмотр информации о базе отдыха
- Галерея
- Просмотр домов и бани
- Онлайн-бронирование
- Личный кабинет
- Регистрация и авторизация
- Изменение персональных данных
- Загрузка и удаление фотографии профиля
- Удаление аккаунта
- Просмотр истории бронирований
- Добавление отзывов и оценок

### Для администратора

- Управление пользователями
- Управление бронированиями
- Управление услугами
- Управление программами бани
- Управление отзывами
- Редактирование контента сайта
- Административная панель на базе Django Unfold

---

# Стек технологий

## Frontend

- React
- React Router
- Tailwind CSS
- React Hot Toast
- Fetch API

## Backend

- Django
- Django REST Framework
- PostgreSQL
- Gunicorn

## Инфраструктура

- Docker
- Docker Compose
- Nginx
- Certbot (HTTPS)

---


# Запуск проекта

## 1. Клонирование репозитория

```bash
git clone <repository_url>
cd project
```

---

## 2. Создать файл окружения

Создайте файл

```
.env
```

и заполните необходимыми параметрами.

> Конфиденциальные данные (пароли, ключи API и др.) в репозиторий не добавляются.

---

## 3. Запуск Docker

```bash
docker compose up -d --build
```

---

## 4. Применение миграций

```bash
docker compose exec backend python manage.py migrate
```

---

## 5. Сбор статических файлов

```bash
docker compose exec backend python manage.py collectstatic --noinput
```

---

## 6. Создание администратора

```bash
docker compose exec backend python manage.py createsuperuser
```

---

## Полезные команды

### Остановить контейнеры

```bash
docker compose down
```

### Перезапустить

```bash
docker compose restart
```

### Просмотреть логи

```bash
docker compose logs
```

### Логи backend

```bash
docker compose logs backend
```

### Логи nginx

```bash
docker compose logs nginx
```

### Войти в контейнер backend

```bash
docker compose exec backend bash
```

---

# Используемые технологии

| Технология | Назначение |
|------------|------------|
| React | Клиентская часть |
| Django | Серверная часть |
| Django REST Framework | REST API |
| PostgreSQL | База данных |
| Tailwind CSS | Стилизация |
| Docker | Контейнеризация |
| Nginx | Веб-сервер |
| Gunicorn | WSGI-сервер |

---

# API

Основные группы эндпоинтов:

```
/api/
/api/register/
/api/login/
/api/logout/

/api/cabinet/
/api/reviews/
/api/orders/
/api/houses/
/api/bath/
/api/services/
```

---

# Авторизация

Используется:

- Cookie Authentication
- CSRF Protection
- Session Authentication

---

# Особенности проекта

- адаптивный интерфейс;
- SPA на React;
- REST API;
- личный кабинет пользователя;
- система бронирования домов и бани;
- административная панель Django Unfold;
- загрузка пользовательских изображений;
- Docker-развертывание;
- HTTPS.

---

# Лицензия

Проект разработан в учебных целях в рамках дипломной работы.
