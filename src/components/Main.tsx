import React, { useEffect, useRef, useState } from 'react';
import useCtx from 'components/Context';
import Btn from 'components/Btn';
import WikiQueryModal from 'components/WikiQueryModal';
import useGetWikiSummary from 'hooks/useGetWikiSummary';
import processWikidataQuery from 'methods/processWikidataQuery';
import { cn, isSm } from 'methods/global';

import Image from 'components/Image';
import MenuIcon from '@mui/icons-material/Menu';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


export default function Main() {

    const { setModalContent, isModalOpen, items, setItems } = useCtx();
    const [selected, setSelected] = useState(items[0]);
    const [summary, setSummary] = useState<string>('');
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const getWiki = useGetWikiSummary();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        fileInputRef.current?.click();
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target?.result) {
                    //@ts-ignore
                    setItems(processWikidataQuery(JSON.parse(e.target.result)));
                }
            };

            reader.onerror = (e) => {
                console.error("Error reading file:", e);
            };

            reader.readAsText(file); // Use `readAsText`, `readAsDataURL`, or `readAsArrayBuffer` as needed
        }
        setIsMenuOpen(false);
    };

    function handleGetWikiLink(item: any) {
        if (selected.itemId !== item.itemId) {
            setSelected(item);
            if (item.item && item.wikipedia) {
                getWiki(item.wikipedia).then((result: any) => {
                    setSummary(result);
                    if (isSm()) {
                        setModalContent(
                            <div className='flex flex-col gap-2'>
                                {item.pic && <Image src={item.pic} className='max-w-[300px] mx-auto' />}
                                {!item.pic && <ImageNotSupportedIcon className='!w-full' />}
                                {/* @ts-ignore */}
                                <p className='max-w-[600px] p-4'>{result}</p>
                                <a href={item.wikipedia} className='w-full p-4'>{item.wikipedia}</a>
                            </div>
                        )
                    }
                })
            }
        }
    }

    useEffect(() => {
        setIsMenuOpen(false);
    }, [isModalOpen])

    const mainJsx = <div className='flex h-full w-full'>
        <div className='w-full md:max-w-[400px] overflow-y-auto'>
            {items.map((e: any) => {
                return <div
                    key={`key-346437-${e.itemId}`}
                    className={cn(
                        e.itemId === selected.itemId && 'bg-secondary',
                        'p-2 m-1 border flex flex-col overflow-hidden'
                    )}
                    onClick={() => { handleGetWikiLink(e) }}
                >
                    <div className='flex gap-2'>
                        <a href={e.item}>{e.itemLabel}</a>
                        <p>{e.starttime}</p>
                    </div>
                    {/*@ts-ignore*/}
                    <span>{e.description}</span>
                    {e.perpetratorLabel && <span className='text-accent2'>perpetratorLabel: {e.perpetratorLabel}</span>}
                    {e.victimLabel && <span className='text-accent2'>victimLabel: {e.victimLabel}</span>}
                    {e.deaths && <span className='text-accent2'>deaths: {e.deaths}</span>}
                    {e.injuries && <span className='text-accent2'>injuries: {e.injuries}</span>}
                </div>
            })}
        </div>
        <div className='hidden md:block grow p-4 flex flex-col items-center justify-center overflow-hidden overflow-y-auto'>
            {selected.pic && <Image src={selected.pic} className='max-w-[300px] mx-auto' />}
            {!selected.pic && <ImageNotSupportedIcon className='!w-full' />}
            <p className='max-w-[600px] p-4'>{summary}</p>
            <a href={selected.wikipedia} className='w-full p-4'>{selected.wikipedia}</a>
        </div>
    </div>

    const menuJsx = <div className='fixed bottom-0 right-0 w-fit h-fit pointer-events-none'>
        <div
            onClick={() => setIsMenuOpen(false)}
            className={cn(
                isMenuOpen && 'pointer-events-auto bg-black opacity-[0.1]',
                'fixed top-0 left-0 w-screen h-screen z-10'
            )}
        />
        <div className='relative flex flex-col items-end z-20'>
            <div className={cn(
                !isMenuOpen ? 'opacity-0' : 'pointer-events-auto',
                'transition-opacity duration-300 flex flex-col'
            )}>
                <div className='flex w-full'>
                    <Btn
                        className='w-full'
                        onClick={handleClick}
                    >
                        Upload
                    </Btn>
                    <Btn onClick={() => setModalContent(
                        <p>in wikidata you can download the result in json verbose format and then upload it here</p>
                    )}>?</Btn>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />
                <div className='flex w-full'>
                    <Btn
                        className='w-full'
                        onClick={() => setModalContent(<WikiQueryModal />)}
                    >
                        wikidata query
                    </Btn>
                    <Btn onClick={() => setModalContent(
                        <p>you can execute wikidata queries here</p>
                    )}>?</Btn>
                </div>
            </div>
            <Btn
                className='!w-fit pointer-events-auto'
                onClick={() => setIsMenuOpen(old => !old)}
            >
                <MenuIcon />
            </Btn>
        </div>
    </div>

    const noItemsJsx = <div
        onClick={() => setIsMenuOpen(false)}
        className='w-full h-full flex flex-col items-center justify-center'
    >
        no Items found
    </div>

    return <div className='w-full h-full'>
        {!!items[0].item && mainJsx}
        {!items[0].item && noItemsJsx}
        {menuJsx}
    </div>
}