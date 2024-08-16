import { adminRoutes } from './adminRoutes';
import { sellerRoutes } from './sellerRoutes';
import MainLayout from '../../layout/MainLayout';
import ProtectRoute from './ProtectRoute';

export const privateRoutes = [
    ...adminRoutes,
    ...sellerRoutes
];

export const getRoutes = () => {
    const allRoute = privateRoutes.map(r => ({
        ...r,
        element: <ProtectRoute route={r}>{r.element}</ProtectRoute>
    }));

    return {
        path: '/',
        element: <MainLayout />,
        children: allRoute
    };
};
