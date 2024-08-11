import "./Form.css";
import { useState } from "react";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");

    // handle registration.....
    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:4000/register", {
            method: 'POST',
            body: JSON.stringify({ email, userName: name, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (res.status === 200) {
            alert("Registration Successfull");
        } else {
            alert("Registration Failed.");
        };
    };



    return (
        <div>
            <h1 className="font-bold text-5xl my-2 text-rgb(25 44 69) text-center">Register Yourself</h1>
            <form className="input" onSubmit={handleRegister}>
                <label for="name-input">Enter Name</label>
                <input
                    id="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Dae"
                />
                <label for="email-input">Enter Email</label>
                <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@gmail.com"
                />
                <label for="password-input">Enter Password</label>
                <input
                    id="password-input"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="XXXXX"
                />

                <button className="p-3 text-white border-none bg-slate-700 rounded-sm" type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Register;