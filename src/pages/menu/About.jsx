import { useNavigate } from "react-router-dom"
export function About(){
    const navigate = useNavigate()
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="font-bold">Under Maintenance</div>
            <div className="font-normal underline text-blue-200 cursor-pointer" onClick={()=>navigate('/blog')}>Back</div>
        </div>
    )
}