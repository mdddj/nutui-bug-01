import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.less'
import React, {useCallback, useEffect, useState} from "react";
import {VirtualList} from "@nutui/nutui-react";

export default function Index() {
  const [sourceData, setsourceData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const getData = useCallback(() => {
    const datas = []
    const pageSize = 90
    for (let i = 10; i < pageSize; i++) {
      datas.push(`${i} Item`)
    }
    setsourceData((sourceData) => {
      return [...sourceData, ...datas]
    })
  }, [])
  const onScroll = () => {
    if (pageNo > 100) return
    setPageNo(pageNo + 1)
  }
  useEffect(() => {
    getData()
  }, [getData])
  const ItemVariable = ({ data, index }) => {
    return (
      <p className={index % 2 === 0 ? '' : 'nut-virtualList-demo-item'}>可变大小隔行展示-{data}</p>
    )
  }
  /** itemSize为首屏最大元素大小 */
  const ItemVariableDemo = React.memo(ItemVariable)
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className='index'>
      <Text>Hello world!</Text>
      <div className='nut-virtualList-demo-box  hideScrollbar heigh1'>
        <VirtualList
          sourceData={sourceData}
          ItemRender={ItemVariableDemo}
          itemSize={128}
          itemEqualSize={false}
          onScroll={onScroll}
        />
      </div>
    </View>
  )
}
