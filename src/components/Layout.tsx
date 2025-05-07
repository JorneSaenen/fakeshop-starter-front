import { ReactNode } from "react"
import { NavBar } from "./NavBar"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <NavBar />
      <div className="flex flex-1 flex-col gap-10 overflow-auto">
        <main>{children}</main>
        <footer className="mt-auto bg-gray-800 p-4 text-center text-white">
          <div className="container mx-auto">
            <p className="text-sm">&copy; {new Date().getFullYear()} Fake Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
