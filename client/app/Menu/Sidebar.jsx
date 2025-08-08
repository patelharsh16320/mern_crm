'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Sidebar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menus = [
    {
      title: 'Client',
      links: [
        { label: 'All Clients', href: '/show-admin/client' },
        { label: 'Add New', href: '/client/create-user' },
      ],
    },
    {
      title: 'Product',
      links: [
        { label: 'All Products', href: '/show-admin/product' },
        { label: 'Add New', href: '/show-admin/product/add' },
      ],
    },
    {
      title: 'Ticket',
      links: [
        { label: 'All Tickets', href: '/show-admin/ticket' },
      ],
    },
    {
      title: 'Invoice',
      links: [
        { label: 'Invoice', href: '/product/invoice' },
      ],
    },
    {
      title: 'Users',
      links: [
        { label: 'User', href: '/client/role' },
      ],
    },
    {
      title: 'Messages',
      links: [
        { label: 'All Message', href: '/show-admin/contact' },
      ],
    }
  ];

  return (
    <aside className="h-screen w-64 bg-white border-r shadow-md p-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Dashboard</h2>

      <nav className="space-y-4">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(index)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <div className="flex items-center justify-between cursor-pointer text-gray-800 font-medium hover:text-blue-600">
              {menu.title}
              <ChevronDownIcon
                className={`w-5 h-5 ml-2 transform transition-transform duration-200 ${
                  hoveredMenu === index ? 'rotate-180 text-blue-600' : ''
                }`}
              />
            </div>

            {hoveredMenu === index && (
              <div className="mt-2 ml-3 space-y-1">
                {menu.links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-100 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="">
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-blue-600"
          >
            Login
          </Link>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
