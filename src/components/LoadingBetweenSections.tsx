

export default function LoadingBetweenSections() {



    return (
        <>
        <div className="w-full font-1 h-full flex flex-col md:text-left text-center justify-center gap-4 p-10 items-center">
            <p className="font-1 text-info text-2xl">This Module is Over</p>
            
            <p>All work has been saved</p>

            <p>You'll move on automatically in just a moment</p>


            <p>Do not refresh the page or leave.</p>

            <div className="loading loading-spinner loading-xl">

            </div>

        </div>

        
        
        
        </>

    )
}