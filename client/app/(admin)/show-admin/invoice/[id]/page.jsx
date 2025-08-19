'use client';
import React, { useEffect, useState, useRef } from 'react';
import { fetchInvoiceById } from '../../../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';

const DetailItem = ({ label, value, bold }) => (
  <div className="bg-white rounded-xl shadow p-4 hover:shadow-md transition">
    <p className="text-sm text-gray-500">{label}</p>
    <p className={`text-lg mt-1 ${bold ? 'font-bold text-blue-700' : 'text-gray-800'}`}>
      {value}
    </p>
  </div>
);

export default function SingleInvoicePage() {
  const { id } = useParams();
  const router = useRouter();
  const [invoice, setInvoice] = useState(null);

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

useEffect(() => {
  if (!id) return; // 🔑 Wait until id is available

  (async () => {
    try {
      const data = await fetchInvoiceById(id);
      setInvoice(data);
      toast.success('Invoice loaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to load invoice');
    }
  })();
}, [id]);

  useEffect(() => {
    if (!invoice) return;

    gsap.fromTo(pageRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 });
    gsap.from(headerRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(cardsRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.15,
      delay: 0.3,
    });
  }, [invoice]);

  if (!invoice) return <div className="text-center py-20 text-gray-500">Loading invoice...</div>;

  const { user_name, invoice_number, order_number, payment_method, subtotal, shipping, total, invoice_date } = invoice;

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Header */}
      <div ref={headerRef} className="flex justify-between items-center mb-10 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">📄 Invoice #{invoice_number}</h1>
          <p className="text-gray-500">Detailed view of this invoice.</p>
        </div>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ⬅ Back
        </button>
      </div>

      {/* Invoice Details */}
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "User Name", value: user_name },
          { label: "Invoice Number", value: invoice_number },
          { label: "Order Number", value: order_number },
          { label: "Payment Method", value: payment_method },
          { label: "Subtotal", value: `₹${subtotal}` },
          { label: "Shipping", value: `₹${shipping}` },
          { label: "Total", value: `₹${total}`, bold: true },
          {
            label: "Date",
            value: new Date(invoice_date).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
          },
        ].map((item, i) => (
          <div key={i} ref={(el) => (cardsRef.current[i] = el)}>
            <DetailItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
