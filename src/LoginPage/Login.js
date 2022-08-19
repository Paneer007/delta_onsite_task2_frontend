import {Link,useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"
const  LoginPage =()=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const loginToSite = async()=>{
        const body={
            username,password
        }
        if(!(username&&password)){
            alert("Enter a username and a password")
            return 
        }
        const resp = await axios.post("http://localhost:3001/api/login/",body)
        if(resp.status===200){
            console.log(resp.data)
            localStorage.setItem("token",resp.data.jwtToken)
            navigate("../user")
        }else{
            alert("Enter valid credentials")
        }
    }
    return(
        <div className="MainContentSignin">
            <div className="SigninHeader">
                <h2>Password Manager</h2>
                <p>Log in</p>
            </div>
            <div className="TypesOfInput">
                <div className="inputDivSignin">
                    <input className="inputContent" placeholder="username" onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="inputDivSignin">
                    <input className="inputContent" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="mainAuthButton">
                <p className="authButton" onClick={loginToSite}>Log in</p>
            </div>
            <div className="SwapDiv">
                <p>Dont have an account?<Link to="/"><span className="highLightContent">Sign up</span></Link> </p>
            </div>
        </div>
    )
}
export default LoginPage