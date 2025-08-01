import { useState, useEffect } from 'react'

import Message from './components/Message'
import imgOne from "./assets/testimonyOne.webp"
import imgTwo from "./assets/testimonyTwo.webp"
import imgThree from "./assets/testimonyThree.webp"
import './index.css'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { PhoneIcon, VideoCameraIcon } from '@heroicons/react/24/outline';
import Conversation from './components/Conversation';
import type { MessageType } from './types';
import { Link } from 'react-router-dom'
import Footer from "./components/Footer"
// import Navbar from './components/Navbar'
let interval;
function App() {
  // const [count, setCount] = useState(0)

  const [messages, setMessages] = useState<MessageType[]>([])

  const fullConvo : MessageType[] = [
    {
      side: "right",
      message: "salutations"
    },
    {
      side: "left",
      message: "hello?"
    }, {
      side: "right",
      message: "could i partake your in your life"
    },
    {
      side: "left",
      message: "eww. blocked"
    },
     {
      side: "left",
      message: "you're so weird"
    },
     {
      side: "left",
      message: "get a grip🙄🙄🙄"
    }
  ]
useEffect(() => {
  async function x() {
    console.log("We inside the x function");

    for (let i = 0; i < fullConvo.length; i++) {
      const message = fullConvo[i];

      // Add loading bubble
    
      setMessages((prev) => [
        ...prev,
        {
          side: message.side === "right" ? "right" : "left",
          message: "",
          loading: true,
        },
      ]);
     

      await new Promise((resolve) => {
        setTimeout(() => {
          // Replace the last message (loading) with the real message
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { ...message, loading: false };
            return updated;
          });

          resolve(""); // call resolve
        }, Math.ceil(2000 * Math.random()));
      });
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve("");
        }, 400)
      })
    }
  }

  x();

  return () => {};
}, []);

  return (
    <>

      {/* <Navbar /> */}
      <div className='hero overflow-hidden  max-h-screen'>
        <div className='hero-content'>
          <div className='grid grid-cols-2 items-center justify-center justify-items-center w-fit h-full mx-auto'>
            
            <div className='flex flex-col gap-4 w-fit'>
              <h1 className='text-7xl font-bold font-1 w-full'>the SAT that tests your game.</h1>
              <Link to="/signup" className='btn btn-accent w-fit btn-lg font-1 font-bold btn-outline'>Take test</Link>

              <div className='mt-8 mx-auto flex flex-row items-center gap-2'>
                <div className="avatar-group -space-x-6">
  <div className="avatar">
    <div className="w-12">
      <img src={imgOne} />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src={imgTwo} />
    </div>
  </div>
  <div className="avatar">
    <div className="w-12">
      <img src={imgThree} />
    </div>
  </div>
  <div className="avatar avatar-placeholder">
    <div className="w-12 bg-neutral text-neutral-content">
      <p className='font-1'>+99</p>
    </div>
  </div>
</div>
                <p className='font-1 font-bold'>Over 200+ happy test takers</p>


              </div>
            </div>
            



                 <div className="mockup-phone w-fit h-full scale-85">
  {/* <div className="mockup-phone-camera"></div> */}
  <div className="mockup-phone-display bg-base-300 ">
    <div className='w-full p-5 bg-base-100 flex flex-row items-center border-b border-neutral'>
      <ChevronLeftIcon className='size-6' />
<p className='font-1 text-left ml-2 font-semibold flex-1'>Ashley</p>

<div className='flex-0 flex flex-row gap-4'>
    <PhoneIcon className='size-6' />
    <VideoCameraIcon className='size-6' />

</div>
    </div>


    <div>
    

    <Conversation>


      
     {messages.map((message, i) => (
        <Message key={message.message} side={message.side} message={message.message} loading={message?.loading} />
     ))}


    </Conversation>
    </div>
    
    <div>



    </div>

  </div>
  {/* <div className="mockup-phone-display text-white grid place-content-center">It's Glowtime.</div> */}
</div>

         
       
          </div>


          
        
        </div>
        








      </div>
        

      <div className='bg-base-300 p-5'>
            <div className='flex flex-row gap-2  mt-4'>
      <div className="mockup-window border-b bg-base-100 border-base-300 w-3/6 h-full">
<div className='w-full min-h-80 p-2'>
    <div className='font-1 rounded-box bg-base-100 p-3'>
      <div className='w-full pb-4 flex flex-row items-center gap-4 border-b'>
      <div className='flex flex-row items-end gap-2'>
        <div>
           <p className='font-semibold'>TOTAL SCORE</p>
      <p className='text-5xl font-bold'>1380</p>
        </div>
        <p className='text-sm'>400-1600</p>

      </div>
      

      <div className='ml-auto flex flex-row gap-8 w-4/6'>
         <div className=''>
      <p className='font-semibold font-1'>Charm</p>
      <p className='font-bold text-2xl'>760</p>

      </div>
      <div className=''>
        <p className='font-semibold'>Execution</p>
        <p className='font-bold text-2xl'>620</p>
      </div>

      </div>
     

      </div>
      <p className='mt-2 border-b pb-4'>You <span className='font-semibold'>meet or exceed</span> our college and career readiness benchmarks in Charm and Execution!</p>
     

     <div className='my-4'>
        <p className='font-semibold'>Your state</p>
        <p className='font-semibold text-2xl'>85th Percentile</p>
        <p className='text-sm'>85% of students scored the same as or below you</p>

     </div>

     
     

    </div>
</div>

  {/* <div className="grid place-content-center border-t border-base-300 h-80">Hello!</div> */}
</div>

<div>
  <p className='font-1 text-3xl ml-2 font-bold text-left'>20 Minutes. Three Sections. Instant Scores </p>

</div>

     </div>




      </div>


     <Footer />
      
    </>
  )
}

export default App;
