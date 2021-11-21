import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { UserContext } from '../shared/global/provider/UserProvider'
import { RegisterView } from '../views/RegisterView'
import { UserView } from '../views/UserView'
import { CoinView } from '../views/CoinView/CoinView'



export const Routing = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const checkIfUserIsAuthenticatedInBrowser = () => {
        setAuthenticatedUser(localStorage.getItem("token"))
        console.log(authenticatedUser)
    }

    useEffect(() => {

        checkIfUserIsAuthenticatedInBrowser()
    })

    return (

        <Router>
            {props.children}
            <Switch>
                {
                localStorage.getItem('token') ? <Redirect from='/userpage' to='/' /> : <Route exact path="/userpage" component={UserView} />
                } 
                {
                /* localStorage.getItem('token') ? <Redirect from='/userregister' to='/' /> : <Route exact path="/userregister" component={RegisterView} /> */
                } 
                <Route path="/coins/:slug" component={CoinView} />
                <Route component={HomeView} />

            </Switch>
        </Router>
    )
}
