import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import fetch from 'unfetch'
import useHomeRedirect from '../../hooks/useHomeRedirect'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as S from './styles'

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password is too short')
    .required('Password is required')
})

export default function Signup () {
  const [serverMessage, setServerMessage] = useState('')

  const history = useHistory()

  useHomeRedirect()

  return (
    <S.Container>
      <S.Title>Sign up</S.Title>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API}/user/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })

            if (response.status === 409) {
              const json = await response.json()
              setServerMessage(json.message)
            }

            if (response.ok) {
              history.push('/login')
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
              type='text'
              name='email'
              onChange={handleChange}
              placeholder='Email'
              value={values.email}
              error={errors.email && touched.email ? errors.email : null}
            />
            <Input
              type='password'
              name='password'
              onChange={handleChange}
              placeholder='Password'
              value={values.password}
              error={errors.password && touched.password ? errors.password : null}
            />
            <Button type='submit'>Sign up</Button>
          </S.Form>
        )}
      </Formik>
    </S.Container>
  )
} 