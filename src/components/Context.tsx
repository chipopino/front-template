import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import data from './data5.json';
import processWikidataQuery from 'methods/humanizeWikidataQuery';

type modalStateType = null | ReactNode;

interface contextType {
    isModalOpen: Boolean;
    modalContent: modalStateType;
    setModalContent: (content: ReactNode) => void;
    items: any;
    setItems: any;
}

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

    //@ts-ignore
    const [items, setItems] = useState<any>(processWikidataQuery(data));
    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalContent, _setModalContent] = useState<modalStateType>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loadingList, setLoadingList] = useState<number[]>([]);

    // loadingList is a list of jobs that are currently executing
    
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