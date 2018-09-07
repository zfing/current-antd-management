const API_ENV = {
  isProd: process.env.API_ENV === 'production',
  isDev: process.env.API_ENV === 'development',
  isTest: process.env.API_ENV === 'test',
}
/**
 * 请求 api 路径
 * @type {String}
 */
let API_URL = 'http://47.94.240.141:8080/admin'
// 预览
let currentUrl = 'http://47.94.240.141:9002'

if (API_ENV.isProd) {
  API_URL = 'https://api.dapaopingji.com/admin'
  currentUrl = 'https://dapaopingji.com'
} else if (API_ENV.isTest) {
  API_URL = 'https://uat.api.dapaopingji.com/admin'
  currentUrl = 'https://uat.dapaopingji.com'
}
// Txhash 地址
const txHash = 'https://etherscan.io'

module.exports = {
  name: '后台管理系统',
  prefix: 'antdAdmin',
  footerText: 'Copyright © 2017-2018 DPRating.com All Rights Reserved',
  logo: '/dplogo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  currentUrl,
  txHash,
  api: {
    // 登陆
    userLogin: `${API_URL}/user/login`,
    // 登出
    userLogout: `${API_URL}/user/logout`,
    // 创建账号(项目方/分析师)
    createAccount: `${API_URL}/user/create`,
    // 上传文件到服务器(暂不可用)
    uploadFiles: `${API_URL}/user/signature`,
    // 联系信息
      // 获取列表
    contactList: `${API_URL}/apply/list`,
      // 获取详情
    contactDetail: `${API_URL}/apply/detail`,
      // 删除信息
    contactDelete: `${API_URL}/apply/delete`,
    // 账号分配
      // 获取列表
    accountList: `${API_URL}/assignment/list`,
      // 发送账号
    sendAccount: `${API_URL}/assignment/sendMail`,
    // 项目信息
      // 获取列表
    projectList: `${API_URL}/info/list`,
      // 开始评级
    projectLaunch: `${API_URL}/info/launch`,
      // 是否展示
    projectDisplay: `${API_URL}/info/display`,
    // 评级报告
      // 获取列表
    reportList: `${API_URL}/rating/list`,
      // 发布报告
    ratingRelease: `${API_URL}/rating/deploy`,
    // 动态内容
      // 获取列表
    contentList: `${API_URL}/config/list`,
    contentAdd: `${API_URL}/config/add`,
    contentUpdate: `${API_URL}/config/update`,
    contentDelete: `${API_URL}/config/delete`,
    // 上传文件
    fileUpload: `${API_URL}/user/signature`,
  },
  get token () {
    // 获取token
    return localStorage.getItem(`${this.prefix}token`)
    // 或者
    // return localStorage[`${this.prefix + 'token'}`]
  },
  failToken() {
    localStorage.removeItem(`${module.exports.prefix}token`)
    let from = location.pathname
    window.location = `${location.origin}/login?from=${from}`
  },
}


