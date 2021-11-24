import React, { useContext } from "react"
import './Register.css'
import useForm from "./UseForm";
import validate from './RegisterFormValidationRules';
import CryptoShuttleService from '../../utils/api/services/CryptoShuttleService';
import { UserContext } from "../../shared/global/provider/UserProvider"
import { RegUserContext } from "../../shared/global/provider/RegUserProvider";
import Popup from "reactjs-popup";
import { PopupsContext } from "../../shared/global/provider/popupsProvider";

export const Register = (props) => {

    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)
    const [registerError, setRegisterError] = useContext(RegUserContext)
    const [open, setOpen] = useContext(PopupsContext);
    const closeModal = () => setOpen(false);
    
    const {
        values,
        errors,
        handleChange,
        handleSubmit,
      } = useForm(login, validate);

      const logInUser = async ()   => {
         
         const email = values.email
         const password = values.password
         const userFromServer = await CryptoShuttleService.loginUser({email, password})
         setAuthenticatedUser(userFromServer.data.access_token)
         localStorage.setItem("token", userFromServer.data.access_token)
         }
     

      //registering user
      async function  login (e) {
        if(e) e.preventDefault()
        console.log('No errors, submit callback called!');
        
        
        const userObject = {
            "email": values.email,
            "name": values.name,
            "password": values.password,
        }
        
        try{
            const response = await CryptoShuttleService.registerUser(userObject)
            console.log(response);
            logInUser();
        }
        catch(error){
            if (error.response.data){
                // Show error message from server
                setRegisterError(error.response.data['error'])
                document.getElementById("noMatch").style.visibility = "visible"
            }
      
            console.error(error.message);
        }
      };
    
    return (
        <div className="formWrapper">
            <button type="button" className="button" onClick={() => setOpen(o => !o)}>
            Sign Up
            </button>
            <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div className="modal">
                    <button className="close" onClick={closeModal}>
                    &times;
                    </button>
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit} noValidate>
        
                    <label htmlFor="email">Email</label><input autoComplete="off" className={`input ${errors.email}`} type="email" name="email" onChange={handleChange} value={values.email || ''} required />
                    {errors.email && (
                    <p className="help">{errors.email}</p>
                    )}
                    <label htmlFor="name">Name</label><input autoComplete="off" className={`input ${errors.name}`} type="text" name="name" onChange={handleChange} value={values.name || ''} required />
                    {errors.name && (
                    <p className="help">{errors.name}</p>
                    )}
                    <label htmlFor="password">Password</label> <input className={`input ${errors.password}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required />
                
                    {errors.password && (
                    <p className="help">{errors.password}</p>
                    )}
                    <label htmlFor="password">Confirm Password</label><input className={`input ${errors.confirmPassword}`} type="password" name="confirmPassword" onChange={handleChange} value={values.confirmPassword || ''} required />
                    {errors.confirmPassword && (
                    <p className="help">{errors.confirmPassword}</p>
                    )}
                    <div id="noMatch">{registerError}</div>
                    <button type="submit" className="regSubmit">Register</button>
                </form>
            </div>
                
            </Popup>
        </div>
    )
}