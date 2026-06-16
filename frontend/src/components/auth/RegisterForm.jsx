import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import Button from "../ui/Button/Button.jsx";
import { getCookie } from "../../utils/cookies";

import { useAuth } from "../../context/AuthContext.jsx";
import { useUI } from "../../context/UIContext.jsx";
import {API_URL} from "../../shared/api.js";

export default function RegisterForm() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const { closeAuthModal, openAuthModal } = useUI();
    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        password: "",
        password2: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: null
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const csrftoken = getCookie("csrftoken");
        try {
            const res = await fetch(`${API_URL}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken
                },
                credentials: "include",
                body: JSON.stringify(form)
            });
            const data = await res.json();
            console.log(data);
            if (res.ok) {
                setUser(data.user);
                closeAuthModal();
                navigate("/");
            } else {
                setErrors(data);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Имя"
                className={`input ${errors.name ? "border-red-500" : ""}`}/>
            {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>
            )}
            <input name="surname" value={form.surname} onChange={handleChange} placeholder="Фамилия"
                className={`input ${errors.surname ? "border-red-500" : ""}`}/>
            {errors.surname && (
                <p className="text-red-500 text-sm mt-1">{errors.surname[0]}</p>
            )}
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Телефон"
                className={`input ${errors.phone ? "border-red-500" : ""}`}/>
            {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>
            )}
            <input name="email" value={form.email} onChange={handleChange} placeholder="E-mail"
                className={`input ${errors.email ? "border-red-500" : ""}`}/>
            {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>
            )}

            <input name="password" value={form.password} onChange={handleChange} placeholder="Пароль" type="password"
                className={`input ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password[0]}</p>
            )}
            <input name="password2" value={form.password2} onChange={handleChange} placeholder="Повтор пароля" type="password"
                className={`input ${errors.password2 ? "border-red-500" : ""}`}/>
            <label className="flex items-start gap-2 cursor-pointer text-body">
                <input type="checkbox" name="rules" checked={form.rules} onChange={handleChange} className="mt-1"/>
                <span>
                    Я соглашаюсь с{" "}
                    <Link to="/privacy_policy" className="underline text-h">
                        Политикой конфиденциальности</Link>{" "}
                    и{" "}
                    <Link to="/privacy_agreement" className="underline text-h">
                        Пользовательским соглашением
                    </Link>{" "}
                    и разрешаю обрабатывать мои персональные данные.
                </span>
            </label>
            {errors.password2 && (
                <p className="text-red-500 text-sm mt-1">{errors.password2[0]}</p>
            )}
            {errors.non_field_errors && (
                <p className="text-red-500 text-sm">{errors.non_field_errors[0]}</p>
            )}
            {errors.detail && (
                <p className="text-red-500 text-sm">{errors.detail}</p>
            )}
            <Button type="submit">Зарегистрироваться</Button>

            <p className="text-sm text-center text-hover">{" "}
                <a href='#' type="button" className="text-hover underline" onClick={() => openAuthModal("login")}>У меня есть профиль</a>
            </p>
        </form>
    );
}