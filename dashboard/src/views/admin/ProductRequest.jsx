import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { useSelector, useDispatch } from 'react-redux';
import Search from '../components/Search';
import { get_products } from '../../store/Reducers/productReducer'; // Ensure this import is correct

const ProductRequest = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [dropdownVisible, setDropdownVisible] = useState(null); // Store product id of the dropdown visible

    useEffect(() => {
        dispatch(get_products({
            parPage,
            searchValue,
            page: currentPage
        }));
    }, [parPage, searchValue, currentPage, dispatch]);

    // Filter products to only include those with status false
    const filteredProducts = products.filter(product => product.status === false);

    const handleDropdownToggle = (productId) => {
        // Toggle dropdown visibility for the selected product
        setDropdownVisible(dropdownVisible === productId ? null : productId);
    };

    const handleCloseDropdown = () => {
        // Close dropdown
        setDropdownVisible(null);
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#283046] rounded-md'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Product Name</th>
                                <th scope='col' className='py-3 px-4'>Category</th>
                                <th scope='col' className='py-3 px-4'>Price</th>
                                <th scope='col' className='py-3 px-4'>Stock</th>
                                <th scope='col' className='py-3 px-4'>Status</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-normal'>
                            {
                                filteredProducts.map((product, index) => (
                                    <tr className='border-b border-slate-700' key={product._id}>
                                        <td className='py-2 px-4'>{index + 1}</td>
                                        <td className='py-2 px-4'>{product.name}</td>
                                        <td className='py-2 px-4'>{product.category}</td>
                                        <td className='py-2 px-4'>${product.price}</td>
                                        <td className='py-2 px-4'>{product.stock}</td>
                                        <td className='py-2 px-4'>{product.status ? 'Active' : 'Inactive'}</td>
                                        <td className='py-2 px-4'>
                                            <div className='flex justify-start items-center gap-4'>
                                                <Link to={`/seller/dashboard/edit-product/${product._id}`} className='p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                                                    <FaEye />
                                                </Link>

                                                {/* Delete button to toggle the dropdown */}
                                                <button
                                                    className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'
                                                    onClick={() => handleDropdownToggle(product._id)} // Pass product id for dropdown toggle
                                                >
                                                    <FaTrash />
                                                </button>

                                                {/* Dropdown Menu */}
                                                {dropdownVisible === product._id && (
                                                    <ul className="dropdown-menu absolute bg-white border rounded shadow-lg w-40 mt-2 z-10">
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            onClick={handleCloseDropdown}
                                                        >
                                                            Active
                                                        </li>
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            onClick={handleCloseDropdown}
                                                        >
                                                            Inactive
                                                        </li>
                                                        {/* Close option */}
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                                            onClick={handleCloseDropdown}
                                                        >
                                                            Close
                                                        </li>
                                                    </ul>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {
                    filteredProducts.length > parPage && (
                        <div className='w-full flex justify-end mt-4'>
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={filteredProducts.length} // Use filtered length for pagination
                                parPage={parPage}
                                showItem={4}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ProductRequest;
