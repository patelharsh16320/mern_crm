'use client';

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Dashboard', href: '/' },
  { name: 'Client', href: '/client' },
  { name: 'Products', href: '/product' },
  { name: 'Cart', href: '/product/cart' },
  { name: 'Checkout', href: '/product/checkout' },
  { name: 'Ticket', href: '/ticket' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function Navbar({ onLogoClick }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', number: '', address: '' });

useEffect(() => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  if (localUser) {
    setIsAuthenticated(true);
    setUserData(localUser);
  } else {
    setIsAuthenticated(false);
    setUserData({ name: '', email: '', number: '', address: '' });
  }
}, []);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    router.push('/login');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-sm border-b z-50">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile Button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 focus:outline-none">
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <button onClick={onLogoClick} className="focus:outline-none">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-2xl font-bold text-indigo-700"
                    >
                      CRM<span className="text-gray-800">Sphere</span>
                    </motion.div>
                  </button>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="m-auto text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                    ))}

                    {!isAuthenticated ? (
                      <button
                        onClick={handleSignIn}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        Sign In
                      </button>
                    ) : (
                      <button
                        onClick={handleSignOut}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                      >
                        Sign Out
                      </button>
                    )}
                    
                  </div>
                </div>
              </div>

              {/* Right Menu */}
             {isAuthenticated && (
               <p className='text-blue-500 font-semibold'>{userData.name}</p>
             )}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-gray-600 hover:text-blue-600"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {isAuthenticated && (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="flex rounded-full text-sm focus:outline-none">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                          alt="User"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-xl ring-1 ring-black/10">
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/my-account"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Profile
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <Link
                            href="/settings"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handleSignOut}
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block w-full text-left px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                >
                  {item.name}
                </DisclosureButton>
              ))}

              {!isAuthenticated ? (
                <button
                  onClick={handleSignIn}
                  className="block w-full text-left rounded-md bg-indigo-500 text-white px-3 py-2 text-base font-medium"
                >Login Successful
                  Sign In
                </button>
              ) : (
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left rounded-md bg-red-500 text-white px-3 py-2 text-base font-medium"
                >
                  Sign Out
                </button>
              )}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
