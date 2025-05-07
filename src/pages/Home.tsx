import { buttonVariants } from "@/components/ui/button"
import { Link } from "react-router"

export function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Welcome to Our Online Store</h1>
            <p className="mb-6 text-lg text-gray-600">
              Browse our carefully selected products with great prices and exceptional quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className={buttonVariants({ size: "lg" })} to="/shop">
                Shop Now
              </Link>
            </div>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg">
            {/* <span className="text-lg text-gray-500">Hero Image</span> */}
            <img src="/hero.jpg" alt="Hero Image" className="rounded shadow-2xl" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
