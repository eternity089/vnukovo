from django.contrib import admin
from django.apps import apps
from .models import *


class HomeBookingInline(admin.StackedInline):
    model = HomeBooking
    extra = 0
    max_num = 1
    can_delete = True
class BathBookingInline(admin.StackedInline):
    model = BathBooking
    extra = 0
    max_num = 1
    can_delete = True

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'name',
        'phone',
        'status',
        'created_at'
    )
    list_filter = (
        'status',
        'created_at'
    )
    search_fields = (
        'name',
        'phone'
    )
    inlines = [
        HomeBookingInline,
        BathBookingInline
    ]

models = apps.get_app_config('app').get_models()

for model in models:
    if model is not Booking:
        admin.site.register(model)