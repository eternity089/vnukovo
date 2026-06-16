from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'bath-time', BathTimeViewSet)
router.register(r'bath-cup', BathCupViewSet)
router.register(r'bath-option', BathOptionViewSet)
router.register(r'home-price', HomePriceViewSet)

urlpatterns = [
    path("csrf/", CSRFAPIView.as_view(), name="csrf"),
    path('reviews/', ReviewListAPIView.as_view(), name='reviews'),
    path('services/', ServicePriceAPIView.as_view(), name='services'),
    path('gallery/', GalleryListAPIView.as_view(), name='gallery'),
    path('bath-programs/', BathProgramAPIView.as_view(), name='bath-programs'),
    path('bath-programs/<int:pk>/', BathProgramDetailAPIView.as_view(), name='bath-program-detail'),
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
    path('bath_time/<int:pk>/', BathTimeUpdateAPIView.as_view(), name='update_time'),
    path('bath_cup/<int:pk>/', BathCupUpdateAPIView.as_view(), name='update_cup'),
    path('bath_option/<int:pk>/', BathOptionUpdateAPIView.as_view(), name='update_option'),
    path('home_price/<int:pk>/', HomePriceUpdateAPIView.as_view(), name='update_price'),
]