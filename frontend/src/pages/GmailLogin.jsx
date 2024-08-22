import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from '../AuthContext';
import Logo from '../assets/logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import api from "../api/call/api"
import { fetchCurrentUser } from '../api/auth';
const GmailLogin = () => {

    const { setFlash, checkUser, isLoggedIn } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
    const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup forms
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const from = location.state?.from || '/SkillCentre';

    // Handle Google login using signInWithPopup
    const handleGoogleLogin = async () => {
        try {
            await encryptApi.post('/google-login', { tokenId: response.credential })
            .then(() => {
                checkUser();
                setFlash(['Logged In Successfully', 'success']);
            }).catch((error) => {
                setFlash([error.response.data.message, 'error']);
            })
        } catch (error) {
            console.error('Google sign-in error:', error);
        }
    };

    // Handle user data after successful sign-in
    const handleUser = (user) => {
        const userData = {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };
        login(userData);
        navigate(from);
    };

    // Dummy function for email/password login
    const handleEmailLogin = () => {
        // API call for email/password login
        // Example: axios.post('/api/login', { email, password })
    };

    return (
        <div className='bg-[#17212E] pt-20 md:py-5'>
            <div className='bg-white mx-5 md:mx-80 rounded-xl py-6'>
                <div className='flex items-center justify-center'>
                    <img src={Logo} alt="logo" height={300} width={300} />
                </div>
                <div className='text-[#17212E] text-3xl font-bold text-center py-4'>
                    <div>Login</div>
                    <div>To</div>
                    <div>Altruisty</div>
                    <div>SkillCentre</div>
                </div>
                <div className='flex flex-col items-center justify-center mx-10 md:mx-40'>
                    <input className='border-[#17212E] border-2 p-1 my-2 rounded-lg w-full' type="text" placeholder='Email' />
                    <input className='border-[#697381] border-2 p-1 my-2 rounded-lg w-full' type="password" placeholder='Password' />
                    <div className='my-4'>
                        <button 
                            onClick={handleEmailLogin}
                            className='px-10 py-2 bg-[#F5CF6B] font-semibold rounded-md shadow hover:bg-[#f5cc63] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:scale-105 transition duration-300'
                        >
                            Login
                        </button>
                        <p onClick={() => navigate('/signup')} className='text-black hover:shadow-slate-900 shadow-slate-300 p-4 rounded-md shadow-lg transition duration-300 mb-2'>
                            Dont Have an Account, <span className='font-bold underline cursor-pointer'>Sign Up</span>
                        </p>
                    </div>
                    <div className='flex flex-col items-center py-4'>
                    </div>
                </div>
                <div className="flex items-center justify-center py-4">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">Or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <div className="flex justify-center">
                    <GoogleOAuthProvider clientId='286309906436-1mhnk8b933efuina84sro4q61prji0p4.apps.googleusercontent.com'>
                        <GoogleLogin
                            onSuccess={GoogleAuthSuccess}
                            onError={(error) => {
                                console.log('Login Failed', error);
                            }}
                        />
                    </GoogleOAuthProvider>
                </div>
            </div>
                </>
            )
            :
            <>
             <div className='bg-white mx-5 md:mx-80 rounded-xl py-6'>
                <div className='flex items-center justify-center'>
                    <img src={Logo} alt="logo" height={300} width={300} />
                </div>
                <div className='text-[#17212E] text-3xl font-bold text-center py-4'>
                    <div>Welcome</div>
                    <div>To</div>
                    <div>Altruisty</div>
                    <div>SkillCentre</div>
                </div>
                <div className='flex flex-col items-center justify-center mx-10 md:mx-40'>
                    <input className='border-[#17212E] border-2 p-1 my-2 rounded-lg w-full' type="text" placeholder='Email' onChange={(e)=> SetRegdata({...RegData,username:e.target.value})} />
                    <input className='border-[#697381] border-2 p-1 my-2 rounded-lg w-full' type="password" placeholder='Password' onChange={(e) => SetRegdata({ ...RegData, password: e.target.value })}  />
                    <div className='my-4'>
                        <button 
                            onClick={handleSignUp}
                            className='px-10 py-2 bg-[#F5CF6B] font-semibold rounded-md shadow hover:bg-[#f5cc63] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:scale-105 transition duration-300'
                        >
                            Register
                        </button>
                        <p onClick={() => setsignin(!signin)} className='text-black hover:shadow-slate-900 shadow-slate-300 p-4 rounded-md shadow-lg transition duration-300 mb-2'>
                           Already Have an Account, <span className='font-bold underline cursor-pointer'>Sign In</span>
                        </p>
                    </div>
                    <div className='flex flex-col items-center py-4'>
                    </div>
                </div>
                <div className='flex items-center justify-center py-4'>
                    <hr className='flex-grow border-gray-400' />
                    <span className='px-2 text-gray-500'>Or</span>
                    <hr className='flex-grow border-gray-400' />
                </div>
                <div className='flex items-center justify-center'>
                    <button 
                        onClick={handleGoogleLogin}
                        className='px-10 py-2 bg-[#4285F4] text-white font-semibold rounded-md shadow hover:bg-[#4285e3] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 hover:scale-105 transition duration-300'
                    >
                        <FontAwesomeIcon icon={faGoogle} className='mr-2' /> Sign in with Google
                    </button>
                </div>
            </div>
            </>
           }
        </div>
    );
};

export default GmailLogin;
