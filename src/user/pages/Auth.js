import React, { useState, useContext } from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'
import { useHttp } from '../../shared/hooks/http-hook'

import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MIN,
    VALIDATOR_REQUIRE,
} from '../../shared/util/validators'

import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext)
    const { sendRequest, isLoading, error, clearError } = useHttp()
    const [isLogin, setInLogin] = useState(true)

    const { formState, inputHandler, setFormData } = useForm(
        {
            email: { value: '', isValid: false },
            password: { value: '', isValid: false },
        },
        false
    )

    const switchModeHandler = () => {
        if (!isLogin) {
            setFormData(
                {
                    ...formState.inputs,
                    name: { undefined },
                },
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
            )
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: { value: '', isValid: false },
                },
                false
            )
        }
        setInLogin(!isLogin)
    }

    const onSubmitAuthHandler = async e => {
        e.preventDefault()

        if (isLogin) {
            const res = await sendRequest(
                'http://localhost:5000/api/users/login',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                }),
                {
                    'Content-Type': 'application/json',
                }
            )
            auth.loggin(res.existingUser.id)
        } else {
            const res = await sendRequest(
                'http://localhost:5000/api/users/singup',
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value,
                    name: formState.inputs.name.value,
                }),
                {
                    'Content-Type': 'application/json',
                }
            )
            auth.loggin(res.user.id)
        }
    }

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
            <div className='authentication'>
                <Card>
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className='authentication__header'>
                        <h2>{isLogin ? 'LOGIN' : 'SINGUP'}</h2>
                    </div>
                    <hr />
                    <form onSubmit={onSubmitAuthHandler}>
                        {!isLogin && (
                            <>
                                <Input
                                    element='input'
                                    id='name'
                                    type='text'
                                    label='Your Name'
                                    onInput={inputHandler}
                                    errorText='Please enter your name'
                                    validators={[VALIDATOR_REQUIRE()]}
                                />
                                <ImageUpload id='image' center />
                            </>
                        )}
                        <Input
                            id='email'
                            type='email'
                            element='input'
                            label='Email'
                            onInput={inputHandler}
                            errorText='Please type a valid email address'
                            validators={[VALIDATOR_EMAIL()]}
                        />
                        <Input
                            id='password'
                            type='password'
                            element='input'
                            label='Password'
                            errorText='Please type a valid password (min. 6 characters)'
                            onInput={inputHandler}
                            validators={[VALIDATOR_MIN(6)]}
                        />
                        <Button type='submit' disabled={!formState.isValid}>
                            {isLogin ? 'LOGIN' : 'SIGNUP'}
                        </Button>
                    </form>
                    <Button inverse onClick={switchModeHandler}>
                        SWICH TO {isLogin ? 'SIGNUP' : 'LOGIN'}
                    </Button>
                </Card>
            </div>
        </>
    )
}

export default Auth
