import {useState, useContext, Fragment} from 'react'
import axios from 'axios'

import AuthContext from '../store/authContext';

const Auth = () => {
    const [register, setRegister] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [display, setDisplay] = useState('none')

    const authCtx = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()

        setDisplay('none')

        const body = {
            username,
            password
        }

        const url = 'http://localhost:3000'

        axios.post(register ? `${url}/register` : `${url}/login`, body)
            .then((res) => {
                console.log('AFTER AUTH', res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
            })
            .catch(err => {
                alert('Notification: There was an error with your request.')
                setMessage(err.response.data)
                setDisplay('block')
                setPassword('')
                setUsername('')
            })
    }
    return (
        <Fragment>
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

</div>

            <main>
            <h1>{register ? 'Sign Up' : 'Login'}</h1>
            <form onSubmit={submitHandler}>
                <input 
                    type='text' 
                    placeholder='Enter your username' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    />
                <input 
                    type='password' 
                    placeholder='Enter your password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                <button>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <p style={{display: display}}>{message}</p>
            <button onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
        </main>
        </Fragment>
    )
}

export default Auth;