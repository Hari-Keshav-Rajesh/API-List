import UserChangeForm from "./UserChangeForm/UserChangeForm"

const SettingProfile = (props) =>{
    return(
        <div className="settingProfile">
            <UserChangeForm setTokenState={props.setTokenState}/>
        </div>
    )
}

export default SettingProfile