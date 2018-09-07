import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment";

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps, onDetail, onSendEmail
}) => {
  location.query = queryString.parse(location.search)

  const handleMenuClick = (record, e) => {
    console.log(record.userId)
    if (e.key === '1') {
      onEditItem(record.userId)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const deleteItem = (record) => {
    console.log(record)
    confirm({
      title: '确定删除此信息？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onDeleteItem(record.id)
      },
    })
  }
  const sendEmail = (record) => {
    console.log(record)
    confirm({
      title: '确定重发账号吗？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onSendEmail(record)
      },
    })
  }

  const imgNameStyle = {
    width: 30,
    height: 30,
    marginRight: 10,
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    }, {
      title: '项目名称',
      dataIndex: 'startupName',
      key: 'startupName',
      width: 200,
      /*render: (text, record) =>
        <div style={{ textAlign: 'left' }}>
          <img src={record.imgUrl ? record.imgUrl : 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'} alt="" style={imgNameStyle}/>
          <span>{record.coinName}</span>
        </div>,*/
    }, {
      title: '手机',
      dataIndex: 'phone',
      key: 'phone',
      render: (text, record) => `+${record.phonePrefix} ${record.phone}`,
    }, {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      // render: (text, record) => `${record.age}`,
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      // render: (text, record) => `${record.age}`,
    }, {
      title: '网址',
      dataIndex: 'website',
      key: 'website',
       // render: (text, record) => `${record.hotRate}`,
    }, {
      title: '提交时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
      render: (text, record) => {
        return moment(record.gmtCreate).format("YYYY-MM-DD HH:mm")
      },
    }, {
      title: '账号',
      dataIndex: 'hasAccount',
      key: 'hasAccount',
       render: (text, record) => {
        if (record.hasAccount === 0) {
          return '未创建'
        } else if (record.hasAccount === 1){
          return '已创建'
        } else {
          return '-'
        }
       },
    }, {
      title: '操作',
      key: 'operation',
      width: 160,
      render: (text, record) =>
        <div>
          <a onClick={() => onDetail(record)} style={{ marginLeft: 5 }}> 详情 </a>
          <a onClick={() => deleteItem(record)} style={{ marginLeft: 5 }}> 删除 </a>
          {record.hasAccount === 1 && <a onClick={() => sendEmail(record)} style={{ marginLeft: 5 }}> 重发账号 </a>}
        </div>
      ,
      // render: (text, record) => {
      //   return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
      // },
    },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }


  {/*{...tableProps}*/}  // 是Table的数据属性，暂时用dataSource={dataSource}代替

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.id}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
