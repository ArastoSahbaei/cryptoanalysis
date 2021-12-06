import React, {useContext} from 'react'
import { LoginButton } from '../LoginButton/LoginButton'
import { Search } from '../Search/Search'
import './NavigationBar.css'
import Logotype from '../../shared/images/logotype.svg'
import { useHistory } from 'react-router-dom'
import { Profile } from '../Profile/Profile'
import { UserContext} from '../../shared/global/provider/UserProvider'
import { Register } from '../register/Register'
import { Darkmode } from '../Darkmode/Darkmode'

export const NavigationBar = () => {
    const history = useHistory();
    const [authenticatedUser, setAuthenticatedUser] = useContext (UserContext)

    
    const displayUserIfAuthenticated = () => {
        return (authenticatedUser) 
        ? 
        <Profile/>
        : 
        <div className="logField">
            <div className="item">
                <Register/>
            </div>
            <div className="item">
                <LoginButton/>
            </div>
        </div>
    }


    return (
        <div className="navBar">
            <div className="top-navbar">
                <Darkmode />
                <div className="signup-register">
                    {displayUserIfAuthenticated()}
                </div>
            </div>
            <div className="header-search">
                <div className="loggo-header">
                    
                    <img onClick={() => history.push('/')} className="logotype"
                        src={Logotype} alt="Error..." />
                    {/* <h1 onClick={() => history.push('/')}>Crypto Shuttle</h1> */}
                    {/* <span onClick={() => history.push('/userregister')} className="register" >Register</span> */}
                </div>
                <Search />
            </div>
        </div>
    )
}