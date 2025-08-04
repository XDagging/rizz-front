import { useContext, useRef } from "react";
import ScoreBox from "../components/ScoreBox";
import UserContext from "../context";
import AdminNavbar from "../components/AdminNavbar";
// import { existsSync } from "fs";
import { BsInstagram } from "react-icons/bs";
import { LinkIcon } from "@heroicons/react/24/solid";
// import domtoimage from 'dom-to-image-more';
import { toPng } from 'html-to-image';
import DownloadFile from "../components/DownloadFile"; 
// import { AiOutlineDownload } from "react-icons/ai";

export default function Scores() {

    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const user = useContext(UserContext)

    
const handleDownload = async (i: number) => {
  const node = cardRefs.current[i];
  if (!node) return;

  const originalStyle = node.style.cssText;

  try {
    // Ensure visibility and position are set correctly
    node.style.position = 'relative';
    node.style.left = '0';
    node.style.top = '0';
    node.style.visibility = 'visible';
    node.style.opacity = '1';

    // Render the node using html2canvas

    await toPng(node, {
      width: 1080,
      height: 1920,
    })
    .then((dataUrl: string) => { 
      console.log(dataUrl)
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `rizz-score-${Date.now()}.jpg`;
      link.click();
  });
    // const canvas = await html2canvas(node, {
    //   width: 1080,
    //   height: 1920,
    //   backgroundColor: "#fbfcff",
    //   removeContainer: true,
    // });

    // const dataUrl = canvas.toDataURL("image/jpeg", 0.95);

    // Restore original style
    node.style.cssText = originalStyle;

    // Trigger download
   
  } catch (error) {
    console.error("Download error:", error);
  }
};


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
            <div key={i} className="z-20 select-none">

                
                  <ScoreBox charmNum={test.charm} executionNum={test.execution} dateTaken={test.date} />

                  <div
                      ref={(el) => {cardRefs.current[i] = el}}
                      // REMOVED className="hidden"
                      style={{
                          position: 'absolute',
                          left: '-9999px',
                          top: '-9999px',
                          // transform  : 'scale(0)',
                          // ADDED EXPLICIT WIDTH AND HEIGHT

                      }}
                  >
                      <DownloadFile charmNum={test.charm} executionNum={test.execution} />
                  </div>

                  <div className="bg-base-100 border-primary border gap-4 mt-1 rounded-box p-2 flex flex-row items-center">
                      <p className="font-1 font-semibold">Share your score</p>
                      
                      <button className="btn btn-secondary btn-circle btn-ghost btn-sm" onClick={() => handleDownload(i)}>
                      <BsInstagram className="size-4" />
                      </button>
                       <button className="btn btn-secondary btn-circle btn-ghost btn-sm" onClick={() => handleDownload(i)}>
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