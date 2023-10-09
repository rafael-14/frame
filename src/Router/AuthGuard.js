import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthGuard({ isPrivate }) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) return <Navigate to="/login" replace />;
  if (signedIn && !isPrivate) return <Navigate to="/" replace />;

  return <Outlet />;
}
