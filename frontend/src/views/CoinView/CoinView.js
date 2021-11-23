import React,{useState, useContext, useRef} from "react";
import './CoinView.css'
import CoinHistoryGraph from '../../components/CoinHistoryGraph/CoinHistoryGraph'
import { CoinInfoBox } from '../../components/CoinInfoBox/CoinInfoBox'

import SaveLastViewed from '../../components/SaveLastViewed/SaveLastViewed'
import CryptoShuttleService from "../../utils/api/services/CryptoShuttleService";
import { UserContext } from '../../shared/global/provider/UserProvider'
import { SignUpLink } from "../../components/SignUpLink/SignUpLink";
import { LoginButton } from "../../components/LoginButton/LoginButton";
import { RunForecastButton } from "../../components/Forecast/RunForecastButton";


export const CoinView = () => {
    const signInRef = useRef()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    
    
    
    const displayIfNotAuth = () => {
        
        
        if(authenticatedUser != null && signInRef.current) {
            signInRef.current.setAttribute("hidden", "hidden")
        }
    }
       
      
    return (
        <div className="main">
            <div className="coin-view">
                <CoinInfoBox />
                <CoinHistoryGraph />
                <SaveLastViewed />                
                <RunForecastButton/>
                                                       
                <div ref={signInRef} className="sign-in">
                    {authenticatedUser == null && <LoginButton/>}
                    {authenticatedUser == null && <SignUpLink/>}
                    {displayIfNotAuth()}
                </div>
                
                                                             
            </div>
        </div>
    )
}