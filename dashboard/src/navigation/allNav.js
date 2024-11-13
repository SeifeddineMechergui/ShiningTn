import { AiFillDashboard, AiOutlineShoppingCart, AiOutlinePlus } from 'react-icons/ai';
import { BiCategory, BiLoaderCircle } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';
import { CiChat1 } from 'react-icons/ci';
import { BsCurrencyDollar, BsChat } from 'react-icons/bs';
import { RiProductHuntLine } from 'react-icons/ri';

export const allNav = [
    // Admin-only routes
    {
        id: 1,
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        role: ['admin'],
        path: '/admin/dashboard'
    },
    {
        id: 2,
        title: 'Orders',
        icon: <AiOutlineShoppingCart />,
        role: ['admin'],
        path: '/admin/dashboard/orders'
    },
    {
        id: 3,
        title: 'Category',
        icon: <BiCategory />,
        role: ['admin'],
        path: '/admin/dashboard/category'
    },
    {
        id: 4,
        title: 'Sellers',
        icon: <FiUsers />,
        role: ['admin'],
        path: '/admin/dashboard/sellers'
    },
    {
        id: 6,
        title: 'Deactive Sellers',
        icon: <FiUsers />,
        role: ['admin'],
        path: '/admin/dashboard/deactive-sellers'
    },
    {
        id: 7,
        title: 'Sellers Request',
        icon: <BiLoaderCircle />,
        role: ['admin'],
        path: '/admin/dashboard/sellers-request'
    },
    {
        id: 8,
        title: 'Chat Seller',
        icon: <CiChat1 />,
        role: ['admin'],
        path: '/admin/dashboard/chat-sellers'
    },
    {
        id: 9,
        title: 'Seller Statistics', // New entry for Seller Statistics
        icon: <RiProductHuntLine />,
        role: ['admin'], // Only accessible by admin
        path: '/admin/dashboard/seller-statistics'
    },
    
    // Seller-only routes
    {
        id: 10,
        title: 'Dashboard',
        icon: <AiFillDashboard />,
        role: ['seller'],
        path: '/seller/dashboard'
    },
    {
        id: 11,
        title: 'Add Product',
        icon: <AiOutlinePlus />,
        role: ['seller'],
        path: '/seller/dashboard/add-product'
    },
    {
        id: 12,
        title: 'All Products',
        icon: <RiProductHuntLine />,
        role: ['seller', 'admin'], // Accessible by both
        path: '/seller/dashboard/products'
    },
    {
        id: 13,
        title: 'Banners',
        icon: <RiProductHuntLine />,
        role: ['admin'],
        path: '/seller/dashboard/banners'
    },
    {
        id: 15,
        title: 'Orders',
        icon: <AiOutlineShoppingCart />,
        role: 'seller', // Accessible by both
        path: '/seller/dashboard/orders'
    },
    {
        id: 16,
        title: 'Payments',
        icon: <BsCurrencyDollar />,
        role: ['seller'],
        path: '/seller/dashboard/payments'
    },
    {
        id: 17,
        title: 'Chat Customer',
        icon: <BsChat />,
        role: ['admin'],
        path: '/seller/dashboard/chat-customer'
    },
    {
        id: 18,
        title: 'Chat Support',
        icon: <CiChat1 />,
        role: ['seller'],
        path: '/seller/dashboard/chat-support'
    },
    {
        id: 19,
        title: 'Profile',
        icon: <FiUsers />,
        role: ['seller'],
        path: '/seller/dashboard/profile'
    },
    {
        id:20,
        title:'Products Requests ',
        icon:<RiProductHuntLine/>,
        role:['admin'],
        path:'/admin/dashboard/products-request'

    }
];
