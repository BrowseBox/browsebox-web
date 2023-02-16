import { Box, Button, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'

export default function LoginForm() {
  // form valiation
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('You have enter an invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.email = values.email.toLowerCase()

      console.log(values)

      axios
        .post('http://localhost:3001/login-user', values)
        .then((res) => {
          if (res.status === 200) {
            alert('User successfully logged in')
            //save username and imageLocation in local storage
            // console.log(res.data)
            localStorage.setItem('id', res.data.user_id)
          } else Promise.reject()
        })
        .catch((err) => alert('Something went wrong'))
    },
  })

  // styles
  const textFieldStyle = {
    marginBottom: 10,
  }

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="outlined"
          fullWidth
          style={textFieldStyle}
        />
        <TextField
          label="Password"
          name="password"
          value={formik.values.password}
          type="password"
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="outlined"
          fullWidth
          style={textFieldStyle}
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            mt: 1,
          }}>
          Login
        </Button>
      </form>
    </Box>
  )
}
