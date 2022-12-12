import { CSSObject, Theme, styled } from "@mui/material/styles";
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import NavList from "./NavList";
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from "@mui/material/IconButton";

export const drawerWidth = 240;

const openedMixin = (theme: Theme, open?: boolean): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.between('sm', 'md')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  [theme.breakpoints.down('sm')]: {
    width: open ? `calc(${theme.spacing(8)} + 1px)` : 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }
});

// a class to add space for the header
export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  textAlign: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  // backgroundColor: theme.palette.divider
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...openedMixin(theme, open),
    '& .MuiDrawer-paper': openedMixin(theme, open),
  }),
);

interface DrawerProps {
  open: boolean;
  toggle: () => void;
}

export default function NavDrawer(props: DrawerProps) {
  return <Drawer variant='permanent' open={props.open} sx={{flex: 'initial', sx: {variant: 'temporary'} }}>
    <DrawerHeader/>
    <Divider/>
    <NavList />
  </Drawer>
}