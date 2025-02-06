import { useNavigate } from "react-router"

const BackBtn = () => {
    const navigate = useNavigate()

    return (
        <div className="w-full">
            <button onClick={() => navigate(-1)} className="w-fit py-2  px-2 flex gap-2 justify-center items-center border-1 border-white rounded-full duration-150 transition-all text-xs md:text-sm hover:bg-light-100/20 cursor-pointer">
                &larr;
                Go back
            </button>
        </div>
    )
}

export default BackBtn