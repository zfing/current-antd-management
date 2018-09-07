/* global document */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, DatePicker, Input, Select, InputNumber } from 'antd'
import city from '../../utils/city'

const { Search } = Input
const { RangePicker } = DatePicker
const { Option } = Select
const InputGroup = Input.Group
const FormItem = Form.Item
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
     onAdd,
     isMotion,
     switchIsMotion,
     onFilterChange,
     filter,
     loading,
     query,
     dispatch,
     onSearchProject,
     form: {
       getFieldDecorator,
       getFieldsValue,
       validateFields,
       setFieldsValue,
     },
 }) => {

  // onFieldsChange: (props, fields) => {
  //   console.log(props, fields)
  //   let value = {}
  //   _.forEach(fields, (item, key) => {
  //     value[key] = item.value
  //   })
  //
  //   props.onFilterChange(value)
  //   // props.dispatch({
  //   //   type: 'kyc/query',
  //   //   payload: {
  //   //     ...values,
  //   //   },
  //   // })
  // }
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

  const labelStyle = {
    marginRight: 15,
    fontSize: 18,
    fontWeight: 'bold',
  }

  const handleChange = (key, values) => {
    console.log(key, values)
    let fields = getFieldsValue()
    fields[key] = values

    if ((fields.startPos && !fields.endPos) || (!fields.startPos && fields.endPos)) {
      return null
    }

    // fields = handleFields(fields)
    onFilterChange(fields)
  }
  const { name, address } = filter

  let initialCreateTime = []
  if (filter.createTime && filter.createTime[0]) {
    initialCreateTime[0] = moment(filter.createTime[0])
  }
  if (filter.createTime && filter.createTime[1]) {
    initialCreateTime[1] = moment(filter.createTime[1])
  }

  function onChange (value) {
    console.log('changed', value)
    onFilterChange(value)
  }

  function onSubmit (e) {
    // e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        onFilterChange(values)
      }
    })
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
  return (
    <Form layout='inline' {...flexStyle}>
      <FormItem label={'状态'} {...styleFilter}>
          <Select style={{ width: 100 }} onChange={handleChange.bind(null, 'type')} defaultValue='-1' getPopupContainer={trigger => trigger.parentNode}>
            <Option value="-1">所有</Option>
            <Option value="1">待审核</Option>
            <Option value="0">评级中</Option>
            <Option value="2">已发布</Option>
          </Select>
      </FormItem>
      <FormItem style={{ marginRight: 0 }}>
        <Search
          placeholder="输入项目名称查询"
          onSearch={value => onSearchProject(value)}
          style={{ width: 300 }}
          enterButton="搜索"
        />
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

export default Form.create()(Filter)
