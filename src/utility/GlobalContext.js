import React, { useEffect, useState } from "react";

import jwtDecode from "jwt-decode";

const GlobalContext = React
  .createContext
  //   (null as unknown) as ContextProps
  ();

const initialState = { 
                    jwt: "", 
                    loading: false, 
                    user: {}, 
                    currentUserID: null,
                    drawer:{
                      isOpen: false,
                    },
                    isLoading: false,
                  };

const GlobalContextProvider = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () => {
      console.log("doing this!");
      // await AsyncStorage.removeItem("id_token");
      const value = localStorage.getItem("id_token");
    //   console.log(value)
      if (value !== null) {
        const decodedToken = jwtDecode(value, { header: false });
        console.log(decodedToken)
        const currentUserID = decodedToken.id;
        setState({
          ...state,
          jwt: value,
          currentUserID: currentUserID,
        });
      } else {
        setState({
          ...state,
          loading: false,
        });
      }
      // If you want to also store it in async storage,
      // you could always access it here and set the jwt in state
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
