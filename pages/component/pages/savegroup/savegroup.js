// pages/component/pages/savegroup/savegroup.js
// pages/task/task.js
var util = require('../../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    mobile:'',
    name:'',
    type:'add'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type==="add"){
      this.setData({
        type: "add"
      })
      wx.setNavigationBarTitle({ title: '添加联系人组'});
    }
    if (options.type === "edit") {
      wx.setNavigationBarTitle({ title: '修改联系人组' });
      this.setData({
        type: "edit",
        id: options.id,
        mobile: options.mobile,
        name: options.name
      })
    }
  },
  delGroup: function () {
    if (this.data.id!=0){
      util.commonAjax('', 2, {
        s: 'App.Mobile_Mobile.DelList',
        id: this.data.id
      }).then(function (res) {
        if (res.code == 200) {
          wx.showToast({title: '删除成功',icon: 'success',duration: 1000})
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.showToast({title: '删除失败',icon: 'none',duration: 2000})
        } 
      })
    }
  },
  saveGroup:function(){
    if (this.data.name == "") {
      wx.showToast({ title: "组名不为空", icon: 'none', duration: 3000 })
    } else if (this.data.mobile == "") {
      wx.showToast({ title: "手机号码不为空", icon: 'none', duration: 3000 })
    } else {
      if (this.data.type == 'add'){
        util.commonAjax('', 2, {
          s: 'App.Mobile_Mobile.AddList',
          name: this.data.name,
          mobile: this.data.mobile
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({ title: res.msg, icon: 'none', duration: 3000 })
          } else {
            wx.showToast({ title: res.msg, icon: 'none', duration: 2000 })
          }
        })
      }
      if (this.data.type == 'edit') {
        util.commonAjax('', 2, {
          s: 'App.Mobile_Mobile.UpdList',
          id: this.data.id,
          name: this.data.name,
          mobile: this.data.mobile
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({ title: res.msg, icon: 'none', duration: 3000 })
          } else {
            wx.showToast({ title: res.msg, icon: 'none', duration: 1000 })
          }
        })
      }
    }
  },
  inputContent : function (e) {
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn=='name'){
      this.setData({
        name: e.detail.value
      })
    }
    if (sn == 'mobile') {
      this.setData({
        mobile: e.detail.value
      })
    }
  }
})
