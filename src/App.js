import {Routes,Route} from "react-router-dom"

import './App.css';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<SignUp/>}/>
        <Route exact path="/profile" element={<Profile/>}/>
      </Routes>
    </div>
  );
}

export default App;
