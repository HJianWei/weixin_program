// pages/todo/todo_detail/todo_detail.js
var listobj = require('../../../utils/list.js')
var all = {};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    all:{},
    index:null,
    title:null,
    list:[]
  },
  //删除数据
  del: function (e) {
    var temp = listobj.delDataById(all.list[this.data.index].list, e.currentTarget.dataset.id);
    all.list[this.data.index].list = temp;
    showList(this);
  },
  //置顶数据
  top: function (e) {
    all.list[this.data.index].list = listobj.topData(all.list[this.data.index].list, e.currentTarget.dataset.id);
    showList(this);
  },
  formSubmit: function (e) {
    all = wx.getStorageSync('todo_list') || { index: 0, list: [], time: 0 };
    var value = e.detail.value;
    if (value.title == '' || value.title == null) {
      wx.showToast({
        title: '内容不能为空',
        icon: 'loading'
      })
      return;
    }
    value.id = parseInt((new Date()).valueOf() / 1000);
    all.list[this.data.index].list.push(value);
    all.time = parseInt((new Date()).valueOf() / 1000);
    try {
      wx.setStorageSync('todo_list', all);
      wx.showToast({
        title: '保存成功'
      })
      showList(this);
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
  onLoad: function (option) {
    all = wx.getStorageSync('todo_list') || [];
    if (all.list == []) {
      wx.showToast({
        title: '不存在的清单',
        icon: 'loading'
      })
      wx.navigateBack();
    }
    var arr = all.list.filter(function (elem) {
      return (elem.id == option.id);
    });
    if (arr == []) {
      wx.showToast({
        title: '不存在的清单',
        icon: 'loading'
      })
      wx.navigateBack();
    }
    console.log(arr);
    this.setData({
      id: option.id,
      title: arr[0].title,
      index: all.list.indexOf(arr[0]),
      list: arr[0].list
    });
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
})

function showList(instance) {
  all.time = parseInt((new Date()).valueOf() / 1000);
  wx.setStorageSync('todo_list', all);
  var arr = all.list[instance.data.index].list;
  instance.setData({
    list: arr
  })
}

