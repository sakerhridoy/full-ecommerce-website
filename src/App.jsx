import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';

// Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Checkout from './pages/Checkout.jsx';
import Contact from './pages/Contact.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Layout>
      {' '}
      {/* Header + Footer Layout এর ভিতরে থাকবে */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} /> {/* এটা ঠিক আছে */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
