import Box, {BoxProps} from "@mui/material/Box";
import Drawer, {DrawerHeader} from "./Drawer";
import Navbar from "./Navbar";
import {useState} from "react";
import {styled} from '@mui/material/styles'

interface MainBoxProps extends BoxProps {
  open?: boolean
}

const MainBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<MainBoxProps>(({theme, open}) => ({
  display:'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: 'calc(100% - 240px)',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    width: `calc(100% - ${theme.spacing(8)})`
  },
}))

interface LayoutProps {
  children: JSX.Element;
}
export default function Layout(props: LayoutProps) {
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  }

  return <Box sx={{display: 'flex', minHeight: '100vh'}}>
    <Navbar open={isNavOpen}  toggle={toggleNav} />
    <Drawer open={isNavOpen} toggle={toggleNav}/>
    <MainBox component="main" sx={{flexDirection: 'column', display: 'flex'}}>
      <DrawerHeader />
      {props.children}
    </MainBox>
  </Box>
}