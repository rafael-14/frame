import Button from "../Button";
import ReactPortal from "../ReactPortal";
import { Container, Footer, Overlay } from "./styles";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

export default function Modal({
  danger = false,
  visible,
  title,
  children,
  cancelLabel = "Cancelar",
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm,
}) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  if (!shouldRender) return null;

  return (
    <ReactPortal>
      <Overlay ref={animatedElementRef} isLeaving={!visible}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button type="button" className="cancel-button" onClick={onCancel}>
              {cancelLabel}
            </button>
            <Button type="button" danger={danger} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}
