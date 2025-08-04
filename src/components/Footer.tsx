import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.svg"




export default function Footer() {





    return (
        <>

            
            <div className="footer flex flex-row  p-10">
                <nav>
                    <img src={logo} className="size-8 object-cover"/>
                    <p className="font-1 text-lg"><span className="font-bold">toomanyheys</span>,<br/> the SAT that tests your game</p>
                
                    <div className="flex flex-row gap-1">
                    
                    <a href="#" className="btn btn-circle btn-ghost"><FaInstagram/></a>
                    <a href="#" className="btn btn-circle btn-ghost"><FaTiktok/></a>
                    <a href="mailto:xdagging@gmail.com" className="btn btn-circle btn-ghost"><FaEnvelope/></a>

                
            </div>
                </nav>


                

                <nav>
               


                </nav>
            </div>

            <footer className="footer bg-neutral footer-center text-neutral-content border-t p-2">
  <aside>
    <p className="font-1"><a href="https://plastuchino.xyz/">Made with ❤️ as a Hernandez Production</a></p>
  </aside>
</footer>
        
        </>
    )
}