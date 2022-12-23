import React, {useEffect} from 'react'
import {observer} from 'mobx-react'
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroller';
import {List, Spin} from 'antd';
import styled from 'styled-components'

const Img = styled.img`
  width: 100px;
  height: 120px;
  object-fit: contain;
  border:1px solid #ccc;
`
const DataList = observer(() => {
    const {HistoryStore} = useStores()
    const loadMore = () => {
        //自动查询数据并放入列表
        HistoryStore.find()
    }
    useEffect(()=>{
        console.log('进入组件')
        return ()=>{
            console.log('卸载')
            HistoryStore.reset() //重置
        }
    },[])
    //删除后UI自动更新
    useEffect(()=>{
       HistoryStore.find()
    },HistoryStore.list)
    //InfiniteScroll的属性写成一个对象
    // const options = {
    //     initialLoad: true,
    //     pageStart: 0,
    //     loadMore,
    //     hasMore: !HistoryStore.isLoading && HistoryStore.hasMore,//加载完毕且有hasMore
    //     useWindow: true,
    //     dataLength: HistoryStore.limit
    // }
    return (
        <>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={loadMore}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={true}
            >
                <List dataSource={HistoryStore.list}
                      renderItem={
                          item =>
                              //使用key是diff时可以提高效率
                              <List.Item key={item.id}>
                                  <div>
                                      <Img src={item.attributes.url.attributes.url} />
                                  </div>
                                  <div>
                                      <h5>{item.attributes.filename}</h5>
                                  </div>
                                  <div>
                                      <a href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                                  </div>
                                  <button onClick={()=>HistoryStore.delete(item)}>删除记录</button>
                              </List.Item>
                      }
                >
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin tip="加载中"/>
                        </div>
                    )}
                </List>
            </InfiniteScroll>
        </>
    )
})

export default DataList