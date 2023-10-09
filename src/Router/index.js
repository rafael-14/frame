import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthGuard from "./AuthGuard";

export default function Router() {
  return (
    <Routes>
      <Route element={<AuthGuard isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthGuard isPrivate />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
