/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchProductById } from '../api/products.js';

const ProductsContext = createContext(null);

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      setError(null);
      try {
        const list = await fetchProducts();
        if (!cancelled) {
          setProducts(list);
          setStatus('success');
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load products'
          );
          setStatus('error');
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const getProductById = id => {
      // string বা number দিয়ে ম্যাচ করবে (loose equality)
      return products.find(p => p.id == id) ?? null;
    };

    const refresh = async () => {
      setStatus('loading');
      setError(null);
      try {
        const list = await fetchProducts();
        setProducts(list);
        setStatus('success');
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load products'
        );
        setStatus('error');
      }
    };

    const loadProductIfMissing = async id => {
      // local-এ আছে কি না চেক (loose equality)
      const existing = products.find(p => p.id == id);
      if (existing) return existing;

      try {
        // API-তে original id (string) পাস করো
        const product = await fetchProductById(id);

        if (product) {
          setProducts(prev => {
            const already = prev.find(p => p.id == product.id);
            if (already) return prev;
            return [...prev, product];
          });
        }
        return product || null;
      } catch (err) {
        console.error('Error loading single product:', err);
        return null;
      }
    };

    return {
      products,
      status,
      error,
      getProductById,
      refresh,
      loadProductIfMissing,
    };
  }, [products, status, error]);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return ctx;
}

export { ProductsProvider, useProducts };
