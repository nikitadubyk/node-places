import React, { useReducer, useEffect } from 'react'

import { validate } from '../../util/validators'

import './Input.css'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators),
            }
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state
    }
}

const Input = ({
    id,
    element,
    type,
    placeholder,
    onInput,
    rows,
    label,
    errorText,
    validators,
}) => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false,
    })

    useEffect(() => {
        onInput(id, inputState.value, inputState.isValid)
    }, [id, onInput, inputState.value, inputState.isValid])

    const changeHandler = e => {
        dispatch({ type: 'CHANGE', val: e.target.value, validators })
    }

    const touchHandler = () => {
        dispatch({ type: 'TOUCH' })
    }

    const elementForm =
        element === 'input' ? (
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        ) : (
            <textarea
                id={id}
                rows={rows || 3}
                onChange={changeHandler}
                onBlur={touchHandler}
                value={inputState.value}
            />
        )

    return (
        <div
            className={`form-control ${
                !inputState.isValid &&
                inputState.isTouched &&
                'form-control--invalid'
            }`}
        >
            <label htmlFor={id}>{label}</label>
            {elementForm}
            {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
        </div>
    )
}

export default Input
