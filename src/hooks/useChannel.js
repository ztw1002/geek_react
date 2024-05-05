// 封装获取频道列表的逻辑
import { useState,useEffect } from "react"
import { getChannelAPI } from "@/apis/article"

function useChannel() {
  const [channelList, setChannelList] = useState([])

  useEffect(() => {
    // 封装函数，调用接口，调用函数
    const getChannelList = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  },[])

  return {
    channelList
  }
}

export {useChannel}