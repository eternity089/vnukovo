import Button from "../../../components/ui/Button/Button.jsx";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import Loader from "../../../components/ui/Loader/Loader.jsx";
import toast from 'react-hot-toast'
import {API_URL} from "../../../shared/api.js";
import {getCSRF} from "../../../api/csrf.js";
export default function ProfileTab() {
    const { user, setUser } = useAuth();
    const fileInputRef = useRef(null);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        email: ""
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!user) return;
        setForm({
            name: user.name || "",
            surname: user.surname || "",
            phone: user.phone || "",
            email: user.email || ""
        });
        setPreview(user.avatar || null);
    }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setPreview(
            URL.createObjectURL(file)
        );
        toast.success('Аватар изменен')
    };
    const handleDeleteAvatar = async() =>{
        try{
            const csrfToken = await getCSRF()
            const res = await fetch(`${API_URL}/api/cabinet/avatar/`, {
                method: "DELETE",
                credentials:'include',
                headers:{
                    "X-CSRFToken": csrfToken
                }
            })
            if(!res.ok){
                toast.error('Ошибка удаления')
            }
            setPreview(null)
            setAvatarFile(null)
            setUser(prev => ({
                ...prev,
                avatar:null
            }))
        }catch(error){
            console.error(error)
            toast.error('Не удалось удалить фотографию')
        }
    toast.success('Аватар удален')
    }
    const handleSave = async () => {
        setErrors({})
        const formData = new FormData()
        formData.append('name', form.name)
        formData.append('surname', form.surname)
        formData.append('phone', form.phone)
        formData.append('email', form.email)
        if(avatarFile){
            formData.append('avatar', avatarFile)
        }
        try{
            const csrfToken = await getCSRF()
            const res = await fetch(`${API_URL}/api/cabinet/`, {
                method: "PATCH",
                credentials:'include',
                headers:{
                    "X-CSRFToken": csrfToken
                },
                body:formData
            })
            const data = await res.json()
            if(!res.ok){
                setErrors(data)
                return
            }
            setUser(prev => ({
                ...prev,
                ...data
            }))
            toast.success('Изменения сохранены')
        } catch(error){
            console.log(error)
            toast.error('Ошибка соединения с сервером')
        }
    }
    if (!user) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            {/* AVATAR */}
            <div className="flex flex-col items-center gap-5 lg:w-[300px]">
                <div className="w-48 h-48 rounded-full overflow-hidden">
                    <img src={preview || "/default_avatar.png"} alt="avatar" className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col gap-2 text-center">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm underline transition hover:text-h">Изменить фото</button>
                    <button type="button" onClick={handleDeleteAvatar} className="text-sm text-red-500 transition hover:opacity-70">Удалить фото</button>
                    <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleAvatarChange}/>
                </div>
            </div>
            {/* USER DATA */}
            <div className="flex-1 flex flex-col gap-4">
                <input type="text" name="name" value={form.name} onChange={handleChange}
                       placeholder="Имя" className={`input ${errors.name ? "border-red-500" : ""}`}/>
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name[0]}</p>
                )}
                <input type="text" name="surname" value={form.surname} onChange={handleChange}
                       placeholder="Фамилия" className={`input ${errors.surname ? "border-red-500" : ""}`}/>
                {errors.surname && (
                    <p className="text-red-500 text-sm">{errors.surname[0]}</p>
                )}
                <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                       placeholder="Телефон" className={`input ${errors.phone ? "border-red-500" : ""}`}/>
                {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone[0]}</p>
                )}
                <input type="email" name="email" value={form.email} onChange={handleChange}
                       placeholder="Электронная почта" className={`input ${errors.email ? "border-red-500" : ""}`}/>
                {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email[0]}</p>
                )}
                <div className="flex flex-col gap-3 pt-4 sm:flex-row">
                    {/*<Button type="button">Изменить пароль</Button>*/}
                    <Button type="button" onClick={handleSave}>Сохранить изменения</Button>
                </div>
                {errors.detail && (
                    <p className="text-red-500 text-sm">
                        {errors.detail}
                    </p>
                )}
            </div>
        </div>
    );
}