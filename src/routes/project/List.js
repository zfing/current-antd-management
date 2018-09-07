import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Divider, Select } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'
import moment from "moment/moment"
import * as currentConfig from '../../utils/config'
const { token } = currentConfig
const { currentUrl } = currentConfig
const { txHash } = currentConfig
const { confirm } = Modal
const { Option } = Select

console.log(currentConfig)

const List = ({
   selected,
   onLaunch,
   onEditItem,
   onDisplay,
   isMotion,
   location,
   ...tableProps
}) => {
  location.query = queryString.parse(location.search)

  const rating = (record) => {
    console.log(record)
    confirm({
      title: '确定开始评级此项目？待评级报告提交后可去评级报告页面发布',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onRatingItem(record.id)
      },
    })
  }

  const statusChange = (record, value) => {
    onLaunch(value, record.id)
  }

  const viewChange = (record, value) => {
    onDisplay(value, record.id)
  }


  const imgNameStyle = {
    width: 30,
    height: 30,
    marginRight: 10,
  }
  const previewStyle = {
    style: {
      marginRight: 5,
      marginBottom: 10,
      marginTop: 10
    }
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
      width: 200,
      render: (text, record) =>
        <div style={{ textAlign: 'left' }}>
          <img src={record.logoUrl ? record.logoUrl : 'https://dprating.oss-cn-shanghai.aliyuncs.com/prod/website/default.svg'} alt="" style={imgNameStyle}/>
          <span>{record.projectName}</span>
        </div>,
    }, {
      title: '项目类型',
      dataIndex: 'projectType',
      key: 'projectType',
      width: 300,
      render: (text, record) => {
        if (record.projectCategoryList) {
          const dataList = record.projectCategoryList
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
      title: '项目简介',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text, record) => {
        if (record.description) {
          if (record.description.length > 80) {
            return record.description.replace(/\s+/g, "").substr(0, 60) + "..."
          } else {
            return record.description
          }
        } else {
          return '-'
        }
      },
    }, {
      title: '提交时间',
      dataIndex: 'gmtModify',
      key: 'gmtModify',
      width: 135,
      render: (text, record) => {
        return moment(record.gmtModify).format("YYYY-MM-DD HH:mm")
      },
    },{
      title: 'Txhash',
      dataIndex: 'txHash',
      key: 'txHash',
      width: 150,
      render: (text, record) => {
        if (record.txHash) {
          return <a href={txHash+`/tx/${record.txHash}`} target="_blank">{record.txHash}</a>
        } else {
          return "-"
        }
      },
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 140,
      render: (text, record) => {
        if (record.status === 0) {
          return '未提交'
        } else if (record.status === 1) {
          return '待审核'
        } else if (record.status === 2) {
          return '评级中'
        } else if (record.status === 3) {
          return '已评级'
        } else if (record.status === 4) {
          return '尽调中'
        } else if (record.status === 5) {
          return 'Txhash待提交'
        } else if (record.status === 6) {
          return '审核未通过'
        } else if (record.status === 7) {
          return '尽调未通过'
        } else if (record.status === 8) {
          return 'Txhash审核未通过'
        } else if (record.status === 9) {
          return 'Txhash审核中'
        }
      },
    }, {
      title: '操作',
      key: 'operation',
      width: 170,
      render: (text, record) =>
        <span className="operations">
          <a href={ currentUrl + `/project/${record.id}?type=preview&from=admin&token=`+ token } {...previewStyle} target="_blank" > 预览 </a>
          {record.status === 1 && <Select style={{ marginLeft: 5, width: 100 }} defaultValue={"操作"} onChange={ (value) => {statusChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={6}>不通过</Option>
            <Option value={4}>需要尽调</Option>
            <Option value={5}>燃烧代币</Option>
            <Option value={2}>直接评级</Option>
          </Select>}
          {record.status === 4 && <Select style={{ marginLeft: 5, width: 100 }} defaultValue={"操作"} onChange={ (value) => {statusChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={7}>不通过</Option>
            <Option value={2}>直接评级</Option>
          </Select>}

          {record.status === 9 && <Select style={{ marginLeft: 5, width: 80 }} defaultValue={"操作"} onChange={ (value) => {statusChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
            <Option value={8}>不通过</Option>
            <Option value={2}>直接评级</Option>
          </Select>
          }
        </span>
      ,
    }, {
      title: '是否展示',
      key: 'view',
      width: 100,
      render: (text, record) =>
      <span>
        {(record.status===1  || record.status === 2 || record.status===4 || record.status===5 || record.status===8 || record.status===9) && <Select style={{ width: 50 }} defaultValue={record.needDisplay ? record.needDisplay : 0} onChange={ (value) => {viewChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
          <Option value={0}>否</Option>
          <Option value={1}>是</Option>
        </Select>}
        {(record.status===3  || record.status === 7) && <Select style={{ width: 50 }} defaultValue={0} disabled onChange={ (value) => {viewChange(record, value)}} getPopupContainer={trigger => trigger.parentNode}>
          <Option value={0}>否</Option>
          <Option value={1}>是</Option>
        </Select>}
        {(record.status ===0 || record.status ===6) && <span>-</span>}
      </span>,
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
