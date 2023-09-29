import Avatar from '@mui/joy/Avatar';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import "./SettingLog.css"
import axios from 'axios';



const SettingLog = (props) =>{

    const handleLogOut = async(event) => {
        event.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/logout')
            alert("Logged Out")
            props.setLoggedIn(false);
            props.setUser("")
            props.setPass("")
          } catch (error) {
            console.error('Error fetching data:', error);
            throw error
          }
        return
    }



    return(
        <div className="settingLog">
            <div className="settingLog_container">
                <div className="settingLogCard">
                    <Avatar     
                    className="settingLogAvatar"
                    variant="outlined"
                    size="lg"
                    ><span>{props.user.charAt(0).toUpperCase()}</span></Avatar>
                    <div className='settingLogUsername'>@{props.user}</div>
                    <div>Have a Nice Day!</div>
                    <button className='settingLogButton' onClick={handleLogOut}>Log Out</button>
                </div>
             </div>   
        </div>
    )
}

export default SettingLog