import React from 'react'
import {observer} from 'mobx-react'
import {useStores} from "../stores";
import InfiniteScroll from 'react-infinite-scroll-component';
import {List, Spin} from 'antd';

const DataList = observer(() => {
    const {HistoryStore} = useStores()
    const loadMore = () => {
        //自动查询数据并放入列表
        HistoryStore.find()
    }
    //InfiniteScroll的属性写成一个对象
    const options = {
        initialLoad: true,
        pageStart:0,
        loadMore,
        hasMore:!HistoryStore.isLoading && HistoryStore.hasMore,//加载完毕且有hasMore
        useWindow:true,
        dataLength:HistoryStore.list.length
    }
    return (
        <InfiniteScroll
            {...options}
        >
            <List dataSource={HistoryStore.list}
                  renderItem={
                      item => (
                          //使用key是diff时可以提高效率
                          <List.Item key={item.id}>
                          </List.Item>
                      )
                  }
            >
                {HistoryStore.isLoading && HistoryStore.hasMore && (
                    <div>
                        <Spin tip="加载中"/>
                    </div>
                )}
            </List>
        </InfiniteScroll>
    )
})

export default DataList