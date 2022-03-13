import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { syncPathname } from './libs/nexo/helpers';

import nexo from './nexoClient';

function NexoSyncRoute({ children }: { children: JSX.Element }) {
    const { pathname } = useLocation();
    useEffect(() => {
        syncPathname(nexo, pathname);
    }, [pathname]);
    return children
}

export default NexoSyncRoute;