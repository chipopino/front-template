import React from 'react';
import useCtx from 'components/Context';
import { loaderTsx } from 'components/Tsx';

export default function Loader({ className }: { className?: string }) {

    const { isLoading } = useCtx();

    return isLoading && <div className='fixed top-0 left-0'>
        {loaderTsx}
    </div>
}