import { useState } from "react";
import Toast from "../../components/Toast";
import { useAuth } from "../../hooks/useAuth";

export default function useLogin() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();

  function handleLogin() {
    if (login.trim().toLowerCase() !== "teste" || password !== "123") {
      return Toast("Usuário ou senha incorretos.", "error");
    }
    signin(true);
  }

  return {
    login,
    setLogin,
    password,
    setPassword,
    handleLogin,
  };
}
