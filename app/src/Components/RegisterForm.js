import { useState } from "react"
import axios from 'axios'

import closeIcon from '../Images/close-01.svg'

const RegisterForm = (props) => {

    const handleSubmit = (e) => {

        e.preventDefault()

        axios.post('http://localhost:3001/register', formData)
            .then(function (response) {
                if (response.status == 201) {
                    props.createPopup('Registration success.', true)
                    props.onClose(false)
                } else {
                    props.createPopup('Registration failure.', false)
                    props.onClose(false)
                }
            }).catch(function (error) {
                console.log(error)
                props.createPopup('Registration failure.', false)
                props.onClose(false)
            })
    }

    const [formData, setFormData] = useState({
        username: '',
        display_name: '',
        password: ''
    })

    return (
        <>
            <form className='full-page-small narrow dialog' onSubmit={handleSubmit}>
                <div className='form-title'>
                    <h3>Register</h3>
                    <img src={closeIcon} alt='' onClick={() => { props.onClose(false) }} />
                </div>
                <div className='form-group'>
                    <label>Display Name</label>
                    <input onChange={(e) => { setFormData({ ...formData, display_name: e.target.value }) }} value={formData.display_name} type='text' placeholder='Display Name' />
                    <label>Username</label>
                    <input onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} value={formData.username} type='text' placeholder='Username' />
                    <label>Password</label>
                    <input onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} value={formData.password} type='password' placeholder='Password' />
                </div>
                <input type='submit' value='Register' />
            </form>
        </>
    )
}

export default RegisterForm