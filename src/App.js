import IndexPage from "./components/IndexPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Tasks from "./components/Tasks";
import axios from 'axios';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "./store/userSlice";

axios.defaults.withCredentials = true;

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:4000/profile')
      .then(({ data }) => {
        if (data !== null) {
          dispatch(userActions.updateUser({
            userName: data.userName,
            email: data.email,
            id: data.id,
          }));
        };
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:subpage?" element={<Profile />} />
        <Route path="/profile/:subpage/:action" element={<Tasks />} />
      </Route>
    </Routes>
  )
};

export default App;
