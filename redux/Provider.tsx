"use client"

import { Provider } from "react-redux"
import store, { persistor } from "./store"
import { PersistGate } from 'redux-persist/integration/react'


function StoreProvider({children}: {children: any}) {
  return (
    <Provider store={store}>
     
     <PersistGate persistor={persistor}>
     {children}
     </PersistGate>
     
     </Provider>
  )
}

export default StoreProvider