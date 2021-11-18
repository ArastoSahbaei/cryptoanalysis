import React,{useState, useContext, useRef} from "react";
import Forecast from "./Forecast";
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService";
import { UserContext } from '../../shared/global/provider/UserProvider'


export const RunForecastButton = () => {
    let btnRef = useRef();
    const [showResults, setShowResults] = React.useState(false)
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    let  [user, setUser] = useState()
    const onClick = () => {setShowResults(true)
        
        if(authenticatedUser != null && btnRef.current){
            btnRef.current.setAttribute("hidden", "hidden");
            
        }
        
        userAuthBackend()
        
        
        
        
        
        
    }
    const userAuthBackend = async () => {
        
        setAuthenticatedUser(localStorage.getItem('token'))
        console.log(authenticatedUser)

        if(authenticatedUser == null){
            console.log('login to use')
        }else if(authenticatedUser != null) {
                console.log(authenticatedUser)
                
            try{
                const getUserWithToken = await CryptoShuttleService.getLoggedInUser(localStorage.getItem('token'))
                setUser(getUserWithToken.data.logged_in_as)
                
            }
            catch(e){
                console.log(e.message);
            }
        }
        
    }



    return (
        
        
        <div className="forecast-button">
            <input ref={btnRef} type="submit" value="Run Forecast" onClick={onClick} />
            { showResults && user && <Forecast user={user}/> }

        </div>





    )




}