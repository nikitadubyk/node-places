import React, { useState, useContext } from 'react'
import { useForm } from '../../shared/hooks/form-hook'
import { AuthContext } from '../../shared/context/auth-context'

import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import Card from '../../shared/components/UIElements/Card'
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MIN,
    VALIDATOR_REQUIRE,
} from '../../shared/util/validators'

import './Auth.css'

const Auth = () => {
    const auth = useContext(AuthContext)
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

    const onSubmitAuthHandler = e => {
        e.preventDefault()
        auth.loggin()
        console.log(formState.inputs)
    }

    return (
        <div className='authentication'>
            <Card>
                <div className='authentication__header'>
                    <h2>{isLogin ? 'LOGIN' : 'SINGUP'}</h2>
                </div>
                <hr />
                <form onSubmit={onSubmitAuthHandler}>
                    {!isLogin && (
                        <Input
                            element='input'
                            id='name'
                            type='text'
                            label='Your Name'
                            onInput={inputHandler}
                            errorText='Please enter your name'
                            validators={[VALIDATOR_REQUIRE()]}
                        />
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
                        errorText='Please type a valid password (min. 5 characters)'
                        onInput={inputHandler}
                        validators={[VALIDATOR_MIN(5)]}
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
    )
}

export default Auth
