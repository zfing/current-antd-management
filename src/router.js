import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/ratingReport')],
      component: () => import('./routes/ratingReport/'),
    },
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    },
    {
      path: '/ratingReport',
      models: () => [import('./models/ratingReport')],
      component: () => import('./routes/ratingReport/'),
    },
    {
      path: '/contact',
      models: () => [import('./models/contact')],
      component: () => import('./routes/contact/'),
    },
    {
      path: '/account',
      models: () => [import('./models/account')],
      component: () => import('./routes/account/'),
    },
    {
      path: '/project',
      models: () => [import('./models/project')],
      component: () => import('./routes/project/'),
    },
    {
      path: '/kyc',
      models: () => [import('./models/kyc')],
      component: () => import('./routes/kyc/'),
    },
    {
      path: '/baseInfo',
      models: () => [import('./models/baseInfo')],
      component: () => import('./routes/baseInfo/'),
    },
    {
      path: '/dynamicContent',
      models: () => [import('./models/dynamicContent')],
      component: () => import('./routes/dynamicContent/'),
    },
    {
      path: '/fileUpload',
      component: () => import('./routes/fileUpload/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={enUS}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/contact" />)} />
            {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
