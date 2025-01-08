import React, { createContext, useState, ReactNode, useContext } from 'react';
import data from './data.json';

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

    const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
    const [modalContent, _setModalContent] = useState<modalStateType>(null);
    // const [items, setItems] = useState<any>(data);
    const [items, setItems] = useState<any>(data);
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading
        }}>
            {children}
        </Context.Provider>
    );
};

export default function useCtx() {
    const context = useContext(Context);
    return context;
}