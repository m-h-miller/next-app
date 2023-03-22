import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () => {
  return {
    props: {}
  }
}

export default function Home() {
  return (
    <>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.js</code>
        </p>
        <div style={{ display: 'flex' }}>
          <div style={{ alignSelf: 'right' }}>
            <Link
              className={styles.card}
              href="/login"
            >
              <h2 className={inter.className}>
                Log In <span>-&gt;</span>
              </h2>
            </Link>
          </div>
          <div style={{ alignSelf: 'right' }}>
            <Link
              className={styles.card}
              href="/register"
            >
              <h2 className={inter.className}>
                Sign Up <span>-&gt;</span>
              </h2>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.center}>
      </div>
    </>
  )
}
