import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'

export default function Login() {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json()

    if (result) {
      console.log({ result })
      router.push('/feed')
    }
  }

  return (
    <>
      <div className={styles.description} style={{ justifyContent: 'space-around' }}>
        <p>
          Login&nbsp;
          <code className={styles.code}>pages/index.js</code>
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
