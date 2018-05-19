//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    
      // wx.login({
      //   success: function (res) {
      //     if (res.code) {
      //       wx.getUserInfo({//getUserInfo流程
      //         success: function (res2) {//获取userinfo成功
      //           console.log(res2);
      //           var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
      //           var iv = res2.iv;
      //           console.log(res.code)
      //           console.log(encryptedData)
      //           console.log(iv)
      //           //请求自己的服务器
      //           // Login(code, encryptedData, iv);
      //         }
      //       })
      //     } else {
      //       console.log('登录失败！' + res.errMsg)
      //     }
      //   }
      // })
    setTimeout(() => {
      util.login().then(() => {
      }, () => {
        wx.switchTab({
          url: '/pages/tabBar/user/user'
        })
      });
    }, 0);
  },
  onShow: function (opts) {
    // setTimeout(()=>{
    //   util.login().then(() => {
    //   }, () => {
    //     wx.switchTab({
    //       url: '/pages/tabBar/user/user'
    //     })
    //   });
    // },0);
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    isLogin:false,
    userInfo:null,
    header: {}
    // header: { 'Cookie': 'JSESSION=***' }
  }
})
