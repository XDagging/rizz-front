import {useState, useEffect, useRef} from "react";
import { ChevronLeftIcon, PhoneIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import Conversation from "./Conversation";
import Message from "./Message"
import type { MessageType } from "../types";
// import type { Message } from "postcss";
import callApi from "../functions";
import type { Dispatch, SetStateAction } from "react";

type MessageObj = {
    messages: MessageType[]
}

type DmsProps = {
    setDmsAnswers: Dispatch<SetStateAction<MessageObj[]>>;
    setDisableNav: Dispatch<SetStateAction<boolean>>;
    questionNumber: number;
    question: {
        question: string;
        goal: string
    },
    messages: MessageObj;
    testId: string;
}

export default function DmsSection(props: DmsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [blocked, setBlocked] = useState<boolean>(false);
    const messageRef = useRef<HTMLTextAreaElement>(null);
    const [messages, setMessages] = useState<MessageType[]>([{
        message: "hi fine shyt",
        side: "left",
        loading: false,
    }])


    async function callAi() {
        return new Promise(async(resolve) => {
                await new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, Math.random()*800)
      })
      
        // Loading bubble
        setMessages((prev) => [
        ...prev,
        {
          side: "left",
          message: "",
          loading: true,
        },
      ]);
       await new Promise((resolve) => {


      

        setTimeout(() => {
            callApi("/getTest/aiResponse", "POST", {
                messages: messages,
                testId: props.testId,
                questionNumber: props.questionNumber-1
            }).then((res) => {
                if (res.code==="ok") {
                    const newMsg = JSON.parse(res.message);
                    if (newMsg.toLowerCase().includes("blocked")) {
                        setBlocked(true)
                    } else {
                        setMessages((prev) => {
                        const msgs = prev || []
                        const updated = [...msgs];
                        updated[updated.length - 1] = { message: newMsg, side: "left", loading: false };
                        return updated;
                        });
                    }
                    

                resolve("");

                } else {
                    console.log("we failed here")
                    resolve("")
                }

            })

            // const newMessage = "what is wrong with you."
          // Replace the last message (loading) with the real message
            // / call resolve
        }, Math.ceil(2000 * Math.random()));
      });

      resolve("")
        })





  


    }
    

    const [newMessage, setNewMessage] = useState("");

    const [question, setQuestion] = useState(props.question);


    useEffect(() => {

        return () => {
            setLoading(true);
            setNewMessage("");
        }
    },[])

    useEffect(() => {
        setLoading(true);
        console.log("inside the dms section", props.question)
        setQuestion(props.question);
        console.log("props.messages", props.messages);
        if (props.messages&&props.messages.messages&&props.messages.messages.length>0&&props.messages?.messages?.at(-1)?.message.includes("blocked")) {
            setBlocked(true);
        } else {
            setBlocked(false);
        }

      
        setMessages(props.messages.messages)
        setLoading(false);

        return () => {
            setLoading(true);
            // setBlocked(false);
        }
        
    }, [props.question])

    useEffect(() => {

        async function x() {
            scrollRef.current?.scroll({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });

            if (messages.at(-1)?.message.includes("blocked")) {
                setBlocked(true);
            } else {
                setBlocked(false);
            }


            props.setDisableNav(true);
            if (messages&&messages[messages.length-1].side==="right") {

                await callAi()
            } 

            props.setDmsAnswers((prev) => {
                const msgs = prev || []
                msgs[props.questionNumber-1] = {
                    messages: messages
                }
                return msgs;
            })
            console.log("already set the dms chat")
             props.setDisableNav(false);
            

            



        }

        x();
       
    },[messages])


    return (
        <>
        
                 <section className="p-4">
                <div className="grid min-h-[125vh] md:gap-0 gap-3 md:grid-cols-2 grid-cols-1 w-full max-w-full mx-auto items-start justify-items-start h-full">

                    <div className="mockup-phone md:w-fit w-full md:h-[60vh] h-[50vh]">
  <div className="mockup-phone-display w-full md:w-[390px] h-full bg-base-300 flex flex-col">
    
    {/* Header */}
    <div className='w-full p-5 bg-base-100 flex items-center border-b border-neutral'>
      <ChevronLeftIcon className='size-6' />
      <p className='font-1 text-left ml-2 font-semibold flex-1'>Ashley</p>
      <div className='flex gap-4'>
        <PhoneIcon className='size-6' />
        <VideoCameraIcon className='size-6' />
      </div>
    </div>

    {/* Scrollable conversation area */}
    <div ref={scrollRef} className="flex w-full overflow-y-auto">
      <Conversation>
        {(messages&&messages.length>0) && (
            messages?.map((message) => (
          <Message
            key={message.message}
            side={message.side}
            message={message.message}
            loading={message?.loading}
          />
        ))
        )}
      
      </Conversation>
    </div>

    {/* Input area (optional) */}
    {/* <div clas   sName="p-4"> */}
      {/* input field here */}
    {/* </div> */}

  </div>
</div>

                    
                    
                    <div className="w-full flex flex-col gap-4 font-1">
                          {(blocked) && (
                            <div className="badge badge-error font-1">
                                <p>Blocked</p>
                            </div>   
                        )}
                        <div className="flex flex-row bg-base-300 items-center font-1 gap-4 w-full">
                            <p className="p-2 bg-neutral text-neutral-content font-1 font-bold">{props.questionNumber}</p>
                            <p>DMS Situationals</p>
                        </div>

                        <p>{question.question}</p>
                      
                        <p className="font-bold">Use what you know to do the following: {question.goal}</p>

                        <div className="flex flex-col gap-2">
                            <textarea ref={messageRef} onChange={(e) => setNewMessage(e.target.value)} className="textarea w-full" placeholder="Send your message here..." />


                            {blocked ? <>
                            
                            <button className="btn btn-error w-full btn-disabled">
                                <p>You've been blocked</p>
                                
                            </button>
                            </> : <>

                            {loading ? <>
                            <button className="btn btn-primary w-full btn-disabled">
                                <p>Loading...</p>
                            </button>
                            

                            </> : <>
                                      <button className="btn btn-primary w-full" onClick={() => {
                                
                               if (messageRef.current) messageRef.current.value = "";


                               if (newMessage.length>0) {
                                setMessages((prev) => {

                                    if (!blocked) {
                                        const msgs = prev || []
                                    return [...msgs, {
                                        message: newMessage,
                                        side: 'right',
                                        loading: false,
                                    }]
                                    } else {
                                        return prev;
                                    }
                                    
                                })

                                setNewMessage("");
                               }
                                

                            }}>Send Message</button>
                            </>}
                       
                            
                            
                            </>}
                           
                        </div>



                    </div>






                </div>


            </section>

        
        
        

        </>
    )

}