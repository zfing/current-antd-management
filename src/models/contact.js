/* global window */
import modelExtend from 'dva-model-extend'
import queryString from 'query-string'
import { config } from 'utils'
import { query, details, creates, remove, send } from 'services/contact'
// import * as contactsService from 'services/contacts'
import { pageModel } from './common'
import lodash from 'lodash'
const { prefix } = config

export default modelExtend(pageModel, {
  namespace: 'contact',

  state: {
    searchList: [],
    currentItem: {},
    selected: '',
    selectList: [],
    modalVisible: false,
    modalVisibleDR: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/contact') {
          const selected = {
            type: '-1',
          }
          const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload: {
              ...selected,
              ...payloads,
            },
          })
        }
      })
    },
  },

  effects: {

    * query ({ payload = {} }, { call, put }) {
      payload.currentPage = payload.page
      delete  payload.page
      const data = yield call(query, {
        ...payload,
      })
      if (data.resultCode === '0') {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.list,
            pagination: {
              current: Number(payload.currentPage) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.totalSize,
            },
          },
        })
      } else {
        throw data
      }
    },

    * detail ({ payload }, { call, put }) {
      const data = yield call(details, payload)
      if (data.resultCode === '0') {
        yield put({
          type: 'showModal',
          payload: {
            currentItem: data.data,
          },
        })
      } else {
        throw data
      }
    },

    * create ({ payload }, { call, put }) {
      const data = yield call(creates, payload)
      if (data.resultCode === '0') {
        yield put({ type: 'hideModal' })
        const detailData = yield call(details, {id: payload.id})
        if (detailData.resultCode === '0') {
          yield put({
            type: 'send',
            payload: detailData.data.userId,
          })
        }
      } else {
        throw data
      }
    },

    * send ({ payload }, { call, put }) {
      const data = yield call(send, { id: payload })
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },

    * delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },


    * upload ({ payload }, { call, put }) {
      const data = yield call(upload, payload)
      if (data.resultCode === '0') {
        yield put({ type: 'hideModalDR' })
      } else {
        throw data
      }
    },

    * update ({ payload }, { call, put }) {
      // const id = yield select(({ contact }) => contact.currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(update, payload)
      if (data.resultCode === '0') {
        const payloads = queryString.parse(location.search) || { page: 1, pageSize: 10 }
        yield put({ type: 'hideModal' })
        yield put({
          type: 'query',
          payload: payloads,
        })
      } else {
        throw data
      }
    },

    * Search ({ payload }, { call, put }) {
      if (!payload) {
        yield put({
          type: 'searchSuccess',
          payload: {
            searchList: [],
          },
        })
        return null
      }
      const data = yield call(CodeSearch, { sequence: payload })
      // console.log(data)
      if (data.resultCode === '0') {
        yield put({
          type: 'searchSuccess',
          payload: {
            searchList: data.data,
          },
        })
      } else {
        throw data
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    showModalDR (state) {
      return { ...state, modalVisibleDR: true }
    },

    hideModalDR (state) {
      return { ...state, modalVisibleDR: false }
    },

    switchIsMotion (state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
    searchSuccess (state, { payload }) {
      // console.log(payload)
      return { ...state, ...payload }
    },
    getCodeRankTimeSuccess (state, { payload }) {
      return { ...state, ...payload }
    },

  },
})
