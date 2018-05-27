//index.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js');
Page({
  data: {
    hideDisplay: true,
    isLogin: false,
    typeindex: -1,
    typeList: [],
    addData: {
      sign: '',
      content: '',
      typeid: 0,
      group: [],
      mobile: '',
      isSetTime:false,
      date:'',
      time:''
    },
    displayData: {
      content: ' ',
      ban: [],
      msg: ''
    }
  },
  onLoad: function () {
    // setTimeout(() => {
      util.login().then(() => {
        this.setData({
          isLogin: true,
          ['addData.sign']: app.globalData.userInfo.defalutsign
        })
        if (this.data.typeList.length == 0) {
          this.getTypeList();
        }
      }, () => {
        wx.switchTab({
          url: '/pages/tabBar/user/user'
        })
      });
    // }, 0);
  },
  onShow: function () {
    util.loginControl(false).then(() => {
      this.setData({
        isLogin: true,
        ['addData.sign']: app.globalData.userInfo.defalutsign
      })
      if (this.data.typeList.length == 0) {
        this.getTypeList();
      }
    });
  },
  inputContent: function (e) {
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn == "typeid") {
      this.setData({
        typeindex: e.detail.value,
        ['addData.' + sn]: this.data.typeList[e.detail.value].typeid
      })
    } else {
      this.setData({
        ['addData.' + sn]: e.detail.value
      })
    }
  },
  choose(e) {
    util.loginControl(true).then(() => {
      var sn = e.target.dataset.type || e.currentTarget.dataset.type;
      if (sn == 'group') {
        wx.navigateTo({
          url: '/pages/component/pages/group/group',
        })
      }
      if (sn == 'tpl') {
        wx.navigateTo({
          url: '/pages/component/pages/tpl/tpl?type=choose',
        })
      }
    });
  },
  getTypeList: function () {
    util.commonAjax('', 2, {
      s: 'App.Type_Type.GetTypes',
      sn: 'df'
    }).then((res) => {
      this.setData({
        typeList: res.items
      })
    })
  },
  display: function () {
    util.loginControl(true).then(() => {
      if (this.data.addData.sign == "") {
        wx.showToast({ title: "签名不能为空", icon: 'none', duration: 1000 })
      } else if (this.data.addData.content == "") {
        wx.showToast({ title: "模板不能为空", icon: 'none', duration: 1000 })
      } else if (this.data.addData.mobile == "" && this.data.addData.group.length == 0) {
        wx.showToast({ title: "必须选择联系人组或填写号码", icon: 'none', duration: 1000 })
      } else if (this.data.addData.typeid <= 0) {
        wx.showToast({ title: "必须选择短信类型", icon: 'none', duration: 1000 })
      } else {
        util.commonAjax('', 2, {
          s: 'App.Task_Task.Display',
          sign: this.data.addData.sign,
          content: this.data.addData.content,
          typeid: this.data.addData.typeid,
          group: this.data.addData.group,
          mobile: this.data.addData.mobile,
        }).then((res) => {//content，ban，msg
          console.log(res)
          this.setData({
            ['displayData.content']: res.content,
            ['displayData.ban']: res.ban,
            ['displayData.msg']: res.msg,
            hideDisplay: false
          }, () => {

          })
        })
      }
    });
  },
  send: function () {
    if (this.data.addData.isSetTime == true && (this.data.addData.date == '' || this.data.addData.time=='')) {
        wx.showToast({ title: "日期时间不能为空", icon: 'none', duration: 1000 })
    }else {
      let sendtime = this.data.addData.date +' '+ this.data.addData.time;
      util.commonAjax('', 2, {
        s: 'App.Task_Task.Send',
        sign: this.data.addData.sign,
        content: this.data.addData.content,
        typeid: this.data.addData.typeid,
        group: this.data.addData.group,
        mobile: this.data.addData.mobile,
        isSetTime: this.data.addData.isSetTime,
        sendtime: sendtime
      }).then((res) => {//content，ban，msg
        if (res.code==200){
          wx.showToast({ title: "发送成功", icon: 'none', duration: 1000 })
        }else{
          wx.showToast({ title:res.msg, icon: 'none', duration: 1000 })
        }
        this.setData({
          hideDisplay: true
        })
      })
    }
  },
  cancelDisplay: function () {
    this.setData({
      hideDisplay: true
    })
  }
})
