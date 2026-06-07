import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../../assets/icons/logo.png";
import Navbar from "../Navbar/Navbar.jsx";
import Button from "../../ui/Button/Button.jsx";
import MobileMenu from "./MobileMenu.jsx";
import Container from "../../ui/Container/Container.jsx";
import Modal from "../../ui/Modal/Modal.jsx";
import RegisterForm from "../../auth/RegisterForm.jsx";
import LoginForm from "../../auth/LoginForm.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useUI } from "../../../context/UIContext.jsx";
import {API_URL} from "../../../shared/api.js";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === "/";
    const { user, logout } = useAuth();
    const { authModal, openAuthModal, closeAuthModal } = useUI();
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);
    const handleLogout = async () => {
        await fetch(`${API_URL}/api/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: localStorage.getItem("refresh")
            })
        });
        navigate('/')
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
    };

    return (
        <>
            <header className={`w-full py-3 ${isHome ? "absolute top-0 left-0 backdrop-blur-md bg-black/10 z-30" : "bg-white"}`}>
                <Container className="w-[90vw]">
                    <div className="flex items-center justify-between lg:justify-normal lg:gap-40">
                        <Link to="/" className="flex-shrink-0">
                            <img src={logo} alt="Логотип" className="w-16 h-16 rounded-full"/>
                        </Link>
                        {/* DESKTOP */}
                        <div className="w-full hidden lg:flex items-center justify-between">
                            <Navbar />
                            {user?.id ? (
                                <div className="flex items-center gap-6">
                                    {user?.is_superuser ? (
                                        <Button type="button" variant={isHome ? "outline" : "primary"}
                                            onClick={() => {
                                                window.location.href = `${API_URL}/admin/`;
                                            }}>Панель администратора</Button>
                                    ) : (
                                        <Link to="/cabinet">
                                            <Button type="button" variant={isHome ? "outline" : "primary"}>Личный кабинет</Button>
                                        </Link>
                                    )}
                                    <Button type="button" onClick={handleLogout} variant={isHome ? "outline" : "primary"}>Выход</Button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Button type="button" variant={isHome ? "outline" : "primary"} onClick={() => openAuthModal("register")}>Регистрация</Button>
                                    <Button type="button" variant={isHome ? "outline" : "primary"} onClick={() => openAuthModal("login")}>Авторизация</Button>
                                </div>
                            )}
                        </div>
                        {/* MOBILE BURGER */}
                        <button type="button" onClick={() => setMenuOpen(true)} className="lg:hidden flex flex-col gap-1">
                            <span className={`w-6 h-0.5 ${isHome ? "bg-white" : "bg-h"}`}/>
                            <span className={`w-6 h-0.5 ${isHome ? "bg-white" : "bg-h"}`}/>
                            <span className={`w-6 h-0.5 ${isHome ? "bg-white" : "bg-h"}`}/>
                        </button>
                    </div>
                </Container>
            </header>
            {/* MOBILE MENU */}
            {menuOpen && (
                <MobileMenu onClose={() => setMenuOpen(false)}/>
            )}
            {/* MODALS */}
            <Modal
                isOpen={authModal === "register"} title="Регистрация" onClose={closeAuthModal}>
                <RegisterForm />
            </Modal>
            <Modal isOpen={authModal === "login"} title="Авторизация" onClose={closeAuthModal}>
                <LoginForm />
            </Modal>
        </>
    );
}