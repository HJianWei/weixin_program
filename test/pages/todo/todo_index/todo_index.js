// pages/todo_index/todo_index.js
var listobj = require('../../../utils/list.js')
//获取应用实例
var app = getApp();
var all = {};
Page({
  data: {
    list: {}
  },
  //清单详情
  detail: function (e) {
    wx.navigateTo({
      url: '../todo_detail/todo_detail?id=' + e.currentTarget.dataset.id
    })
  },
  //删除数据
  del: function (e) {
    var temp = listobj.delDataById(all.list, e.currentTarget.dataset.id);
    all.list = temp;
    showList(this);
  },
  //置顶数据
  top: function (e) {
    all.list = listobj.topData(all.list, e.currentTarget.dataset.id);
    showList(this);
  },
  //跳转到新建清单
  toAddPage: function (e) {
    wx.navigateTo({
      url: '../todo_add/todo_add'
    })
  },
  toAddPage2: function (e) {
    wx.navigateTo({
      url: '../todo_add2/todo_add2'
    })
  },
  onLoad: function () {

  },
  onShow: function () {
    console.log('onShow')
    var firstData = {
      index: 0, list: [
        {title: '点击下列按钮新建你的清单吧^_^'}
      ], time: 0
    };
    var data = wx.getStorageSync('todo_list') || firstData;
    all = data;
    showList(this);
    console.log(data);
  }
})

function showList(instance) {
  all.time = parseInt((new Date()).valueOf() / 1000);
  wx.setStorageSync('todo_list', all);
  var arr = all.list;
  instance.setData({
    list: arr
  })
}

