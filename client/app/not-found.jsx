// app/not-found.jsx (or app/404.jsx for older versions)

'use client';

import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4 py-8">
      <div className="max-w-md">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">Oops! We can't find that page.</h2>
        <p className="mt-2 text-gray-600">
          The page you're looking for might have been removed, renamed, or is temporarily unavailable.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Homepage
          </button>

          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
