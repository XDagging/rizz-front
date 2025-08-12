import BlogChain from "../components/BlogChain"
import Navbar from "../components/Navbar";
// import BlogCTA from "../components/BlogCTA";
import Footer from "../components/Footer"


export default function Mission() {
    const paragraphs = ["I made this because why not? Nowadays, schools be testing anything, why not test the most primitive of instincts? ", 
        "Humans are adaptive creatures; life 200 years ago is very different than modern day life. The modern age has given an influx of opportunity for anyone, regardless of credentials. People previously only valued credentials, but now people don't care about credentials but rather about what you've done: colleges have went from an academic review to a hollistic one; job interviews look past just your degrees. Yet, although society favors impact and creation, we still have the repudiating tests that act as gatekeepers: SAT, ACT, APs. Do I think tests are wrong? Of course not. What I do think is wrong, however, is giving them significant weight on life-altering decisions. ",
    "toomanyheys acts as another test, no better than all the ones you are probably used to (and have studied for). You'll probably take the test and think 'I don't think that accurately reflects me' and you'd be right. It's a standardized test for something that really can't be standardized: everyone has different approaches and styles, what makes one better than the other if they both get the job done?",
"Let this site be a testimate that testing should stay in it's place: use it for research, small* comparisons of people, not life-altering, path-orienting decisions. Our world need more silly, anyway. I hope you enjoy your time taking toomanyheys and have as much fun as I did building it.",
"- Sebastian Hernandez-Tavares, creator of toomanyheys"];
    const title = "Why does this exist?"; 




    return (
        <>
            <Navbar />

            <BlogChain paragraphs={paragraphs} title={title} />
        
            <Footer />
            {/* <BlogCTA /> */}
        
        </>

    )


}