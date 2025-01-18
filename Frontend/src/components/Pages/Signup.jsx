import { FaArrowLeft } from "react-icons/fa";
import { auth } from "../../firebase";
import Or from '../../assets/Or.webp';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import { signInWithCustomToken } from 'firebase/auth';
import OAuth from "./OAuth";

function Signup() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const { loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleInputChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        dispatch(signInStart());

        if (formData.password && formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        try {
            const res = await fetch('https://hclerald.vercel.app/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.error);
                dispatch(signInFailure(data.error));
                return;
            }

            const userCredential = await signInWithCustomToken(auth, data.token);
            const idToken = await userCredential.user.getIdToken();
            document.cookie = `idToken=${idToken}; Secure; SameSite=None; Path=/`;
            localStorage.setItem('authToken', idToken);

            try {
                dispatch(signInSuccess({ ...userCredential.user, ...data.user }));
                navigate('/');
            } catch (error) {
                setError('Something went wrong.');
                dispatch(signInFailure('Something went wrong.'));
            }
        } catch (error) {
            setError('Something went wrong.');
            dispatch(signInFailure('Something went wrong.'));
        }
    }

    return (
        <section className="w-screen h-screen flex items-center justify-center">
            <Link to="/" className="absolute top-4 left-4 text-white">
                <FaArrowLeft className="cursor-pointer" />
            </Link>

            <div className="flex flex-col md:flex-row w-full h-full items-center justify-center">
                {/* Form Container */}
                <div className="w-full md:w-1/2 max-h-full p-8 flex flex-col items-center gap-8">
                    <h3 className="text-2xl font-bold text-center w-4/5">Create an account</h3>

                    <form onSubmit={handleFormSubmit} className="w-4/5 flex flex-col gap-4">
                        <label className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Username</p>
                            <input
                                type="text"
                                id="username"
                                required
                                onChange={handleInputChange}
                                className="w-full bg-black border border-blue-700 rounded px-3 py-2 text-white text-sm"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Email</p>
                            <input
                                type="email"
                                id="email"
                                required
                                onChange={handleInputChange}
                                className="w-full bg-black border border-blue-700 rounded px-3 py-2 text-white text-sm"
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <p className="text-sm font-bold">Password</p>
                            <input
                                type="password"
                                id="password"
                                required
                                onChange={handleInputChange}
                                className="w-full bg-black border border-blue-700 rounded px-3 py-2 text-white text-sm"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-lg bg-blue-700 text-white text-lg flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? 'Loading...' : 'Sign up'}
                        </button>

                        <img src={Or} alt="Or" className="w-1/2 mx-auto" />

                        <OAuth />
                    </form>

                    <p className="text-sm flex gap-1">
                        Already have an account?
                        <Link to="/signin" className="text-white hover:text-red-500">
                            Sign in
                        </Link>
                    </p>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                {/* Background Panel */}
                <div className="hidden md:block w-1/2 h-full bg-blue-700"></div>
            </div>
        </section>
    );
}

export default Signup;
