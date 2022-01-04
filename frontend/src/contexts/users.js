import { createContext } from 'react'

const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
    const findUser = () => {
        return fetch("http://localhost:5000/auth/login", {
            method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(),
            credentials: 'include'
          })
            .then(response => response.json())
            .then(data => data)
    }

    const getUsers = () => {
        return fetch ("http://localhost:5000/admin", {
            credentials: 'include'
          })
            .then(response => response.json())
            .then(data => data)
    }

    const value = {
        findUser,
        getUsers
    } 

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserContextProvider
}