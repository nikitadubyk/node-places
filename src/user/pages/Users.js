import React, { useState, useEffect } from 'react'
import { useHttp } from '../../shared/hooks/http-hook'
import UsersList from '../components/UsersList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'

const Users = () => {
    const [usersData, setUsersData] = useState([])
    const { isLoading, sendRequest } = useHttp()

    const getUsers = async () => {
        await sendRequest('http://localhost:5000/api/users').then(setUsersData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            <UsersList items={usersData} />
        </>
    )
}

export default Users
