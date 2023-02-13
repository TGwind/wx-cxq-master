// pages/user/histroy.js
const app = getApp()
Page({
  data: {
    userInfo: {},
    historyList: [
      {
        coverImgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序开发/图文笔记/妙用矩形.JPG", //图片资源地址
        title: '让渐变色为你的PPT增添视觉效果', //PPT介绍文本
        tags: ["渐变", "色彩", "基础"], //PPT标签
        visitNum: 0, //访问量
      },
      {
        coverImgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序开发/图文笔记/妙用矩形.JPG", //图片资源地址
        title: '让渐变色为你的PPT增添视觉效果', //PPT介绍文本
        tags: ["渐变", "色彩", "基础"], //PPT标签
        visitNum: 0, //访问量
      },
      {
        coverImgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序开发/图文笔记/妙用矩形.JPG", //图片资源地址
        title: '让渐变色为你的PPT增添视觉效果', //PPT介绍文本
        tags: ["渐变", "色彩", "基础"], //PPT标签
        visitNum: 0, //访问量
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.log(this.data.userInfo)

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