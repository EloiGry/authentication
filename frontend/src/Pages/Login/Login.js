import React from 'react';
import { useContext, useState } from "react"
import { useFormik } from "formik"
import './Login.css'

import { UserContext } from '../../contexts/users';
import { useNavigate, Link } from "react-router-dom"



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
        <>
            {error && "User Not Found"}
            <div id="card">
                <div id="card-content"> 
                    <div id="card-title">
                        <h2>LOGIN</h2>
                        <div className="underline-title"></div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="form">
                            <input 
                            type='text'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            placeholder='Email'
                            id="user-email" 
                            className="form-content"
                            />
                            <div className="form-border"></div>

                            <input 
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder='Password'
                            id="user-password" 
                            className="form-content"
                            />
                            <div className="form-border"></div>
                            <input type='submit' name="submit" value="LOGIN" id="submit-btn" />
                            <Link id='signup' to='/auth/signup'> Don't have account yet? </Link>
                    </form>
            </div>
            </div>
            
        </>
        
    );
};

export default Login;