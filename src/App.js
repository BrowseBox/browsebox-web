// Import from react-router-dom
import { BrowserRouter as Router, Routes,
    Route, Link } from "react-router-dom";

// Import other React Component
import Header from './pages/Header/Header'

function App() {
  return (
    <Router>
    <div className="App">
      {/* <CreateUserComponent /> */}
      {/*<Header />*/}
    </div>
        <Routes>
            <Route exact path="/" element={<Header />} />
        </Routes>

    </Router>
  )
}

export default App
