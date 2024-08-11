import './Header.css';
import CheckListGif from "./images/Checklist.gif";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";

const Navbar = () => {

    const userName = useSelector((state) => state.user.userName);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link style={{ "display": "flex" }} to="/"><img style={{ "width": "23px", "display": "block", "marginRight": "3px" }} src={CheckListGif} />ProjectManager</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/profile">{userName !== "" ? userName : ""}</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
