import { useState, useEffect } from "react";
// import Navbar from "../components/Navbar"
import Notif from "../components/Notif";
import { FaGoogle } from "react-icons/fa";
import callApi, {isEmail, isPassword, isString} from "../functions"
import type { NotifType, Timeout, User } from "../types";
// import Footer from "../components/Footer"
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
let timeout: Timeout;
export default function Signup() {
    const nav = useNavigate();
    const url = window.location.href.includes("localhost") ? "https://localhost:443" : "https://api.toomanyheys.com";

    const [user, setUser] = useState<User>({
        name: "",
        email: "",
        imgUrl: "",
        password: "",
        confirmPassword: "",
        allTests: [],
        uuid: "",
    });

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

            } else if (!isString(user.name)) {
                setNotif({
                    type: "err",
                    message: "Invalid Name"
                })
            } else if (!isPassword(user.password || "")||user.password!==user.confirmPassword) {
                setNotif({
                    type: "err",
                    message: "Invalid Password"
                })
            }
            
            else {
                callApi("/register", "POST", user).then((res) => {
                    console.log("this was the response from the request", res)
                    if (res.code === "err") {
                        console.log("something went wrong");
                        setNotif({
                            type: "err",
                            message: "Invalid Message"
                        })
                    } else if (res.message === "login") {
                        setNotif({
                            type: "err",
                            message: "You already have an account, log in."
                        })
                        nav("/login")
                    } else if (res.code === "ok") {
                        setNotif({
                            type: "success",
                            message: "Successfully created your account."
                        })
                        nav("/dashboard");
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
    console.log("this is the url", url + "/auth/google")


    return (

        <>
        {/* <Navbar /> */}
        
<Helmet>
            <meta charSet="utf-8" />
            <title>Signup - toomanyheys</title>
            <meta name="keywords" content="sat, satprep, sat dating, rizz, rizz dating" />
            <meta
      name="description"
      content="Create your free toomanyheys account to get your SAT score!"
    />
        </Helmet>

        <Notif message={notif.message} type={notif.type}   />


        <section className="min-h-screen w-full grid md:grid-cols-2 grid-cols-1 font-1">

               <div className="flex flex-col items-center justify-items-center justify-center gap-2 rounded-box p-4 md:p-8 text-center">
            <p className="text-5xl font-1 font-extrabold">Take the <br/>Test</p>
            <p className="font-1 text-lg w-4/6">Take the SAT when you want, infinitely.</p>

            <div className="my-10 flex font-1 flex-col gap-2 w-5/6 mx-auto">
                


                <fieldset className="fieldset w-full">
                    {/* <legend className="fieldset-legend">Page title</legend> */}
                    <input value={user.name} onChange={(e) => setUser((prev) => {
                        return {...prev, name: e.target.value}
                    })} type="text" className="input w-full" placeholder="Username" />
        
                </fieldset>
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
                 <fieldset className="fieldset">
                    {/* <legend className="fieldset-legend">Page title</legend> */}
                    <input value={user.confirmPassword} onChange={(e) => setUser((prev) => {
                        return {...prev, confirmPassword: e.target.value}
                    })}  type="password" className="input w-full" placeholder="Confirm Password" />
                
                </fieldset> 

                <button onClick={doSubmit} className="btn btn-primary">Create your account</button>
                <Link to="/login" className="mt-2 link-primary ">Login Instead</Link>
  <div className="divider w-full divider-neutral">or</div>
                
                <a href={url + "/auth/google"} className="btn btn-outline btn-secondary ">
                    <FaGoogle />
                    <p>Continue with Google</p>
                </a>

                
            </div>
        



        </div>

            <div className="bg-base-300 font-1 md:p-10 p-4 flex flex-row items-center">
                {/* <div className=" h-4/6 w-full rounded-box">
                    <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1" className="w-full h-full rounded-box" />
                        

                </div> */}


                {/* <h1 className="text-4xl font-semibold">Put your game where your mouth is</h1> */}


            </div>



        </section>
        {/* <Footer /> */}
        </>
    )
}