import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App({ Component, pageProps }: AppProps) {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

  return <ThemeProvider theme={darkTheme}>
    <Paper sx={{height: '100vh'}} square>
      <Component {...pageProps} />
    </Paper>
  </ThemeProvider>
}
