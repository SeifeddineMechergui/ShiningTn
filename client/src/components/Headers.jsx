import React, { useEffect, useState } from 'react';
import { GrMail } from 'react-icons/gr';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { FaLinkedinIn, FaFacebookF, FaUser, FaLock, FaList } from 'react-icons/fa';
import { AiOutlineTwitter, AiFillGithub, AiFillHeart, AiFillShopping } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { get_card_products, get_wishlist_products } from '../store/reducers/cardReducer';

const Headers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categorys } = useSelector(state => state.home);
    const { userInfo } = useSelector(state => state.auth);
    const { card_product_count, wishlist_count } = useSelector(state => state.card);

    const { pathname } = useLocation();
    const [showShidebar, setShowShidebar] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [categoryShow, setCategoryShow] = useState('');

    const search = () => {
        navigate(`/products/search?category=${categoryShow}&&value=${searchValue}`);
    };

    const redirect_card_page = () => {
        if (userInfo) {
            navigate(`/card`);
        } else {
            navigate(`/login`);
        }
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(get_card_products(userInfo.id));
            dispatch(get_wishlist_products(userInfo.id));
        }
    }, [userInfo, dispatch]);

    return (
        <div className='w-full bg-white'>
            <div className='header-top bg-[#eeeeee] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>

                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4'>
  
                                </div>
       
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4'>
                            <div className='flex justify-between items-center'>
                                <Link to='/'>
                                    <img src="https://shining-tn.vercel.app/images/logo.png" alt="logo" />
                                </Link>
                                <div className='justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden' onClick={() => setShowShidebar(false)}>
                                    <span><FaList /></span>
                                </div>
                            </div>
                        </div>
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                                <ul className='flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden'>
                                    <li>
                                        <Link className={`p-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Home</Link>
                                    </li>
                                    <li>
                                        <Link to='/shops' className={`p-2 block ${pathname === '/shop' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Shop</Link>
                                    </li>
                                </ul>
                                <div className='w-8/12 md-lg:w-full'>
                                    <div className='flex border h-[50px] items-center relative gap-5'>
                                        <input className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full' onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='what do you need' />
                                        <button onClick={search} className='bg-violet-400 right-0 absolute px-8 h-full font-semibold uppercase text-white'>Search</button>
                                    </div>
                                </div>
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>
                                        <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-red-500'><AiFillHeart /></span>
                                            {
                                                wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {wishlist_count}
                                                </div>
                                            }
                                        </div>
                                        <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-orange-500'><AiFillShopping /></span>
                                            {
                                                card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                                                    {card_product_count}
                                                </div>
                                            }
                                        </div>
                                        {
                                    userInfo ? 
                                    <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                        <span><FaUser /></span>
                                        <span>{userInfo.name}</span>
                                    </Link> : 
                                    <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                        <span><FaLock /></span>
                                        <span>Login</span>
                                    </Link>
                                }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowShidebar(true)} className={`fixed duration-200 transition-all ${showShidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}>
                </div>
                <div className={`w-[300px] z-[9999] transition-all duration-200 fixed ${showShidebar ? '-left-[300px]' : 'left-0'} top-0 overflow-y-auto bg-white h-screen py-6 px-8`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="https://shining-tn.vercel.app/images/logo.png" alt="logo" />
                        </Link>
                        <div className='flex justify-star items-center gap-10'>
                            <div className='flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute'>
                                <img src="https://shining-tn.vercel.app/images/language.png" alt="" />
                                <span><MdOutlineKeyboardArrowDown /></span>
                                <ul className='absolute invisible transition-all rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                    <li>Frensh</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                    <span><FaUser /></span>
                                    <span>{userInfo.name}</span>
                                </Link> : <div className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                    <span><FaLock /></span>
                                    <span>Login</span>
                                </div>
                            }
                        </div>
                        <ul className='flex flex-col justify-start items-start text-md font-semibold uppercase'>
                            <li>
                                <Link to="/" className={`py-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Home</Link>
                            </li>
                            <li>
                                <Link to='/shops' className={`py-2 block ${pathname === '/shop' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Shop</Link>
                            </li>
                        </ul>
                        <div className='flex justify-start items-center gap-4'>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><AiOutlineTwitter /></a>
                            <a href="#"><FaLinkedinIn /></a>
                            <a href="#"><AiFillGithub /></a>
                        </div>
                        <ul className='flex flex-col justify-start items-start gap-3 text-[#1c1c1c]'>
                            <li className='flex justify-start items-center gap-2 text-sm'>
                                <span><GrMail /></span>
                                <span>learnwithproject@gmail.com</span>
                            </li>
                            <span className='text-sm'>Shining</span>
                        </ul>
                    </div>
                </div>
            </div>
            <br />
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap'>
                    {["Women", "Men", "Kids", "House", "Accessories", "Beauty"].map((category, index) => (
                        <div key={index} className='w-2/12 md-lg:w-3/12 relative group'>
                            <div className='h-[50px] bg-violet-400 text-white flex justify-between items-center px-4 font-bold text-md cursor-pointer' onClick={() => setCategoryShow(category)}>
                                <div className="flex justify-center items-center gap-3">
                                    <span><FaList /></span>
                                    <span>{category}</span>
                                </div>
                                <span className='pt-1'><MdOutlineKeyboardArrowDown /></span>
                            </div>
                            <div className='absolute left-0 top-[50px] w-full bg-white border-x z-10 invisible group-hover:visible transition-opacity duration-300'>
                            <ul className='py-2 text-slate-600 font-medium flex flex-wrap justify-center'> {/* Added flex-wrap and justify-center */}
    {categorys.map((c, i) => (
        <li key={i} className='flex flex-col items-center gap-1 px-2 py-2 w-1/2'> {/* Set width to 1/2 for two per line */}
            <Link to={`/products?category=${c.name}`}>
                <img src={c.image} className='w-[100px] h-[100px] rounded-full overflow-hidden' alt={c.name} />
            </Link>
            <Link to={`/products?category=${c.name}`} className='text-sm block text-center'>{c.name}</Link>
        </li>
    ))}
</ul>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Headers;
