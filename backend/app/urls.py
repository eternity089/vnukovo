from django.urls import path

from .views import *

urlpatterns = [
    path("csrf/", CSRFAPIView.as_view(), name="csrf"),
    path('reviews/', ReviewListAPIView.as_view(), name='reviews'),
    path('services/', ServicePriceAPIView.as_view(), name='services'),
    path('gallery/', GalleryListAPIView.as_view(), name='gallery'),
    path('bath-programs/', BathProgramAPIView.as_view(), name='bath-programs'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('me/', MeAPIView.as_view(), name='me'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path("login/", LoginAPIView.as_view(), name='login'),
    path('cabinet/', UserProfileAPIView.as_view(), name='cabinet'),
    path('cabinet/avatar/', DeleteAvatarAPIView.as_view(), name='delete_avatar'),
    path('booking/create/', BookingCreateAPIView.as_view(), name='booking_create'),
    path('booking/house-availability/', HouseAvailabilityAPIView.as_view(), name='house_availability'),
    path('booking/bath-availability/', BathAvailabilityAPIView.as_view(), name='bath_availability'),
    path('bookings/', UserBookingsAPIView.as_view(), name='bookings'),
    path('booking/<int:pk>/cancel/',CancelBookingAPIView.as_view(), name='cancel'),
    path('bookings/<int:booking_id>/review/', CreateReviewAPIView.as_view(), name='create_review'),
]