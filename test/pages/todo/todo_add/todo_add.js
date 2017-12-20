// pages/todo_add/todo_add.js
var util = require('../../../utils/util.js')
Page({
  formSubmit: function (e) {
    var data = wx.getStorageSync('todo_list') || { index: 0, list: [], time: 0 };
    var value = e.detail.value;
    if (value.title == '' || value.title == null) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading'
      })
      return;
    }
    value.id = parseInt((new Date()).valueOf() / 1000);
    value.list = [];
    data.list.push(value);
    data.time = parseInt((new Date()).valueOf() / 1000);
    try {
      wx.setStorageSync('todo_list', data);
      wx.showToast({
        title: '保存成功'
      })
      setTimeout(function () {
        wx.navigateBack();
      }, 800);
    } catch (e) {
      wx.showToast({
        title: '保存失败：异常',
        icon: 'loading'
      })
    }
  },
  onLoad: function () {

  }
})
