import Container from "@mui/material/Container";
import Layout from "../../components/layout/Layout";
import Grid from "@mui/material/Grid";
import ServiceDisplayGraph from "../../components/dashboard/ServiceDisplayGraph";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return <Layout>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%'}}>
      <Typography variant={'h1'} sx={{color: 'primary.main'}}>
        Work in progress
      </Typography>
    </Container>
  </Layout>
};