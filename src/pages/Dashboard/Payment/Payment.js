import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51JwJQIHUaBpYcJr7gM4i1lsoqaVUxtObOaFFDhoWHvjTV04fisSLH4L4faFHlZnjpOm7ehl8ICpt4aujDgudFL0o00MZVNQbiX');

const Payment = () => {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    fetch(`https://powerful-hamlet-84922.herokuapp.com/orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [user.email])

  const price = orders.reduce((sum, singlePrice) => sum + singlePrice.cost, 0)

  return (
    <div>
      {price && <Elements stripe={stripePromise}>
        <CheckoutForm price={price} productQuantity={orders.length} />
      </Elements>}
    </div>
  );
};

export default Payment;