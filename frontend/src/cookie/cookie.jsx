import { useEffect, useState } from "react";

export default function CookieBanner() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const accepted = localStorage.getItem("cookieAccepted");

        if (!accepted) {
            setVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookieAccepted", "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50
        bg-white border border-gray-200 shadow-xl rounded-2xl p-4 md:max-w-2xl md:left-auto">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-700">
                    Мы используем cookie-файлы для обеспечения работы сайта,
                    сохранения настроек пользователя и улучшения качества сервиса.
                    Продолжая пользоваться сайтом, вы соглашаетесь с их использованием.
                </p>

                <button
                    onClick={acceptCookies}
                    className="px-4 py-2 rounded-xl bg-h text-white hover:opacity-90 transition"
                >
                    Понятно
                </button>
            </div>
        </div>
    );
}