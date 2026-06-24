import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getCSRF } from "../../../api/csrf.js";

export default function EditableField({
    value,
    endpoint,
    field = "text",
    isAdmin,
    type = "text",
    className = "",
}) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState("");
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // 👉 нормализация входа
    useEffect(() => {
        if (type === "list") {
            const arr =
                Array.isArray(value)
                    ? value
                    : (value || "")
                          .replace(/\r/g, "")
                          .split(";")
                          .map(i => i.trim())
                          .filter(Boolean);

            setList(arr);
            setText(arr.join("\n"));
        } else {
            setText(value || "");
        }
    }, [value, type]);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editing]);

    const save = async () => {
        if (!endpoint) {
            toast.error("Нет endpoint");
            return;
        }

        const normalizedValue =
            type === "list"
                ? list.join(";") // 👈 единый формат для API
                : text;

        if (normalizedValue === value) {
            setEditing(false);
            return;
        }

        try {
            setLoading(true);

            const csrftoken = await getCSRF();

            const res = await fetch(endpoint, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                    [field]: normalizedValue,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.detail || "error");
            }

            toast.success("Сохранено");
            setEditing(false);
        } catch (e) {
            toast.error("Ошибка сохранения");
        } finally {
            setLoading(false);
        }
    };

    const handleListChange = (val) => {
        const arr = val
            .split("\n")
            .map(i => i.trim())
            .filter(Boolean);

        setList(arr);
        setText(val);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && type !== "list") save();
        if (e.key === "Escape") {
            setEditing(false);
        }
    };

    // ===== VIEW MODE (не админ) =====
    if (!isAdmin) {
        if (type === "list") {
            return (
                <ul className={`list - disc pl-5 text-body`}>
                    {list.map((item, i) => (
                        <li key={i} className="text-[1rem]">
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }

        return <span>{value}</span>;
    }

    // ===== ADMIN MODE =====
    return (
        <div className={`relative group inline-block w-full ${className}`}>
            {editing ? (
                type === "list" ? (
                    <textarea
                        ref={inputRef}
                        value={text}
                        onChange={(e) => handleListChange(e.target.value)}
                        onBlur={save}
                        rows={6}
                        className="border border-h p-2 w-full outline-none bg-transparent"
                    />
                ) : (
                    <input
                        ref={inputRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={save}
                        onKeyDown={handleKeyDown}
                        className="border-b border-h outline-none bg-transparent"
                    />
                )
            ) : (
                <div onClick={() => setEditing(true)} className="cursor-text">
                    {type === "list" ? (
                        <ul className="list-disc pl-5 text-body">
                            {list.map((item, i) => (
                                <li key={i} className="text-[1rem]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="hover:bg-gray-100 px-1 rounded">
                            {text || "—"}
                        </span>
                    )}
                </div>
            )}

            <span className="ml-2 text-xs">
                ✏️
            </span>
        </div>
    );
}