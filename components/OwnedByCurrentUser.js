import useSWR from "swr";
import storage from "@/utils/storage";

const OwnedByCurrentUser = ({ ownerId, children }) => {
  const { data: currentUser } = useSWR("user", storage);
  const isOwner = ownerId === currentUser?.id;
  if (isOwner) {
    return children;
  }
  return null;
}

export default OwnedByCurrentUser;