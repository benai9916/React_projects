import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.hello.useQuery({ text: 'client' });
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Aerialops</title>
        <meta name="description" content="Aerialops" />
      </Head>
      <header>
        <h4>Aerialops</h4>
      </header>

      <section>
        <p>{hello.data.greeting}</p>
      </section>

      <footer className={styles.footer}>
          <span className={styles.logo}>
            copyright
          </span>
      </footer>
    </div>
  )
}

export default Home
