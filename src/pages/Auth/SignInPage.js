import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const handleChangeForm = useCallback((event) => {
        // console.log(form.username)
        setForm((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }, [])

    const handleClickLogin = useCallback(async () => {
        await axios.post('http://localhost:8000/api/login', {
            username: form.username,
            password: form.password
        })
        .then((response) => {
            console.log(response)
            if(response.status === 200){
                localStorage.setItem('token', response.data.data)
                alert('Berhasil Login')
                navigate('/dashboard')
            }
        })
    }, [form.username, form.password])

    return (
        <div>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input type="text" name='username' value={form.username} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(event) => handleChangeForm(event)}/>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' value={form.password} class="form-control" id="exampleInputPassword1" onChange={(event) => handleChangeForm(event)}/>
                </div>
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="button" class="btn btn-primary" onClick={() => handleClickLogin()}>Login</button>
            </form>
        </div>
    )
}

export default SignInPage