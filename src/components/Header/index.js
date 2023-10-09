import { useAuth } from "../../hooks/useAuth";
import Button from "../Button";
import { Container } from "./styles";

export default function Header() {
  const { signout } = useAuth();

  return (
    <Container>
      <h1>Frame Teste</h1>
      <Button danger onClick={() => signout()}>
        SAIR
      </Button>
    </Container>
  );
}
