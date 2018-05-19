// pages/component/pages/tcan/tcan.js
var util = require('../../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseId:0,
    tcanList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
  },
  getList(){
    util.commonAjax('', 2, {
      s: 'App.Meal_Meal.GetMeals',
      sn: 'df',
      type:'1'
    }).then((res) => {
      this.setData({
        tcanList: res.items
      })
    })
  },
  buy: function (e) {
    if (this.data.chooseId==0){
      wx.showToast({ title: '请选择套餐', icon: 'none', duration: 1200 })
    }else{
      util.commonAjax('', 2, {
        s: 'App.Meal_Meal.BuyMeals',
        id: this.data.chooseId,
      }).then((res) => {
        if (res.code==0){
          wx.showToast({ title: res.msg, icon: 'none', duration: 1200 })
        }else{
          wx.showToast({ title: '购买成功', icon: 'success', duration: 1200 })
          let obj = this.data.tcanList.filter((item)=>{
            return item.id == this.data.chooseId;
          })[0];
          app.globalData.userInfo.credit -= obj.price;
          app.globalData.userInfo.num1 = parseInt(app.globalData.userInfo.num1) + parseInt(obj.num);
        }
      })
    }
  },
  setItem:function(e){
    var id = e.target.dataset.id || e.currentTarget.dataset.id;
    this.setData({
      chooseId: id
    })
  }
})