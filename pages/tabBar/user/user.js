//index.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js');
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    hiddenEditName: true,
    hiddenEditMobile:true,
    hiddenEditSign:true,
    editData: ''
  },
  onLoad: function () {
    // app.globalData.isLogin
    // if (app.globalData.isLogin) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    // })
  },
  onShow: function () {
    if (app.globalData.isLogin) {
      this.setData({
        hasUserInfo: true,
        userInfo: app.globalData.userInfo
      })
    }
  },
  smsLoginClick: function (e) {
    util.login().then(() => {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    },()=>{});
  },
  editShow: function(e){
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn=='name'){
      this.setData({
        hiddenEditName: false,
        editData: this.data.userInfo.username
      })
    }
    if (sn == 'mobile') {
      this.setData({
        hiddenEditMobile: false,
        editData: this.data.userInfo.mobile
      })
    }
    if (sn == 'sign') {
      this.setData({
        hiddenEditSign: false,
        editData: this.data.userInfo.defalutsign
      })
    }
  },
  edit:function(e){
    var that=this;
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn == 'name') {
      if (this.data.editData == this.data.userInfo.username){
        wx.showToast({
          title: '您所要修改的用户名与原参数一致',
          icon: 'none',
          duration: 1000
        })
      }else{
        util.commonAjax('', 2, {
          s: 'App.User_User.UpdName',
          name: this.data.editData
        }).then(function (res) {
          if(res.code==200){
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              ['userInfo.username']: that.data.editData,
              hiddenEditName: true,
              editData: ''
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    }
    if (sn == 'mobile') {
      if (this.data.editData == this.data.userInfo.mobile) {
        wx.showToast({
          title: '您所要修改的手机号与原参数一致',
          icon: 'none',
          duration: 1000
        })
      } else {
        util.commonAjax('', 2, {
          s: 'App.User_User.UpdPhone',
          mobile: this.data.editData
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              ['userInfo.mobile']: that.data.editData,
              hiddenEditMobile: true,
              editData: ''
            })
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    }
    if (sn == 'sign') {
      if (this.data.editData == this.data.userInfo.defalutsign) {
        wx.showToast({
          title: '您所要修改的默认签名与原参数一致',
          icon: 'none',
          duration: 1000
        })
      } else {
        util.commonAjax('', 2, {
          s: 'App.User_User.UpdSignName',
          defalutsign: this.data.editData
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              ['userInfo.defalutsign']: that.data.editData,
              hiddenEditSign: true,
              editData: ''
            })
            app.globalData.userInfo.defalutsign = that.data.editData;
          } else {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    }
  },
  cancel: function (e) {
    console.log(e)
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn == 'name') {
      this.setData({
        hiddenEditName: true,
        editData: ''
      })
    }
    if (sn == 'mobile') {
      this.setData({
        hiddenEditMobile: true,
        editData: ''
      })
    }
    if (sn == 'sign') {
      this.setData({
        hiddenEditSign: true,
        editData: ''
      })
    }
  },
  inputContent:function(e){
    this.setData({
      editData: e.detail.value
    })
  }
})