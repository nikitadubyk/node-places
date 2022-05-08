import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useHttp } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import PlaceList from '../components/PlaceList'

const UserPlaces = () => {
    const [userPlaces, setUserPlaces] = useState([])
    const { isLoading, sendRequest } = useHttp()
    const { userId } = useParams()

    useEffect(() => {
        const fetchPlaces = async () => {
            await sendRequest(
                `http://localhost:5000/api/places/user/${userId}`
            ).then(res => setUserPlaces(res.place))
        }

        fetchPlaces()
    }, [sendRequest, userId])

    const onDelete = deletePlaceId => {
        setUserPlaces(prevPlaces =>
            prevPlaces.filter(place => place.id !== deletePlaceId)
        )
    }

    return (
        <>
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && userPlaces && (
                <PlaceList items={userPlaces} onDelete={onDelete} />
            )}
        </>
    )
}

export default UserPlaces
