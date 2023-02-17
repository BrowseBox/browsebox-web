import React from 'react'
import * as Yup from 'yup'
import { Box, Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import axios from 'axios'

export default function Edit(props) {
  const { user, setUser } = props
  console.log(user)

  // check if this is needed @Jireh
  if (user === null) {
    axios.get('http://localhost:3001/get-user', { params: { id: localStorage.getItem('id') } }).then((res) => {
      if (res.status === 200) {
        setUser(res.data)
        // console.log(res.data)
      }
    })
  }

  const validationSchema = Yup.object().shape({
    user_name: Yup.string().required('Required'),
    email: Yup.string().email('You have enter an invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  })

  let formik = useFormik({
    initialValues: {
      user_name: user.user_name,
      email: user.user_email,
      password: user.user_password,
      id: localStorage.getItem('id'),
      img: user.user_img,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // axios.post('http://localhost:3001/update-user', values).then((res) => {
      //   a
      //   setUser(res)
      //   // console.log(res)
      // })
      axios.post('http://localhost:3001/update-user', values).then((res) => {
        if (res.status === 200) {
          setUser(res.data)
          // console.log(res.data)
        }
      })

      // console.log(values)
    },
  })

  // styles
  const textFieldStyle = {
    marginBottom: 10,
  }

  return (
    <>
      {user !== null && (
        <>
          {/* <Paper> */}
          <Box p={4}>
            <h1>Welcome {user.user_name}</h1>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="User Name"
                name="user_name"
                value={formik.values.user_name}
                onChange={formik.handleChange}
                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                helperText={formik.touched.user_name && formik.errors.user_name}
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
                Update
              </Button>
            </form>
          </Box>
        </>
      )}
      {/* <h1>Home</h1> */}
    </>
  )
}
