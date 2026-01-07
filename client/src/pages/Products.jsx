import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';
import './Products.css';

function Products() {
  const dispatch = useDispatch();
  const { items, pagination, loading, error } = useSelector((state) => state.products);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts({ page, limit: 10 }));
  }, [dispatch, page]);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="products">
      <h1>Products</h1>
      <div className="products-grid">
        {items.map((product) => (
          <div key={product._id} className="product-card">
            <img src={product.imageUrl} alt={product.makeupName} />
            <h3>{product.makeupName}</h3>
            <p className="brand">{product.brand}</p>
            <p className="price">${product.price}</p>
            <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;

