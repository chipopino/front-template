import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import processWikidataQuery from 'methods/processWikidataQuery';
import data from './data.json';

type modalStateType = null | ReactNode;

export const DEFAULT_ITEM = {
    "item": "",
    "itemLabel": "",
    "description": "",
    "starttime": "",
    "perpetratorLabel": "",
    "victimLabel": "",
    "deaths": "",
    "injuries": "",
    "pic": "",
    "wikipedia": ""
}

const Context = createContext<any>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {

    // loadingList is a list of jobs that are currently executing
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalContent, _setModalContent] = useState<modalStateType>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingList, setLoadingList] = useState<number[]>([]);
    
    //@ts-ignore
    const [items, setItems] = useState<any>(processWikidataQuery(data));

    useEffect(() => {
        setIsLoading(!!loadingList.length);
    }, [loadingList])

    function setModalContent(content: ReactNode) {
        if (content) {
            setIsModalOpen(true);
            _setModalContent(content);
        } else {
            setIsModalOpen(false);
            setTimeout(() => {
                _setModalContent(null);
            }, 300)
        }
    }

    return (
        <Context.Provider value={{
            isModalOpen,
            modalContent,
            setModalContent,
            items,
            setItems,
            isLoading,
            setIsLoading,
            loadingList,
            setLoadingList,
        }}>
            {children}
        </Context.Provider>
    );
};

export default function useCtx() {
    const context = useContext(Context);
    return context;
}