import "./Form.css";
import { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import { userActions } from "../store/userSlice";
import { Navigate } from "react-router-dom";

function Login() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [redirect , setRedirect] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const {data} = await axios.post("http://localhost:4000/login" , {email , password});
            dispatch(userActions.updateUser({
                userName : data.userName,
                email : data.email,
                id : data.id
            }));
            setRedirect(true);
            alert("login successfull!");

        }catch(e){
            alert("login failed!");
        }
        
    };

    if(redirect){
        return <Navigate to={'/'} />
    }



    return (
        <div>
            <h1 className="font-bold text-5xl my-2 text-rgb(25 44 69) text-center">Login Yourself</h1>
            <form className="input" onSubmit={handleLogin}>
                <label for="email-input">Enter Email</label>
                <input
                    id="email-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@gmail.com"
                />
                <label for="password-input">Enter Password</label>
                <input
                    id="password-input"
                    type="text"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="XXXXX"
                />

                <button className="p-3 text-white border-none bg-slate-700 rounded-sm" type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Login;