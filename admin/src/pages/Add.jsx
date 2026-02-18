import React, { useContext, useEffect, useMemo, useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Add = ({ token }) => {
  const { backendUrl } = useContext(AdminContext)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const editId = searchParams.get('edit')
  const isEditMode = !!editId

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  // Store existing image URLs when editing
  const [existingImages, setExistingImages] = useState([])

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Reset all form fields when switching between add/edit mode
  useEffect(() => {
    setName("")
    setDescription("")
    setPrice("")
    setCategory("Men")
    setSubCategory("Topwear")
    setBestseller(false)
    setSizes([])
    setImage1(false)
    setImage2(false)
    setImage3(false)
    setImage4(false)
    setExistingImages([])
  }, [editId])

  // Fetch product data when in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await axios.post(backendUrl + '/api/product/single', { productId: editId })
          if (response.data.success) {
            const product = response.data.product
            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setSubCategory(product.subCategory)
            setBestseller(product.bestseller)
            setSizes(product.sizes)
            setExistingImages(product.image || [])
          } else {
            toast.error(response.data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
      fetchProduct()
    }
  }, [editId, isEditMode, backendUrl])

  // Form validation: all fields required + at least 1 image
  const isFormValid = useMemo(() => {
    const hasName = name.toString().trim() !== ""
    const hasDescription = description.toString().trim() !== ""
    const hasPrice = price !== "" && Number(price) > 0
    const hasSizes = sizes.length > 0

    // In edit mode, existing images count; in add mode, need at least 1 new upload
    const hasNewImage = image1 || image2 || image3 || image4
    const hasExistingImage = existingImages.length > 0
    const hasImage = hasNewImage || (isEditMode && hasExistingImage)

    return hasName && hasDescription && hasPrice && hasSizes && hasImage
  }, [name, description, price, sizes, image1, image2, image3, image4, existingImages, isEditMode])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      let response;

      if (isEditMode) {
        formData.append("productId", editId)
        response = await axios.post(backendUrl + "/api/product/update", formData, { headers: { token } })
      } else {
        response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      }

      if (response.data.success) {
        toast.success(response.data.message)
        if (isEditMode) {
          navigate('/list')
        } else {
          setName('')
          setDescription('')
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
          setPrice('')
          setSizes([])
          setBestseller(false)
        }
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  // Helper to get image preview src
  const getImageSrc = (imageState, index) => {
    if (imageState && imageState !== true) {
      return URL.createObjectURL(imageState)
    }
    if (isEditMode && existingImages[index]) {
      return existingImages[index]
    }
    return assets.upload_area
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={getImageSrc(image1, 0)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={getImageSrc(image2, 1)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={getImageSrc(image3, 2)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={getImageSrc(image4, 3)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-28 py-3 mt-4 text-white active:scale-99 transition-colors ${isFormValid ? 'bg-black active:bg-gray-800 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {isEditMode ? 'UPDATE' : 'ADD'}
      </button>
    </form>
  )
}

export default Add
