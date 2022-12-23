import Container from "@mui/material/Container";
import Layout from "../../components/layout/Layout";
import Typography from "@mui/material/Typography";

export default function Dashboard() {
  return <Layout>
    <Container sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 1}}>
      <Typography variant={'h2'} sx={{color: 'primary.main', whiteSpace: 'break'}}>
        Work in progress
      </Typography>
    </Container>
  </Layout>
};