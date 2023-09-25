import "./App.css"
import Login from "./Components/Login/Login"
import { useState,useEffect } from "react";
import Header from "./Components/Dash/Header/Header.Jsx";
import Home from "./Components/Dash/Home/Home";
import Task from "./Components/Dash/Task/Task";
import Settings from "./Components/Dash/Settings/Settings";
import axios  from "axios";



function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user,setUser] = useState('')

  const [home,setHome] = useState(true)
  const [task,setTask] = useState(false)
  const [settings,setSettings] = useState(false)
  const [dark,setDark] = useState(false)


  const [homeClass,setHomeClass] = useState('home')
  const [taskClass,setTaskClass] = useState('task')
  const [settingsClass,setSettingsClass] = useState('settings')

  const loginProps = {user,setUser,loggedIn,setLoggedIn}
  const homeProps = {user,homeClass}
  const taskProps = {user,taskClass}
  const settingsProps = {user,settingsClass}
  const headerProps = {home,setHome,task,setTask,settings,setSettings,dark,setDark,
    homeClass,setHomeClass,taskClass,setTaskClass,settingsClass,setSettingsClass}



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setLoggedIn(response.data.login);
        setUser(response.data['User'])
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  
    fetchData();
  }, []);


  return(
    <div className="app">
    {loggedIn ? (
     <div className='Dash'>
     <Header {...headerProps}/>
        {home ? <Home {...homeProps} /> : null}
        {task ? <Task {...taskProps}/> : null}
        {settings ? <Settings {...settingsProps}/> : null}
   </div> 
    ) : (
      <div className='Login'>
        <Login {...loginProps}/>
      </div>
    )}
  </div>
);
}

export default App
