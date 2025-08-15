// import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogChain from "../components/BlogChain";


export default function Work() {
    const paragraphs = ["I'm doing this for the love of the game. If you want to help out, I'd 100% be down to work with you. I'm looking for people that want to learn how to be devs (or already are developers), social media marketers, or anyone that wants to something to support toomanyheys",
        "This project for me is just for fun, there's no money involved. I just want to work with passionate, cool people that are as dedicated as I am. If you are only interested for college apps, please don't reach out. Your role would be metrics based: improved SEO and got 5k+ more site visits per mouth; made a reel that converted 100 users. If you want to work in a chill enviroment where you will learn quickly and chase real metrics over BS, contact me.",
    "At the end of the day, I'm just trying to have fun here; I just hate the superficial 'role-hopping' that some people have",
        "Contact me via email at xdagging@gmail.com (my ult email, ik it's bad)"]
    const title="Work at toomanyheys because why not"


    return (

        <>
      <Navbar />
      
                  <BlogChain paragraphs={paragraphs} title={title} />
              
                  <Footer />
                  {/* <BlogCTA /> */}
        
        </>
    )
}