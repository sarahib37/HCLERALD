import React, { useEffect, useState } from 'react'
import Avatar from '../../assets/Avatar.webp'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../../redux/user/userSlice'
import { Link } from 'react-router-dom'

function Profile() {
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scroll(0,0)
  })

  const { currentUser, loading, error } = useSelector((state) => state.user)

  function handleInputChange(e){
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    })
  }

  async function handleUpdate(e){
    e.preventDefault()

    try{
      dispatch(updateUserStart())

      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser.uid}`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })

      const data = await res.json()

      if (!data.success){
        console.log(data.message)
        dispatch(updateUserFailure(data.message))
        return
      }

      const updatedUser = {
        ...currentUser,
        ...formData,
      }

      dispatch(updateUserSuccess(updatedUser))
      setUpdateSuccess(true)
    } catch(error){
      dispatch(updateUserFailure(error.message))
    }
  }

  async function handleDeleteUser(){
    try{
      dispatch(deleteUserStart())

      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser.uid}`, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })

      const data = await res.json()
      if(!data.success){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  async function handleSignout(){
    try{
      dispatch(signOutUserStart())
      const res = await fetch('http://localhost:3000/api/auth/signout')
      const data = await res.json()

      if(!data.success){
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
    }catch(error){
      dispatch(signOutUserFailure(error.message))
    }
  }

  return (
    <section className="flex flex-col min-w-[150%] md:min-w-[50%] pl-12 md:pl-0 items-center justify-center mt-24 gap-8 text-center max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold p-12">Profile</h2>
      <img src={Avatar} alt="profile" className="max-w-[20%] rounded-full" />

      <form onSubmit={handleUpdate} className="w-full flex flex-col gap-4">
        <input 
          type="text" 
          name="username" 
          defaultValue={currentUser.username} 
          onChange={handleInputChange} 
          className="px-4 py-2 bg-black border border-blue-500 rounded-lg text-white"
        />
        <input 
          type="email" 
          name="email" 
          defaultValue={currentUser.email} 
          onChange={handleInputChange} 
          className="px-4 py-2 bg-black border border-blue-500 rounded-lg text-white"
        />
        <input 
          type="password" 
          name="password" 
          defaultValue={currentUser.password} 
          onChange={handleInputChange} 
          className="px-4 py-2 bg-black border border-blue-500 rounded-lg text-white"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white py-2 rounded-lg font-bold text-lg uppercase mt-4 hover:bg-white hover:text-blue-500 border border-blue-500 transition"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link to="/quote-form">
          <button 
            type="button" 
            className="mt-4 text-blue-500 border border-blue-500 bg-white py-2 px-6 rounded-lg font-bold text-lg w-[100%] uppercase hover:bg-blue-500 hover:text-white transition"
          >
            Make a quote
          </button>
        </Link>
      </form>

      <div className="flex justify-between w-full mt-4">
        <p 
          className="text-xl text-blue-500 cursor-pointer hover:text-red-700"
          onClick={handleDeleteUser}
        >
          Delete Account
        </p>
        <p 
          className="text-xl text-blue-500 cursor-pointer hover:text-red-700"
          onClick={handleSignout}
        >
          Sign Out
        </p>
      </div>

      {error && <p className="text-red-500 mt-2">{error ? error : ''}</p>}
      {updateSuccess && <p className="text-green-500 mt-2">{updateSuccess ? "User is updated successfully!!" : ''}</p>}
      {currentUser.admin && <Link to='/admin'><p className="text-lg mt-4 cursor-pointer hover:text-green-600">Visit Admin Page</p></Link>}
    </section>
  )
}

export default Profile
