export default function CabinetSidebar({activeTab, setActiveTab}){
    return(
        <aside className="lg:w-[280px] lg:flex-shrink-0">
                <div className="sticky top-10 rounded-2xl border border-gray-200 p-5 flex flex-col gap-3">
                    <button type="button" onClick={() => setActiveTab("profile")} className={`text-left rounded-xl px-4 py-3 transition
                        ${activeTab === "profile"
                            ? "bg-h text-white"
                            : "hover:bg-gray-100"
                        }`}> Личный профиль</button>
                    <button type="button" onClick={() => setActiveTab("create")} className={`text-left rounded-xl px-4 py-3 transition
                        ${activeTab === "create"
                            ? "bg-h text-white"
                            : "hover:bg-gray-100"
                        }`}
                    >Создание заявки</button>
                    <button type="button" onClick={() => setActiveTab("orders")} className={`text-left rounded-xl px-4 py-3 transition
                        ${activeTab === "orders"
                            ? "bg-h text-white"
                            : "hover:bg-gray-100"
                        }`}>Просмотр заявок</button>
                </div>
            </aside>
    )
}