import {Token} from '/models/token.js'
App({
  globalData: {
    screenWidth: 375,
    screenHeight: 667,
    statusHeight: 20,
    contentHeight: 500
  },
  onLaunch: function () {
    // 1.获取设备的信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
        this.globalData.screenHeight = res.screenHeight
        this.globalData.statusHeight = res.statusBarHeight
        this.globalData.contentHeight = res.screenHeight - res.statusBarHeight - 44
      },
    })
     const token = new Token()
     token.verify()
     //让用户默认登录，(可以在登录前判断token是否存在并且不过期，如果是的话就不用再登录)
    //  this.loginAction()
  },
  // loginAction(){
  //   //获取code
  //   wx.login({
  //     timeout:1000,
  //     success:res=>{
  //       console.log('wxlogincode',res.code)
  //       if (res.code) {
  //         wx.request({
  //           url: 'http://localhost:3000/v1/token',
  //           method: 'POST',
  //           data: {
  //             account: res.code,
  //             type: 100,
  //           },
  //           success: res => {
  //             console.log('获取openid',res)
  //             const code = res.statusCode.toString()
  //             if (code.startsWith('2')) {
  //               wx.setStorageSync('token', res.data.token)
  //             }
  //           }
  //         })
  //       }
  //     },
  //     fail:err=>{
  //       console.log(err)
  //     }
  //   })
  //   //将code发送给服务器
  // }
})

//主题 渐进式  核心主要
// 抽象概念 思考 Model

// 实践性非常强
// 业务
// 承载知识

// 编程的思维 NodeJS KOA 7
// 线上API Python Flask
// JavaScript 独立开发完整小程序
// JavaScript 语言本身的深度进阶

// Python Flask 
// Java SprintBoot
// NodeJS KOA

// 语法简洁 JavaScript ES2019 JS Python
// 原型链 工程化 OO

// 面向对象

// function
// 优雅 

// 使用场景 javascript > Python
// 浏览器 读取文件

// JS 脱离 python js
// nodejs API 网站

// 异步 flask django
// KOA async await express
// 资源 http 异步 操作数据库