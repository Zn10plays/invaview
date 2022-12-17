import Box from "@mui/material/Box";
import Drawer, {DrawerHeader} from "./Drawer";
import Navbar from "./Navbar";
import {useState} from "react";

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
    <Box component="main" sx={{display: 'flex', flexDirection: 'column', flexGrow: 1}}>
      <DrawerHeader sx={{flex: 'none'}} />
      {props.children}
    </Box>
  </Box>
}