import { Link } from "react-router-dom"


export default function BlogCTA() {


    return (
        <>
        <div className="p-4 border flex flex-col gap-2 font-1 mt-4 rounded-box">
            <p className="text-center font-1 font-bold text-xl">Damn. You really read allat.</p>
            <p className="text-center">Well. If you want, take the test so you can see if you're really about that.</p>
            <Link to="/signup" className="btn btn-primary w-fit mx-auto mt-4">Take it yourself</Link>
        </div>
        </>
    )
}