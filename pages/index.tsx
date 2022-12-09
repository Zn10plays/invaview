import Box from '@mui/material/Box'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PersonICon from '@mui/icons-material/Person'
import { styled } from '@mui/material/styles'
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../firebase/firebase'

interface ColoredTitleProps {
  variant: string;
  component: string;
}
const ColoredTitle = styled(Typography)<ColoredTitleProps> (({theme}) => ({
  color: theme.palette.secondary.dark,
}))

export default function Home() {
  const [user, loading, error] = useAuthState(auth);

  const handleLogin = () => {

  }

  return (
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Head>
        <title>Invadev</title>
        <meta name="description" content="Project management by Zn10plays" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Box>
          <Typography variant="subtitle2">
            Welcome to
          </Typography>
        </Box>
        <Typography variant="h1" sx={{my: 1}}>
          Inva<ColoredTitle variant='h1' component='span'>Dev</ColoredTitle>
        </Typography>
        <Box sx={{textAlign: 'center'}}>
          {!user &&
            <Button variant="contained" color="primary" startIcon={<PersonICon/>} onClick={() => handleLogin()}>
              Login
            </Button>
          }
          {user &&
            <Button variant="outlined" color="primary" startIcon={<PersonICon/>}>
              Dashboard
            </Button>
          }
        </Box>
      </Box>
  </Box>
  )
}
