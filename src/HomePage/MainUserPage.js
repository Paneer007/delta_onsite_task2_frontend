import {Link,useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
const ShowUserAccount=({data,setUserData,setBuffer})=>{
    const [pass,setPass] = useState(false)
    const [editMode,setEditMode] = useState(false)
    const [deleteMode,setDeleteMode]=useState(false)
    const [email,setEmail]= useState(data.email)
    const [username,setUsername]= useState(data.username)
    const [upass,setUPass] = useState(data.password)
    const [confirmPass,setConfirmPass]=useState('')
    const navigate=useNavigate()
    console.log(data)
    const sendUpdateDetails=async()=>{
        const token = window.localStorage.getItem('token')
        if(!token){
            navigate('../error')
        }
        if(upass&&(email||username)){
            const body = { email:email,username:username,password:upass,id:data._id,userpass:confirmPass} 
            const resp = await axios.patch("http://localhost:3001/api/platform/update",body,{"headers":{"authorization":("bearer "+token)}})
            if(resp.status==200){
            const userResp = await axios.get("http://localhost:3001/api/userdata",{"headers":{"authorization":("bearer "+token)}})
            setBuffer(true)
            if(resp.status===400){
                navigate("../error")
            }
            setEditMode(false)
            setUserData(userResp.data)
            setBuffer(false)
            setConfirmPass('')
        }
        }else{
            alert("error, enter valid credentials")
            return
        }
    }
    const sendDeleteDetails=async()=>{
        const token = window.localStorage.getItem('token')
        setConfirmPass('')
        if(!token){
            navigate('../error')
        }
        const resp = await axios.delete(`http://localhost:3001/api/platform/delete/${data._id}`,{"headers":{"authorization":('bearer '+token)},data:{data:confirmPass}})
        setDeleteMode(false)
        if(resp.status===200){
            setBuffer(true)
            const userResp = await axios.get("http://localhost:3001/api/userdata",{"headers":{"authorization":("bearer "+token)}})
            if(resp.status===400){
                navigate("../error")
            }
            setUserData(userResp.data)
            setBuffer(false)        
        }
    }
    if(deleteMode){
        return(
            <div className="displayCard">
                <div className="confirmContent">
                    <p className="EnterStuff">Enter Login pass</p>
                    <input className="inputStuff" value={confirmPass||''} onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                </div>
                <div className="ButtonListForStuff">
                    <p className="SubmitButton" onClick={sendDeleteDetails}>Submit</p>
                    <p className="CancelButton" onClick={()=>setDeleteMode(false)}>Cancel</p>
                </div>
            </div>
        )
    }
    if(editMode){
        return(
                <div className="displayCard">
                    <div className="confirmContent">
                        <p className="EnterStuff">Email</p>
                        <input className="inputStuff" value={email||''} onChange={(e)=>{setEmail(e.target.value);console.log(e.target.value)}}/>
                    </div>
                    <div className="confirmContent">
                        <p className="EnterStuff">Username</p>
                        <input className="inputStuff" value={username||''} onChange={(e)=>{setUsername(e.target.value);console.log(e.target.value)}}/>
                    </div>
                    <div className="confirmContent">
                        <p className="EnterStuff">Update Password</p>
                        <input className="inputStuff" value={upass||''} onChange={(e)=>{setUPass(e.target.value);console.log(e.target.value)}}/>
                    </div>
                    <div className="confirmContent"> 
                        <p className="EnterStuff">Enter Login pass</p>
                        <input className="inputStuff" value={confirmPass||''} onChange={(e)=>{setConfirmPass(e.target.value)}}/>
                    </div>
                    <div className="ButtonListForStuff">
                        <p className="SubmitButton" onClick={sendUpdateDetails}>Submit</p>
                        <p className="CancelButton" onClick={()=>setEditMode(false)}>Cancel</p>
                    </div>
                </div>
        )
    }
    return(
        <div className="displayCard">
            <h2 className="serviceTitle">{data.service}</h2>
            {data.email?<p className="serviceOption">Email: {data.email}</p>:null}
            {data.username?<p className="serviceOption">Name: {data.username}</p>:null}
            <div className="PassStuff">
                {pass?<p className="serviceOption" onClick={()=>setPass(false)}>Hide Pass</p>:<p onClick={(e)=>setPass(true)}>Show password</p>}
                {pass?<p className="serviceOption">Password: {data.password}</p>:null}
            </div>
            <div className="ButtonListForStuff">
                <p className="GeneralButton" onClick={()=>setEditMode(true)}>Edit details</p>
                <p className="GeneralButton" onClick={()=>setDeleteMode(true)}>Delete</p>
            </div>
            
        </div>
    )
}
const InputStuff=({inputBuffer,setInputBuffer,setUserData,setBuffer})=>{
    const [service,setService]=useState('')
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate = useNavigate()
    const submitDetails=async(e)=>{
        e.preventDefault()
        const token = window.localStorage.getItem('token')
        console.log(token)
        if(token==null){
            navigate("../error")
        }
        const body={Service:service,Name:name,Email:email,Password:password}
        console.log(body)
        setInputBuffer(true)
        const resp = await axios.post("http://localhost:3001/api/platform",body,{'headers':{'authorization':('bearer '+token)}})
        setInputBuffer(false)
        removePopUp()
        setBuffer(true)
        const userResp = await axios.get("http://localhost:3001/api/userdata",{"headers":{"authorization":("bearer "+token)}})
        if(resp.status===400){
            navigate("../error")
        }
        console.log(userResp)
        setUserData(userResp.data)
        setBuffer(false)
    }
    const removePopUp =()=>{
        const popUp = document.getElementById("popUpContent")
        console.log(popUp)
        popUp.classList.add("hidden")
    }
    if(inputBuffer===true){
        return(
            <p className="bufferContent">Please wait</p>
        )
    }
    return(
        <div className="InputStuff">
            <div className="ListOfInputStuffToBeTaken">
                <div className="confirmContent">
                    <p className="EnterStuff">Service</p>
                    <input className="inputStuff" value={service||''} placeholder="Service" id="serviceInput" onChange={(e)=>setService(e.target.value)}/>
                </div>
                <div className="confirmContent">
                    <p className="EnterStuff">Name</p>
                    <input className="inputStuff"  placeholder="Username" id="nameInput"  onChange={(e)=>setName(e.target.value)}/>
                </div>   
                <div className="confirmContent">
                    <p className="EnterStuff">Email</p>
                    <input className="inputStuff" placeholder="Email" id="emailInput"  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="confirmContent">
                    <p className="EnterStuff">Password</p>
                    <input className="inputStuff" placeholder="Password"  id="passwordInput"  onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="ButtonListForStuff">
                <button className="SubmitButton" onClick={submitDetails}>Submit</button>
                <p className="CancelButton" onClick={removePopUp}>Cancel</p>   
            </div>
        </div>
    )
}
const MainUserPage=()=>{
    const [userData,setUserData] =useState('')
    const [buffer,setBuffer] = useState(true)
    const [inputBuffer,setInputBuffer]=useState(false)
    const navigate = useNavigate()
    const popUpContent=()=>{
        const popUp = document.getElementById("popUpContent")
        console.log(popUp)
        popUp.classList.remove("hidden")

    }
    useEffect(()=>{
        const getUserData = async()=>{
            const token = window.localStorage.getItem('token')
            console.log(token)
            if(token==null){
                navigate("../error")

            }
            const resp = await axios.get("http://localhost:3001/api/userdata",{"headers":{"authorization":("bearer "+token)}})
            if(resp.status===400){
                navigate("../error")
            }
            console.log(resp)
            setUserData(resp.data)
            setBuffer(false)
        }
        getUserData()
    },[])
    if(buffer){
        return(
            <div>
                Wait...
            </div>
        )
    }
    console.log(userData.Accounts)
    return(
        <div className="loggedinPage">
            <div className="headerList">
                <p className="titlePage">Welcome back {userData.username}</p>
            </div>
            
            <div className="accountsList">
                <p className="AccountTitle">Your accounts</p>
                <div className="makeAnAccountButton">
                    <p className="makeAnAccountButtonText" onClick={popUpContent}>Add an account</p>
                </div>
                <div className="listOfAllYourAccounts">
                    {userData.Accounts.length===0?<p className="makeAnAccountMesage">Add An Account to see passwords</p>:userData.Accounts.map(x=><ShowUserAccount data={x} setBuffer={setBuffer} setUserData={setUserData}/>)}
                </div>
            </div>
            
            <div id="popUpContent" className="hidden popUpStuff">
                <InputStuff setBuffer={setBuffer} inputBuffer={inputBuffer} setInputBuffer={setInputBuffer} setUserData={setUserData}/>
            </div>
        </div>
    )
}
export default MainUserPage