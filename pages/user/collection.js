var util = require('../../utils/util.js').default;
const app = getApp()
Page({
  data: {
    userInfo: {},
    starList: [],
    starNum: null,
  },
  //打开图文详情页
  gotoImageTxt(img_txt) {
    // console.log(e)
    const info = JSON.stringify(img_txt)
    wx.navigateTo({
      url: '/pages/imgetxt/imagetxt?info=' + encodeURIComponent(info),
    })
  },
  //打开视频详情页
  gotoVedio(video) {
    // console.log(e.currentTarget.dataset.vedioinfo)
    //在页面间传递对象时，先把对象转换为json字符串，在跳转页面接收后将json字符串转化为对象再存储
    const vedioinfo = JSON.stringify(video)
    wx.navigateTo({
      url: '/pages/vedio/vedio?vedioinfo=' + vedioinfo,
    })
  },
  //打开PPT详情页
  gotoPPT(ppt) {
    // console.log(pptinfo)
    const pptinfo = JSON.stringify(ppt)
    wx.navigateTo({
      url: '/pages/ppt/ppt?pptinfo=' + pptinfo, //页面跳转传参
    })
  },
  //点击卡片，打开对应详情页
  gotoCard(e) {
    //判断资源类型，跳转对应详情页
    console.log(e)
    const type = e.currentTarget.dataset.type
    if (type == "img_txt") {
      this.gotoImageTxt(e.currentTarget.dataset.info)
    }
    if (type == "ppt") {
      this.gotoPPT(e.currentTarget.dataset.info)
    }
    if (type == "vedio") {
      this.gotoVedio(e.currentTarget.dataset.info)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var star_list = app.globalData.starList
    for(var i=0;i<star_list.length;i++){
      star_list[i].uploadDate = util.formatTime(star_list[i].uploadDate)
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      starList: star_list,
      starNum: app.globalData.starList.length
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})