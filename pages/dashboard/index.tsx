import Container from "@mui/material/Container";
import Layout from "../../components/layout/Layout";
import Grid from "@mui/material/Grid";
import ServiceDisplayGraph from "../../components/dashboard/ServiceDisplayGraph";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return <Layout>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: '100%'}}>
      {/*<Grid container gridColumn={12} spacing={2}>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <ServiceDisplayGraph getData={() => ''} name={"Image Management Service"} getStatus={() => 'active'} provider='GCP'/>*/}
      {/*  </Grid>*/}
      {/*  <Grid item xs={6}>*/}
      {/*    <ServiceDisplayGraph getData={() => 0} name={"Account Management Service"} getStatus={() => 'active'} provider='GCP'/>*/}
      {/*  </Grid>*/}
      {/*</Grid>*/}
      <Typography variant={'h1'} sx={{color: 'primary.main'}}>
        Work in progress
      </Typography>
    </Container>
  </Layout>
};