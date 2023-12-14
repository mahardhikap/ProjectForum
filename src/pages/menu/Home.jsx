import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBiodata } from "../../redux/action/menu"
import { useNavigate } from "react-router-dom"
export function Home(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {data} = useSelector(state => state.getBiodata)
    useEffect(()=>{
        dispatch(getBiodata())
    },[])

    return (
        <section className="w-11/12 lg:w-2/5 mx-auto container h-screen flex justify-center items-center">
            <div className="shadow-[1px_1px_10px_rgba(0,0,0,0.1)] p-2 rounded-xl bg-white my-5 w-full">
                <div className="flex justify-end font-medium cursor-pointer">
                    <div onClick={()=> navigate('/login')}>Login</div>
                </div>
                <div className="text-center my-5">Hello, I'm <span className="bg-yellow-50 p-1 font-medium rounded-lg">{data?.biodata?.fullname}</span></div>
                <div className="flex justify-center items-center"><img src={data?.biodata?.photo} alt="profile" className="rounded-full border border-2 w-40 h-40 object-cover" /></div>
                <div className="flex flex-row gap-5 justify-center items-center my-5">
                    <button onClick={()=>navigate('/blog')} className="w-32 px-2 py-1 bg-gray-400 rounded-lg font-medium hover:bg-gray-200 text-white">Blog</button>
                    <button onClick={()=>navigate('/biodata')} className="w-32 px-2 py-1 bg-gray-400 rounded-lg font-medium hover:bg-gray-200 text-white">Biodata</button>
                </div>
            </div>
        </section>
    )
}