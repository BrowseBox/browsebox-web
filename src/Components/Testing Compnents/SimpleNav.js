import {Link} from "react-router-dom";

const SimpleNav = () => {
    return (
        <div>
            <Link to="/"><button>Push me</button></Link>
            <Link to="/testpage2"><button>push me</button></Link>
            <Link to="/user-list"><button>User List</button></Link>
            <Link to="/signup"><button>Create User</button></Link>
            <Link to="/create-ad"><button>Create Ad</button></Link>
        </div>
    )
}

export default SimpleNav
