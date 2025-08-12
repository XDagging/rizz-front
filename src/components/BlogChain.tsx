import React from "react";
import type { BlogProps } from "../types";
import BlogCTA from "./BlogCTA";

export default function BlogChain(props: BlogProps) {








    return (
        <>
        
        <div className="sm:w-4/6 my-5 min-h-screen flex flex-col gap-2  mx-auto p-3 font-1 text-lg ">
            

            <section className="p-4 border-b">
                <p className="text-3xl font-bold">{props.title}</p>
                <p className="text-base">{new Date(Date.now()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}</p>

            </section>

            <section className="flex flex-col my-4 gap-4">

   {props.paragraphs.map((para, i) => (

                <div key={i} className="font-1 w-full">
               
                  <div className="">
                            <p className="font-bold inline text-xl italic pl-8">{para.split(" ")[0]} </p>
                        <p className="inline font-1 text-lg">{para.split(" ").map((_,i) => {
                            if (i!==0) {
                                return _
                            }
                        }).join(" ")}</p>

                    </div>
                    
                
                </div>
             



            ))}
            </section>

            <BlogCTA />
         



        </div>



        
        </>

    )

}