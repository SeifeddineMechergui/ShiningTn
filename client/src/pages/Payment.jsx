import React, { useState } from 'react';
import Headers from '../components/Headers';
import Footer from '../components/Footer';
import Stripe from '../components/Stripe';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const { state: { price, items, orderId } } = useLocation();
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    return (
        <div>
            <Headers />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4'>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap'>
                                    {/* New Cash on Delivery button */}
                                    <div onClick={() => setPaymentMethod('cashOnDelivery')} className={`w-[20%] border-r cursor-pointer py-8 px-12 ${paymentMethod === 'cashOnDelivery' ? 'bg-white' : 'bg-slate-100'}`}>
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src="../../../images/payment/cod.png" alt="Cash on Delivery" />
                                            <span className='text-slate-600'>Cash on Delivery</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Display payment methods UI */}
                                {
                                    paymentMethod === 'stripe' && <div><Stripe orderId={orderId} price={price} /></div>
                                }
                                {
                                    paymentMethod === 'bkash' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white'>Pay Now</button>
                                    </div>
                                }
                                {
                                    paymentMethod === 'nogot' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white'>Pay Now</button>
                                    </div>
                                }
                                {
                                    paymentMethod === 'roket' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <button className='px-10 py-[6px] rounded-sm hover:shadow-wrange-500/20 hover:shadow-lg bg-orange-500 text-white'>Pay Now</button>
                                    </div>
                                }
                                {
                                    paymentMethod === 'cashOnDelivery' && <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                        <p className='text-slate-600'>You have selected Cash on Delivery. Please prepare the exact amount when the delivery arrives.</p>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='bg-white shadow p-5 text-slate-600 flex flex-col gap-3'>
                                    <h2>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <span>{items} items and shipping fee included</span>
                                        <span>${price}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg text-orange-500'>${price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Payment;
