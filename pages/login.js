import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap';
import useNotification from '../hooks/useNotification';

export default function Login() {
  const router = useRouter();

  const { addNotification } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
  const data = {
    email: event.target.email.value,
    password: event.target.password.value,
  }
      
  const response = await fetch('/api/auth', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      
    const result = await response.json()
      
    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/feed');
    } else {
      addNotification({
        message: result.error ? result.error : "Failed to authenticate.", 
        status: "danger"
      })
    }
  }
  return (
    <>
      <div className={styles.description} style={{ justifyContent: 'space-around' }}>

        <Container fluid="md">
          <p>Login&nbsp;</p>
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
