import { useState, useEffect } from "react"
import type { Dispatch, SetStateAction } from "react"




type MultipleProps = {
    question: {
        question: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
    },
    questionNumber: number;
    setMcqAnswers: Dispatch<SetStateAction<string[]>>
}

export default function MultipleChoice(props: MultipleProps) {

    const [optionClicked, setOptionClicked] = useState<string>("");
    const [currQuestion, setCurrQuestion] = useState(props.question)

    useEffect(() => {

        if (optionClicked!=="") {
            props.setMcqAnswers((prev) => {
                prev[props.questionNumber-1] = optionClicked; 
                return prev;
            })


        }

    
    },[optionClicked])

    useEffect(() => {
        setCurrQuestion(props.question);
        setOptionClicked("")

    },[props.question])


    
   

    return (
        <>


            <section className="p-4">
                <div className="grid grid-cols-1 w-3/6 mx-auto items-center justify-items-start h-full">

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex flex-row bg-base-300 items-center font-1 gap-4 w-full">
                            <p className="p-2 bg-neutral text-neutral-content font-1 font-bold">{props.questionNumber}</p>
                            <p>Multiple Choice Question</p>
                        </div>


                        <div>
                            <p className="font-1 font-semibold">{currQuestion.question}</p>
                        </div>

                        <div onClick={() => setOptionClicked("a")} className={`border ${optionClicked==="a" ? "border-info border-2" : ""} hover:bg-base-300 cursor-pointer p-4 rounded-box flex flex-row gap-4 select-none items-center`}>
                            <p className={`w-6 h-6  ${optionClicked==="a" ? "bg-info" : ""}   rounded-full font-1 border border-neutral text-base-content text-center`}>A</p>
                            
                            <p className="font-1">{currQuestion.optionA}</p>

                        </div>

                        <div onClick={() => setOptionClicked("b")} className={`border ${optionClicked==="b" ? "border-info border-2" : ""} hover:bg-base-300 cursor-pointer p-4 rounded-box flex flex-row gap-4 select-none items-center`}>
                            <p className={`w-6 h-6  ${optionClicked==="b" ? "bg-info" : ""}   rounded-full font-1 border border-neutral text-base-content text-center`}>B</p>
                            
                            <p className="font-1">{currQuestion.optionB}</p>

                        </div>


 <div onClick={() => setOptionClicked("c")} className={`border ${optionClicked==="c" ? "border-info border-2" : ""} hover:bg-base-300 cursor-pointer p-4 rounded-box flex flex-row gap-4 select-none items-center`}>
                            <p className={`w-6 h-6  ${optionClicked==="c" ? "bg-info" : ""}   rounded-full font-1 border border-neutral text-base-content text-center`}>C</p>
                            
                            <p className="font-1">{currQuestion.optionC}</p>

                        </div>

 <div onClick={() => setOptionClicked("d")} className={`border ${optionClicked==="d" ? "border-info border-2" : ""} hover:bg-base-300 cursor-pointer p-4 rounded-box flex flex-row gap-4 select-none items-center`}>
                            <p className={`w-6 h-6  ${optionClicked==="d" ? "bg-info" : ""}   rounded-full font-1 border border-neutral text-base-content text-center`}>D</p>
                        
                            <p className="font-1">{currQuestion.optionD}</p>

                        </div>





                    </div>






                </div>


            </section>





        
        </>
    )



}