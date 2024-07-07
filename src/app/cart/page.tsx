"use client";
import { Button, List, Typography, Divider, Row, Col } from 'antd';
import { useCartStore } from '@/stores/useCartStore';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '@/components/Common/pay/CheckoutForm';

import '@/styles/pay.css'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Cart() {
  const { items, removeItem } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0) * 100;

  const handleCheckout = async () => {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    })
		if (response.ok) {
      const data = await response.json();
      setClientSecret(data.clientSecret);
    } else {
      console.error('Error creating payment intent');
    }
	};

	const appearance = {
		theme: 'stripe',
	};

	const options = {
		clientSecret,
		appearance,
	};




  return (
    <div className="relative mx-auto max-w-c-1440 mt-25 items-center justify-between align-items:flex-end px-4 md:px-8 2xl:px-0">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="flex flex-col items-center align-middle md:flex-row bg-white p-4 rounded-lg shadow-solid-l"
          >
            <div className="w-1/6 md:w-1/6 mb-4 md:mb-0">
              <img
                alt="logo"
                src={item.image}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="w-full md:w-3/4 md:pl-4">
              <div className="mb-4 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">
                  {item.name}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
              <div className="mb-4 md:mb-0 mr-2">
                <div className="text-right mb-2 md:mb-0">
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </div>
                <div className='text-right'>
                  <span className="font-medium">Price:</span> ${item.price}
                </div>
              </div>
            </div>
            <div className="ml-4">
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Divider />
      <Row justify="space-between" className="p-4">
        <Col>
          <Typography.Title level={4}>Total:</Typography.Title>
        </Col>
        <Col>
          <Typography.Title level={4}>
            ${(totalAmount / 100).toFixed(2)}
          </Typography.Title>
        </Col>
      </Row>
      <div className="mb-8">
        <Button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Checkout
        </Button>
      </div>

			<div className='mb-8'>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
			</div>
    </div>
  );
}


