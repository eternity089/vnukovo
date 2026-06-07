import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../ui/Button/Button.jsx";
import { getCookie } from "../../utils/cookies";
import { useAuth } from "../../context/AuthContext.jsx";
import {useUI} from "../../context/UIContext.jsx";
import {API_URL} from "../../shared/api.js";

export default function LoginForm() {
    const {closeAuthModal, openAuthModal} = useUI()
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: null,
            non_field_errors: null
        }));
    };
   const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
        const res = await fetch(`${API_URL}/api/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password,
            }),
        });

        const data = await res.json();

        if (res.ok) {
            // 💥 сохраняем токен
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            setUser({ email: form.email });

            closeAuthModal();
            navigate("/");
        } else {
            setErrors(data);
        }

    } catch (err) {
        console.error(err);
    }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-mail" className={`input w-full ${errors.email ? "border-red-500" : ""}`}/>
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
                )}
            </div>
            <div>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Пароль" className={`input w-full ${
                        errors.password ? "border-red-500" : ""}`}/>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
                )}
            </div>
            {errors.non_field_errors && (
                <p className="text-red-500 text-sm">{errors.non_field_errors[0]}</p>
            )}
            <Button type="submit">Войти</Button>
             <p className="text-sm text-center text-hover">{" "}
                <a href='#' type="button" className="text-hover underline" onClick={() => openAuthModal("register")}>У меня нет профиля</a>
            </p>
        </form>
    );
}