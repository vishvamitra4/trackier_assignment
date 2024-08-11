import { Link, Navigate, useParams } from "react-router-dom";
import Projects from "./Projects";
import Taskboard from "./Taskboard";
import axios from "axios";
import { useState } from "react";
import {useDispatch} from "react-redux"
import { userActions } from "../store/userSlice";

function Profile() {
    const dispatch = useDispatch();
    const [redirect , setRedirect] = useState(false);

    let { subpage } = useParams();
    if (subpage == undefined) {
        subpage = "projects";
    }

    function linkClass(type) {
        let D = "inline-flex gap-1 py-2 px-6 rounded-full";
        if (type === subpage) {
            D += " bg-red-500 text-white";
        } else {
            D += " bg-gray-200"
        }

        return D;
    };


    const handleLogout = async ()=>{
        await axios.post("http://localhost:4000/logout");
        setRedirect(true);
    };

    if(redirect){
        dispatch(userActions.updateUser({userName : "" , email : "" , id : ""}));
        return <Navigate to={"/"} />
    };

    return (
        <div>
            <nav className="w-full flex mt-8 mb-8 gap-2 justify-center">
                <Link className={linkClass("projects")} to={'/profile/projects'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                    Projects
                </Link>
                <Link className={linkClass("tasks")} to={'/profile/tasks'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
                    Taskboard
                </Link>
            </nav>
            <div className="w-full flex justify-center items-center">
            <button onClick={handleLogout} className="w-[400px] py-2 mb-5 px-6 rounded-full bg-red-500 text-white">Logout</button>
            </div>
            
            {subpage === "projects" && <Projects />}
            {subpage === "tasks" && <Taskboard />}
        </div>
    )
};

export default Profile;