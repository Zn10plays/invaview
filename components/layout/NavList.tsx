import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles'
import Link from 'next/link';

import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsIcon from '@mui/icons-material/Collections';
import PersonIcon from "@mui/icons-material/Person";

const ListItemIcon = styled(MuiListItemIcon) (({theme}) => ({
  marginRight: theme.spacing(3),
}))


const ListItemText = styled(MuiListItemText) (({theme}) => ({
  opacity: '0',
  transition: theme.transitions.create('opacity', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.up('md')]: {
    opacity: '100',
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
  }
}))

interface Route {
  title: string,
  to: string,
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}
const routes: Route[] = [
  {
    title: 'Dashboard',
    to: 'dashboard',
    icon: DashboardIcon
  },
  {
    title: 'Photos',
    to: 'photos',
    icon: CollectionsIcon
  },
  {
    title: 'Account',
    to: 'account',
    icon: PersonIcon
  }
]

interface NavListProps {
  open?: boolean
}

export default function NavList(props: NavListProps) : JSX.Element {
  return (
    <List>
      {routes.map(route =>
        <ListItem disablePadding sx={{ display: 'block' }} key={route.title}>
          <Link href={route.to}>
            <ListItemButton sx={{minHeight: 48, justifyContent: 'initial', px: 2.5}}>
              <ListItemIcon sx={{minWidth: 0}}>
                <route.icon />
              </ListItemIcon>
              <ListItemText primary={route.title} />
            </ListItemButton>
          </Link>
        </ListItem>
      )}
    </List>
  )
}
