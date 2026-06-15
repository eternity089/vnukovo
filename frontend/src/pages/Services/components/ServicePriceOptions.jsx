import {API_URL} from "../../../shared/api.js";
import EditableField from "../../../components/layout/EditableField/EditableField.jsx";

export default function ServicePriceOptions({
    title,
    options = [],
    onOpenModal,
    isAdmin = false,
}) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-20">
            <h3 className="text-2xl font-medium uppercase text-h sm:text-3xl lg:w-1/3 lg:shrink-0">{title}</h3>
            <div className="flex flex-col gap-3 lg:w-fit">
                {options.map((item) => {
                    const endpoint = `${API_URL}/api/${item.type}/${item.id}/`;
                    return (
                        <div key={item.id} className="flex items-center gap-2">
                            <EditableField value={item.text} endpoint={endpoint} field="text" isAdmin={isAdmin}
                                className={`text-lg font-light leading-relaxed transition-colors duration-300 ${
                                    item.modal
                                        ? "cursor-pointer underline hover:text-h"
                                        : ""
                                }`}
                            />
                            {item.modal && (
                                 <button type="button" onClick={() => onOpenModal(item.modal)} className="flex items-center justify-center text-gray-500 hover:text-h hover:border-h transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M9.09 9a3 3 0 1 1 5.82 1c0 2-3 2-3 4" />
                                        <line x1="12" y1="17" x2="12.01" y2="17" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}