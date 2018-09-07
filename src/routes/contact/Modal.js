import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal,Select, Cascader, DatePicker, Spin, Upload, Icon, Button,Tag, message,Row,Col, LocaleProvider } from 'antd'
import ReactDOM from 'react-dom'
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
    let fileList = []
    // let FilesFileList = []
    if (!lodash.isEmpty(props.item)) {
      fileList = [
        {
          uid: -1,
          name: 'xxx.png',
          status: 'done',
          url: props.item.imgUrl,
        },
      ]
      // FilesFileList = [
      //   {
      //     uid: -1,
      //     name: props.item.downloadUrl,
      //     status: 'done',
      //     url: props.item.downloadUrl,
      //   },
      // ]
    }
    this.state = {
      inputValue: props.item.coinName || '',
      coinId: '',
      loading: false,
      imageUrl: null,
      iconUrl: props.item.imgUrl || null,
      fileUrl: props.item.downloadUrl || null,
      id: props.item.id || '',
      fileList,
      year: null,
      month: null,
      rankTrend: null,
      radioValue: null,
    }
  }
  render () {
    const {
      onCancel,
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

    // const { inputValue, coinId, fileList, FilesFileList, radioValue } = this.state
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }
        const data = {
          ...getFieldsValue(),
          type: 2,
          id: item.id,
        }
        onOk(data)
      })
    }
    const inlineStyle = {
        style:{
          display: 'inline'
        }
    }
    const modalOpts = {
      onCancel,
      ...modalProps,
      onOk: handleOk,
      footer: <div>
        <Button type="default" onClick={() => onCancel()}>取消</Button>
        {item.hasAccount === 0
          ? <Button type="primary" onClick={() => handleOk()}>创建账号并发送通知</Button>
          : <Button disabled type="primary" onClick={() => handleOk()}>创建账号并发送通知</Button>
        }
      </div>,
    }
    const labelStyle = {
      style: {
        fontWeight: 600,
      },
    }
    return (
      <Modal {...modalOpts} className={styles.modal}>
          <Form layout="horizontal" >
            <FormItem label={<span {...labelStyle} >项目名称</span>} {...formItemLayout} >
               <span>{item.startupName}</span>
            </FormItem>
            <FormItem label={<span {...labelStyle} >联系人</span>} {...formItemLayout}>
                <span>{item.contactPerson}</span>
            </FormItem>
            <FormItem  label={<span {...labelStyle} >邮箱</span>}{...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [],
              })(
                <span>{item.email}</span>
              )}
            </FormItem>
            <FormItem  label={<span {...labelStyle} >网站</span>}{...formItemLayout}>
                <span>{item.website}</span>
            </FormItem>
            <FormItem label={<span {...labelStyle} >电话</span>}{...formItemLayout}>
                <span>+{item.phonePrefix} {item.phone}</span>
            </FormItem>
            <FormItem label={<span {...labelStyle} >Skype或电报</span>}{...formItemLayout}>
                <span>{item.skypeTelegram ? item.skypeTelegram : '暂无'}</span>
            </FormItem>
            <FormItem  label={<span {...labelStyle} >微信</span>}{...formItemLayout}>
                 <span>{item.wechat ? item.wechat : '暂无'}</span>
            </FormItem>
            <FormItem  label={<span {...labelStyle} >项目简介</span>}{...formItemLayout} {...inlineStyle}>
                  <span>{item.interest ? item.interest : '暂无'}</span>
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
