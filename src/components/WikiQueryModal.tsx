import React, { useState } from 'react';
import useCtx from 'components/Context';
import Btn from 'components/Btn';
import { get } from 'methodes/fetch';
import { createQueryString } from 'methodes/global';

// import timelineData from './data/json/fin.json';
import jewishQuery from './jewishQuery.txt';
import { lset } from 'methodes/localStorage';
import processWikidataQuery from 'methodes/humanizeWikidataQuery';

export default function WikiQueryModal() {

    const [text, setText] = useState(jewishQuery);
    const { setModalContent, setItems, setIsLoading } = useCtx();

    function onUpload() {
        lset('lastQuery', text);
        setIsLoading(true);
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
        }).catch(err => {
            console.log("ERR 4262436464", err)
        }).finally(() => setIsLoading(false));
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