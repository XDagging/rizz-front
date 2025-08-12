import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import logo from "../assets/logo.png"
import { Link } from "react-router-dom";



export default function Footer() {





    return (
        <>

            
            <div className="footer sm:footer-horizontal footer-vertical  p-10">
                <nav>
                    <img src={logo} className="size-8 object-cover"/>
                    <p className="font-1 text-lg"><span className="font-bold">toomanyheys</span>,<br/> the SAT that tests your game</p>
                
                    <div className="flex flex-row gap-1">
                    
                    <a href="#" className="btn btn-circle btn-ghost"><FaInstagram/></a>
                    <a href="#" className="btn btn-circle btn-ghost"><FaTiktok/></a>
                    <a href="mailto:xdagging@gmail.com" className="btn btn-circle btn-ghost"><FaEnvelope/></a>

                
            </div>
                </nav>
                


                

                <nav className="font-1">
                    <p className="footer-title">Legal</p>
                    <Link to="/terms" className="link link-hover">Terms and Conditions</Link>
                    <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
               


                </nav>
                 <nav className="font-1">
                    <p className="footer-title">Misc</p>
                    <Link to="/mission" className="link link-hover">Why does this exist?</Link>
                    <Link to="/work" className="link link-hover">Want to help toomanyheys out?</Link>
               


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