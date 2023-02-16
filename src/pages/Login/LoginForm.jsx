import { Box, Button, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'

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
      console.log(values)
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
