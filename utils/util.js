const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// function encryptAppKey(params) {
//   var paraStr = '';
//   var orderdParams = Object.keys(params).sort();
//   for (var key in orderdParams) {
//     if ((orderdParams[key] !== '') && (params[orderdParams[key]] !== '')) {
//       paraStr += orderdParams[key];
//       paraStr += '=';
//       paraStr += params[orderdParams[key]];
//       paraStr += '&'; // 原始拼接后的签名数据
//     }
//   }
//   var secret = params['appSecret']; // APP指纹
//   var signStr = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(paraStr, secret)); // 转换成小写
//   return signStr;
// }
const commonAjax = (url, types, data) => {
  wx.showLoading({
    title: '加载中',
  })
  // 获取公共配置  
  var app = getApp()
  var d = {
    // token: '123456789',// 例如：这是我们自己的验证规则  
  }
  var datas = Object.assign(d, data)
  var header = (types === 1) ? { 'content-type': 'application/json' } : { 'content-type': 'application/x-www-form-urlencoded' };
  // datas.sign=
  var promise = new Promise(function (resolve, reject, defaults) {
    wx.getStorage({
      key: 'session',
      success: function (res) {
        header.Cookie = res.data;
      },
      fail: function () {
      },
      complete: function () {
        if ((data.s== 'App.User_User.Login') || (header.Cookie!== undefined)) {
          // 封装reuqest  
          wx.request({
            // url: url || 'https://sms.wwjelo.top', 
            url: url || 'https://www.wwjelo.top', 
            data: datas,
            method: (types === 1) ? 'GET' : 'POST',
            header: header,
            success: function (res) {
              wx.hideLoading();
              // 统一判断后端返回的错误码
              if (res.data.ret !== 200) {
                wx.showToast({
                  icon: 'none',
                  title: res.data.msg
                })
              } else {
                resolve(res.data.data);
              }
            },
            fail: function (response) {
              console.log(response)
              wx.hideLoading();
              if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
                return response.data;
              } else {
                wx.showToast({
                  icon: 'none',
                  title: '网络异常'
                })
              }
            },
            complete: defaults,
          })
        }else{
          // setTimeout(()=>{
          //   commonAjax(url, types, data);
          // },100);
        }
      }
    })
  });
  return promise;
}
const login = () => {
  var promise = new Promise(function (resolve, reject, defaults) {
    var app = getApp();
    if (app.globalData.isLogin) {
      resolve();
    } else {
      wx.login({
        success: function (res) {
          var code = res.code// 登录凭证
          // 获取用户信息  
          wx.getUserInfo({
            success: function (res2) {
              app.globalData.userInfo = res2.userInfo;
              // 准备数据
              var data = {
                code: code,
                s: 'App.User_User.Login'
              }
              commonAjax('', 2, data)
                .then(function (res) {
                  console.log(res)
                  app.globalData.isLogin = true;
                  app.globalData.userInfo = Object.assign(res.userinfo, app.globalData.userInfo);
                  wx.setStorageSync('session', 'JSESSIONID=' + res.session)
                  resolve();
                })
            },
            // 这里是用户没打开授权的方法  
            fail: function (res2) {
              reject();
              // wx.authorize({
              //   scope: 'scope.userInfo',
              //   success() {
              //     login();
              //   }
              // })
              // wx.openSetting({
              //   success: (res) => { 
              //     if (!res.authSetting["scope.userInfo"]) {
              //       // 进入这里说明用户重新授权了，重新执行获取用户信息的方法  
              //       wx.authorize({
              //         scope: 'scope.userInfo',
              //         success() {
              //           login();
              //         }
              //       })
              //     }else{
              //           login();
              //     }
              //   }
              // })
            }
          })
        }
      })
    }
  });
  return promise;
}
const loginControl = (isShow) => {
  var app = getApp();
  var promise = new Promise((resolve, reject, defaults) => {
    if (app.globalData.isLogin) {
      resolve();
    } else {
      if (isShow) {
        wx.showToast({
          title: '登陆成功才能使用',
          icon: 'none'
        })
      }
    }
  });
  return promise;
}
module.exports = {
  formatTime: formatTime,
  commonAjax: commonAjax,
  login: login,
  loginControl: loginControl
}
