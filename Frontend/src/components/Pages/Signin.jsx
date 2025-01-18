import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Or from '../../assets/Or.webp'
import axios from 'axios'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { auth } from "../../firebase";
import { signInWithCustomToken } from "firebase/auth";
import OAuth from "./OAuth";

function Signin() {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleInputChange(e){
        setFormData({
            ...formData, 
            [e.target.id]: e.target.value
        });
    }

    async function handleLogin(e){
        e.preventDefault();
        dispatch(signInStart());

        try{
          const response = await axios.post('http://localhost:3000/api/auth/signIn', 
            {
                email: formData.email,
                password: formData.password,
            }
          );

          if(response.data.success){
            const {token, user} = response.data;
            await signInWithCustomToken(auth, token);
            const currentUser = auth.currentUser;
            const idToken = await currentUser.getIdToken();
            document.cookie = `idToken=${idToken}; Secure; SameSite=None; Path=/`;

            localStorage.setItem('authToken', token);
            dispatch(signInSuccess(user));
            navigate('/');
          }else{
              dispatch(signInFailure(response.data.error));
          }
        }catch(error){
            dispatch(signInFailure(error.response?.data?.error || 'Something went wrong.'));
        }
    }

  return (
    <div className="w-full h-screen flex items-center justify-center">
        <Link to='/' className="absolute top-2 left-2 text-white">
            <FaArrowLeft />
        </Link>

        <div className="flex items-center justify-center w-full h-[100wv]">
            <div className="w-full md:w-1/2 p-8 flex flex-col items-center gap-8">
                <h3 className="text-2xl w-4/5">Sign in</h3>

                <form onSubmit={handleLogin} className="w-4/5 flex flex-col gap-3 mt-[-2em]">
                    <label className="text-lg flex flex-col gap-3">
                        <p className="text-sm font-bold">Email</p>
                        <input 
                            type="email" 
                            id="email" 
                            onChange={handleInputChange} 
                            className="w-full bg-black border-2 border-[#4154F1] rounded-md text-white text-xs p-2" 
                        />
                    </label>

                    <label className="text-lg flex flex-col gap-3">
                        <p className="text-sm font-bold">Password</p>
                        <input 
                            type="password" 
                            id="password" 
                            onChange={handleInputChange} 
                            className="w-full bg-black border-2 border-[#4154F1] rounded-md text-white text-xs p-2"
                        />
                    </label>

                    <button type="submit" className="mt-4 w-full py-2 bg-[#4154F1] text-white text-lg rounded-md flex items-center justify-center cursor-pointer">
                        {loading ? 'Loading...' : 'Jump back in'}
                    </button>

                    <img src={Or} alt="Or" className="w-1/2 mx-auto my-4" />

                    <OAuth />
                </form>

                <p className="text-sm flex gap-2 mt-[-1em]">
                    Don't have an account?  
                    <Link to='/signup'>
                        <span className="text-white cursor-pointer hover:text-red-500">Create one</span>
                    </Link>
                </p>

                {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            <div className="hidden md:block w-1/2 bg-blue-800 h-screen"></div>
        </div>
    </div>
  );
}

export default Signin;
