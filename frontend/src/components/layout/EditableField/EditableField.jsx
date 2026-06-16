import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getCSRF } from "../../../api/csrf.js";

export default function EditableField({
    value,
    endpoint,
    field = "text",
    isAdmin,
    type = "text", // 👈 добавили тип
}) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    // нормализация входного значения
    useEffect(() => {
        if (type === "list") {
            if (Array.isArray(value)) {
                setText(value.join("\n"));
            } else {
                setText(value || "");
            }
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
                ? text.split("\n").map((i) => i.trim()).filter(Boolean).join("\n")
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

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && type !== "list") save();
        if (e.key === "Escape") {
            setText(
                type === "list"
                    ? (Array.isArray(value) ? value.join("\n") : value)
                    : value
            );
            setEditing(false);
        }
    };

    if (!isAdmin) {
        if (type === "list") {
            const items = Array.isArray(value)
                ? value
                : (value || "").split("\n");

            return (
                <ul className="list-disc pl-5 text-body">
                    {items.map((item, i) => (
                        <li key={i} className="text-[1rem]">
                            {item}
                        </li>
                    ))}
                </ul>
            );
        }

        return <span>{value}</span>;
    }

    return (
        <div className="relative group inline-block w-full">
            {editing ? (
                type === "list" ? (
                    <textarea
                        ref={inputRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={save}
                        rows={5}
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
                            {text
                                .split("\n")
                                .filter(Boolean)
                                .map((item, i) => (
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

            <span className="ml-2 opacity-0 group-hover:opacity-50 text-xs">
                ✏️
            </span>
        </div>
    );
}