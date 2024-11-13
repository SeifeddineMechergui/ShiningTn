import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
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

    // Group categories by their name and store both subCat and image in arrays
    const groupedCategories = categorys.reduce((acc, item) => {
        if (item.name) {
            if (!acc[item.name]) acc[item.name] = { subCats: [], images: [] };
            // Push subCat and image into their respective arrays for the category
            if (item.subCat && !acc[item.name].subCats.includes(item.subCat)) {
                acc[item.name].subCats.push(item.subCat);
                acc[item.name].images.push(item.image); // Match image with subCat
            }
        }
        return acc;
    }, {});

    // Define the category names you want to show (could be dynamically loaded from the backend)
    const categoryNames = ["Women", "Men", "Kids", "House", "Accessories", "Beauty"];

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
            {/* Header top for small screens */}
            <div className='header-top bg-[#eeeeee] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px] text-slate-500'>
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='flex justify-center items-center gap-4'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main header */}
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

                        {/* Search bar */}
                        <div className='md-lg:w-full w-9/12'>
                            <div className='flex justify-between md-lg:justify-center items-center flex-wrap pl-8'>
                                <div className='w-8/12 md-lg:w-full'>
                                    <div className='flex border h-[50px] items-center relative gap-5'>
                                        <input className='w-full relative bg-transparent text-slate-500 outline-0 px-3 h-full' onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='what do you need' />
                                        <button onClick={search} className='bg-violet-400 right-0 absolute px-8 h-full font-semibold uppercase text-white'>Search</button>
                                    </div>
                                </div>

                                {/* Wishlist and Cart buttons */}
                                <div className='flex md-lg:hidden justify-center items-center gap-5'>
                                    <div className='flex justify-center gap-5'>
                                        <div onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login')} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-red-500'><AiFillHeart /></span>
                                            {wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>{wishlist_count}</div>}
                                        </div>
                                        <div onClick={redirect_card_page} className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
                                            <span className='text-xl text-orange-500'><AiFillShopping /></span>
                                            {card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>{card_product_count}</div>}
                                        </div>
                                        {userInfo ? (
                                            <Link className='flex cursor-pointer justify-center items-center gap-2 text-sm' to='/dashboard'>
                                                <span><FaUser /></span>
                                                <span>{userInfo.name}</span>
                                            </Link>
                                        ) : (
                                            <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm'>
                                                <span><FaLock /></span>
                                                <span>Login</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar (for small screens) */}
            <div className='hidden md-lg:block'>
                <div onClick={() => setShowShidebar(true)} className={`fixed duration-200 transition-all ${showShidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20`}></div>
                <div className={`w-[300px] z-[9999] transition-all duration-200 fixed ${showShidebar ? '-left-[300px]' : 'left-0'} top-0 overflow-y-auto bg-white h-screen py-6 px-8`}>
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img src="https://shining-tn.vercel.app/images/logo.png" alt="logo" />
                        </Link>
                        <ul className='flex flex-col justify-start items-start text-md font-semibold uppercase'>
                            <li><Link to="/" className={`py-2 block ${pathname === '/' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Home</Link></li>
                            <li><Link to='/shops' className={`py-2 block ${pathname === '/shop' ? 'text-[#7fad39]' : 'text-slate-600'}`}>Shop</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <br />
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap'>
                    {categoryNames.map((category, index) => {
                        const { subCats, imawges } = groupedCategories[category] || { subCats: [], images: [] };
                        
                        return (
                            <div key={index} className='w-2/12 md-lg:w-3/12 s:w-1/4 relative group'>
                                <div className='h-[50px] bg-violet-400 text-white flex justify-between items-center px-4 font-bold text-md cursor-pointer' onClick={() => setCategoryShow(category)}>
                                    <div className="flex justify-center items-center gap-3">
                                        <span>{category}</span>
                                    </div>
                                    <span className='pt-1'><MdOutlineKeyboardArrowDown /></span>
                                </div>
                                <div className='absolute left-0 top-[50px] w-full bg-white border-x z-10 invisible group-hover:visible transition-opacity duration-300'>
                                    <ul className='py-2 text-slate-600 font-medium flex flex-wrap justify-center'>
                                        {subCats.length === 0 ? (
                                            <li className='flex flex-col items-center gap-1 px-2 py-2 w-1/2'>
                                                <Link className='text-sm block text-center'>No Subcategories</Link>
                                            </li>
                                        ) : (
                                            subCats.map((subCat, i) => (
                                                <li key={i} className='flex flex-col items-center gap-1 px-2 py-2 w-1/2'>
                                                    <Link to={`/products?category=${subCat}`}>
                                                        <img
                                                            src={images[i] || 'default-image-url'}
                                                            className='w-[80px] md:w-[100px] lg:w-[120px] h-auto rounded-full overflow-hidden object-cover'
                                                            alt={category}
                                                        />
                                                    </Link>
                                                    <Link to={`/products?category=${subCat}`} className='text-sm block text-center'>
                                                        {subCat}
                                                    </Link>
                                                </li>
                                            ))
                                        )}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Headers;
