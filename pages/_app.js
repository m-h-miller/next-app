import '@/styles/globals.css'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Navbar from '@/components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </main>
    </>
  )  
}
