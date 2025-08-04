import {useEffect, useState, useContext} from "react";
import UserContext from "../context";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import type { User } from "../types";
import imgOne from "../assets/testimonyOne.webp"
import { TrophyIcon, DocumentIcon, PencilIcon } from "@heroicons/react/24/solid";



export default function Dashboard() {
    const uContext = useContext(UserContext)
    const navigation = useNavigate()

    const [user, setUser] = useState<User>({
        name: "",
        uuid: "",
        imgUrl: imgOne,
        email: "a",
        timesTaken: 1,
        highestScore: 1,
        testsAvailable: 1,
        allTests:[]
        // allTests: [

        // ]
    })
    useEffect(() => {
        console.log("uConext", uContext)
        if (uContext) {
            setUser(uContext)
        } else {
            navigation("/login")
        }
       

    },[])



    

    const openForm = () => {
        
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdKPicRy6Ous6H_De_M-OwHfBNW3kVO-gz7AEFRz95QIijj4w/viewform?usp=header")


    }


    return (

        <>


            <section className="md:flex md:flex-row  w-full">

                <AdminNavbar />

                <div className="p-4 w-full">
                    <h1 className="font-1 font-bold text-2xl">
                          {user.name.toLowerCase()}
                    </h1>


                    <div className="flex flex-row items-center p-2 gap-2 text-secondary">
                        <TrophyIcon className="size-3" />
                        <h2 className="font-1 text-sm">{user.highestScore}</h2>


                    </div>



                   {/*  */}
                   <div onClick={openForm} className="border cursor-pointer w-full p-4 py-8 rounded-box bg-secondary text-secondary-content">
                        <h4 className="font-1 text-2xl font-bold">The SAT needs your help</h4>
                        <p className="mt-4">We're currently under construction and would love your feedback.<br />
Click on this to learn more!</p>
                   </div>

                    <div className=" mt-4 ">
                        <p className="font-1 font-bold text-2xl">Take your test</p>

                        <div className="grid md:grid-cols-6 grid-cols-1 gap-2">

                            <div className="flex md:flex-row flex-col w-full gap-2 mt-2 col-span-4 items-center">
                                
                                <div onClick={() => {
                                    navigation("/test")
                                }} className="bg-primary p-9 w-full select-none cursor-pointer  relative rounded-box flex flex-col gap-4 text-primary-content items-center justify-center">
                                    <DocumentIcon className="size-12" />
                                    <p className="font-1 font-bold text-2xl">Take the SAT</p>
                                    <p className="font-1">The official and shareable test</p>



                                    <div className="absolute z-10 top-[-10px] right-[-10px] badge text-accent-content badge-accent">
                                        <p className="font-1">{user.testsAvailable} Tests Available</p>
                                    </div>
                                </div>
                                
                                <div className="bg-base-200 select-none cursor-not-allowed opacity-75 p-9 w-full  relative rounded-box flex flex-col gap-4 text-base-content items-center justify-center">
                                    <PencilIcon className="size-12" />
                                    <p className="font-1 font-bold text-2xl">Do a Practice Test</p>
                                    <p className="font-1 text-center">Practice your skills freely</p>


                                </div>
                                
                            </div>


                            {/* <div className="flex flex-col col-span-4 gap-2 w-full">
                                <div className="w-full">
                                    <ScoreBox dateTaken={129301923} charmNum={200} executionNum={200}></ScoreBox>
                                </div>
                            </div> */}

                            
                        
{/* 
                            <div className="col-span-2 bg-base-100 flex flex-col items-center justify-items-center rounded-box">
                                <p>adf</p>

                            </div> */}

                        </div>
                       
                    </div>
                   
                   
                

                </div>

                

            </section>

        

         

        
        
        
        
        
        </>
    )



}