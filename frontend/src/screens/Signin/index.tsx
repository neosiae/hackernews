import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import fetch from 'unfetch'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as S from './styles'

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Password is required')
})

export default function Signin () {
  const [serverMessage, setServerMessage] = useState('')

  const history = useHistory()

  return (
    <S.Container>
      <S.Title>Sign in</S.Title>
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={SigninSchema}
        onSubmit={async (values) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API}/user/signin`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })

            if (response.status === 401) {
              const json = await response.json()
              setServerMessage(json.message)
            }

            if (response.status === 404) {
              const json = await response.json()
              setServerMessage(json.message)
            }

            if (response.ok) {
              const json = await response.json()

              localStorage.setItem('token', json.token)

              history.push('/')
            }
          } catch (err) {
            console.error(err)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit
        }) => (
          <S.Form onSubmit={handleSubmit}>
            <S.ServerMessage>{serverMessage}</S.ServerMessage>
            <Input
              type='text'
              name='username'
              onChange={handleChange}
              placeholder='Username'
              value={values.username}
              error={errors.username && touched.username ? errors.username : null}
            />
            <Input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Password'
              value={values.password}
              error={errors.password && touched.password ? errors.password : null}
            />
            <Button type='submit'>Sign in</Button>
          </S.Form>
        )}
      </Formik>
    </S.Container>
  )
} 