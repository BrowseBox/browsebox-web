import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'

export default function SignupForm(props) {
  const { handleCloseSignupModal } = props
  // const [schools, setSchools] = React.useState([])

  // React.useEffect(() => {
  //   axios.post('http://localhost:3001/get-schools').then((res) => {
  //     if (res.status === 200) {
  //       setSchools(res.data)
  //       // console.log(res.data)
  //     }
  //   })
  // }, [])
  // console.log(schools)

  // form validation
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Required'),
    email: Yup.string().email('You have enter an invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      imageLocation: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      values.email = values.email.toLowerCase()

      // console.log(values)

      axios
        .post('http://localhost:3001/add-user', values)
        .then((res) => {
          if (res.status === 200) {
            handleCloseSignupModal()
            alert('User successfully created')
          } else Promise.reject()
        })
        .catch((err) => alert('Something went wrong'))
    },
  })

  // avatar
  const avatar = createAvatar(initials, {
    seed: formik.values.username,
  })

  const svg = avatar.toString() // change this to data uri
  formik.values.imageLocation = svg
  // console.log(svg)

  // styles
  const textFieldStyle = {
    marginBottom: 10,
  }

  return (
    <Box mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          variant="outlined"
          fullWidth
          style={textFieldStyle}
        />
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
          Sign Up
        </Button>
      </form>
    </Box>
  )
}
