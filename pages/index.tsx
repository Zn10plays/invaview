import Box from '@mui/material/Box'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person'
import DashboardIcon from '@mui/icons-material/Dashboard'
import {useAuthState, useSignOut} from "react-firebase-hooks/auth";
import { auth } from '../firebase/firebase'
import Backdrop from "@mui/material/Backdrop";
import LoginForm from "../components/login/LoginForm";
import {useState} from "react";
import Alert from "@mui/material/Alert";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [showDrop, setShowDrop] = useState(false);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  const handleToggleBackdrop = () => {
    setShowDrop(!showDrop);
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
          <Typography variant="subtitle2" sx={{span: {color: 'secondary.lite'}}}>
            <span>Welcome</span> to
          </Typography>
        </Box>
        <Typography variant="h1" sx={{my: 1, 'span': {color: 'secondary.dark'}}}>
          Inva<span>Dev</span>
        </Typography>
        <Box sx={{textAlign: 'center'}}>
          {!user &&
            <Button variant="contained" color="primary" startIcon={<PersonIcon/>} onClick={() => handleToggleBackdrop()}>
              Login
            </Button>
          }
          {user &&
          <Box>
            <Alert sx={{my:1}}>
              Signed in as {user.email}
            </Alert>
            <Box sx={{display: 'flex'}}>
              <Button color='error' sx={{flex: '1 1'}} startIcon={<PersonIcon/>} onClick={signOut}>
                Sign out
              </Button>
              <Button variant="outlined" color="primary" sx={{flex: '1 1'}} startIcon={<DashboardIcon/>}>
                Dashboard
              </Button>
            </Box>
          </Box>
          }
        </Box>
        <Backdrop open={showDrop}>
          <LoginForm onCancel={handleToggleBackdrop} onSignedIn={handleToggleBackdrop} />
        </Backdrop>
      </Box>
  </Box>
  )
}
