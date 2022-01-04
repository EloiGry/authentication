import React from 'react';
import { useContext, useState } from "react"
import { useFormik } from "formik"

import { UserContext } from '../contexts/users';
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const { findUser } = useContext(UserContext)

    

    const formik = useFormik({
        initialValues: {
            "username" : '',
            "password" : ''
        },
    onSubmit: values => {
        values = {
            ...values
        }

        fetch("http://localhost:5000/auth/login", {
            method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
            credentials: 'include'
          })
            .then(response => {
                if (response.status >= 400) {
                    throw response.statusText
                } else {
                    return response.json()
                }
            })
            .then(data => {
                console.log("data", data);
                navigate('/admin')
            })
            .catch(
                err => setError(err)
            )
    }
    })

    return (
        <div>
            {error && "User Not Found"}
            <form onSubmit={formik.handleSubmit}>
                <input 
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder='Email'
                />

<               input 
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Password'
                />
                <button type='submit'> Submit </button>
            </form>
            
        </div>
    );
};

export default Login;