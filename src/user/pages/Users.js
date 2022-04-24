import React from 'react'
import UsersList from '../components/UsersList'

const Users = () => {
    const USERS_DB = [
        {
            id: 1,
            name: 'Nikita',
            places: 2,
            img: 'https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg',
        },
    ]
    return <UsersList items={USERS_DB} />
}

export default Users
