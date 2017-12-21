// pages/todo/todo_add2/todo_add2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:[],
    index:0,
  },

  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    var data = wx.getStorageSync('todo_list') || { index: 0, list: [], time: 0 };
    var value = e.detail.value;
    if (value.title == '' || value.title == null) {
      wx.showToast({
        title: '任务不能为空',
        icon: 'loading'
      })
      return;
    }
    value.id = parseInt((new Date()).valueOf() / 1000);
    value.finish = false;
    data.list[this.data.index].list.push(value);
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var data = wx.getStorageSync('todo_list') || { index: 0, list: [], time: 0 };
    var arr = [];
    data.list.forEach(function (value, index, array) {
      arr.push(value.title);
    });
    this.setData({
      type:arr
    })
  }
})
