// ** React Imports
import { useState, Fragment } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import { rootUrl } from 'src/@core/utils/constants'

import { useNavigate } from "react-router-dom";

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  const [matchingValues, setMatchingValues] = useState({
    matchingPassword: '',
    showMatchingPassword: false
  })

  // ** Hook
  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleMatchingChange = prop => event => {
    setMatchingValues({ ...matchingValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickShowMatchingPassword = () => {
    setMatchingValues({ ...matchingValues, showMatchingPassword: !matchingValues.showMatchingPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const handleMouseDownMatchingPassword = event => {
    event.preventDefault()
  }

  const handleSubmit = event => {
    event.preventDefault();
    formik.handleSubmit();
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      matchingPassword: ''
    },
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,

    onSubmit: async () => {
      const newUser = formik.values
      const url = rootUrl + "/register"
      //const navigate = useNavigate();
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const result = await response.text();
        if (result == "success") {
          window.location.href = "/pages/confirm";
        }
        return result;

        
      } catch (error) {
        alert(error)
        throw error
      }
    }
  })

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src='../../../../images/favicon.png' width='25' />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Crea tu cuenta 🚀
            </Typography>
          </Box>
          {formik.errors.firstName && <p style={{ color: 'red', fontSize: 11 }}>❗ {formik.errors.firstName}</p>}
          <form onSubmit={handleSubmit}>
            <TextField
              value={formik.values.firstName}
              onChange={event => formik.setFieldValue('firstName', event.target.value)}
              autoFocus
              fullWidth
              id='firstName'
              label='Nombre'
              sx={{ marginBottom: 4 }}
            />
            
            {formik.errors.lastName && <p style={{ color: 'red', fontSize: 11 }}>❗ {formik.errors.lastName}</p>}
            <TextField
              value={formik.values.lastName}
              onChange={event => formik.setFieldValue('lastName', event.target.value)}
              autoFocus
              fullWidth
              id='lastName'
              label='Apellido'
              sx={{ marginBottom: 4 }}
            />
            {formik.errors.email && <p style={{ color: 'red', fontSize: 11 }}>❗ {formik.errors.email}</p>}
            <TextField
              autoCapitalize='none'
              value={formik.values.email}
              onChange={event => formik.setFieldValue('email', event.target.value)}
              autoFocus
              fullWidth
              type='email'
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            
            {formik.errors.password && <p style={{ color: 'red', fontSize: 11 }}>❗ {formik.errors.password}</p>}
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-password'>Password</InputLabel>
              <OutlinedInput
                value={formik.values.password}
                onChange={event => {
                  
                  formik.setFieldValue('password', event.target.value)
                }}
                id='auth-register-password'
                label='Password'
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ marginBottom: 4 }}
              />
            </FormControl>
            {formik.errors.matchingPassword && (
              <p style={{ color: 'red', fontSize: 11 }}>❗ {formik.errors.matchingPassword}</p>
            )}
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-register-matchingPassword'>Confirmar password</InputLabel>
              <OutlinedInput
                value={formik.values.matchingPassword}
                onChange={event => {formik.setFieldValue('matchingPassword', event.target.value)}}
                id='auth-register-matchingPassword'
                label='Confirmar password'
                type={matchingValues.showMatchingPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowMatchingPassword}
                      onMouseDown={handleMouseDownMatchingPassword}
                      aria-label='toggle matching password visibility'
                    >
                      {matchingValues.showMatchingPassword ? (
                        <EyeOutline fontSize='small' />
                      ) : (
                        <EyeOffOutline fontSize='small' />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ marginBottom: 4 }}
              />
            </FormControl>
            

            <Button
              type="submit"
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              Registrarse
            </Button>
            </form>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                ¿Ya tienes una cuenta?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/pages/login'>
                  <LinkStyled>Inicia sesión aquí</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>ó</Divider>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Facebook sx={{ color: '#497ce2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Twitter sx={{ color: '#1da1f2' }} />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Github
                    sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                  />
                </IconButton>
              </Link>
              <Link href='/' passHref>
                <IconButton component='a' onClick={e => e.preventDefault()}>
                  <Google sx={{ color: '#db4437' }} />
                </IconButton>
              </Link>
            </Box>
          
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

function validationSchema() {
  return {
    firstName: Yup.string().required('Ingrese su nombre'),
    lastName: Yup.string().required('Ingrese su apellido'),
    email: Yup.string().email('El email no es válido').required('Ingrese un email'),
    password: Yup.string()
      .required('Ingrese una contraseña')
      .min(8, 'La contraseña es muy corta, debe tener 8 caracteres como mínimo'),
    matchingPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
  }
}

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>



export default RegisterPage
