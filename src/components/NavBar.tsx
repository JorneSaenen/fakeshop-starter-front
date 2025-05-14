import { ShoppingCartIcon, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Link, NavLink } from "react-router"
import { ShoppingCart } from "./ShoppingCart"
import { useMemo, useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useGetCartQuery } from "@/store/apiSlice"

export function NavBar() {
  const { data: cart = [] } = useGetCartQuery()
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/categories", label: "Categories" },
  ]

  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-white">
        <Collapsible open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <header
            className={cn("border-gray-200", {
              "border-b": !isMobileMenuOpen,
            })}
          >
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-5">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="h-auto p-0 md:hidden"
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle mobile menu"
                  >
                    {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
                    <span className="sr-only">Toggle mobile menu</span>
                  </Button>
                </CollapsibleTrigger>

                <Link to="/" className="text-2xl font-bold text-gray-900">
                  Fake Shop
                </Link>
              </div>

              <nav className="mx-6 hidden md:block">
                <ul className="flex items-center space-x-6 [&_.active]:text-black [&_.active]:after:absolute [&_.active]:after:right-0 [&_.active]:after:bottom-0 [&_.active]:after:left-0 [&_.active]:after:h-0.5 [&_.active]:after:bg-black [&_a]:relative [&_a]:py-1 [&_a]:text-sm [&_a]:font-medium [&_a]:text-gray-500 [&_a]:transition-colors [&_a:hover]:text-gray-900">
                  {navigationLinks.map(link => (
                    <li key={link.to}>
                      <NavLink to={link.to}>{link.label}</NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative cursor-pointer"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>

                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </div>
          </header>

          <CollapsibleContent className="absolute right-0 left-0 z-10 border-b border-gray-200 bg-white shadow-md md:hidden">
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4 [&_.active]:font-semibold [&_.active]:text-black [&_a]:block [&_a]:py-2 [&_a]:text-lg [&_a]:font-medium [&_a]:text-gray-500 [&_a]:transition-colors [&_a:hover]:text-gray-900">
                {navigationLinks.map(link => (
                  <li key={link.to}>
                    <NavLink to={link.to} onClick={() => setIsMobileMenuOpen(false)}>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </CollapsibleContent>
        </Collapsible>
      </div>
      <ShoppingCart isOpen={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
