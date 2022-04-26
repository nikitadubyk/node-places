import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import Card from '../../shared/components/UIElements/Card'

import './PlaceForm.css'

const USER_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creatorId: '1',
    },
    {
        id: 'p2',
        title: 'Emp. State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584,
        },
        creatorId: '2',
    },
]

const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()
    const identefiPlace = USER_PLACES.find(place => place.id === id)

    const { inputHandler, formState, setFormData } = useForm(
        {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false },
        },
        true
    )

    useEffect(() => {
        if (identefiPlace) {
            setFormData(
                {
                    title: { value: identefiPlace.title, isValid: true },
                    description: {
                        value: identefiPlace.description,
                        isValid: true,
                    },
                },
                true
            )
        }
        setIsLoading(false)
    }, [identefiPlace, setFormData])

    const placeUpdateSubmitHandler = e => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    if (!identefiPlace) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could find place!</h2>
                </Card>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='center'>
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className='place-form' onSubmit={placeUpdateSubmitHandler}>
            <Input
                id='title'
                element='input'
                type='text'
                label='title'
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter valid title'
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id='description'
                element='textarea'
                label='Description'
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='Please enter valid descripcion (min. 5 characters)'
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type='submit' disabled={!formState.isValid}>
                UPDATE
            </Button>
        </form>
    )
}

export default UpdatePlace
