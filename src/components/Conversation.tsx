import React from "react";




type ConversationProps = {
    children?: React.ReactNode
}


export default function Conversation(props: ConversationProps) {

    return (

        <>
        
        <div className="w-full grid h-fit grid-cols-1 p-4 gap-2 ">


            {props.children}





        </div>
        
        
        
        
        
        
        
        
        </>


    )






}