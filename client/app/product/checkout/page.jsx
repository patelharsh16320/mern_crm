'use client'
import React from 'react'

const CheckoutPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing details</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">First name *</label>
                <input className="w-full border px-3 py-2 rounded" type="text" />
              </div>
              <div>
                <label className="block mb-1">Last name *</label>
                <input className="w-full border px-3 py-2 rounded" type="text" />
              </div>
            </div>

            <div>
              <label className="block mb-1">Company name (optional)</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>

            <div>
              <label className="block mb-1">Country / Region *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>

            <div>
              <label className="block mb-1">Street address *</label>
              <input
                className="w-full border px-3 py-2 rounded mb-2"
                type="text"
                placeholder="House number and street name"
              />
              <input
                className="w-full border px-3 py-2 rounded"
                type="text"
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
            </div>

            <div>
              <label className="block mb-1">Town / City *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>

            <div>
              <label className="block mb-1">State *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>

            <div>
              <label className="block mb-1">ZIP Code *</label>
              <input className="w-full border px-3 py-2 rounded" type="number" />
            </div>

            <div>
              <label className="block mb-1">Phone *</label>
              <input className="w-full border px-3 py-2 rounded" type="text" />
            </div>

            <div>
              <label className="block mb-1">Email address *</label>
              <input className="w-full border px-3 py-2 rounded" type="email" />
            </div>

            <div>
              <label className="block mb-1">Order notes (optional)</label>
              <textarea
                className="w-full border px-3 py-2 rounded"
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white space-y-6">
          <h2 className="text-xl font-semibold mb-2">Your order</h2>
          <div className="text-sm border-b pb-4">
            <div className="flex justify-between mb-2">
              <span>Horizontal H1 Vase × 4</span>
              <span>$312.00</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$312.00</span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>Total</span>
              <span>$312.00</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Have a Square Gift Card?</label>
            <div className="flex gap-2">
              <input
                className="flex-1 border px-3 py-2 rounded"
                type="text"
                placeholder="Gift card"
              />
              <button className="bg-purple-900 text-white px-4 py-2 rounded">Apply</button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input type="radio" name="payment" id="credit" defaultChecked />
              <label htmlFor="credit" className="font-medium">
                Credit Card
              </label>
            </div>
            <div className="border p-4 rounded bg-gray-50">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full border px-3 py-2 rounded"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="border px-3 py-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="border px-3 py-2 rounded"
                  />
                </div>
              </div>
            </div>

          </div>

          <p className="text-xs text-gray-500">
            Your personal data will be used to process your order, support your experience
            throughout this website, and for other purposes described in our privacy policy.
          </p>

          <button className="w-full bg-purple-900 text-white py-3 rounded font-medium">
            Place order
          </button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
