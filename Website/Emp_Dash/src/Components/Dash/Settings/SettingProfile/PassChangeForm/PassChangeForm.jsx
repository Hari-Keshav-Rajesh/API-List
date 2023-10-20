import "./PassChangeForm.css"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

const PassChangeForm = (props) => {

    const [existingPassword, setExistingPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleExistingPasswordChange = (event) => {
        setExistingPassword(event.target.value)
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const submitPassChange = async(event) => {
        event.preventDefault();
        setExistingPassword("")
        setNewPassword("")
        setConfirmPassword("")
        if (existingPassword === '' || newPassword === '' || confirmPassword === '') {
            alert('Fill all the details')
            return
        }
        if(newPassword !== confirmPassword){
            alert("Passwords do not match")
            return
        }
        if(existingPassword === newPassword){
            alert("New password cannot be same as old password")
            return
        }
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
              }
            const response = await axios.patch('http://localhost:8000/change_password',{
                password: existingPassword,
                new_password: newPassword,
            },config)
            if(response.data['Message']==="Password Incorrect"){
                alert(response.data['Message'])
            }
            else{
                props.setTokenState(response.data['identifier'])
                Cookies.set('token',response.data['identifier'],{path:'/'})
                alert(response.data['Message'])
            }
        }
        catch(error){
            console.log('Error fetching data:', error);
            alert("Error")
            throw error;
        }
    }

    return(
        <div className="passChange">
            <h1>Change Password</h1>
            <form className="changePassForm">
                <div>
                    <label><strong>Existing Password</strong></label>
                    <input 
                    type="password" 
                    name="password"
                    value = {existingPassword}  
                    onChange={handleExistingPasswordChange} 
                    />
                </div>

                <div>
                    <label><strong>New Password</strong></label>
                    <input 
                    type="password" 
                    name="new_password"
                    value = {newPassword}  
                    onChange={handleNewPasswordChange} 
                    />
                </div>

                <div>
                    <label><strong>Confirm your Password</strong></label>
                    <input 
                    type="password" 
                    name="confirm_password" 
                    value = {confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    />
                </div>

                <button type="submit"  onClick={submitPassChange}>
                    Update Password
                </button>
            </form>
        </div>
    )
}

export default PassChangeForm