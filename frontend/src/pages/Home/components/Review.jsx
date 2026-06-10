import defaultAvatar from "../../../assets/img/"

export default function Review({
    user_name,
    avatar,
    text,
    rating
}) {
    return (
        <div className="py-7 px-5 md:w-[45vw] lg:w-[27vw] rounded-2xl bg-gray-50 border border-border/30">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                    <img src={avatar || "/default_avatar.png"} alt={user_name} className="w-12 h-12 rounded-full object-cover"/>
                    <span className="text-xl font-medium">{user_name}</span>
                </div>
                <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
                    ))}
                </div>
            </div>
            <p className="text-md font-light leading-relaxed text-gray-400 line-clamp-6">{text}</p>
        </div>
    );
}