// 封装hoc，有 token 正常跳转，无 token 去登录页面
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute({children}) {
  const token = getToken()

  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}

