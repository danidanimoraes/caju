import { Provider as ToastProvider } from "@radix-ui/react-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "~/router";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Header } from "./components/Header";

function App() {
  const queryClient = new QueryClient();

  return (
    <ErrorBoundary>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
        </QueryClientProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
