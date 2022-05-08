import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../shared/context/auth-context'
import { useHttp } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'

import './PlaceForm.css'

const NewPlace = () => {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const { isLoading, error, sendRequest, clearError } = useHttp()
    const { formState, inputHandler } = useForm(
        {
            title: {
                value: '',
                isValid: false,
            },
            description: {
                value: '',
                isValid: false,
            },
            address: {
                value: '',
                isValid: false,
            },
        },
        false
    )

    const placeSubmit = async e => {
        e.preventDefault()
        await sendRequest(
            'http://localhost:5000/api/places',
            'POST',
            JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId,
            }),
            {
                'Content-Type': 'application/json',
            }
        )
        navigate('/')
    }

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <form className='place-form' onSubmit={placeSubmit}>
                {isLoading && <LoadingSpinner asOverlay />}
                <Input
                    id='title'
                    element='input'
                    type='text'
                    label='Title'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid title.'
                    onInput={inputHandler}
                />
                <Input
                    id='description'
                    element='textarea'
                    label='Description'
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText='Please enter a valid description (at least 5 characters).'
                    onInput={inputHandler}
                />
                <Input
                    id='address'
                    element='input'
                    label='Address'
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText='Please enter a valid address'
                    onInput={inputHandler}
                />
                <Button type='submit' disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </>
    )
}

export default NewPlace
