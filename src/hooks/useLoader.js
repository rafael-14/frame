import { useState } from "react";
import Loader from "../components/Loader";

export default function useLoader() {
  const [isLoading, setIsLoading] = useState(false);

  return { Loader, isLoading, setIsLoading };
}
