import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useJwtExpiration from '../../hooks/useJwtExpiration'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as S from './styles'
import useLoginRedirect from '../../hooks/useLoginRedirect'

const SubmitSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title is too short')
    .required('Title is required'),
  url: Yup.string()
    .url()
})

export default function Submit () {
  useJwtExpiration()
  useLoginRedirect()

  const history = useHistory()

  return (
    <S.Container>
      <Formik
        initialValues={{
          title: '',
          url: '',
        }}
        validationSchema={SubmitSchema}
        onSubmit={async (values): Promise<void> => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API}/posts`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify(values)
            })

            if (response.ok) {
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
            <Input
              type='text'
              name='title'
              onChange={handleChange}
              placeholder='Title'
              value={values.title}
              error={errors.title && touched.title ? errors.title : null}
            />
            <Input
              type='text'
              name='url'
              onChange={handleChange}
              placeholder='Url'
              value={values.url}
              error={errors.url && touched.url ? errors.url : null}
            />
            <Button type='submit'>Submit</Button>
          </S.Form>
        )}
      </Formik>
    </S.Container>
  )
}