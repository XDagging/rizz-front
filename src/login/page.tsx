import { useState, useEffect} from "react"
import Navbar from "../components/Navbar"
import callApi, { isEmail, isPassword, } from "../functions"
import Footer from "../components/Footer"
import { FaGoogle } from "react-icons/fa"
import Notif from "../components/Notif"
import { useNavigate } from "react-router-dom"
import type { NotifType, Timeout } from "../types"
type LoginUser = {
    email: string;
    password: string;

}

let timeout: Timeout;
export default function Login() {
    const nav = useNavigate();
    const url = window.location.href.includes("localhost") ? "https://localhost:443" : "https://PROD_URL";

    const [user, setUser] = useState<LoginUser>({
        email: "",
        password: ""
    })

    const [notif, setNotif] = useState<NotifType>({
        type: "",
        message: ""
    })

    useEffect(() => {
        console.log("this was called", notif);
   
        timeout = setTimeout(() => {
            setNotif({ type: "", message: "" });
        }, 5000);
   
        return () => {
            clearTimeout(timeout);
        };

     }, [notif]);
   

    const doSubmit = () => {    
        console.log("check")
        try {
            if (!isEmail(user.email)) {
                setNotif({
                    type: "err",
                    message: "Invalid Email"
                })

            } else if (!isPassword(user.password || "")) {
                setNotif({
                    type: "err",
                    message: "Invalid Password"
                })
            }
            
            else {
                callApi("/login", "POST", user).then((res) => {
                    console.log("this was the response from the request", res)
                    if (res.code === "err") {
                        console.log("something went wrong");
                        setNotif({
                            type: "err",
                            message: "Invalid Message"
                        })
                    }  else if (res.code === "ok") {
                        
                        setNotif({
                            type: "success",
                            message: "Successfully created your account."
                        })
                        nav("/dashboard");
                    } else {
                        console.log("something went wrong", res);
                        setNotif({
                            type: "err",
                            message: "Invalid Message"
                        })
                    }
                    
                    
                })
            }
        } catch(e) {
            console.log(e);
            setNotif({
                type: "err",
                message: "Invalid Error"
            })
        }
    }



    return (
        <>

        
        <Notif type={notif.type} message={notif.message} />
        <div className="min-h-screen">
               <Navbar />
        <div className="flex flex-col bg-base-200 w-2/6 mx-auto items-center justify-items-center justify-center gap-2 rounded-box p-8 text-center">
                    <p className="text-5xl font-1 font-extrabold">Welcome back <br/></p>
                    <p className="font-1 text-lg w-4/6">Should be an easy 1600, right?</p>
        
                    <div className="my-10 flex font-1 flex-col gap-2 w-5/6 mx-auto">
                        
        
                        <fieldset className="fieldset w-full">
                            {/* <legend className="fieldset-legend">Page title</legend> */}
                            <input value={user.email} onChange={(e) => setUser((prev) => {
                                return {...prev, email: e.target.value}
                            })} type="text" className="input w-full" placeholder="Email" />
                
                        </fieldset>
                         <fieldset className="fieldset">
                            {/* <legend className="fieldset-legend">Page title</legend> */}
                            <input value={user.password} onChange={(e) => setUser((prev) => {
                                return {...prev, password: e.target.value}
                            })} type="password" className="input w-full" placeholder="Password" />
                 
                        </fieldset>
                        <button onClick={doSubmit} className="btn btn-primary">Join the waitlist</button>
          <div className="divider w-full divider-neutral">or</div>
                        <a href={url + "/auth/google"} className="btn btn-outline btn-secondary ">
                            <FaGoogle />
                            <p>Continue with Google</p>
                        </a>
                    </div>
                
        
        
        
                </div>

        </div>
     
        

        <Footer />
        
        
        
        </>
    )

}