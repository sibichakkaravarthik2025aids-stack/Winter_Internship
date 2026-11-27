import { useEffect, useState } from 'react';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function getProducts() {
      setIsLoading(true);
      setError('');

      try {
        const response = await fetch(PRODUCTS_URL, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Product request failed (${response.status})`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('The product service returned an invalid response.');
        }

        setProducts(data);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Unable to load products. Check your connection and try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    getProducts();
    return () => controller.abort();
  }, [retryCount]);

  return (
    <main className="product-page">
      <div className="product-heading">
        <div>
          <p className="eyebrow">SHOP THE COLLECTION</p>
          <h1>Products</h1>
          <p>Browse our latest picks and view product details.</p>
        </div>
        {!isLoading && !error && (
          <span className="product-count">{products.length} products</span>
        )}
      </div>

      {isLoading && <p role="status">Loading products...</p>}
      {error && (
        <div className="product-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Try again
          </button>
        </div>
      )}
      {!isLoading && !error && products.length === 0 && (
        <p>No products are available right now.</p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <section className="product-grid" aria-label="Product catalog">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.title} loading="lazy" />
              </div>
              <div className="product-card-content">
                <p className="product-category">{product.category}</p>
                <h2>{product.title}</h2>
                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                <button type="button" onClick={() => setSelectedProduct(product)}>
                  View Details
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {selectedProduct && (
        <div className="product-detail-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}>
          <section
            className="product-detail"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-detail-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="product-detail-close"
              type="button"
              aria-label="Close product details"
              onClick={() => setSelectedProduct(null)}
            >
              Close
            </button>
            <img src={selectedProduct.image} alt="" />
            <p className="product-category">{selectedProduct.category}</p>
            <h2 id="product-detail-title">{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <strong>${Number(selectedProduct.price).toFixed(2)}</strong>
          </section>
        </div>
      )}
    </main>
  );
}

export default Product;
