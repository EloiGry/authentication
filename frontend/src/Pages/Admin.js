import React from 'react';
import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../contexts/users';

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
        </div>
    );
};

export default Admin;