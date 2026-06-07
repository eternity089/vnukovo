from django.contrib.auth import login, logout, authenticate
from django.shortcuts import render, get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from collections import defaultdict
from datetime import timedelta

from app.forms import UserRegisterForm
from app.models import *
from app.serializers import *


from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf(request):
    return JsonResponse({
        "csrfToken": get_token(request)
    })

# Create your views here.
class ReviewListAPIView(ListAPIView):
    queryset = Review.objects.filter(is_published=True)[:6]
    serializer_class = ReviewSerializer

class ServicePriceAPIView(APIView):
    def get(self, request):
        result = [
            {
                "id": 1,
                "title": "Аренда бани",
                "filters": [
                    {
                        "title": "По времени",
                        "options": [
                            {"text": item.text}
                            for item in BathTime.objects.all()
                        ]
                    },
                    {
                        "title": "Купель",
                        "options": [
                            {"text": item.text}
                            for item in BathCup.objects.all()
                        ]
                    },
                    {
                        "title": "Услуги",
                        "options": [
                            {"text": item.text,
                             "modal": "program" if "рограмм" in item.text else None
                             }
                            for item in BathOption.objects.all()
                        ]
                    },
                ]
            },
            {
                "id": 2,
                "title": "Аренда домиков",
                "filters": [
                    {
                        "title": "Аренда",
                        "options": [
                            {"text": item.text}
                            for item in HomePrice.objects.all()
                        ]
                    }
                ]
            }
        ]
        return Response(result)

class GalleryListAPIView(ListAPIView):
    queryset = Gallery.objects.all()[:9]
    serializer_class = GallerySerializer

class BathProgramAPIView(APIView):
    def get(self, request):
        programs = BathProgram.objects.filter(is_active=True)
        serializer = BathProgramSerializer(programs, many=True)
        return Response(serializer.data)

class RegisterAPIView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            return Response({
                'message': 'User created',
                'user': {
                    'id': user.id,
                    'name': user.name,
                    'email': user.email
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeAPIView(APIView):
    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                "id": request.user.id,
                "name": request.user.name,
                "surname": request.user.surname,
                "phone": request.user.phone,
                "email": request.user.email,
                "avatar": (
                    request.build_absolute_uri(
                        request.user.avatar.url
                    )
                    if request.user.avatar
                    else None
                ),
                "is_superuser": request.user.is_superuser,
            })
        return Response({"user": None})

@method_decorator(ensure_csrf_cookie, name="dispatch")
class LoginAPIView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            login(request, user)
            return Response({
                "message": "Login successful",
                "user": {
                    "id": user.id,
                    "name": user.name,
                    "surname": user.surname,
                    "phone": user.phone,
                    "email": user.email,
                    "avatar": (
                        request.build_absolute_uri(user.avatar.url)
                        if user.avatar else None
                    ),
                    "is_superuser": user.is_superuser
                }
            }, status=status.HTTP_200_OK)

        return Response(
            {"non_field_errors": ["Неверный email или пароль"]},
            status=status.HTTP_400_BAD_REQUEST
        )

class LogoutAPIView(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {'message': 'User logged out'},
            status=status.HTTP_200_OK
        )

class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user, context={'request': request})
        return Response(serializer.data)
    def put(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class DeleteAvatarAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        user = request.user
        if user.avatar:
            user.avatar.delete(save=False)
            user.avatar = None
            user.save()
        return Response(
            {"message": "Avatar deleted"},
            status=status.HTTP_200_OK
        )

class BookingCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]
    home_booking = HomeBookingSerializer(required=False, allow_null=True)
    bath_booking = BathBookingSerializer(required=False, allow_null=True)
    def post(self, request):
        serializer = BookingCreateSerializer(data=request.data, context={'request': request})
        if not serializer.is_valid():
            print(serializer.errors)  # ← ВАЖНО
            return Response(serializer.errors, status=400)
        booking = serializer.save()
        return Response({
            'id': booking.id,
            'message': 'Заявка создана'
        }, status=201)

class HouseAvailabilityAPIView(APIView):
    def get(self, request):
        occupied = defaultdict(int)
        bookings = HomeBooking.objects.filter(booking__status__in=['new', 'confirmed'])
        for booking in bookings:
            current = booking.check_in
            while current < booking.check_out:
                occupied[str(current)] += 1
                current += timedelta(days=1)
        return Response(occupied)

class BathAvailabilityAPIView(APIView):
    def get(self, request):
        result = []
        bookings = BathBooking.objects.filter(booking__status__in=['new', 'confirmed'])
        for booking in bookings:
            start = booking.check_in
            if booking.steam_program:
                duration = booking.steam_program.duration
            else:
                duration = booking.duration
            end = start + timedelta(hours=duration)
            result.append({
                'start': start.isoformat(),
                'end': end.isoformat()
            })
        return Response(result)

class UserBookingsAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        bookings = Booking.objects.filter(user=request.user).prefetch_related('home_booking', 'bath_booking').order_by('-created_at')
        serializer = UserBookingSerializer(bookings, many=True)
        return Response(serializer.data)

class CancelBookingAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, pk):
        booking = get_object_or_404(Booking, pk=pk, user=request.user)
        if booking.status != 'new':
            return Response(
                {'error': 'Нельзя отменить заявку'},
                status=400
            )
        booking.status = 'canceled'
        booking.save()
        return Response({'message':'Заявка отменена'})