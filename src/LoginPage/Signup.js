import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
const SignUpDisplay =()=>{
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigator = useNavigate()
    const submitSignin =async (e)=>{
        const body={
            username,password
        }
        if(!(username&&password)){
            alert("Enter a username and a password")
            return 
        }
        const resp = await axios.post("http://localhost:3001/api/signup/",body)
        console.log(resp)
        if(resp.status==200){
            navigator('/login')
        }
    }
    return(
        <div className="MainContentSignin">
            <div className="SigninHeader">
                <h2>Password Manager</h2>
                <p>Sign up</p>
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
                <p className="authButton" onClick={submitSignin}>Sign up</p>
            </div>
            <div className="SwapDiv">
                <p>Have an account?<Link to="/login"><span className="highLightContent">Log in</span></Link> </p>
            </div>
        </div>

    )
}
export default SignUpDisplay