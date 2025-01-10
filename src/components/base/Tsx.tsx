import React from 'react';
import {cn} from 'methods/global';

export const loaderTsx = <div className={cn(
    'w-16 h-16 !z-[999] mx-auto',
    'm-2 text-xl md:text-4xl click-events-none shadow-lg',
    'bg-white rounded-full shadow animate-spin origin-center'
)}>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">⌛</div>
</div>