
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Overview from './pages/Overview';
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from './pages/Reports';
import Team from './pages/Team';

function Dashboard() {
    return (
        <Router>
            <Sidebar />
            <Routes>
                <Route path='/overview' element={<Overview />} />
                <Route path='/reports' element={<Reports />} />
                <Route path='/reports/reports1' element={<ReportsOne />} />
                <Route path='/reports/reports2' element={<ReportsTwo />} />
                <Route path='/reports/reports3' elementt={<ReportsThree />} />
                <Route path='/team' element={<Team />} />
            </Routes>
        </Router>
    );
}

export default Dashboard;
