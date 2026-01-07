import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../store/slices/ordersSlice';
import './Orders.css';

function Orders() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.orders);
  const { token } = useSelector((state) => state.users);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOrders(token));
    }
  }, [dispatch, token]);

  if (!token) {
    return <div className="error">Please login to view your orders</div>;
  }

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="orders">
      <h1>My Orders</h1>
      {items.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-list">
          {items.map((order) => (
            <div key={order._id} className="order-card">
              <h3>Order #{order.code}</h3>
              <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Address: {order.address}</p>
              <p>Status: {order.isShipped ? 'Shipped' : 'Pending'}</p>
              <div className="order-products">
                <h4>Products:</h4>
                {order.orderdProducts.map((product, index) => (
                  <div key={index} className="order-product">
                    <span>{product.name}</span>
                    <span>Qty: {product.quantity}</span>
                    <span>${product.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;

