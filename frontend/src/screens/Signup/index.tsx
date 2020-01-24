import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import fetch from 'unfetch'
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
  return (
    <S.Container>
      <h1>Sign up</h1>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          try {
            await fetch(`${process.env.REACT_APP_API}/user/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(values)
            })
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