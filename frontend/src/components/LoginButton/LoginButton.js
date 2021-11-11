import React, { useContext, useState } from "react"
import './LoginButton.css'
import Popup from "reactjs-popup"
import { UserContext } from "../../shared/global/provider/UserProvider"
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService"
import {useHistory} from "react-router-dom"
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator'

export const LoginButton = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const history = useHistory();


    const handleSubmit = async (event)   => {
        event.preventDefault()

      
          try{
            const userFromServer = await CryptoShuttleService.loginUser({email, password})
            setAuthenticatedUser(userFromServer.data.access_token)
            localStorage.setItem("token", userFromServer.data.access_token)
            /* document.getElementsById('noMatch').style.visibility = "hidden" */
            }
            catch(error){
                document.getElementById("noMatch").style.visibility = "visible"
            }           
    }
    
    return (
        <div >
            <Popup  trigger={<button className="triggerButton"> Login</button>} modal >
                {close => (
                    <div className="wrapper">
                    <ValidatorForm  onSubmit={handleSubmit}>
                        <div>Log In</div><br/>
                        <div>
                            New to Crypto Shuttle?
                            <span className="create-account" onClick={() => {close(); history.push('/userregister')}}>Create an account</span>
                        </div><br/>
                        <div>
                        
                        <TextValidator onChange={event => setEmail(event.target.value)} type="email"  label="Email" value={email} name="email" validators={['required', 'isEmail']} errorMessages={['this field is required', 'email is not valid']} />
                        </div><br/>
                        <div>
                        <TextValidator onChange={event => setPassword(event.target.value)} type="password" label="Password" name="password"  validators={['required', 'matchRegexp:^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$']} errorMessages={['this field is required']} value={password}  />
                        
                        <div id="noMatch">Your email or password doesnt match. Please try again</div>
                        </div><br/>
                        <div>
                        <button type="submit" className="submit">Submit</button> 
                        </div>
                    </ValidatorForm>
                </div>
                )}
                
            </Popup>        
        </div>
    )
};