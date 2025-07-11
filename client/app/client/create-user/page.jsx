'use client'
import React, { useState, useEffect } from 'react'

const page = () => {
  const [tabledata, setTabledata] = useState([]);
  const fetchData = () => {
    const data = [
      { lable: 'Username', name: 'username', type: 'text' },
      { lable: 'Email', name: 'email', type: 'email' },
      { lable: 'Phone', name: 'phone', type: 'number' },
      { lable: 'Date of Join', name: 'doj', type: 'date' }
    ];
    setTabledata(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <form className="max-w-xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-lg space-y-6">
        {tabledata.map((props, index) => (
          <div key={index} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {props.lable}
            </label>
            <input
              id={props.name}
              name={props.name}
              type={props.type}
              placeholder="janesmith"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label htmlFor="about" className="mb-1 text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            id="about"
            name="about"
            rows={3}
            defaultValue={''}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            className="px-5 py-2 border border-gray-300 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default page
