import {createContext, useContext, useState} from "react";

const UIContext = createContext();
export function UIProvider({children}){
    const [authModal, setAuthModal] = useState(null)
    const openAuthModal = (type) => setAuthModal(type)
    const closeAuthModal = () => setAuthModal(null)
    return(
        <UIContext.Provider value={{
            authModal, openAuthModal,closeAuthModal
        }}> {children} </UIContext.Provider>
    )
}
export function useUI(){
    return useContext(UIContext)
}