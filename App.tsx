import React from 'react'
import { Provider } from 'mobx-react'

import store from './store/'

import Index from './pages/index/Index'

export default function App() {
  return (
    <Provider store={store}>
      <Index></Index>
    </Provider>
  )
}
