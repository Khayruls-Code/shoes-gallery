import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user.email}`)
      .then(res => res.json())
      .then(data => setOrders(data))
  }, [user.email])

  //delete order

  const handleDelete = (id) => {
    const makeSure = window.confirm('Are you sure to want to delete the product?')
    if (makeSure) {
      fetch(`http://localhost:5000/orders/${id}`, {
        method: "DELETE"
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged === true) {
            const remaining = orders.filter(order => order._id !== id)
            setOrders(remaining)
            alert('Item Deleted Successfully')
          }
        })
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {
          orders.map(order => <div
            key={order._id}
            className='bg-blue orderBox p-3 rounded-md'
          >
            <div>
              <img className='rounded-md' src={order.img} alt="" />
              <div>
                <h1 className='text-md font-semibold my-2'>{order.productName}</h1>
                <h2 className='text-lg text-blue'>Total Cost: ${order.cost}</h2>
                <p className='font-semibold'>{order.date}</p>
                <div className='flex items-center justify-between'>
                  <button onClick={() => handleDelete(order._id)} className='px-4 mt-2 rounded-sm primaryBtn text-white font-semibold py-2 bg-primary_bg'>Delete</button>
                  <p className='py-2 px-3 rounded-full status'>{order.status}</p>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  );
};

export default MyOrders;