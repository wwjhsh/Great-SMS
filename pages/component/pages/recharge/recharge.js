// pages/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moneyList:[10,50,100,200,300],
    chooseNum:0
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
  
  },
  recharge:function(){

  },
  setNum:function(e){
    var num = e.target.dataset.num || e.currentTarget.dataset.num;
    this.setData({
      chooseNum: num
    })
  }
})