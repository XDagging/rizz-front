import { useState, useEffect } from 'react'
// import './App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Index from './page'
import Signup from "./signup/page"
import Dashboard from './dashboard/page'
import Test from "./test/page"
import Login from "./login/page"
import type { BrowserUser } from './types'
import Settings from './settings/page';
import UserContext, {IsLoggedInContext} from './context'
import callApi from './functions'
import Scores from './scores/page';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const navigate = useNavigate()
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<BrowserUser | null>(null);
  useEffect(() => {
    const x = ["test", "dashboard", "login", "dashboard", "signup"]
    console.log("The location href changed", window.location.href)
    const path = location.pathname.split("/").filter(Boolean).pop()?.toLowerCase();
    const shouldFetchUser = x.includes(path || "");
    console.log("shouldfetch", shouldFetchUser)
    console.log("user", user)
    if (shouldFetchUser&&user===null) {
      callApi("/getUser", "GET").then((res) => {
        if (res.code === "ok") {

          

          console.log('we just changed user')
          
          if (!JSON.parse(res.message).allTests) {
            setUser({...JSON.parse(res.message), allTests: []});
          } else {
            setUser(JSON.parse(res.message))
          }
          if (path==="login"||path==="signup") {
            navigate("/dashboard")
          }
            
          
        } else {
          setUser(null);
          // Nothing ("and that's okay")
        }      
      })

    } else {
      console.log("dont get the user yet (it doesn't matter)")
      // Pretend like nothing happened;
    }


  },[location.pathname])






  return (
    <>

      <UserContext.Provider value={user}>
    
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute isAuthenticated={user!==null} />} >
               <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/test" element={<Test />} /> 
              <Route path="/settings" element={<Settings />} />
              <Route path="/scores" element={<Scores />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
    
      </UserContext.Provider>

      
    </>
  )
}

export default App
