import Header from './pages/Header/Header'
import TestPage1 from './Components/Testing Compnents/TestPage1'
import TestPage2 from './Components/Testing Compnents/TestPage2'
import SimpleNav from './Components/Testing Compnents/SimpleNav'
import UserList from './Components/AdminDashboard/components/UserList'
import SignupForm from './pages/Signup/SignupForm'
import Home from './pages/Home/Home'
import ShowAds from './Components/ItemComponents/ShowAds'



import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/AdminDashboard/AdminDashboard'
import CreateAd2 from "./Components/ItemComponents/CreateAd2";

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
                {/* <Route path="/" element={<TestPage1 />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/testpage2" element={<TestPage2 />} />
                <Route path="/user-list" element={<UserList />} />
                <Route path="/create-ad" element={<CreateAd2 />} />
                <Route path="/ShowAd" element={<ShowAds />} />
                {/* <Route path='/signup' element={<SignupForm />} /> */}
            </Routes>
            {/* <CreateUserComponent /> */}
            {/*<Header setUser={setUser} />*/}
            {/*{user !== null && <Edit user={user} setUser={setUser} />}*/}
            {/* <Home user={user} /> */}
        </Router>
    )
}

export default App
