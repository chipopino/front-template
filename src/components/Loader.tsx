import React from 'react';
import { cn } from 'methods/global';
import useCtx from 'components/Context';

export default function Loader({ className }: { className?: string }) {

    const { isLoading } = useCtx();

    return isLoading && <div className={cn(
        'w-16 h-16 fixed top-0 left-0 !z-[999]',
        'm-2 text-xl md:text-4xl click-events-none shadow-lg',
        'bg-white rounded-full shadow animate-spin origin-center'
    )}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">⌛</div>
    </div>
}