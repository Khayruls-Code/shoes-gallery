import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAlert } from 'react-alert';
import useAuth from '../../../hooks/useAuth';
import loader from '../../../images/loader.gif'

const CheckoutForm = ({ price, productQuantity }) => {
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcsssing] = useState(false)
  const [success, setSuccess] = useState(false)
  const { user } = useAuth()
  useEffect(() => {
    fetch('https://powerful-hamlet-84922.herokuapp.com/create-payment-intent', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ price })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [price])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcsssing(true)

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card,
    // });

    // if (error) {
    //   alert.error(error.message);
    // } else {
    //   console.log('[PaymentMethod]', paymentMethod);
    // }

    const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
          },
        },
      },
    );
    if (intentError) {
      alert.error(intentError.message);
      setProcsssing(false)
      setSuccess(false)
    } else {
      alert.success("Payment Successful");
      console.log(paymentIntent)
      setProcsssing(false)
      setSuccess(true)
      // const paymentInfo = {
      //   trangectionId: paymentIntent.id,
      //   paymentStatus: paymentIntent.status
      // }
      // const url = `http://localhost:5000/orders?email=${user.email}`
      // fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "content-type": "application/json"
      //   },
      //   body: JSON.stringify(paymentInfo)
      // })
      //   .then(res => res.json())
    }

  };

  return (
    <div>
      <h1 className='text-center font-semibold text-2xl pb-8'>Pay ${price} for your {productQuantity} ordered {productQuantity > 1 ? "Products" : 'Product'}</h1>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {processing ? <div><img src={loader} alt="" /></div> : <button className='px-4 mt-8 rounded-sm text-white font-semibold py-2 bg-blue' type="submit" disabled={!stripe || success}>
          Pay ${price}
        </button>}
      </form>
    </div>
  );
};

export default CheckoutForm;