import IndexPage from "./components/IndexPage";
import {Routes , Route} from "react-router-dom";
import Layout from "./Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Tasks from "./components/Tasks";

function App()
{

  return(
    <Routes>
      <Route path="/" element = {<Layout />}>
      <Route index element = {<IndexPage />} />
      <Route path="/register" element = {<Register />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/profile" element = {<Profile />} />
      <Route path="/profile/:subpage?" element = {<Profile />} />
      <Route path="/profile/:subpage/:action" element = {<Tasks />} />
      </Route>
    </Routes>
  )
};

export default App;
