import React, {useState, createContext} from 'react'

export const PopupsContext = createContext()

export const PopupsProvider = (props)  => {
    const [open, setOpen]   = useState()

    return(
        <PopupsContext.Provider value = {[open, setOpen]}>
            {props.children}
        </PopupsContext.Provider>
    )
}