import React, { useState, useEffect } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import { FaFacebookF } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineGoogle } from 'react-icons/ai';
import FadeLoader from 'react-spinners/FadeLoader';
import { useSelector, useDispatch } from 'react-redux';
import { customer_login, messageClear } from '../store/reducers/authReducer';
import toast from 'react-hot-toast';

const Login = () => {
    const { loader, successMessage, errorMessage, userInfo } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(customer_login(state));
    };

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
        if (userInfo) {
            navigate('/');
        }
    }, [successMessage, errorMessage, userInfo, navigate, dispatch]);

    return (
        <div>
            {loader && (
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader />
                </div>
            )}
            <Headers />
            <div className='bg-slate-200 mt-4'>
                <div className='p-4 md:p-10'>
                    <div className='max-w-lg mx-auto bg-white rounded-md shadow-lg'>
                        <div className='flex flex-col items-center p-4 md:p-8'>
                            <h2 className='text-center text-xl text-slate-600 font-bold mb-6'>Login</h2>
                            <form onSubmit={login} className='w-full text-slate-600'>
                                <div className='flex flex-col gap-1 mb-2'>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        onChange={inputHandle}
                                        value={state.email}
                                        type="email"
                                        className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                                        id='email'
                                        name='email'
                                        placeholder='Email'
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-1 mb-4'>
                                    <label htmlFor="password">Password</label>
                                    <input
                                        onChange={inputHandle}
                                        value={state.password}
                                        type="password"
                                        className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md'
                                        id='password'
                                        name='password'
                                        placeholder='Password'
                                        required
                                    />
                                </div>
                                <button className='w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md mb-4'>
                                    Login
                                </button>
                            </form>
                            <div className='flex items-center justify-center py-2'>
                                <div className='h-[1px] bg-slate-300 flex-grow'></div>
                                <span className='px-3 text-slate-600'>or</span>
                                <div className='h-[1px] bg-slate-300 flex-grow'></div>
                            </div>
                            <button className='w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/30 text-white rounded-md flex items-center justify-center gap-2 mb-3'>
                                <FaFacebookF />
                                <span>Login with Facebook</span>
                            </button>
                            <button className='w-full py-2 bg-orange-500 shadow hover:shadow-orange-500/30 text-white rounded-md flex items-center justify-center gap-2 mb-3'>
                                <AiOutlineGoogle />
                                <span>Login with Google</span>
                            </button>
                            <div className='text-center text-slate-600'>
                                <p className='mb-2'>You don't have an account? <Link className='text-blue-500' to='/register'>Register</Link></p>
                                <p><a target='_blank' rel='noopener noreferrer' className='text-blue-500' href='http://localhost:3001/register'>Register seller account</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
