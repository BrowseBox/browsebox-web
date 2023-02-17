// import CreateUserComponent from './Components/UserComponents/CreateUser.component'
import Header from './pages/Header/Header'
// import Home from './pages/Home/Home'
import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Edit from './pages/Edit/Edit'

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

  return (
    <div className="App">
      {/* <CreateUserComponent /> */}
      <Header setUser={setUser} />
      {user !== null && <Edit user={user} setUser={setUser} />}
      {/* <Home user={user} /> */}
    </div>
  )
}

export default App
