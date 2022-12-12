import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles'
import Menu from '@mui/icons-material/Menu';
import {useAuthState} from "react-firebase-hooks/auth";
import Link from "next/link";
import Skeleton from "@mui/material/Skeleton";
import {auth} from "../../firebase/firebase";
import Icon from "@mui/material/Icon";
import PersonIcon from '@mui/icons-material/Person'

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
  marginLeft: drawerWidth,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  [theme.breakpoints.up('sm')]: {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: `calc(100% - ${theme.spacing(8)})`,
  },
  ...(open && {
    width: `calc(100% - ${theme.spacing(8)})`,
  })
}))

const MenuButton = styled(IconButton) (({theme}) => ( {
  display: 'none',
  transition: theme.transitions.create('display', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.down('sm')]: {
    display: 'flex'
  }
}))

interface NavbarProps {
  open: boolean;
  toggle: (open?: boolean) => void;
}

export default function Navbar(props: NavbarProps) {

  const [user, loading, error] = useAuthState(auth);

  return <AppBar position={'fixed'} sx={{display: 'flex'}} open={props.open}>
    <Toolbar>
      <MenuButton onClick={() => {props.toggle()}}>
        <Menu color='action' />
      </MenuButton>
      <Icon sx={{ mr: 1, mb: 1 }}>I</Icon>
      <Typography
        variant="h6"
        noWrap
        component={Link}
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
        }}
      >
        Invadev
      </Typography>
      <span style={{flex: '1 1'}}/>
      { loading && <Skeleton variant="circular" width={40} height={40} />}
      {!loading && <Avatar>
        {user?.photoURL && <img src={user.photoURL} alt="user image" width={50}/>}
        {!user?.photoURL && <PersonIcon/>}
      </Avatar>}
    </Toolbar>
  </AppBar>
}