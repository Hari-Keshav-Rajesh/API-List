import "./SettingDelete.css"
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useState } from "react";
import axios from "axios";

const SettingDelete = (props) =>{

    const[deletePassword,setDeletePassword] = useState('')

    const deletePasswordChange = (e) => {
        setDeletePassword(e.target.value)
    }
 
    const handleDeleteAccount = async(event) => {
        event.preventDefault()
        if(deletePassword===props.pass){
            try {
                const response = await axios.post('http://localhost:8000/delete',{
                  password:deletePassword
                })
                alert("Account Deleted")
                props.setLoggedIn(false);
              } catch (error) {
                console.error('Error fetching data:', error);
                throw error
              }
            return
        }
        alert("Incorrect Password")
    }

    return(
        <div className="settingDelete">

            <div className="settingDeleteTitle">Delete Account</div>

            <div className="settingDeleteWarning">If you delete your account, all saved data will be LOST.<br></br>
            You might no get desired username on creation of new account.<br></br>Please create a new account within the next 3 days or you will be reported to HR.
            <br></br> On creation, all new tasks will have to be added manually again.
            </div>


            <div className="deleteAccountButton">
            <div>
            <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                <button className="deleteAlert violet">Delete account</button>
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                <AlertDialog.Overlay className="deleteAlertertDialogOverlay" />
                <AlertDialog.Content className="deleteAlertDialogContent">
                    <AlertDialog.Title className="deleteAlertDialogTitle">Are you absolutely sure?</AlertDialog.Title>
                    <AlertDialog.Description className="deleteAlertDialogDescription">
                    This action cannot be undone. This will permanently delete your account and remove your
                    data from our servers.
                    <div className="deletePasswordInput">
                        <input 
                        type="password"
                        id="deletePassword"
                        name="deletePassword"
                        value={deletePassword}
                        onChange={deletePasswordChange}
                        required 
                        placeholder="Enter your password"/>
                    </div>
                    </AlertDialog.Description>
                    <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
                    <AlertDialog.Cancel asChild>
                        <button className="deleteAlert mauve">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button className="deleteAlert red" onClick={handleDeleteAccount}>Yes, delete account</button>
                    </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
            </div>
            </div>
        </div>

    )
}

export default SettingDelete