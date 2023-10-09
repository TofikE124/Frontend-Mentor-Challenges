import { BrowserRouter, Routes,Route } from "react-router-dom";

import DesignSystem from "./Pages/DesignSystem";
import PagesLayout from "./Components/PagesLayout";
import HomePage from "./Pages/HomePage";
import Category from "./Pages/CategoryPage";
import ProductDetails from "./Pages/ProductDetailsPage";
import CheckoutPage from "./Pages/CheckoutPage";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PagesLayout/>}>
          <Route index element={<HomePage />} />
          <Route path="category/:category" element={<Category />} />
          <Route path="products/:product" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
