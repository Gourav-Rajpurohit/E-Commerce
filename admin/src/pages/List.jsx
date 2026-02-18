
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const List = ({ token }) => {
  const { backendUrl, currency } = useContext(AdminContext)
  const [list, setList] = useState([])
  const navigate = useNavigate()

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList()
  }, [])

  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {list.map((item, index) => (
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
            <img className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <div className='flex justify-end md:justify-center gap-2'>
              <p onClick={() => navigate(`/add?edit=${item._id}`)} className='cursor-pointer text-blue-500 border border-blue-500 rounded-md px-3 py-1 hover:bg-blue-50 text-xs font-semibold transition-colors'>EDIT</p>
              <p onClick={() => removeProduct(item._id)} className='cursor-pointer text-red-500 border border-red-500 rounded-md px-3 py-1 hover:bg-red-50 text-xs font-semibold transition-colors'>X</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default List