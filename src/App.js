// import CreateUserComponent from './Components/UserComponents/CreateUser.component'
import Header from './pages/Header/Header'
// import Home from './pages/Home/Home'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Edit from './pages/Edit/Edit'


// imports for react-router-dom
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TestTop from './pages/TestTop'
import TestMain from "./pages/TestMain";
import TestMain2 from "./pages/TestMain2";

function App() {
  // const [userLogin, setUserLogin] = React.useState(false)
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



// change route to testmain2
    const ChangeBot = () => {
        window.location.href = "/testmain2";
    }





    return (
    // <div className="App">
    //   {/* <CreateUserComponent /> */}
    //   <Header setUser={setUser} />
    //   {user !== null && <Edit user={user} setUser={setUser} />}
    //   {/* <Home user={user} /> */}
    // </div>


<Router>

    <button onClick={ChangeBot}><TestTop /></button>
  <div>


    <Routes>
        <Route path="/" element={<TestMain user={user} setUser={setUser} />} />
        <Route path="/testmain" element={<TestMain />} />
        <Route path="/testmain2" element={<TestMain2 />} />
    </Routes>
  </div>
</Router>


     //    <Router>
     //    <div>
     //    {/* <Header user={user} setUser={setUser} />*/}
     //    {/* <Routes>*/}
     //    {/*    <Route path="/" element={<Edit user={user} setUser={setUser} />} />*/}
     //    {/*</Routes>*/}
     //    </div>
     // </Router>


  )
}

export default App
