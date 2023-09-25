import "./App.css"
import Login from "./Components/Login/Login"
import { useState,useEffect } from "react";
import Home from "./Components/Dash/Home";
import axios  from "axios";



function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user,setUser] = useState('')
  const loginProps = {user,setUser,loggedIn,setLoggedIn}
  const homeProps = {user}

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
     <div className='Login'>
     <Home {...homeProps}/>
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
