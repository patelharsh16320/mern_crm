'use client';
import React, { useEffect, useState, useRef } from 'react';
import { fetchInvoiceById } from '../../../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
// import "@/app/css/style.scss"; 

const DetailItem = ({ label, value, bold }) => (
  <div className="detail-card">
    <p className="label">{label}</p>
    <p className={`value ${bold ? 'bold' : ''}`}>{value}</p>
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

    gsap.fromTo(
      pageRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.8 }
    );
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

  if (!invoice) return <div className="loading">Loading invoice...</div>;

  const { user_name, invoice_number, order_number, payment_method, subtotal, shipping, total, invoice_date } = invoice;

  return (
    <div ref={pageRef} className="invoice-page">
      {/* Header */}
      <div ref={headerRef} className="invoice-header">
        <div>
          <h1>📄 Invoice #{invoice_number}</h1>
          <p>Detailed view of this invoice.</p>
        </div>
        <button onClick={() => router.back()} className="back-btn">⬅ Back</button>
      </div>

      {/* Invoice Details */}
      <div className="invoice-container">
        <div className="invoice-grid">
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
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <DetailItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
