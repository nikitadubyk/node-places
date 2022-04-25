import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'

import './PlaceItem.css'

const PlaceItem = ({
    id,
    image,
    title,
    description,
    address,
    creator,
    location,
}) => {
    const [showMap, setShowMap] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    return (
        <>
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={address}
                contentClass='place-item__modal-content'
                footerClass='place-item__modal-action'
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className='map-container'>MAP</div>
            </Modal>
            <li className='place-item'>
                <Card className='place-item__content'>
                    <div className='place-item__image'>
                        <img src={image} alt={title} />
                    </div>
                    <div className='place-item__info'>
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className='place-item__actions'>
                        <Button inverse onClick={openMapHandler}>
                            VIEW ON MAP
                        </Button>
                        <Button to={`places/${id}`}>EDIT</Button>
                        <Button danger>DELETE</Button>
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
