import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const navigate = useNavigate();
    const { setAuthenticated } = props;
    return (
        <>
            <Link to="/">Home</Link> |
            <Link to="/login">Login</Link> |
            <Link to="/register">Register</Link> | 

            <Link to="/doctors">Doctors</Link> | 
            <Link to="/patients">Patients</Link> | 
            <Link to="/prescriptions">Prescriptions</Link> |

            
            <button onClick={() => {
                setAuthenticated(false);
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
            }}>Logout</button>
        </>
    );
}

export default Navbar;