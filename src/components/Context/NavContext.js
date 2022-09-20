import React, { createContext, useContext } from "react";

export const NavContext = createContext();

export function useNavContext() {
  return useContext(createContext);
}

export default function NavContextProvider(props) {
  const [showNavbar, setShowNavbar] = useState(true);
  let value = {
    showNavbar,
    setShowNavbar,
  };
  return (
    <NavContext.Provider value={value}>{props.children}</NavContext.Provider>
  );
}
