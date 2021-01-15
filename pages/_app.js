import '../styles/globals.css';
import React from 'react';
import { GlobalProvider } from "../context/GlobalContext";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
  ); 
}

export default MyApp
