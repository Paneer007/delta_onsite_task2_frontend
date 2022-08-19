import {Link,useNavigate} from "react-router-dom"
const ErrorPage = ()=>{
    return(
        <div className="errorPageMain">
            <p className="errorPageTitle">Error</p>
            <p className="errorPageSubTitle">Authorisation is denied</p>
            <Link className="goHome" to="../">Return home</Link>
        </div>
    )
}
export default ErrorPage