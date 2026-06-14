import {useState} from "react";
import toast from "react-hot-toast";
import Loader from "../../ui/Loader/Loader.jsx";

const EditableField = ({
    value,
    endpoint,
    field,
    token,
    isAdmin,
    multiline = false,
    className = ""
}) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
    const [loading, setLoading] = useState(false);

    const save = async () => {
        try {
            setLoading(true);

            const response = await fetch(endpoint, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    [field]: text,
                }),
            });

            if (!response.ok) {
                throw new Error();
            }

            toast.success("Изменения сохранены");
            setEditing(false);
        } catch (error) {
            toast.error("Не удалось сохранить изменения");
        } finally {
            setLoading(false);
        }
    };

    if (!isAdmin) {
        return <span className={className}>{value}</span>;
    }

    return (
        <>
            {editing ? (
                <div>
                    {multiline ? (
                        <textarea
                            className="form-control mb-2"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    ) : (
                        <input
                            className="form-control mb-2"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    )}

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-success btn-sm"
                            onClick={save}
                            disabled={loading}
                        >
                            {loading ? <Loader /> : "Сохранить"}
                        </button>

                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => {
                                setText(value);
                                setEditing(false);
                            }}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        cursor: "pointer",
                        position: "relative",
                    }}
                    onDoubleClick={() => setEditing(true)}
                >
                    <span className={className}>{text}</span>

                    <small
                        style={{
                            marginLeft: "8px",
                            color: "#6c757d",
                        }}
                    >
                        ✏️
                    </small>
                </div>
            )}
        </>
    );
};

export default EditableField;