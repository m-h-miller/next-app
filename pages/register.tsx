import { useRouter } from 'next/router'
import styles from '@/styles/Home.module.css'
import { Container } from 'react-bootstrap';
import useNotification from '../hooks/useNotification';
import React from 'react';

export default function Login() {
  const router = useRouter();
  const { addNotification } = useNotification();

  const handleSubmit = React.useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const e = (event.target as HTMLFormElement)

    const data = {
      email: e.email.value,
      password: e.password.value,
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
      if (result.error) {
        addNotification({
          message: result.error,
          status: "danger"
        });
      } else {
        router.push('/login');
      }
    }
  }, [])

  return (
    <>
      <div className={styles.description} style={{ justifyContent: 'space-around' }}>
        <Container>
          <p>Register</p>

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
        </Container>
      </div>
    </>
  );
}
