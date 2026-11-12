import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "change-this-in-production")
DEBUG = os.environ.get("DJANGO_DEBUG", "True").lower() == "true"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "core",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "core.middleware.IdleTimeoutMiddleware",
    "core.middleware.NoCacheMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "bauan_portal.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "core" / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "core.context_processors.admin_counts",
            ],
        },
    },
]

WSGI_APPLICATION = "bauan_portal.wsgi.application"

# --- Security settings (production) ---
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = "DENY"
    SECURE_BROWSER_XSS_FILTER = True

# --- Database: MySQL via PyMySQL (no C compiler needed on Windows) ---
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ.get("DB_NAME", "bauan_tourism"),
        "USER": os.environ.get("DB_USER", "root"),
        "PASSWORD": os.environ.get("DB_PASSWORD", ""),
        "HOST": os.environ.get("DB_HOST", "127.0.0.1"),
        "PORT": os.environ.get("DB_PORT", "3306"),
        "OPTIONS": {"charset": "utf8mb4"},
    }
}

AUTH_USER_MODEL = "core.SystemUser"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Manila"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATICFILES_DIRS = [BASE_DIR / "core" / "static"]

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

LOGIN_URL = "login"
LOGIN_REDIRECT_URL = "dashboard"
LOGOUT_REDIRECT_URL = "login"

# Server-side idle timeout (minutes) - enforce in a middleware/view check
# ---- Session security ----
SESSION_IDLE_TIMEOUT_MINUTES = 60      # signed out after this many minutes WITHOUT activity
SESSION_COOKIE_AGE = 12 * 60 * 60      # hard ceiling: nobody stays signed in longer than this
# SESSION_EXPIRE_AT_BROWSER_CLOSE = True   # uncomment to also sign out when the browser closes

# ---- Login protection ----
LOGIN_MAX_ATTEMPTS = 5
LOGIN_LOCKOUT_MINUTES = 15

# ---- Forgot password ----
PASSWORD_RESET_TIMEOUT = 60 * 60       # reset link works once and expires in 1 hour
DEFAULT_FROM_EMAIL = "Bauan Tourism Portal <no-reply@discoverbauan.ph>"
# Development: the "email" is printed in the terminal where runserver is running.
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
# For real emails use SMTP instead, for example Gmail with an App Password:
#   EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
#   EMAIL_HOST = "smtp.gmail.com"; EMAIL_PORT = 587; EMAIL_USE_TLS = True
#   EMAIL_HOST_USER = "your-address@gmail.com"; EMAIL_HOST_PASSWORD = "<app password>"

# Email backend (console for dev; switch to SMTP in production)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
DEFAULT_FROM_EMAIL = "Bauan Tourism Portal <noreply@bauan-tourism.local>"

# Big resorts: the Daily Log form has ~11 boxes per room
DATA_UPLOAD_MAX_NUMBER_FIELDS = 10000
