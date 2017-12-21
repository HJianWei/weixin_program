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
    list:[],
    list2:[],
    input:"",
    state:true,
    src_uncomplete:"../../../icons/task_uncomplete.png",
    src_complete: "../../../icons/task_complete.png"
  },
  //切换已经完成的任务
  getCompleted: function(e){
    this.setData({state:!this.data.state});
  },
  //完成任务
  complete: function (e) {
    var arr = all.list[this.data.index].list.filter(function (elem) {
      return (elem.id == e.currentTarget.dataset.id);
    });
    var curIndex = all.list[this.data.index].list.indexOf(arr[0]);
    all.list[this.data.index].list[curIndex].finish = true;
    showList(this);
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
  //撤销完成的任务
  backout: function(e){
    var arr = all.list[this.data.index].list.filter(function (elem) {
      return (elem.id == e.currentTarget.dataset.id);
    });
    var curIndex = all.list[this.data.index].list.indexOf(arr[0]);
    all.list[this.data.index].list[curIndex].finish = false;
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
    this.setData({input:""});//确定后清空输入框的内容
    value.id = parseInt((new Date()).valueOf() / 1000);
    value.finish = false;//标记任务为未完成 
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
    };
    this.setData({
      id: option.id,
      title: arr[0].title,
      index: all.list.indexOf(arr[0])
    });
    showList(this);
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
  var arr_unfinish = arr.filter(function (elem) {
    return (elem.finish == false);
  });
  var arr_finish = arr.filter(function (elem) {
    return (elem.finish == true);
  });
  instance.setData({
    list: arr_unfinish,
    list2: arr_finish
  })
}

