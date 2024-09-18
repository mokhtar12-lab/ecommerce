import { createRoot } from 'react-dom/client'
import AppRouters from './Tools/routes/AppRouters'

import { persistorsStore } from './Tools/store/store' 
import { store } from './Tools/store/store'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import "./main.css"

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistorsStore}>
            <AppRouters />
        </PersistGate>
    </Provider>
)
