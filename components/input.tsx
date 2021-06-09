import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'

const Input = ({ name, ...rest }) => {
    const inputRef = useRef()

    const { fieldName, defaultValue, registerField } = useField(name)

    useEffect(() => {
        registerField({
          name: fieldName,
          ref: inputRef,
          getValue: ref => {
            return ref.current.value
          },
          setValue: (ref, value) => {
            ref.current.value = value
          },
          clearValue: ref => {
            ref.current.value = ''
          },
        })
      }, [fieldName, registerField])

  return (
    <input
      name={name}
      ref={inputRef}
      type="text"
      placeholder="Type your username"
      {...rest}
    />
  )
}

export default Input