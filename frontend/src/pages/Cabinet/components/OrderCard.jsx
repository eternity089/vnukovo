import Button from "../../../components/ui/Button/Button.jsx";
import {API_URL} from "../../../shared/api.js";
import {useState} from "react";
import {getCSRF} from "../../../api/csrf.js";
import toast from "react-hot-toast";

export default function OrderCard({
    order,
    onCancel,
    onReview
}) {
    const statusMap = {
        new: {
            label: "Новая",
            className: "bg-yellow-100 text-yellow-700"
        },
        confirmed: {
            label: "Подтверждена",
            className: "bg-green-100 text-green-700"
        },
        canceled: {
            label: "Отменена",
            className: "bg-red-100 text-red-700"
        },
        completed: {
            label: "Завершена",
            className: "bg-gray-100 text-gray-700"
        }
    };
    const status = statusMap[order.status];
    const formatDate = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleDateString("ru-RU");
    };
    const formatDateTime = (date) => {
        if (!date) return "";
        return new Date(date).toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const submitReview = async (bookingId) => {
    const csrftoken = await getCSRF();

    const res = await fetch(`${API_URL}/api/bookings/${bookingId}/review/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
            rating,
            text,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        toast.error(data.detail);
        return;
    }

    toast.success("Спасибо за отзыв!");
};
    return (
        <article className="bg-white w-[32%] border border-border rounded-2xl p-6 shadow-sm flex flex-col gap-5">
            {/* HEADER */}
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h3 className="text-xl font-semibold text-input">Заявка №{order.id}</h3>
                    <p className="text-sm text-body mt-1">Создана {formatDateTime(order.created_at)}</p>
                </div>
                <span
                    className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${status.className}
                    `}
                >
                    {status.label}
                </span>
            </div>
            {/* SERVICES */}
            <div className="flex flex-col gap-4">
                {order.home_booking && (
                    <div className="rounded-xl bg-bg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-medium text-input">Домик</h4>
                        </div>
                        <div className="space-y-1 text-sm text-body">
                            <p>
                                Заезд:{" "}
                                <span className="text-input">
                                    {formatDate(order.home_booking.check_in)}
                                </span>
                            </p>
                            <p>
                                Выезд:{" "}
                                <span className="text-input">
                                    {formatDate(order.home_booking.check_out)}
                                </span>
                            </p>
                            <p>
                                Гостей:{" "}
                                <span className="text-input">
                                    {order.home_booking.guests_count}
                                </span>
                            </p>
                            {order.home_booking.extra_place && (
                                <p>✓ Дополнительное место</p>
                            )}
                            {order.home_booking.with_pet && (
                                <p>✓ Размещение с животными</p>
                            )}
                        </div>
                    </div>
                )}
                {order.bath_booking && (
                    <div className="rounded-xl bg-bg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-medium text-input">Баня</h4>
                        </div>
                        <div className="space-y-1 text-sm text-body">
                            <p>
                                Время посещения:{" "}
                                <span className="text-input">{formatDateTime(order.bath_booking.check_in)}</span>
                            </p>
                            {order.bath_booking.steam_program ? (
                                <p>
                                    Программа парения:{" "}
                                    <span className="text-input">{order.bath_booking.steam_program_name}</span>
                                </p>
                            ) : (
                                <p>
                                    Продолжительность:{" "}
                                    <span className="text-input">{order.bath_booking.duration} ч.</span>
                                </p>
                            )}
                            {order.bath_booking.whisk && (
                                <p>
                                    Веник:{" "}
                                    <span className="text-input">{order.bath_booking.whisk}</span>
                                </p>
                            )}
                            {order.bath_booking.bath_tub && (
                                <p>✓ Купель</p>
                            )}
                            {order.bath_booking.bath_tub_filling && (
                                <p>✓ Наполнение купели</p>
                            )}
                            {order.bath_booking.steaming && (
                                <p>✓ Парение</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* COMMENT */}
            {order.comment && (
                <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-input mb-2">Комментарий</h4>
                    <p className="text-body text-sm">{order.comment}</p>
                </div>
            )}
            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 pt-2">
                {order.status === "new" && (
                    <Button classname="bg-red-500 hover:bg-red-600 text-white" onClick={() => onCancel(order.id)}>Отменить заявку</Button>
                )}
                {order.status === "completed" && (
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col'>
                            <div className="flex gap-1">
                                <p>Оценка посещения:</p>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span key={star} onClick={() => setRating(star)}
                                        className={`
                                            text-2xl cursor-pointer transition-colors
                                            ${star <= rating ? "text-yellow-400" : "text-gray-300"}
                                        `}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full border rounded-xl p-3 w-full"
                                rows={4}
                                placeholder="Поделитесь впечатлениями..."
                            />
                        </div>
                        <Button classname='mt-3' onClick={() => onReview(order)}>Оставить отзыв</Button>
                    </div>
                )}
            </div>
        </article>
    );
}