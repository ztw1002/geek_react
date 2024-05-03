// 组合 redux 子模块，到处 store 实例

import {configureStore} from '@reduxjs/toolkit'
import userReducer from './module/user'

export default configureStore({
  reducer: {
    user: userReducer
  }
})