import React from 'react';
import { loaderTsx } from 'components/Tsx';
import { Img as _Img } from 'react-image';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export default function Img({ src, className }: { src: string, className?: string }) {
    return (
        <_Img
            src={src}
            loader={loaderTsx}
            unloader={<ImageNotSupportedIcon/>}
            className={className}
        />
    );
};