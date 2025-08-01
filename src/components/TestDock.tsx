import type { Dispatch, SetStateAction } from "react"

type TestDockProps = {
    setCurrentQuestion: Dispatch<SetStateAction<number>>
    disableNav: boolean;
}


export default function TestDock(props: TestDockProps) {




    return (

        <>
         <div className="fixed bottom-0 left-0 h-[10vh] w-full bg-base-200  shadow-md border-t border-base-300">
                <div className="w-full font-1 flex gap-4 flex-row h-full items-center p-2">
                    <button onClick={() => {
                        props.setCurrentQuestion((prev) => {
                            if (prev===0) {
                                return 0
                            } 
                            return prev-1
 
                        })
                    }} className={`btn ${props.disableNav ? "btn-disabled" : ""} rounded-full btn-lg btn-secondary ml-auto`}>
                        <p>Go back</p>
                    </button>

                    <button onClick={() => {
                        props.setCurrentQuestion((prev) => {
                            return prev+1
 
                        })
                    }}  className={`btn  ${props.disableNav ? "btn-disabled" : ""} rounded-full btn-lg btn-secondary`}>
                        <p>Continue</p>
                    </button>

                </div>


            </div>
        
        
        </>

    )
}