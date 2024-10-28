import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_statistics } from '../../store/Reducers/sellerStatisticsReducer';
import api from '../../api/api';

const SellerStatistics = () => {
    const dispatch = useDispatch();
    
    const [currentPage, setCurrentPage] = useState(1);
    const [parPage, setParPage] = useState(5);
    const [givingAmount, setGivingAmount] = useState(0);
    const [selectedSellerId, setSelectedSellerId] = useState(null);
    const { statistics, totalStatistics, loader, errorMessage } = useSelector(state => state.sellerStatistics);

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
        };
        dispatch(get_seller_statistics(obj));
    }, [currentPage, parPage, dispatch]);

    const totalPages = Math.ceil(totalStatistics / parPage);

    const handleGivingUpdate = async (sellerId) => {
        try {
            const response = await api.post(`/admin/seller/give`, {
                sellerId,
                amount: givingAmount,
            });
            console.log('Giving updated successfully:', response.data);
            dispatch(get_seller_statistics({ parPage, page: currentPage }));
            setGivingAmount(0);
            setSelectedSellerId(null);
        } catch (error) {
            console.error('Error updating giving:', error);
        }
    };

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center'>
                    <select 
                        onChange={(e) => setParPage(parseInt(e.target.value))} 
                        className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'
                    >
                        <option value="5">5</option>
                        <option value="15">15</option>
                        <option value="25">25</option>
                    </select>
                    <h2 className='text-lg text-[#d0d2d6]'>Seller Statistics</h2>
                </div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-xs text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>Seller Name</th>
                                <th scope='col' className='py-3 px-4'>Total Sales</th>
                                <th scope='col' className='py-3 px-4'>Number of Sold Products</th>
                                <th scope='col' className='py-3 px-4'>Admin Giving</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-normal'>
                            {statistics.map((stat, i) => (
                                <tr key={i}>
                                    <td className='py-1 px-4'>{stat.sellerName || 'Unknown Seller'}</td>
                                    <td className='py-1 px-4'>${(stat.totalRevenue || 0).toFixed(2)}</td>
                                    <td className='py-1 px-4'>{stat.totalSold || 0}</td>
                                    <td className='py-1 px-4'>${(stat.adminGiven || 0).toFixed(2)}</td>
                                    <td className='py-1 px-4'>
                                        <input 
                                            type='number'
                                            value={selectedSellerId === stat.sellerId ? givingAmount : ''}
                                            onChange={(e) => {
                                                setGivingAmount(e.target.value);
                                                setSelectedSellerId(stat.sellerId);
                                            }}
                                            placeholder='Enter Amount'
                                            className='border rounded p-1'
                                        />
                                        <button 
                                            onClick={() => handleGivingUpdate(stat.sellerId)}
                                            className='ml-2 px-2 py-1 bg-green-500 text-white rounded'
                                        >
                                            Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex justify-between mt-4'>
                    <button 
                        disabled={currentPage === 1} 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        className='px-4 py-2 bg-blue-500 text-white rounded'
                    >
                        Previous
                    </button>
                    <span>{`Page ${currentPage} of ${totalPages}`}</span>
                    <button 
                        disabled={currentPage === totalPages} 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        className='px-4 py-2 bg-blue-500 text-white rounded'
                    >
                        Next
                    </button>
                </div>
                {loader && <p className='text-center'>Loading...</p>}
                {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default SellerStatistics;
