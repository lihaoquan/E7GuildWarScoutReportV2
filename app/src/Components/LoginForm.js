import { useState } from "react"
import axios from 'axios'

import closeIcon from '../Images/close-01.svg'

const LoginForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/login', formData, { withCredentials: true })
            .then(function (response) {
                if (response.data.token) {
                    props.setLoggedInUser({ username: response.data.username, token: response.data.token })
                    props.createPopup('Login success.', true)
                    props.onClose(false)
                } else {
                    props.createPopup('Login failure.', false)
                    props.onClose(false)
                }
            }).catch(function (error) {
                console.log(error)
                props.createPopup('Login failure.', false)
                props.onClose(false)
            })
    }

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    return (
        <>
            <form className='full-page-small narrow dialog' onSubmit={handleSubmit}>
                <div className='form-title'>
                    <h3>Login</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-group'>
                    <label>Username</label>
                    <input onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} value={formData.username} type='text' placeholder='Username' />
                    <label>Password</label>
                    <input onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} value={formData.password} type='password' placeholder='Password' />
                </div>
                <input type='submit' value='Login' />
            </form>
        </>
    )
}

export default LoginForm