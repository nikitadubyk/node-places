import React, { useRef } from 'react'

import Button from './Button'

import './ImageUpload.css'

const ImageUpload = ({ id, center }) => {
    const inputRef = useRef()

    const pickImageHandler = () => {
        inputRef.current.click()
    }

    const pickedHandler = e => {
        console.log(e.target)
    }

    return (
        <div className='form-controll'>
            <input
                ref={inputRef}
                id={id}
                style={{ display: 'none' }}
                type='file'
                accept='.jpg, .png, .jpeg'
                onChange={pickedHandler}
            />

            <div className={`image-upload ${center && 'center'}`}>
                <div className='image-upload__preview'>
                    <img src='' alt='Preview' />
                </div>
                <Button type='button' onClick={pickImageHandler}>
                    PICK IMAGE
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload
