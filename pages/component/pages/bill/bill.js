// pages/task/task.js
const app = getApp()
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    billList: [],
    perpage: 20,
    maxpage: 1,
    page: 0
  },
  onLoad: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.billList.length <= (this.data.maxpage - 1) * this.data.perpage) {
      this.getList();
    }
  },
  getList: function () {
    console.log(this)
    if (this.data.page <= this.data.maxpage) {
      util.commonAjax('', 2, {
        s: 'App.Bill_Bill.GetList',
        page: this.data.page + 1,
        perpage: this.data.perpage
      }).then((res) => {
        console.log(res)
        this.setData({
          billList: this.data.billList.concat(res.items),
          page: this.data.page + 1,
          maxpage: Math.ceil(res.total / this.data.perpage)
        })
      })
    }
  }
})