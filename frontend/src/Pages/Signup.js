import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const formik = useFormik({
        initialValues: {
            "username" : '',
            "email" : '',
            "password" : '',
            "passwordConfirmation" : '',
            "age" : ''

        },
    onSubmit: values => {
        values = {
            ...values
        }

        fetch("http://localhost:5000/auth/signup", {
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
                navigate('/auth/login')
            })
            .catch(
                err => setError(err)
            )
    },
    validationSchema: Yup.object({
        username: Yup.string().required('Username is required'),
        email: Yup.string().required('Email is required'),
        age: Yup.string().required('Age is required'),
        password: Yup.string().required('Password is required').min(8, 'Password is too short - should be 8 chars minimum.'),
        passwordConfirmation: Yup.string()
           .oneOf([Yup.ref('password'), null], 'Passwords must match')
      }),
      validateOnChange: false
    })

    

return (

        <div>
                {error && 'Error Serveur'}


            <form onSubmit={formik.handleSubmit}>
                <input 
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                placeholder='Username'
                />
                {formik.errors.username && <p>{formik.errors.username}</p>}

                <input 
                type='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder='Email'
                />
                {formik.errors.email && <p>{formik.errors.email}</p>}

                <input 
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder='Password'
                />
                {formik.errors.password && <p>{formik.errors.password}</p>}

                <input 
                type='password'
                name='passwordConfirmation'
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                placeholder='PasswordConfirmation'
                />
                {formik.errors.passwordConfirmation && <p>{formik.errors.passwordConfirmation}</p>}

                <input 
                type='number'
                name='age'
                value={formik.values.age}
                onChange={formik.handleChange}
                placeholder='Age'
                />
                {formik.errors.age && <p>{formik.errors.age}</p>}

                <button type='submit'> Submit </button>

            </form>

            
        </div>
    );
}

export default Signup;