import {useEffect, useState} from "react";
import OrderCard from "./OrderCard.jsx";
import {getCookie} from "../../../utils/cookies.js"
import {API_URL} from "../../../shared/api.js";


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
        const res = await fetch(`${API_URL}/api/booking/${id}/cancel/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": getCookie("csrftoken"),
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
    return(
        <div className="grid gap-5">
            {orders.map(order => (
                <OrderCard
                    key={order.id}
                    order={order}
                    onCancel={cancelBooking}
                />
            ))}
        </div>
    )
}