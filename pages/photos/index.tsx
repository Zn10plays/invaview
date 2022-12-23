import Box from "@mui/material/Box";
import Layout from "../../components/layout/Layout";
import MicroNav from '../../components/photos/MicroNav'
import PhotoBook from "../../components/photos/PhotoBook";

export default function Photos() {

  return <Layout>
    <Box sx={{flex: '1 1'}}>
      <MicroNav />
      <PhotoBook />
    </Box>
  </Layout>
}