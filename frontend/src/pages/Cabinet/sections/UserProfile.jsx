import { useState } from "react";
import CabinetSidebar from "../components/CabinetSidebar.jsx";
import ProfileTab from "../components/ProfileTab.jsx";
import CreateOrder from "../components/CreateOrder.jsx";
import OrdersTab from "../components/OrdersTab.jsx";

export default function ProfilePage({ user }) {
    const [activeTab, setActiveTab] = useState("profile");
    return (
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between mb-5">
            <CabinetSidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
            <div className="flex-1 rounded-2xl border border-gray-200 p-6 lg:p-10">
                {activeTab === 'profile' && (
                    <ProfileTab/>
                )}
                {activeTab === 'create' && (
                    <CreateOrder/>
                )}
                {activeTab === 'orders' &&(
                    <OrdersTab/>
                )}
            </div>
        </div>
    );
}