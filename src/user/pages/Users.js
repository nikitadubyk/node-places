import React, { useState, useEffect } from 'react'
import { useHttp } from '../../shared/hooks/http-hook'
import UsersList from '../components/UsersList'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'

const Users = () => {
    const [usersData, setUsersData] = useState([])
    const { isLoading, error, clearError, sendRequest } = useHttp()

    const getUsers = async () => {
        await sendRequest('http://localhost:5000/api/users').then(setUsersData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            <UsersList items={usersData} />
        </>
    )
}

export default Users
