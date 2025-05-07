import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./styles.css"
import App from "./App.tsx"
import { ClerkProvider } from "@clerk/clerk-react"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"
import { BrowserRouter } from "react-router"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </ClerkProvider>
  </StrictMode>,
)
