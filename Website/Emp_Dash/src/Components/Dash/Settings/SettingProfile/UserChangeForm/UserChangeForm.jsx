import "./UserChangeForm.css"
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"


const UserChangeForm = (props) => {

    const [newUsername, setNewUsername] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleUsernameChange = (event) => {
        setNewUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    const submitUserChange = async(event) => {
        event.preventDefault();
        setConfirmPassword("")
        setNewUsername("")
        if (newUsername === '' || confirmPassword === '') {
            alert('Fill all the details')
            return
        }
        try{
            const config = {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
              }
            const response = await axios.patch('http://localhost:8000/change_username',{
                username: newUsername,
                password: confirmPassword
            },config)
            if((response.data['Message']==="Username already exists")||(response.data['Message']==="Password Incorrect")){
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
        <div className="userChange">
            <h1>Change Username</h1>
            <form className="changeUserForm">
                <div>
                    <label><strong>New Username</strong></label>
                    <input 
                    type="text" 
                    name="username"
                    value = {newUsername}  
                    onChange={handleUsernameChange} 
                    />
                </div>

                <div>
                    <label><strong>Confirm your Password</strong></label>
                    <input 
                    type="password" 
                    name="password" 
                    value = {confirmPassword}
                    onChange={handlePasswordChange}
                    />
                </div>

                <button type="submit" onClick={submitUserChange} >
                    Update Username
                </button>
            </form>
        </div>
    )
}

export default UserChangeForm