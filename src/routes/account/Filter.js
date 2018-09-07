/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import { FilterItem } from 'components'
import { Modal, Form, Button, Row, Col, DatePicker, Input, Cascader, Switch, Select, Icon, Popconfirm} from 'antd'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import city from '../../utils/city'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
// 日历中文设置
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/src/locale/zh-cn'
const { Option } = Select
const FormItem = Form.Item
const { Search } = Input
const { confirm } = Modal
const { RangePicker, MonthPicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
    padding: 0,
  },
}

const FR = {
  padding: 0,
  float: 'right',
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().endOf('day')
}

const Filter = ({
   onCreate,
   selectList,
   selected,
   onSearchTime,
   onAdd,
   onDR,
   isMotion,
   switchIsMotion,
   onFilterChange,
   filter,
   form: {
     getFieldDecorator,
     getFieldsValue,
     setFieldsValue,
   },
 }) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }
  const styleFilter = {
    style: {
      fontWeight: 'bold',
      marginBottom: 15,
    },
  }
  const flexStyle = {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }
  const handleChange = (key, values) => {
    console.log(key, values)
    let fields = getFieldsValue()
    fields[key] = values
    // if ((fields.startPos && !fields.endPos) || (!fields.startPos && fields.endPos)) {
    //   return null
    // }
    // fields = handleFields(fields)
    onFilterChange(fields)
  }

  const createAccount = (value) => {
    console.log(value)
    confirm({
      title: '确定创建此账号吗？',
      okText: '确定',
      cancelText: '取消',
      onOk () {
        onCreate(value)
      },
    })
  }
  return (
    <Form layout={ 'inline' } {...flexStyle} className='filterStyle'>
    {/*  <div>
        <FormItem label={'账号分配'} {...styleFilter}>
          <Select style={{ width: 100 }} defaultValue='-1' onChange={handleChange.bind(null, 'type')}>
            <Option value="-1">所有</Option>
            <Option value="2">项目方</Option>
            <Option value="3">分析师</Option>
          </Select>
        </FormItem>
        <FormItem label={'状态'} {...styleFilter}>
          <Select style={{ width: 100 }} defaultValue='-1' onChange={handleChange.bind(null, 'accountType')}>
            <Option value="-1">所有</Option>
            <Option value="1">已发送</Option>
            <Option value="0">未发送</Option>
          </Select>
        </FormItem>
      </div>*/}
      <FormItem label={'分析师账号'} style={{ marginRight: 0, marginBottom: 15, fontWeight: 600 }}>
        {getFieldDecorator('types', {
          initialValue: '',
          rules: [],
        })(
          <Search
            prefix={<Icon type="user-add"/>}
            placeholder="请输入邮箱"
            enterButton="创建账号"
            size="default"
            onSearch={value => createAccount(value)}
            style={{width: 350}}
          />
        )}
      </FormItem>

    </Form>
  )
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export { disabledDate }
export default Form.create()(Filter)
