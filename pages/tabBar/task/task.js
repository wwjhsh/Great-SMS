// pages/task/task.js
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  data: {
    winHeight: 0,
    currentTab: 0,
    perpage: 20,
    taskList0:[],
    maxpage0: 1,
    page0: 0,
    taskList1: [],
    maxpage1: 1,
    page1: 0,
    taskList2: [],
    maxpage2: 1,
    page2: 0,
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winHeight: res.windowHeight
        });
      }

    });
  },
  onShow: function () {
    if (app.globalData.isLogin) {
      this.setData({
        ["page" + this.data.currentTab]: 0,
        ["taskList" + this.data.currentTab]: []
      }, () => {
        this.getList(this.data.currentTab);
      })
    } else {
      wx.switchTab({
        url: '/pages/tabBar/user/user'
      })
    }
  },
  onReachBottom: function () {
    let index = this.data.currentTab;
    if (this.data['taskList' + index].length <= (this.data["maxpage" + index] - 1) * this.data["perpage" + index]) {
      this.getList(index);
    }
  },
  getList: function (index) {
    let state;
    if (index == 0) { state = 1 }
    if (index == 1) { state = 0 }
    if (index == 2) { state = -1}
    console.log(this)
    if (this.data["page" + index] <= this.data["maxpage" + index]) {
      util.commonAjax('', 2, {
        s: 'App.Task_Task.GetList',
        state: state,
        page: this.data["page" + index] + 1,
        perpage: this.data.perpage
      }).then((res) => {
        console.log(res)
        this.setData({
          ["taskList" + index]: this.data["taskList" + index].concat(res.items),
          ["page" + index]: this.data["page" + index] + 1,
          ["maxpage" + index]: Math.ceil(res.total / this.data.perpage)
        })
      })
    }
  },
  //滑动切换tab 
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  // 点击tab切换 
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
      this.setData({
        ["page" + e.target.dataset.current]: 0,
        ["taskList" + e.target.dataset.current]: []
      }, () => {
        this.getList(e.target.dataset.current);
      })
    }
  }
})