import { Routes ,BrowserRouter as Router, Route} from "react-router-dom";
import LoginPage from "./LoginPage/Login";
import SignUpDisplay from "./LoginPage/Signup";
import MainUserPage from "./HomePage/MainUserPage"
import ErrorPage from "./ErrorPage";
import { useEffect } from "react";
import axios from "axios"
function App() {
  useEffect(()=>{
    window.addEventListener("beforeunload",(e)=>{
      e.preventDefault()
      const token = localStorage.getItem('token')
      axios.post("http://localhost:3001/api/userdata/unauthenticate",{header:{"authorization":("bearer "+token)}})
    }) 
  },[])
  
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<SignUpDisplay/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/user/*" element={<MainUserPage/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
