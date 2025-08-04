import { useState, useEffect } from "react";
import TestNavbar from "../components/TestNavbar"
import MultipleChoice from "../components/MultipleChoice";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import TestDock from "../components/TestDock"
import DmsSection from "../components/DmsSection";
import LoadingBetweenSections from "../components/LoadingBetweenSections";
import AudioSection from "../components/AudioSection";
import type { MessageType } from "../types";
import { SiKlarna } from "react-icons/si";
import { CgSmileMouthOpen } from "react-icons/cg";

import { SiAffine } from "react-icons/si";
// import AdminNavbar from "../components/AdminNavbar";
import callApi from "../functions";

type MessageObj = {
    messages: MessageType[]
}
let interval :any ;
export default function Test() {
    // const navigation = useNavigate();
    const [loadingBetweenSections, setLoadingBetweenSections] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);
    const [currentState, setCurrentState] = useState("mcq");
    const [testNavTitle, setTestNavTitle] = useState("Multiple Choice Portion")

    const [outOfTests, setOutOfTests] = useState(false);

    const [disableNav, setDisableNav] = useState(false);
    const [timer, setTimer] = useState(60*15*1000)
    const [mcqAnswers, setMcqAnswers] = useState(Array(20).fill(""))
    const [dmsAnswers, setDmsAnswers] = useState<MessageObj | any[any]>(Array(3).fill([]))
    const [liveAnswers, setLiveAnswers] = useState<MessageType[]>([])

    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [test, setTest] = useState({
        uuid: "",
        fullTest: {
            mcqQuestions: [
    {
        question: "What to do when a girl wants your number?",
        optionA: "how you doin fine shit",
        optionB: "wyll queen!",
        optionC: "heyy",
        optionD: "hi!"
    },
    {
        question: "How do you start a convo after she accepts your follow request?",
        optionA: "wyd 😭",
        optionB: "I was waiting for this moment",
        optionC: "hey lol",
        optionD: "hru"
    },
    {
        question: "She posts a mirror pic — what's your move?",
        optionA: "like and scroll",
        optionB: "🔥🔥🔥",
        optionC: "you broke my screen",
        optionD: "ur so pretty"
    },
    {
        question: "She says she's bored — you say:",
        optionA: "same tbh",
        optionB: "let's change that 😉",
        optionC: "lol watch Netflix",
        optionD: "idk go outside"
    },
    {
        question: "She sends a selfie — how do you respond?",
        optionA: "cute",
        optionB: "nah this illegal 😳",
        optionC: "new pfp?",
        optionD: "you fine asl"
    },
    {
        question: "You see her at a party — what's your opening line?",
        optionA: "you look familiar",
        optionB: "wassup shawty",
        optionC: "what's a girl like you doing here alone?",
        optionD: "yo"
    },
    {
        question: "She double texts — what's your reaction?",
        optionA: "desperate much?",
        optionB: "you must really miss me",
        optionC: "sorry I was busy 😭",
        optionD: "u good?"
    },
    {
        question: "Best response to 'wyd' at 11PM?",
        optionA: "just chillin",
        optionB: "thinking about you",
        optionC: "nothing really",
        optionD: "bout to sleep"
    },
    {
        question: "She says 'you're funny' — you:",
        optionA: "nah you just cute",
        optionB: "thanks lol",
        optionC: "I try",
        optionD: "you too"
    },
    {
        question: "You get left on read — next move?",
        optionA: "double text",
        optionB: "ghost her too",
        optionC: "reply with a meme",
        optionD: "wait it out like a king"
    },
    {
        question: "She says she's not really into dating — you:",
        optionA: "me neither, I'm into connections",
        optionB: "oh okay 😭",
        optionC: "you missing out fr",
        optionD: "cool cool"
    },
    {
        question: "You finally get her snap — what do you send first?",
        optionA: "dry streak pic",
        optionB: "mirror selfie",
        optionC: "funny video with caption",
        optionD: "just a blank screen"
    },
    {
        question: "She says she's had a rough day — you:",
        optionA: "that sucks",
        optionB: "want to talk about it?",
        optionC: "pull up, we'll fix it",
        optionD: "same here"
    },
    {
        question: "What's the smoothest compliment?",
        optionA: "you're actually really pretty",
        optionB: "you got that energy fr",
        optionC: "not gonna lie I'd risk it all",
        optionD: "you look nice today"
    },
    {
        question: "She says 'I'm not like other girls' — you say:",
        optionA: "yeah, you realer",
        optionB: "prove it",
        optionC: "every girl says that",
        optionD: "I believe you"
    },
    {
        question: "How do you flirt without being cringe?",
        optionA: "Memes + confidence",
        optionB: "Say she's hot 24/7",
        optionC: "Ignore her til she chases",
        optionD: "Compliment her once and dip"
    },
    {
        question: "She's talking about astrology — you:",
        optionA: "that's dumb",
        optionB: "so I'm your type then?",
        optionC: "I'm a Capricorn lol",
        optionD: "I don't believe in that"
    },
    {
        question: "Best response to 'you're cute'?",
        optionA: "so are you",
        optionB: "ik",
        optionC: "thanks 😳",
        optionD: "nah you"
    },
    {
        question: "What's real rizz?",
        optionA: "knowing when to leave her on read",
        optionB: "being yourself + being smooth",
        optionC: "copy-paste lines from TikTok",
        optionD: "texting 24/7"
    },
    {
        question: "What do you text after a good first date?",
        optionA: "we should do that again sometime",
        optionB: "u home safe?",
        optionC: "😏",
        optionD: "had fun"
    }
],
slideIntoDmsQuestions: [{
    question: "This girl is in your math class and she's lowk annoying. She's kinda hot but it's not worth allat.",
    goal: "Lead this girl on"
},{
    question: "This girl is in your scicen class and she's lowk annoying. She's kinda hot but it's not worth allat.",
    goal: "Lead this girl on"
},],realTimeLiveQuestion: {
    goal: "Establish a connection and keep her engaged.",
    question: "You're at a social gathering, and you want to approach her. How do you start the conversation?"

}

        }

        



    })


      useEffect(() => {
        
        interval = setInterval(() => {
            


            setTimer((prevTimer) => {
                return prevTimer-1000
            })

            if (timer<=0) {
                submitTest();
                clearInterval(interval);
            }

        },1000)



    },[])



    const submitTest = () => {
        return new Promise(async(resolve) => {


            callApi("/getTest/submitTest", "POST", {
                testId: test.uuid,
                mcqAnswers: mcqAnswers,
                dmsAnswers: dmsAnswers,
                liveAnswers: liveAnswers,
            }).then((res) => {
                if (res.code === "err") {
                    console.log("smth happened", res)
                } else if (res.code ==="ok") {
                  
                } else {
                    console.log("somehow it got to the else", res)
                }
                resolve("");
            })
        })
       



    }
    useEffect(() => {
        async function x() {
            if (currentQuestion>=test.fullTest.mcqQuestions.length&&currentState==="mcq") {
                console.log("this was triggered", currentQuestion)
                setLoadingBetweenSections(true);

                setTimeout(() => {
                    setLoadingBetweenSections(false);
                },6000)
                setCurrentState("dms")
                setTestNavTitle("Direct Message (DM) Situationals")
                setCurrentQuestion(0);
            
            } else if (currentQuestion>=test.fullTest.slideIntoDmsQuestions.length&&currentState==="dms") {
            setLoadingBetweenSections(true);
            setTimeout(() => {
                setLoadingBetweenSections(false);
            },6000)

            setCurrentState("live");
            setTestNavTitle("Live on-to-one");
            setCurrentQuestion(0);
        } 
        else if (currentQuestion>=1&&currentState==="live") {
            setLoadingBetweenSections(true);
            console.log("started to finish")
            await submitTest();
            console.log("finisheddd")
            setCurrentQuestion(0);
            console.log("we set current state to finsihed")
            setCurrentState("finished");
            await new Promise(async(resolve) => await setTimeout(() => {
                setLoadingBetweenSections(false);
                resolve
            },6000))

           

        }
        }
        x();
    },[currentQuestion])



    useEffect(() => {
        setLoading(true);
        callApi("/getTest", "GET").then((res) => {
            if (res.code === "ok") {
                const parsed = JSON.parse(res.message);
                console.log(parsed);
                setTest({fullTest: parsed.test.fullTest, uuid: parsed.uuid})
                setLoading(false);
            } else if (res.message.includes("out of available tests")) {

                
                setLoading(false);
                setOutOfTests(true);

                // something went wrong;
            } else {
                console.log(res)
                // navigation("/dashboard")
            }
        })




    },[])


    // First portion: MCQ

    // Second portion: Sliding into dms

    // Third portion: Talking to girls (live)


    return (

        <>

        

        {loading||!test.fullTest ? <>
            
            <div>
                {/* <p>{JSON.stringify(test)}</p>
                <p>{JSON.stringify(test.fullTest)}</p> */}
                <p>Loading...</p>
            </div>
        
        
        
        </> : <>

        {outOfTests ? <>
        
        <div className="flex flex-row h-full min-h-screen w-full">
            {/* <AdminNavbar /> */}
            <div className="w-full bg-base-200 p-10 min-h-screen flex h-full flex-col gap-2">
                <p className="font-1 text-4xl font-bold">Taking too many tests bud.</p>
                <p className="font-1 font-semibold text-lg">Just like the real SAT, you're <span className="italic">limited* </span>on how many times you can take this</p>


                <div className="font-1">
                    <p>Unlike <span className="font-bold font-1 italic">CollegeBoard</span>, we are a free, no revenue site. We are broke.</p>
                </div>

                <div className="mt-4 font-1">
                    <p className="font-bold">Pay Collegeboard</p>
                    <p className="font-bold text-2xl">$392.69</p>

                </div>

                <div className="flex mt-3  font-1 w-full flex-row justify-between items-center gap-1">
                    <div>
                        <p className="font-semibold text-lg">Extra True SAT</p>
                        <div className="flex flex-row items-center">
                        <p>Qty</p>
                        <select className="select select-ghost w-fit" value={1}>
                            <option value={1}>1</option>
                        </select>

                        </div>
                        

                    </div>
                   
                    <p className="font-bold">$0.00</p>

                </div>


                <div className="flex mt-3  font-1 w-full flex-row justify-between items-center gap-1">
                    <div>
                        <p className="font-semibold text-lg">"Because a nonprofit should be charging $60<br/> to grade an mcq"</p>
                        <div className="flex flex-row items-center">
                        <p>Qty</p>
                        <select className="select select-ghost w-fit" value={1}>
                            <option value={1}>1</option>
                        </select>

                        </div>
                        

                    </div>
                   
                    <p className="font-bold">$392.69</p>

                </div>



            </div>

            <div className="w-full h-full p-10 min-h-screen shadow-md">

                <div className="border font-1 border-base-300 p-4 rounded-box flex h-full flex-col gap-2">
                    <div className=" ">
                        <button className="btn btn-primary w-full btn-lg font-1">
                            <SiKlarna className="size-4" />
                            <p className="font-bold">Pay with Klarna</p>

                        </button>
                        
                    
                       

                    </div>
                     <button className="btn w-full btn-lg font-1">
                            <SiAffine />
                            <p className="font-bold">Pay with Affirm</p>

                        </button>
                            <div className="divider">
                            <p>or pay with card</p>
                        </div>

                    <p className="font-1 font-bold">Shipping Information</p>

                    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="text" className="input w-full" placeholder="Email:" />
  {/* <p className="label">You can edit page title later on from settings</p> */}
</fieldset>


                    <fieldset className="fieldset">
  <legend className="fieldset-legend">Payment Details</legend>
  <div className="join join-vertical">
            <input type="text" className="input w-full join-item" placeholder="1234 1234 1234 1234" />
            <input type="text" className="input w-full join-item" placeholder="MM / YY" />
            <input type="text" className="input w-full join-item" placeholder="CVC" />
  </div>
 
  {/* <p className="label">You can edit page title later on from settings</p> */}
</fieldset>

            <button className="btn w-full btn-success">
                Pay Now
            </button>
                   
                </div>
              

            </div>

            {/* <p>Out of Tests</p> */}
        </div>
       
        
        
        </> :
        
        
        
        
        
        
        <>
        


        
         {hasStarted ? <>
            {(currentState!=="finished") && (
                <TestNavbar timer={timer} slideName={testNavTitle}  /> 
            )}
   
            {(currentState==="mcq"&&test&&!loadingBetweenSections) && (
                <>
                     
            {console.log(currentQuestion)}

            {/* This is the mcq portion */}
            {console.log("this is test", test)}
           
                <MultipleChoice question={test.fullTest.mcqQuestions[currentQuestion]} questionNumber={currentQuestion+1} answerSaved={mcqAnswers[currentQuestion]} setMcqAnswers={setMcqAnswers} />
                <TestDock disableNav={disableNav} setCurrentQuestion={setCurrentQuestion} />
       


                </>

            )}


            {(loadingBetweenSections) && (
                <LoadingBetweenSections />
            )}

            {(currentState==="dms"&&test&&!loadingBetweenSections&&currentQuestion<test.fullTest.slideIntoDmsQuestions.length) && (
                <>
                    
                    {console.log(test?.fullTest.slideIntoDmsQuestions[currentQuestion])}
                    <DmsSection setDisableNav={setDisableNav} setDmsAnswers={setDmsAnswers} messages={dmsAnswers[currentQuestion]} testId={test.uuid} question={test.fullTest.slideIntoDmsQuestions[currentQuestion]} questionNumber={currentQuestion+1}/>
                    <TestDock disableNav={disableNav}  setCurrentQuestion={setCurrentQuestion} />
                </>


            )}



            {(currentState==="live"&&test&&!loadingBetweenSections) && (
                <>
                    <AudioSection testId={test.uuid} setLiveAnswers={setLiveAnswers}  question={test.fullTest.realTimeLiveQuestion} questionNumber={currentQuestion} />




                    <TestDock disableNav={disableNav}  setCurrentQuestion={setCurrentQuestion} />
                
                
                </>

            )}
       

            {(currentState==="finished"&&test&&!loadingBetweenSections) && (
                <div className="w-full font-1 min-h-screen">
                    <div className="md:p-10 p-4 text-center items-center justify-center flex flex-col gap-4">
                        <p className="md:text-4xl text-3xl font-1">Congratulations!</p>
                        <p className="font-1 text-lg">The test is complete, and your answers have been submitted.</p>

                        <div className="bg-base-200 grid md:grid-cols-2 grid-cols-1 p-10  md:w-3/6  items-center gap-4 text-left rounded-box">
                            <div className="mx-auto">
                            <CgSmileMouthOpen className="size-40" />
                            </div>

                     

                            <div className="flex flex-col items-center gap-10 md:text-left text-center">
                                <p className="font-1"> <span className="font-bold">You can dismiss yourself whenever you want.</span> I'm not watching
</p>
                             
                             <p><span className="font-bold">Please be quiet;</span> other students might be taking the test with you for some reason.</p>
                            </div>

                        </div>


                        <div>
                            <Link to="/dashboard" className="btn-primary btn rounded-full">Return to homepage</Link>
                        </div>
                    </div>  

                </div>
            )}
       
           
        
        </> :

        <>  

        <div className="w-full relative bg-base-200 mx-auto items-center justify-center flex flex-row h-full min-h-screen p-2">

            <div className="w-full">
                <h1 className="font-1 text-5xl text-center mb-4">Good Luck!</h1>


                <div className="md:w-2/6 mx-auto gap-8 font-1 bg-base-100 rounded-box shadow-md flex flex-col items-center justify-center p-3">
                    <div className="grid grid-cols-5 items-start justify-items-end gap-4">
                        <MagnifyingGlassCircleIcon className="size-12" />
                        <div className="col-span-4 w-full">
                            <div className="flex flex-col gap-3 text-left">                         
                                <p className="font-1 md:text-3xl text-2xl font-bold text-left">Use Context Clues</p>

                                <p className="text-left md:text-lg">Try your best. You probably won't know the answer to every question (and that's okay).</p>


                            </div>
                           </div>
                        

                    </div>



                      <div className="grid grid-cols-5 items-start justify-items-end gap-4">
                        <MagnifyingGlassCircleIcon className="size-12" />
                        <div className="col-span-4 w-full">
                            <div className="flex flex-col gap-3 text-left">                         
                                <p className="font-1 md:text-3xl text-2xl font-bold text-left">Try your best</p>

                                <p className="text-left md:text-lg">Let's be real. You probably have <span className="font-bold">zero game</span> but it's okay, these questions will make you better.</p>


                            </div>
                           </div>
                        

                    </div>







   <div className="grid grid-cols-5 items-start justify-items-end gap-4">
                        <MagnifyingGlassCircleIcon className="size-12" />
                        <div className="col-span-4 w-full">
                            <div className="flex flex-col gap-3 text-left">                         
                                <p className="font-1 md:text-3xl text-2xl font-bold text-left">Have fun</p>

                                <p className="text-left md:text-lg">You're taking an SAT for your game. Have fun (that's all that matters :))</p>


                            </div>
                           </div>
                        

                    </div>



                 
                </div>
            </div>


            <div className="fixed bottom-0 left-0 h-[10vh] w-full bg-base-200  shadow-md border-t border-base-300">
                <div className="w-full font-1 flex gap-4 flex-row h-full items-center p-2">
                    <Link to="/dashboard" className="btn rounded-full btn-lg btn-secondary ml-auto">
                        <p>Go back</p>
                    </Link>

                    <button onClick={() => {
                        console.log("this happened chat")
                        setHasStarted(true)
                    }} className="btn rounded-full btn-lg btn-secondary">
                        <p>Continue</p>
                    </button>

                </div>


            </div>

        </div>


        



        </>}
        
        
        
        </>}
        

        
        
        </>}
   

       

        

        
        </>
    )









}