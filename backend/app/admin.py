from django.contrib import admin
from unfold.admin import ModelAdmin, StackedInline

from .models import (
    User,
    Booking,
    HomeBooking,
    BathBooking,
    BathProgram,
    Review,
    ServicePrice,
    BathTime,
    BathCup,
    BathOption,
    HomePrice,
    Gallery
)


class HomeBookingInline(StackedInline):
    model = HomeBooking
    extra = 0
    max_num = 1


class BathBookingInline(StackedInline):
    model = BathBooking
    extra = 0
    max_num = 1


@admin.register(Booking)
class BookingAdmin(ModelAdmin):
    list_display = (
        "id",
        "name",
        "phone",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
        "created_at",
    )

    search_fields = (
        "name",
        "phone",
    )

    ordering = ("-created_at",)

    inlines = [
        HomeBookingInline,
        BathBookingInline,
    ]


@admin.register(User)
class UserAdmin(ModelAdmin):
    list_display = (
        "id",
        "email",
        "name",
        "surname",
        "phone",
        "is_staff",
    )

    search_fields = (
        "email",
        "name",
        "surname",
        "phone",
    )

    list_filter = (
        "is_staff",
        "is_active",
    )


@admin.register(BathProgram)
class BathProgramAdmin(ModelAdmin):
    list_display = (
        "name",
        "price",
        "duration",
        "is_active",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
    )


@admin.register(Review)
class ReviewAdmin(ModelAdmin):
    list_display = (
        "id",
        "user",
        "rating",
        "created_at",
        "is_published",
    )

    list_filter = (
        "rating",
        "is_published",
        "created_at",
    )

    search_fields = (
        "user__name",
        "text",
    )

    ordering = (
        "-created_at",
    )


@admin.register(Gallery)
class GalleryAdmin(ModelAdmin):
    list_display = (
        "id",
        "title",
        "created_at",
    )

    search_fields = (
        "title",
    )

    ordering = (
        "-created_at",
    )


@admin.register(BathTime)
class BathTimeAdmin(ModelAdmin):
    list_display = (
        "id",
        "text",
    )

    search_fields = (
        "text",
    )


@admin.register(BathCup)
class BathCupAdmin(ModelAdmin):
    list_display = (
        "id",
        "text",
    )

    search_fields = (
        "text",
    )


@admin.register(BathOption)
class BathOptionAdmin(ModelAdmin):
    list_display = (
        "id",
        "text",
        "modal",
    )

    search_fields = (
        "text",
    )


@admin.register(HomePrice)
class HomePriceAdmin(ModelAdmin):
    list_display = (
        "id",
        "text",
    )

    search_fields = (
        "text",
    )


@admin.register(ServicePrice)
class ServicePriceAdmin(ModelAdmin):
    list_display = (
        "id",
        "bath_time",
        "bath_cup",
        "bath_option",
        "home_price",
    )


@admin.register(HomeBooking)
class HomeBookingAdmin(ModelAdmin):
    list_display = (
        "id",
        "booking",
        "check_in",
        "check_out",
        "guests_count",
    )

    list_filter = (
        "check_in",
        "check_out",
    )


@admin.register(BathBooking)
class BathBookingAdmin(ModelAdmin):
    list_display = (
        "id",
        "booking",
        "check_in",
        "duration",
        "steam_program",
        "bath_tub",
    )

    list_filter = (
        "check_in",
        "bath_tub",
        "steam_program",
    )

    