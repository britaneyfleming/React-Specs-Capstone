import React, { Fragment } from "react";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import Auth from "./Auth";
import Dashboard from './Dashboard';

const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Fragment>
{authCtx.token ? 
(<Dashboard />)
 : (<Auth/>) }
</Fragment>
    );
};

export default Home;