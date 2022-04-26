import React, { useState } from 'react'

import Card from '../../shared/components/UIElements/Card'
import Button from '../../shared/components/FormElements/Button'
import Modal from '../../shared/components/UIElements/Modal'
import Map from '../../shared/components/UIElements/Map'

import './PlaceItem.css'

const PlaceItem = ({
    id,
    image,
    title,
    description,
    address,
    creatorId,
    coordinates,
}) => {
    const [showMap, setShowMap] = useState(false)
    const [showConfirmed, setShowConfirmed] = useState(false)

    const openMapHandler = () => setShowMap(true)
    const closeMapHandler = () => setShowMap(false)

    const showDeleteWarningHandler = () => setShowConfirmed(true)
    const closeDeleteWarningHandler = () => setShowConfirmed(false)

    const confirmDeleteHandler = () => {
        setShowConfirmed(false)
        console.log('DELETE')
    }

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
                <div className='map-container'>
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>

            <Modal
                show={showConfirmed}
                onCancel={closeDeleteWarningHandler}
                header={'Are you shure?'}
                footerClass='place-item__modal-action'
                footer={
                    <>
                        <Button inverse onClick={closeDeleteWarningHandler}>
                            CANSEL
                        </Button>
                        <Button danger onClick={confirmDeleteHandler}>
                            DELETE
                        </Button>
                    </>
                }
            >
                <p>Do you want to proceed and delete this place?</p>
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
                        <Button to={`/places/${id}`}>EDIT</Button>
                        <Button danger onClick={showDeleteWarningHandler}>
                            DELETE
                        </Button>
                    </div>
                </Card>
            </li>
        </>
    )
}

export default PlaceItem
