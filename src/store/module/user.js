import {createSlice} from '@reduxjs/toolkit'
import {request} from '@/utils' 
import {setToken as _setToken, getToken} from '@/utils'

// 创建一个名为 user 的 slice，包含一个 初始状态 和一个 reducers 对象
const userStore = createSlice({
  name:'user',
  initialState: {
    token: getToken() || ''
  },
  // reducers 对象包含了一系列的 reducer 函数，这些函数定义了如何更新状态
  reducers: {
    setToken(state, action) {
      state.token = action.payload

      // localStorage存一份
      _setToken(action.payload)
    }
  }
})

// setToken 是 createSlice 自动生成的 action creator
// 解构出 actionCreator
const {setToken} = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

// 异步方法, 完成登录获取 token
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 发送异步请求
    const res = await request.post('/authorizations', loginForm)
    // 提交同步 action 进行 token 存入
    dispatch(setToken(res.data.token))
  }
}

export {setToken, fetchLogin}
export default userReducer