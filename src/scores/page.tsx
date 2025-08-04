import {useState, useEffect, useContext, useRef} from "react";
import ScoreBox from "../components/ScoreBox";
import UserContext from "../context";
import AdminNavbar from "../components/AdminNavbar";
// import { existsSync } from "fs";
import { BsInstagram } from "react-icons/bs";
import { LinkIcon } from "@heroicons/react/24/solid";
import html2canvas from "html2canvas";
import { AiOutlineDownload } from "react-icons/ai";

export default function Scores() {

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const user = useContext(UserContext)

    const handleDownload = async (i: number) => {
      const node = cardRefs.current[i];
      if (!node) {
        console.log('No node found chat');
        return;
      }


      const canvas = await html2canvas(node, {
        scale: 2
      })
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `rizz-score-${i + 1}.png`;
      link.click();


    }



    return (
        <>
        <div className="md:flex md:flex-row ">
            <AdminNavbar />
              <section className="max-h-screen overflow-y-auto md:p-10 p-4 font-1 w-full bg-base-200">
        <div className="w-full flex flex-col gap-2">
         <p className="font-1 font-bold text-4xl">My Scores</p>
        <p className="">Send your score somewhere...</p>

        </div>
       
        <div className="flex flex-col gap-4 w-full">
                {user?.allTests.reverse().map((test,i) => (
            <div ref={(el) => {cardRefs.current[i] = el}} key={i} className="z-20 select-none">

                
                 <ScoreBox charmNum={test.charm} executionNum={test.execution} dateTaken={test.date} />
                 <div className="bg-base-100 border-primary border gap-4 mt-1 rounded-box p-2 flex flex-row items-center">
                    <p className="font-1 font-semibold">Share your score</p>
                    
                    <button className="btn btn-secondary btn-circle btn-ghost btn-sm" onClick={(e) => handleDownload(i)}>
                    <BsInstagram className="size-4" />
                    </button>
                     <button className="btn btn-secondary btn-circle btn-ghost btn-sm" onClick={(e) => handleDownload(i)}>
                    <LinkIcon className="size-4" />
                    </button>
                    
                 
                 
                 </div>
              
            </div>
              
        
        ) )}

        </div>

    </section>
    <div className="p-10 font-1">
        <p className="font-1 text-lg font-bold">What does this score mean?</p>

        <p>Score distributions are compared to the average attempt. The multiple choice portion is graded a little differently. </p>

    </div>
        </div>
  
        

    
     
        </>
    )
}