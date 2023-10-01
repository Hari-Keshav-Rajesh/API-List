import "./Settings.css"
import "../dark.css"
import SettingSidebar from "./SettingSidebar/SettingSidebar"
import { useState } from "react"
import SettingProfile from "./SettingProfile/SettingProfile"
import SettingDelete from "./SettingDelete/SettingDelete"
import SettingLog from "./SettingLog/SettingLog"

const Settings = (props) => { 

    const[settingPage,setSettingPage] = useState('Profile')

     const settingSidebarProps = {settingPage,setSettingPage}



    return(
       <div className={[props.themeClass]}>
            <div className="settingSide">
                <SettingSidebar {...settingSidebarProps} user={props.user} />
            </div>
            <div className="settingContent"> 
                {settingPage==='Profile'?(
                   <SettingProfile />
                ):
                settingPage==='Delete'?(
                    <SettingDelete pass={props.pass} setLoggedIn={props.setLoggedIn}/>
                ):
                    <SettingLog user={props.user} setLoggedIn={props.setLoggedIn} setPass={props.setPass} setUser={props.setUser}/>
                }
            </div>
       </div>
    )
}

export default Settings