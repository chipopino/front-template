import React from 'react';
import useCtx from 'components/base/Context';
import { useGet } from 'hooks/base/useFetch';
import Btn from 'components/base/Btn';

export default function Main() {

    const get = useGet();
    const { setModalContent } = useCtx();

    const mainTsx = <div className='center-flex w-full h-full'>
        <Btn
            onClick={() =>
                get('/todos/1', 'https://jsonplaceholder.typicode.com')
                    .then((result: any) =>
                        setModalContent(
                            <div className='flex flex-col gap2'>
                                <p>example of fetch and modal</p>
                                <p>{result.title}</p>
                            </div>
                        ))
            }
        >
            Click me
        </Btn>
    </div>

    return <div className='w-full h-full'>
        {mainTsx}
    </div>
}