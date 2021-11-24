import React, { useContext, useState } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService"
import { PopupsContext } from "../../shared/global/provider/PopupsProvider"


export const LoginButton = () => {
 
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [open, setOpen] = useContext(PopupsContext)
    

    

    const handleSubmit = async (event)   => {
        event.preventDefault()

       try{
        const userFromServer = await CryptoShuttleService.loginUser({email, password})
        setAuthenticatedUser(userFromServer.data.access_token)
        localStorage.setItem("token", userFromServer.data.access_token)
        /* document.getElementsById('noMatch').style.visibility = "hidden" */
        let btn = document.getElementById('forecastBtn')
        if(btn){

            btn.removeAttribute("hidden")
        }

        }
        catch(error){
            document.getElementById("noMatch").style.visibility = "visible"
        }        
    }
    
    return (
        <div >
            <Popup  trigger={<button className="triggerButton"> Login</button>} modal >
                {close => (
                    <div>
                    <form className="wrapper" onSubmit={handleSubmit}>
                        <button className="close" onClick={close}>
                        &times;
                        </button>
                        <h4>Log In</h4>
                        <div>
                            New to Crypto Shuttle?
                            <span className="create-account" onClick={() => {close(); setOpen(true) }}> Create an account.</span>
                        </div>
                        
                        <div>
                        <label ><b>Email</b></label><br/>
                        <input onChange={event => setEmail(event.target.value)} type="email" className="row" placeholder="Enter Email" name="email" required></input>
                        </div><br/>
                        <div>
                        <label><b>Password</b></label><br/>
                        <input onChange={event => setPassword(event.target.value)} type="password" className="row" placeholder="Enter Password" name="psw" required></input>
                        
                        <div id="noMatch">Your email and password doesnt match. Please try again</div>
                        </div><br/>
                        <div>
                        <button type="submit" className="submit">Submit</button> 
                        </div>
                    </form>
                </div>
                )}
                
            </Popup>        
        </div>
    )
}