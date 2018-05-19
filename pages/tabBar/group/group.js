// pages/group/group.js
//获取应用实例
const app = getApp()
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    isLogin: false,
    groupList:[],
    perpage:20,
    maxpage:1,
    page:0
  },
  onLoad:function(){
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isLogin) {
      this.setData({
        page: 0,
        groupList: []
      }, ()=>{
        this.getList();
      })
    }else{
      wx.switchTab({
        url: '/pages/tabBar/user/user'
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.groupList.length <= (this.data.maxpage-1) * this.data.perpage){
      this.getList();
    }
  },
  // smsLoginClick: function (e) {
  //   util.login().then(() => {
  //     this.setData({
  //       isLogin: true
  //     })
  //     this.getList();
  //   });
  // },
  getList:function(){
    console.log(this)
    if (this.data.page<=this.data.maxpage){
      util.commonAjax('', 2, {
        s: 'App.Mobile_Mobile.GetList',
        name: this.data.name,
        page: this.data.page+1,
        perpage: this.data.perpage
      }).then( (res) => {
        console.log(res)
        this.setData({
          groupList: this.data.groupList.concat(res.items),
          page: this.data.page+1,
          maxpage: Math.ceil(res.total / this.data.perpage)
        })
      })
    }
  },
  inputContent: function (e) {
    this.setData({
      name: e.detail.value,
      page:0,
      maxpage: 1,
      groupList:[]
    })
    this.getList();
  }
})