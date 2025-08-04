import { useState, useEffect } from "react";

import { HiDotsVertical } from "react-icons/hi";

import { ClockIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";


type TestNavProps = {
    timer: number;
    slideName: string;
}
export default function TestNavbar(props: TestNavProps) {
    
    const [currentSlide, setCurrentSlide] = useState(props.slideName)
    const [timer, setTimer] = useState(props.timer);
    const [hideTimer, setHideTimer] = useState<boolean>(false);

  
    useEffect(() => {

        setCurrentSlide(props.slideName);

    },[props.slideName])



    useEffect(() => {
        setTimer(props.timer);
    },[props.timer])


    return (
        <>

        <div className="p-4 navbar shadow-md border-b-2 border-dashed">
            <div className="navbar-start">
                <p className="font-1 text-lg">{currentSlide}</p>

            </div>

            <div className="navbar-center">
                <div className="flex flex-col items-center justify-center gap-1">
                    {hideTimer ? <>
                        <ClockIcon className="size-6 text-neutral" />

                    </> : <>
 <p className="font-1 font-bold text-xl">{new Date(timer).getMinutes()}:{new Date(timer).getSeconds()}</p>
    
                    </>}
                    <button onClick={() => setHideTimer((prev) => !prev)} className="btn-outline rounded-full btn btn-sm font-1">Hide</button>
                </div>
                
            </div>

            <div className="navbar-end font-1">

                <div className="dropdown dropdown-bottom dropdown-end">
   <div tabIndex={0} role="button" className="flex flex-col cursor-pointer select-none gap-2 items-center justify-center">
                    <HiDotsVertical className="size-4" />
                    <p className="text-sm">More</p>
                </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li className="font-bold text-error"><Link to="/dashboard">Leave Exam</Link></li>
                <li className="font-bold"><a>Suspicious Button...</a></li>
            </ul>
</div>
               
                
            </div>
            

        </div>



        </>
    )



}