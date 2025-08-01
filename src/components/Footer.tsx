import React from "react";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";





export default function Footer() {





    return (
        <>

            
            <div className="footer flex flex-row  p-10 ">
                <nav>
                    <p className="font-1 text-lg">companyName,<br/> debugging that understands</p>
                
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