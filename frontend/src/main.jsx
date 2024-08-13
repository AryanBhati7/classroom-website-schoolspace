import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppWrapper from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import store from "./store/store.js";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
    {import.meta.env.MODE === "development" && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
    <Toaster
      position="top-right"
      reverseOrder={true}
      toastOptions={{
        error: {
          style: { borderRadius: "0", color: "red" },
        },
        success: {
          style: { borderRadius: "0", color: "green" },
        },
        duration: 2000,
      }}
    />
  </QueryClientProvider>
);
