import { ComingSoon } from "./pages/ComingSoon"
import { Layout } from "./components/Layout"
import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetail from "./pages/ProductDetail"
import Orders from "./pages/Orders"
import Favorites from "./pages/Favorites"

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<ComingSoon title="Categories" />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Layout>
  )
}
