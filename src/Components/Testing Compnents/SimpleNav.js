import {Link} from "react-router-dom";

const SimpleNav = () => {
    return (
        <div>
            <Link to="/"><button>Push me</button></Link>
            <Link to="/testpage2"><button>push me</button></Link>

        </div>
    )
}

export default SimpleNav
