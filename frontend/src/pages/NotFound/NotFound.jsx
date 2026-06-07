import {useNavigate} from "react-router-dom";
import Button from "../../components/ui/Button/Button.jsx";
export default function NotFound(){
    const navigate = useNavigate()
    return(
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <h1 className='text-[20rem] p-0 font-bold text-h'>404</h1>
            <h4 className='font-inter mb-5'>Страница не найдена</h4>
            <Button onClick={() => navigate('/')}>На главную</Button>
        </div>
    )
}