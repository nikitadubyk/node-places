import React from 'react'

import PlaceItem from './PlaceItem'
import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'

import './PlaceList.css'

const PlaceList = ({ items }) => {
    if (items.length === 0) {
        return (
            <div>
                <Card>
                    <h2 className='place-list center'>
                        No places found. Maybe create one?
                    </h2>
                    <Button>Share place</Button>
                </Card>
            </div>
        )
    }
    return (
        <ul className='place-list'>
            {items.map(place => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.imageUrl}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            ))}
        </ul>
    )
}

export default PlaceList