import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";
import {getCSRF} from "../../../api/csrf.js";

export default function EditableField({
    value,
    endpoint,
    field = "text",
    isAdmin
}) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setText(value);
    }, [value]);

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

        if (text === value) {
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
                    [field]: text,
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
        if (e.key === "Enter") save();
        if (e.key === "Escape") {
            setText(value);
            setEditing(false);
        }
    };

    if (!isAdmin) {
        return <span>{value}</span>;
    }

    return (
        <div className="relative group inline-block">
            {editing ? (
                <input
                    ref={inputRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={save}
                    onKeyDown={handleKeyDown}
                    className="border-b border-h outline-none bg-transparent"
                />
            ) : (
                <span
                    onClick={() => setEditing(true)}
                    className="cursor-text hover:bg-gray-100 px-1 rounded"
                >
                    {text || "—"}
                </span>
            )}

            <span className="ml-2 opacity-0 group-hover:opacity-50 text-xs">
                ✏️
            </span>
        </div>
    );
}