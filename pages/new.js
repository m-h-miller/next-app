import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { NotificationManager } from 'react-notifications';
import useSWR from "swr";
import storage from "@/utils/storage";

export default function Login() {
  const router = useRouter();
  const { data: currentUser, mutate } = useSWR("user", storage);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        title: event.target.title.value,
        content: event.target.content.value,
      }
  
      const response = await fetch('/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Session-Token': currentUser.sessionToken,
          'User-Id': currentUser.id,
        },
        body: JSON.stringify(data),
      })
  
      const result = await response.json()
  
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/feed');
      } else {
        NotificationManager.error("Failed to authenticate");
      }
    } catch (e) {
      console.error(e);
      NotificationManager.error("An error occurred");
      
    }

  }
  return (
    <>
      <div
        className={styles.description}
        style={{
          justifyContent: 'space-around',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto', 
        }}>
        <p>New&nbsp;</p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: '80%'
        }}>
          <input type="text" name="title" placeholder="Title" style={{ padding: '0.75rem 1.5rem', marginBottom: '2rem' }} />
          <textarea id="content" name="content" placeholder="Content..." style={{ padding: '0.75rem 1.5rem' }} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
