import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container } from "./styles";
import useLogin from "./useLogin";

export default function Login() {
  const { login, setLogin, password, setPassword, handleLogin } = useLogin();
  return (
    <Container>
      <Input
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
      />
      <Input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
      />
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
}
