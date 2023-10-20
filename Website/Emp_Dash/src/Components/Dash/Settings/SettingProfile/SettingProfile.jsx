import "./SettingProfile.css"

import PassChangeForm from "./PassChangeForm/PassChangeForm"
import UserChangeForm from "./UserChangeForm/UserChangeForm"

const SettingProfile = (props) =>{
    return(
        <div className="settingProfile">
            <UserChangeForm setTokenState={props.setTokenState}/>
            <PassChangeForm setTokenState={props.setTokenState}/>
        </div>
    )
}

export default SettingProfile