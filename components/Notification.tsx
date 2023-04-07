import Toast from 'react-bootstrap/Toast';
import useNotification from "../hooks/useNotification";

function Notification() {
  const { notification, removeNotification } = useNotification();

  let variant = "light";
  if (notification?.status === "danger") {
    variant = "danger"
  }

  return (
    <Toast
        show={!!notification?.message}
        onClose={removeNotification}
        style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            zIndex: 1,
        }}
        bg={variant}
    >
        <Toast.Header>
        <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{notification?.message}</Toast.Body>
    </Toast>
  );
}

export default Notification;