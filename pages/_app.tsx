import '../styles/globals.css'
import type { AppProps } from 'next/app'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return <ThemeProvider theme={theme}>
    <Paper sx={{minHeight: '100vh'}} square>
      <Component {...pageProps} />
    </Paper>
  </ThemeProvider>
}
