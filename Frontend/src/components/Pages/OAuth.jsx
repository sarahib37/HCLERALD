import { GoogleAuthProvider, signInWithCustomToken, signInWithPopup } from 'firebase/auth'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { signInSuccess } from '../../redux/user/userSlice'

function OAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleGoogleClick(){
    try{
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth, provider)

      const res = await fetch('https://hclerald.vercel.app/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid
        }), 
        credentials: "include",
      })
      
      const data = await res.json()
      if(data.success){
        localStorage.setItem('authToken', data.token)
        await signInWithCustomToken(auth, data.token)
        const user = auth.currentUser
        const idToken = await user.getIdToken()
        try{
          document.cookie = `idToken=${idToken}; Secure; SameSite=None; Path='/'`
        }catch(error){
          console.log(error)
        }

        dispatch(signInSuccess(data.user))
        navigate('/')
      }else{
        console.error('Google Authentication Failed:', data.error)
      }
    }catch(error){
      console.error('Google Auth Error:', error)
    }
  }

  return (
    <button 
      onClick={handleGoogleClick} 
      className="w-full px-4 py-2 bg-blue-600 text-white text-lg rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-500 focus:outline-none sm:text-xl md:text-2xl"
    >
      <FaEnvelope className="text-black" />
      Sign in with Google
    </button>
  )
}

export default OAuth
