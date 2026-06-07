from datetime import timedelta

from app.models import HomeBooking, BathBooking


def is_house_available(check_in, check_out):
    active_statuses=['new', 'confirmed']
    occupied_dates = {}
    bookings = HomeBooking.objects.filter(booking__status__in=active_statuses)
    for booking in bookings:
        current = booking.check_in
        while current < booking.check_out:
            occupied_dates[current] = (occupied_dates.get(current, 0) + 1)
            current += timedelta(days=1)
    current = check_in
    while current < check_out:
        if occupied_dates.get(current, 0) >= 2:
            return False
        current += timedelta(days=1)
    return True

def is_bath_available(check_in, duration):
    active_statuses = ['new', 'confirmed']
    requested_start = check_in
    requested_end = (requested_start + timedelta(hours=duration))
    bookings = BathBooking.objects.filter(booking__status__in=active_statuses)
    for booking in bookings:
        booking_start = booking.check_in
        booking_end = booking_start + timedelta(hours=booking.duration)
        overlap = (
            requested_start < booking_end and requested_end > booking_start
        )
        if overlap:
            return False
    return True