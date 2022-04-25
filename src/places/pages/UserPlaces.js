import React from 'react'
import { useParams } from 'react-router-dom'

import PlaceList from '../components/PlaceList'

const USER_PLACES = [
    {
        id: 1,
        imageUrl:
            'https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg',
        title: 'Test Title',
        description: 'Some description to the place',
        address: 'Kirova 6',
        creatorId: '1',
        location: '1234',
    },
    {
        id: 2,
        imageUrl:
            'https://www.planetware.com/wpimages/2019/11/india-best-places-to-visit-agra.jpg',
        title: 'Test Title',
        description: 'Some description to the place',
        address: 'Kirova 6',
        creatorId: '2',
        location: '1234',
    },
]

const UserPlaces = () => {
    const { userId } = useParams()
    const loadedPlaces = USER_PLACES.filter(place => place.creatorId === userId)
    return <PlaceList items={loadedPlaces} />
}

export default UserPlaces
