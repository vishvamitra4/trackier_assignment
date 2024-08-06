import todoGif from "./images/MR.gif";

function IndexPage() {
    return (
        <>
            <div className="flex flex-row justify-around w-4/5 mx-auto my-5">
                <h1 className="text-9xl font-extrabold">
                    <span className="text-red-500">Project</span><br />
                    <span className=" -z-10 top-[230px]" id="manager">Manager</span>
                </h1>
                <img src={todoGif} className="w-1/2" alt="Todo GIF" />
            </div>
            <p className="text-center">Created By @Vishvamitra</p>
        </>
    );
}

export default IndexPage;
