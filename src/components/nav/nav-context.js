import { createContext, useContext, useState } from "react"

const NavContext = createContext();

export function NavProvider( { children } ) {

    const [route, setRoute] = useState("products")

    return(
        <NavContext.Provider value={ { route: route, setRoute: setRoute } }>
            {children}
        </NavContext.Provider>
    )
}

export function useNav(){
    return useContext(NavContext)
}