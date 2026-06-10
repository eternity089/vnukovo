import {useEffect, useState} from "react";
import OrderCard from "./OrderCard.jsx";
import {API_URL} from "../../../shared/api.js";
import {getCSRF} from "../../../api/csrf.js";


export default function OrdersTab(){

    const [orders,setOrders] = useState([])
    useEffect(() => {
        fetch(`${API_URL}/api/bookings/`, {
            credentials:'include'
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);
    const cancelBooking = async (id) => {
    try {
        const csrfToken = await getCSRF()
        const res = await fetch(`${API_URL}/api/booking/${id}/cancel/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
            console.log(data);
            return;
        }
        setOrders(prev =>
            prev.map(order =>
                order.id === id
                    ? { ...order, status: "canceled" }
                    : order
            )
        );
    } catch (err) {
        console.error(err);
    }
};
return (
    <div>
        {orders.length === 0 ? (
            <h2 className="text-center text-gray-500 text-lg">
                У вас пока нет заявок
            </h2>
        ) : (
            <div className="flex flex-wrap gap-5">
                {orders.map(order => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        onCancel={cancelBooking}
                    />
                ))}
            </div>
        )}
    </div>
);
}