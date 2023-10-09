import { toast } from "react-toastify";

export default function Toast(msg, type = "success") {
  (type === "success" ? toast.success : toast.error)(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
}
