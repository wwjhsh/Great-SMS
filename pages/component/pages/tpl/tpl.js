// pages/tpl/tpl .js
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    type:'see',
    tplList: [],
    perpage: 10,
    maxpage: 1,
    page: 0,
    choosedId:0
  },
  onLoad: function (options) {
    console.log(options)
    if (options.type === "see") {
      this.setData({
        type: "see"
      })
      wx.setNavigationBarTitle({ title: '模板管理' });
    }
    if (options.type === "choose") {
      wx.setNavigationBarTitle({ title: '选择模板' });
      this.setData({
        type: "choose"
      })
    }
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
    this.getList();
  },
  getList: function () {
    if (this.data.page <= this.data.maxpage) {
      util.commonAjax('', 2, {
        s: 'App.Templete_Templete.GetList',
        name: this.data.name,
        page: this.data.page + 1,
        perpage: this.data.perpage
      }).then((res) => {
        console.log(res)
        this.setData({
          tplList: this.data.tplList.concat(res.items),
          page: this.data.page + 1,
          maxpage: Math.ceil(res.total / this.data.perpage)
        })
      })
    }
  },
  setItem: function (e) {
    var id = e.target.dataset.id || e.currentTarget.dataset.id;
    var content = e.target.dataset.content || e.currentTarget.dataset.content;
    this.setData({
      choosedId: id
    },()=>{//回调
      let pages = getCurrentPages();
      let index = pages.length-1;
      pages[index-1].setData({//上一页的模板内容
        ['addData.content']:content
      },()=>{
        wx.navigateBack({
          delta: 1
        })
      })
    })
  }
})