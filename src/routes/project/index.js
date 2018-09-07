import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import ModalDR from './ModalDR'
import moment from  'moment'

const User = ({
  location, dispatch, user, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const {
    list, pagination, currentItem, modalVisible, modalVisibleDR, modalType, isMotion, selectedRowKeys, selected, selectList, searchList,
  } = user

  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const modalDRProps = {
    dispatch,
    item: {},
    closable: false,
    visible: modalVisibleDR,
    maskClosable: false,
    width: 550,
    loading,
    // okText: '确定',
    // cancelText: '取消',
    confirmLoading: loading.effects[`project/${modalType}`],
    title: '导入文件',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: 'project/upload',
        payload: data,
      })
        .then(() => {
          debugger
          dispatch({
            type: 'project/getTime',
            payload: {
              type: 3,
            },
            refresh: true,
          })
        })
    },
    onCancel () {
      dispatch({
        type: 'project/hideModalDR',
      })
    },
  }

  const modalProps = {
    modalType,
    selected,
    searchList,
    onClear () {
      dispatch({
        type: 'project/searchSuccess',
        payload: {
          searchList: [],
        },
      })
    },
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    width: 600,
    // footer: <div style={{ textAlign: 'center' }}>
    //   <Button type="primary" >确定</Button>
    // </div>,
    confirmLoading: loading.effects[`project/${modalType}`],
    title: `${modalType === 'create' ? '添加' : '编辑'}`,
    wrapClassName: 'vertical-center-modal',
    okText: '确定',
    cancelText: '取消',
    onOk (data) {
      debugger
      dispatch({
        type: `project/${modalType}`,
        payload: data,
      })
        .then(() => {
          debugger
          dispatch({
            type: 'project/getTime',
            payload: {
              type: 3,
            },
            refresh: true,
          })
        })
    },
    onCancel () {
      dispatch({
        type: 'project/hideModal',
      })
    },
    onSearch (value) {
      // console.log(value)
      dispatch({
        type: 'project/Search',
        payload: value,
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['project/query'],
    pagination,
    location,
    isMotion,
    selected,
    onChange (page) {
      handleRefresh({
        page: page.current,
        pageSize: page.pageSize,
      })
    },
    onLaunch (value, id) {
      dispatch({
        type: 'project/launch',
        payload: {
          id,
          status: value,
        },
      })
    },
    onDisplay (value, id) {
      dispatch({
        type: 'project/display',
        payload: {
          isDisplay: value,
          id,
        },
      })
    },
    // onEditItem (item) {
    //   dispatch({
    //     type: 'project/showModal',
    //     payload: {
    //       modalType: 'update',
    //       currentItem: item,
    //     },
    //   })
    // },
    // rowSelection: {
    //   selectedRowKeys,
    //   onChange: (keys) => {
    //     dispatch({
    //       type: 'user/updateState',
    //       payload: {
    //         selectedRowKeys: keys,
    //       },
    //     })
    //   },
    // },
  }
  // console.log(listProps)
  const filterProps = {
    selectList,
    selected,
    isMotion,
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
    onSearchProject (search) {
      dispatch({
        type: 'project/query',
        payload: {
          sequence: search,
        },
      })
      /*if (search !== '') {
        dispatch({
          type: 'project/query',
          payload: {
            sequence: search,
          },
        })
      } else {
        alert('请输入查询内容')
      }*/
    },
    switchIsMotion () {
      dispatch({ type: 'project/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'project/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <Page inner >
      <Filter {...filterProps} />
      {
        selectedRowKeys.length > 0 &&
        <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
          <Col>
            {`Selected ${selectedRowKeys.length} items `}
            <Popconfirm title="Are you sure delete these items?" placement="left" onConfirm={handleDeleteItems}>
              <Button type="primary" style={{ marginLeft: 8 }}>Remove</Button>
            </Popconfirm>
          </Col>
        </Row>
      }
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {modalVisibleDR && <ModalDR {...modalDRProps} />}
    </Page>
  )
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ project, loading }) => ({ user: project, loading }))(User)
