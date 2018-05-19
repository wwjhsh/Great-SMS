// pages/group/group.js
//获取应用实例
const app = getApp()
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    isLogin: false,
    selectArr:[],
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
    this.setData({
      page: 0,
      tplList: []
    }, () => {
      this.getList();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.groupList.length <= (this.data.maxpage-1) * this.data.perpage){
      this.getList();
    }
  },
  getList:function(){
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
  checkboxChange: function (e) {
    this.setData({
      selectArr: e.detail.value,
    },()=>{
      console.log(this.data.selectArr)
    })
  },
  inputContent: function (e) {
    this.setData({
      name: e.detail.value,
      page:0,
      maxpage: 1,
      groupList:[]
    })
    this.getList();
  },
  save: function () {
    let pages = getCurrentPages();
    let index = pages.length - 1;
    pages[index - 1].setData({//上一页的模板内容
      ['addData.group']: this.data.selectArr
    }, () => {
      wx.navigateBack({
        delta: 1
      })
    })
  }
})