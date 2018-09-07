import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import * as menusService from 'services/menus'
import queryString from "query-string";
import config from 'config'
const { failToken } = config
export default {
  namespace: 'login',

  state: {
    account: '',
    password: '',
  },

  effects: {
    * login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      const { locationPathname } = yield select(_ => _.app)
      if (data.resultCode === '0') {
        const { from } = locationQuery
        yield put({
          type: 'app/setToken',
          payload: { token: data.data },
        })
        // yield put({ type: 'app/query', payload })
        if (from && from !== '/login') {
          const { list } = yield call(menusService.query)
          let permissions = list.map(item => item.id)
          yield put({
            type: 'app/updateState',
            payload: {
              permissions,
              menu: list,
            },
          })
          yield put(routerRedux.push('/contact'))
        } else {
          yield put(routerRedux.push('/contact'))
        }
      } else if (data.resultCode === '3') {
          failToken()
      } else {
        throw data
      }
    },
  },
}
