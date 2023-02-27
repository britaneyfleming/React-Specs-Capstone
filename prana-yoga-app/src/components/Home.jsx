import React, { Fragment } from "react";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import Auth from "./Auth";
import Dashboard from './Dashboard';
import Header from './Header';
const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Fragment>
        <Header/>
{!authCtx.token && (<Auth/>) }
</Fragment>
    );
};

export default Home;