import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, DatePicker, Spin, Upload, Icon, Button, message,Row,Col, LocaleProvider } from 'antd'

import { debounce } from 'utils'
import { fileSignature } from 'services/ratingReport'
import styles from './modal.less'
import lodash from  'lodash'
import lrz from 'lrz'
import { request } from 'utils'
const { MonthPicker } = DatePicker
import moment from 'moment'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/src/locale/zh-cn'

const FormItem = Form.Item
const Search = Input.Search
const { TextArea } = Input
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class modal extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      inputValue: props.item.coinName || '',
      loading: false,
      id: props.item.id || '',
      year: null,
      month: null,
    }
  }

  getDateTime = (value) => {
    this.setState({
      year : new Date(value._d).getFullYear(),
      month : new Date(value._d).getMonth() + 1,
    })
  }
  getTrend = (value) => {
    console.log(value)
    this.setState({
      rankTrend: value,
    })
  }
  handleChange = (info) => {
    console.log(info)
    this.setState({ webFileList: info.fileList})

  }

  getValue = (i) => {
    console.log(i)
    this.props.onClear()
    this.setState({
      inputValue: i.coinName,
      coinId: i.coinId,
    })
  }

  render () {
    const {
      item = {},
      searchList,
      selected,
      modalType,
      onOk,
      form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
      },
      ...modalProps
    } = this.props

    // const { inputValue, coinId, webFileList, H5FileList, startValue, endValue, endOpen } = this.state
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          id: item.id,
        }

        for (let item in data) {
          if (item === 'key' && (data[item] === undefined || data[item] === '')) {
              return message.warning('名称不能为空')
          } else if (item === 'value' && (data[item] === undefined || data[item] === '')) {
              return message.warning('值不能为空')
          }
        }
        onOk(data)
      })
    }

    const modalOpts = {
      ...modalProps,
      onOk: handleOk,
    }

    const inputWidth = {
      style: {
        width: 300,
      },
    }

    return (
      <Modal {...modalOpts} className={styles.modal}>
        <Form layout="horizontal">
          <FormItem label="名称" {...formItemLayout}>
            {getFieldDecorator('key', {
              initialValue: item.confKey,
              rules: [{
                require: true,
                message: '请填写名称',
              }],
            })(
              <Input {...inputWidth} placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem label="值" {...formItemLayout}>
            {getFieldDecorator('value', {
              initialValue: item.confValue,
              rules: [{
                require: true,
                message: '请填写值',
              }],
            })(<Input {...inputWidth} placeholder="请输入值"/> )}
          </FormItem>
          <FormItem  label="描述" {...formItemLayout}>
            {getFieldDecorator('desc', {
              initialValue: item.confDesc,
              rules: [{
                require: true,
                message: '请填写描述',
              }],
            })(<TextArea placeholder="请输入描述" {...inputWidth} autosize={{ minRows: 2}}/>)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
