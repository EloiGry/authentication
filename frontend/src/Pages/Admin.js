import React from 'react';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/users';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';

const Admin = () => {
    const { getUsers } = useContext(UserContext)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers()
            .then(response => setUsers(response))
            
    }, [])

    if (!users) {
        return <h3>Loading...</h3>
      }
      console.log(users);
    return (
        <div>
            {users.map(user => 
                <h2> {user.username} </h2>)}

            <Link to="/auth/login"> <Button variant="outlined"> Log out </Button></Link>
        </div>
        

    );
};

export default Admin;