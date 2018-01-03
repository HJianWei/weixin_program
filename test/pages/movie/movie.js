// pages/movie/movie.js
//获取应用实例  
var app = getApp()
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    searchValue: "",
    showDelete: false,
    result: {}
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /** 搜索影视 */
  bindSearchInput: function (event) {
    var value = event.detail.value;
    var readyData = { showDelete: false };
    if (value.length > 0) {
      readyData = { showDelete: true };
      this.handleSearchData(value);
    }
    this.setData(readyData);
  },
  /**清空输入框 */
  bindSearchDelete: function (event) {
    var readyData = { searchValue: "", showDelete: false, result: {} };
    this.setData(readyData);
  },
  /**点击取消 */
  bindSearchCancel: function (event) {
    wx.navigateBack();
  },
  /** 提交搜索请求 */
  handleSearchData: function (value) {
    var that = this;
    var serchURL = app.globalData.doubanBase + app.globalData.search + value + "&&start=0&&count=10";
    wx.request({
      url: serchURL,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        that.processSearchData(data);
        console.log(data)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    });
  },
  /**组装搜索数据 */
  processSearchData: function (data) {
    var movies = [];
    for (let idx in data.subjects) {
      var subject = data.subjects[idx];
      var directors = "";
      var separate = " / ";
      for (let i in subject.directors) {
        directors += subject.directors[i].name + separate;
      }
      directors = directors.substring(0, directors.length - separate.length);
      var summary = subject.rating.average + "分" + separate + subject.year + separate + directors;
      var temp = {
        id: subject.id,
        casts: subject.casts,
        collect_count: subject.collect_count,
        directors: subject.directors,
        title: subject.title,
        images: subject.images,
        rating: subject.rating,
        year: subject.year,
        summary: summary
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData["result"] = {
      subjects: movies
    }
    this.setData(readyData);
  },
})  