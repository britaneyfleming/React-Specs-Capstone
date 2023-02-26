import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../store/authContext";

const Header = () => {
    const authCtx = useContext(AuthContext);


    return (
        <header>
            <div></div>
            <nav>
                {authCtx.token ? (
                    <ul>
                        <li>
                            <NavLink to="/dashboard">
                                <button>Dashboard</button>
                            </NavLink>
                        </li>
                        <li>
                            <button
                    
                                onClick={() => authCtx.logout()}>
                                Logout
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul>
                        <li>
                            <NavLink to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/auth">
                                Register
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
};

export default Header;