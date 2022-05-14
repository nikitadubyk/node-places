import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttp } from '../../shared/hooks/http-hook'

import { AuthContext } from '../../shared/context/auth-context'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import Card from '../../shared/components/UIElements/Card'

import './PlaceForm.css'

const UpdatePlace = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const [place, setPlace] = useState({})
    const { isLoading, error, sendRequest, clearError } = useHttp()
    const { id } = useParams()
    const { inputHandler, formState, setFormData } = useForm(
        {
            title: { value: '', isValid: false },
            description: { value: '', isValid: false },
        },
        true
    )

    useEffect(() => {
        const fetchPlace = async () => {
            const res = await sendRequest(
                `http://localhost:5000/api/places/${id}`
            )
            setPlace(res.place)
            console.log(res.place.title, res.place.description)
            setFormData(
                {
                    title: { value: res.place.title, isValid: true },
                    description: {
                        value: res.place.description,
                        isValid: true,
                    },
                },
                true
            )
        }

        fetchPlace()
    }, [])

    const placeUpdateSubmitHandler = async e => {
        e.preventDefault()
        await sendRequest(
            `http://localhost:5000/api/places/${id}`,
            'PATCH',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token,
            }
        )
        navigate(`/${auth.userId}/places`)
    }

    if (!place) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could find place!</h2>
                </Card>
            </div>
        )
    }

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            {isLoading && <LoadingSpinner asOverlay />}
            {!isLoading && place && (
                <form
                    className='place-form'
                    onSubmit={placeUpdateSubmitHandler}
                >
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
            )}
        </>
    )
}

export default UpdatePlace
