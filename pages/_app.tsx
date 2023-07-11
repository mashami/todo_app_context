import "@/styles/globals.scss";
import { TodoContextProvider } from "@/utils/todosContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TodoContextProvider>
      <Component {...pageProps} />
    </TodoContextProvider>
  );
}
