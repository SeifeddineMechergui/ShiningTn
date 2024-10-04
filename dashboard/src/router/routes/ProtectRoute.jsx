import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ route, children }) => {
    const { role, userInfo } = useSelector(state => state.auth);

    if (!role) {
        return <Navigate to='/login' replace />;
    }

    if (!userInfo) {
        return <Navigate to='/login' replace />;
    }

    // Check if route role is an array and if user's role matches any of them
    const hasAccess = Array.isArray(route.role) ? route.role.includes(userInfo.role) : userInfo.role === route.role;

    if (hasAccess) {
        if (route.status) {
            if (route.status === userInfo.status) {
                return <Suspense fallback={null}>{children}</Suspense>;
            } else {
                return <Navigate to={userInfo.status === 'pending' ? '/seller/account-pending' : '/seller/account-deactive'} replace />;
            }
        } else if (route.visibility) {
            if (route.visibility.includes(userInfo.status)) {
                return <Suspense fallback={null}>{children}</Suspense>;
            } else {
                return <Navigate to='/seller/account-pending' replace />;
            }
        } else {
            return <Suspense fallback={null}>{children}</Suspense>;
        }
    } else {
        return <Navigate to='/unauthorized' replace />;
    }
};

export default ProtectRoute;
