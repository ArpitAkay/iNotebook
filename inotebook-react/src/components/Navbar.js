import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateAuth } from '../redux/slices/AuthSlice';

const Navbar = () => {

    let location = useLocation();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth)

    const isActive = (path) => {
        return location.pathname === path ? ' active' : '';
    }

    const handleLogout = () => {
        console.log("handleLogout called");
        dispatch(updateAuth({type: "LoggedOut", state: {authToken: ""}}))
        navigate("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand ms-1" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            { auth.isAuthenticated && <Link className={`nav-link${isActive("/")}`} aria-current="page" to="/">Home</Link> }
                        </li>
                        <li className="nav-item">
                            { auth.isAuthenticated && <Link className={`nav-link${isActive("/about")}`} to="/about">About</Link> }
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        {location.pathname === "/signup" && <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>}
                        { location.pathname === "/login" && <button type="button" className="btn btn-primary" onClick={() => navigate("/signup")}>Signup</button>}
                        { auth.isAuthenticated && <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>}
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
