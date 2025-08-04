



type MessageProps = {
    side: "left" | "right";
    message: string;
    loading?: boolean;
}



export default function Message(props: MessageProps) {


    return (
        <>

       <div className={` flex flex-row ${props.side === "left" ? "justify-start" : "justify-end"}`}>

        {props.loading ?
         <div className={` p-2 rounded-lg ${props.side==="left" ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"}`}>
<div className={`loading loading-dots`}></div>

         </div>
         :
        
        <>
             <p className={`font-1 max-w-5/6 w-fit font-semibold p-2 rounded-lg ${props.side==="left" ? "bg-primary text-primary-content" : "bg-secondary text-secondary-content"}`}>
    
     {props.message}

  </p>
        </>}

 
</div>




        </>
    )
}