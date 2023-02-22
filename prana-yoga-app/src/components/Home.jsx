import React, { Fragment } from "react";
import { useContext } from "react";
import AuthContext from "../store/authContext";
import Auth from "./Auth";

const Home = () => {
    const authCtx = useContext(AuthContext);

    return (
        <Fragment>
{authCtx.token ? (
<div>
<div>
    <main>
        Welcome to my React App
    </main>
</div>

<div>
    <div>
        App Description
    </div>
</div>
<button onClick={() => authCtx.logout()}>
 Logout
</button>
</div>) : (<Auth />)}
</Fragment>
    );
};

export default Home;