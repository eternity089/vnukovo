import os
import dj_database_url
from pathlib import Path
import sys
from dotenv import load_dotenv
load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))
DEBUG = os.getenv('DEBUG') == 'False'

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

CSRF_TRUSTED_ORIGINS = os.getenv("CSRF_TRUSTED_ORIGINS","").split(",")

SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST', 'db'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Cookie Session настройка
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

CORS_ALLOW_CREDENTIALS = True

CSRF_COOKIE_SAMESITE = "None"
CSRF_COOKIE_SECURE = True

SESSION_COOKIE_SAMESITE = "None"
SESSION_COOKIE_SECURE = True

raw_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")

CORS_ALLOWED_ORIGINS = [
    origin.strip()
    for origin in raw_origins.split(",")
    if origin.strip()
]

# Application definition

INSTALLED_APPS = [
    'unfold',
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app.apps.AppConfig',
    'rest_framework',
    'corsheaders',
    "cloudinary",
    "cloudinary_storage",
]

UNFOLD = {
    "SITE_TITLE": "Панель администратора",
    "SITE_HEADER": "Хутор Внуково",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "COLORS": {
        "primary": {
            "50": "250 249 255",
            "100": "255 244 232",
            "200": "255 247 213",
            "300": "254 222 180",
            "400": "192 132 252",
            "500": "168 85 247",
            "600": "147 51 234",
            "700": "126 34 206",
            "800": "107 33 168",
            "900": "88 28 135",
        },
    },
}

CLOUDINARY_STORAGE = {
    "CLOUD_NAME": os.getenv("CLOUD_NAME"),
    "API_KEY": os.getenv("API_KEY"),
    "API_SECRET": os.getenv("API_SECRET"),
}

STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'vnukovo.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates']
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'vnukovo.wsgi.application'


# Database
# https://docs.djangoproject.com/en/6.0/ref/settings/#databases



# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

AUTH_USER_MODEL = 'app.User'
