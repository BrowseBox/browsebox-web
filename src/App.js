
import Header from './pages/Header/Header'
import TestPage1 from "./Components/Testing Compnents/TestPage1";
import TestPage2 from "./Components/Testing Compnents/TestPage2";
import SimpleNav from "./Components/Testing Compnents/SimpleNav";

import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Components/AdminDashboard/AdminDashboard";

function App() {
  const [userLogin, setUserLogin] = React.useState(false)
  const [user, setUser] = React.useState(null)

  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      axios.post('http://localhost:3001/get-user', { id: localStorage.getItem('id') }).then((res) => {
        setUser(res.data)
        // console.log(user) // this is null fix it @Jireh
        // console.log(res.data)
      })
    }
  }, [])

  return (
    <Router>
        <Header setUser={setUser} />
        <SimpleNav />

        <Routes>
            <Route path='/' element={<TestPage1 />} />
            <Route path='/testpage2' element={<TestPage2 />} />
        </Routes>
      {/* <CreateUserComponent /> */}
      {/*<Header setUser={setUser} />*/}
      {/*{user !== null && <Edit user={user} setUser={setUser} />}*/}
      {/* <Home user={user} /> */}
    </Router>
  )
}

export default App
