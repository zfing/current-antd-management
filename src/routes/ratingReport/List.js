import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Button } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import Bread from "../../components/Layout/Bread";
import moment from "moment/moment";
import * as currentConfig from '../../utils/config'
const { token } = currentConfig
const { currentUrl } = currentConfig

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps, onRelease
}) => {
  location.query = queryString.parse(location.search)

  // const handleMenuClick = (record, e) => {
  //   console.log(record.userId)
  //   if (e.key === '1') {
  //     onEditItem(record.userId)
  //   } else if (e.key === '2') {
  //     confirm({
  //       title: 'Are you sure delete this record?',
  //       onOk () {
  //         onDeleteItem(record.id)
  //       },
  //     })
  //   }
  // }
  const releaseReport = (record) => {
    console.log(record)
    confirm({
      title: '确定发布此评级报告？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onRelease(record.id)
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
      dataIndex: 'projectName',
      key: 'projectName',
      width: 300,
      render: (text, record) =>
        <div style={{ textAlign: 'left', marginLeft: 50 }}>
          <img src={record.logoUrl ? record.logoUrl : 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'} alt="" style={imgNameStyle}/>
          <span>{record.projectName}</span>
        </div>,
    }, {
      title: '项目类型',
      dataIndex: 'categoryList',
      key: 'categoryList',
      width: 350,
      render: (text, record) => {
        if (record.categoryList) {
          const dataList = record.categoryList
          const dataType = []
          if (dataList) {
            for (let i = 0; i < dataList.length; i++) {
              dataType.push(dataList[i].categoryName)
            }
          }
          return dataType.join(' & ')
        } else {
          return '-'
        }
      },
    }, {
      title: '可投资性评级',
      dataIndex: 'investScore',
      key: 'investScore',
      width: 120,
      render: (text, record) => {
        if (record.investScore === 0) {
          return 'D'
        } else if (record.investScore === 1) {
          return 'C'
        } else if (record.investScore === 2) {
          return 'Cc'
        } else if (record.investScore === 3) {
          return 'Ccc'
        } else if (record.investScore === 4) {
          return 'B'
        } else if (record.investScore === 5) {
          return 'Bb'
        } else if (record.investScore === 6) {
          return 'Bbb'
        } else if (record.investScore === 7) {
          return 'A'
        } else if (record.investScore === 8) {
          return 'Aa'
        } else if (record.investScore === 9) {
          return 'Aaa'
        } else {
          return '-'
        }
      },
      // render: (text, record) => (Math.round(Number(record.preTrend) * 10000)/100).toFixed(2) + '%',
    },{
      title: '风险评级',
      dataIndex: 'riskScore',
      key: 'riskScore',
      width: 100,
      render: (text, record) => {
      //  A-极低，B-低，C-中，D-高，E-极高
        if (record.riskScore === 'A') {
          return '极低'
        } else if (record.riskScore === 'B') {
          return '低'
        } else if (record.riskScore === 'C') {
          return '中'
        } else if (record.riskScore === 'D') {
          return '高'
        } else if (record.riskScore === 'E') {
          return '极高'
        } else {
          return '-'
        }
      },
      // render: (text, record) => (Math.round(Number(record.preTrend) * 10000)/100).toFixed(2) + '%',
    },{
      title: '创建时间',
      dataIndex: 'gmtModify',
      key: 'gmtModify',
      width: 115,
      render: (text, record) => {
        return moment(record.gmtModify).format("YYYY-MM-DD HH:mm")
      },
      // render: (text, record) => (Math.round(Number(record.preTrend) * 10000)/100).toFixed(2) + '%',
    }, {
      title: '状态',
      dataIndex: 'ratingStatus',
      key: 'ratingStatus',
      width: 90,
      render: (text, record) => {
        if (record.ratingStatus === 0) {
          return '评级中'
        } else if (record.ratingStatus === 1) {
          return '待审核'
        } else if (record.ratingStatus === 2) {
          return '已发布'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) =>
        <span>
          <a href={ currentUrl + `/rating/report/${record.id}?type=preview&from=admin&`+ `token=`+ token } style={{ marginRight: 5 }} target="_blank" > 预览 </a>
          {record.ratingStatus === 1 &&  <a onClick={() => releaseReport(record)} style={{ marginLeft: 5 }}> 发布 </a>}
        </span>
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
