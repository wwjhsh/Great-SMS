// pages/component/pages/tpladd/tpladd.js
var util = require('../../../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    content: '',
    name: '',
    type: 'add'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === "add") {
      this.setData({
        type: "add"
      })
      wx.setNavigationBarTitle({ title: '添加模板' });
    }
    if (options.type === "edit") {
      wx.setNavigationBarTitle({ title: '修改模板' });
      this.setData({
        type: "edit",
        id: options.id,
        content: options.content,
        name: options.name
      })
    }
  },
  delTpl: function () {
    if (this.data.id != 0) {
      util.commonAjax('', 2, {
        s: 'App.Templete_Templete.DelList',
        id: this.data.id
      }).then(function (res) {
        if (res.code == 200) {
          wx.showToast({ title: '删除成功', icon: 'success', duration: 1000 })
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({ title: '删除失败', icon: 'none', duration: 2000 })
        }
      })
    }
  },
  saveTpl: function () {
    if (this.data.name==""){
      wx.showToast({ title: "模板名称不为空", icon: 'none', duration: 1000 })
    }else if (this.data.content == "") {
      wx.showToast({ title: "模板内容不为空", icon: 'none', duration: 1000 })
    }else{
      if (this.data.type == 'add') {
        util.commonAjax('', 2, {
          s: 'App.Templete_Templete.AddList',
          name: this.data.name,
          content: this.data.content
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({ title: "添加成功", icon: 'none', duration: 1000 })
          } else {
            wx.showToast({ title: "添加失败", icon: 'none', duration: 1000 })
          }
        })
      }
      if (this.data.type == 'edit') {
        util.commonAjax('', 2, {
          s: 'App.Templete_Templete.UpdList',
          id: this.data.id,
          name: this.data.name,
          content: this.data.content
        }).then(function (res) {
          if (res.code == 200) {
            wx.showToast({ title: "修改成功", icon: 'none', duration: 3000 })
          } else {
            wx.showToast({ title: res.msg, icon: 'none', duration: 1000 })
          }
        })
      }
    }
  },
  inputContent: function (e) {
    var sn = e.target.dataset.type || e.currentTarget.dataset.type;
    if (sn == 'name') {
      this.setData({
        name: e.detail.value
      })
    }
    if (sn == 'content') {
      this.setData({
        content: e.detail.value
      })
    }
  }
})
