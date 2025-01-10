import React, { useState } from 'react';
import useCtx from 'components/Context';
import Btn from 'components/Btn';
import { useGet } from 'hooks/useFetch';
import { createQueryString } from 'methods/global';
import processWikidataQuery from 'methods/processWikidataQuery';
import jewishQuery from './jewishQuery.txt';

export default function WikiQueryModal() {

    const [text, setText] = useState(jewishQuery);
    const { setModalContent, setItems } = useCtx();
    const get = useGet();

    function onUpload() {
        get(
            createQueryString({
                'query': text,
                'format': 'json'
            }),
            'https://query.wikidata.org/sparql'
        ).then(e => {
            //@ts-ignore
            setItems(processWikidataQuery(e));
            setModalContent(null);
        })
    }

    return <div className='relative flex flex-col gap-4 w-[80vw] h-[80vh]'>
        <p>I think you only need "item", "itemLabel", "description" and "starttime" for this to work</p>
        <textarea
            id="w3review"
            name="w3review"
            className="resize-none w-full h-full"
            value={text}
            onChange={e => setText(e.target.value)}
            autoFocus
        />
        <Btn onClick={onUpload}>
            submit
        </Btn>
    </div >
}