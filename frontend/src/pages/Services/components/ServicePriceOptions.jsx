import {useState} from "react";
import toast from "react-hot-toast";
import Loader from "../../../components/ui/Loader/Loader.jsx";
import {API_URL} from "../../../shared/api.js";
import {SERVICE_ENDPOINTS} from "../../../api/endpoints.js";

export default function ServicePriceOptions({
    title,
    options = [],
    onOpenModal,
    isAdmin = false,
}) {
    const [editingId, setEditingId] = useState(null);
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const handleEdit = (item) => {
        setEditingId(item.id);
        setValue(item.text);
    };
    const save = async (item) => {
        try {
            setLoading(true);
            const endpoint = SERVICE_ENDPOINTS[item.type];
            const response = await fetch(
                `${API_URL}/api/${endpoint}/${item.id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: value,
                    }),
                }
            );
            if (!response.ok) throw new Error();
            toast.success("Сохранено");
            setEditingId(null);
        } catch {
            toast.error("Ошибка сохранения");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-20">
            <h3 className="text-2xl font-medium uppercase text-h sm:text-3xl lg:w-1/3 lg:shrink-0">{title}</h3>
            <div className="flex flex-col gap-3 lg:w-fit">
                {options.map((item) => {
                    const editing = editingId === item.id;
                    return (
                        <div key={item.id}>
                            {editing ? (
                                <div className="flex gap-2 items-center">
                                    <input value={value}
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                        className="border px-2 py-1 rounded"
                                    />
                                    <button onClick={() => save(item)} disabled={loading}>
                                        {loading ? <Loader/> : "✔"}
                                    </button>
                                    <button
                                        onClick={() =>
                                            setEditingId(null)
                                        }
                                    >
                                        ✖
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button type="button"
                                        onClick={() =>
                                            item.modal &&
                                            onOpenModal(item.modal)
                                        }
                                        className={`w-fit text-left text-lg font-light leading-relaxed transition-colors duration-300
                                            ${
                                                item.modal
                                                    ? "cursor-pointer underline hover:text-h"
                                                    : "cursor-default"
                                            }
                                        `}
                                    >
                                        {item.text}
                                    </button>
                                    {isAdmin && (
                                        <button className="text-sm"
                                            onClick={() =>
                                                handleEdit(item)
                                            }
                                        >
                                            ✏️
                                        </button>
                                    )}
                                </div>

                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}