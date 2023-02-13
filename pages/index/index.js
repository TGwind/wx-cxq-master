var util = require('../../utils/util.js').default;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchInput: "", //搜索内容字符串
    // 首页轮播图图片列表
    swiperList: [],
    //底部贴图
    bottomImage: "",
    // 首页大标签栏分类
    activeTab: 0,
    activeButton1: "全部",
    activeButton2: "全部",
    activeButton3: "全部",
    activeButton4: "全部",
    // 首页PPT卡片列表
    PPTCardList01: [],
    img_txt_classify: [],

    PPTCardList02: [],
    video_classify: [],

    PPTCardList03: [],

    PPTCardList04: [],
    ppt_classify: [],

  },
  goSearch() {
    wx.cloud.callFunction
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  //点击分类按钮
  gotoimg_txt_classify(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    if (button == '全部') {
      this.setData({
        img_txt_classify: this.data.PPTCardList01
      })
      this.setData({
        activeButton1: button
      })
    } else {
      var list = []
      var res = this.data.PPTCardList01
      for (let i = 0; i < res.length; i++) {
        if (res[i].classify == button) {
          list.push(res[i])
        }
      }
      this.setData({
        activeButton1: button,
        img_txt_classify: list
      })
    }


  },
  gotovideo_classify(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    if (button == '全部') {
      this.setData({
        video_classify: this.data.PPTCardList02
      })
      this.setData({
        activeButton2: button
      })
    } else {
      var list = []
      var res = this.data.PPTCardList02
      for (let i = 0; i < res.length; i++) {
        if (res[i].classify == button) {
          list.push(res[i])
        }
      }
      this.setData({
        activeButton2: button,
        video_classify: list
      })
    }
  },
  gotoButton3(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    this.setData({
      activeButton3: button
    })
  },
  gotoppt_classify(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    if (button == '全部') {
      this.setData({
        ppt_classify: this.data.PPTCardList04
      })
      this.setData({
        activeButton4: button
      })
    } else {
      var list = []
      var res = this.data.PPTCardList04
      for (let i = 0; i < res.length; i++) {
        if (res[i].classify == button) {
          list.push(res[i])
        }
      }
      this.setData({
        activeButton4: button,
        ppt_classify: list
      })
    }
  },
  //打开图文详情页
  gotoImageTxt(e) {
    // console.log(e)
    const info = JSON.stringify(e.currentTarget.dataset.info)
    wx.navigateTo({
      url: '/pages/imgetxt/imagetxt?info=' + encodeURIComponent(info),
    })
  },
  //打开视频详情页
  gotoVedio(e) {
    // console.log(e.currentTarget.dataset.vedioinfo)
    //在页面间传递对象时，先把对象转换为json字符串，在跳转页面接收后将json字符串转化为对象再存储
    const vedioinfo = JSON.stringify(e.currentTarget.dataset.vedioinfo)
    wx.navigateTo({
      url: '/pages/vedio/vedio?vedioinfo=' + vedioinfo,
    })
  },
  //打开PPT详情页
  gotoPPT(e) {
    console.log(e.currentTarget.dataset.pptinfo)
    const pptinfo = JSON.stringify(e.currentTarget.dataset.pptinfo)
    wx.navigateTo({
      url: '/pages/ppt/ppt?pptinfo=' + pptinfo, //页面跳转传参
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.database().collection('swiperList').get().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
    wx.cloud.database().collection('img_txt_card').get().then(res => {
      // console.log(res)
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].uploadDate = util.formatTime(res.data[i].uploadDate)
      }
      this.setData({
        PPTCardList01: res.data,
        img_txt_classify: res.data,
      })
    })
    wx.cloud.database().collection('video_card').get().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].uploadDate = util.formatTime(res.data[i].uploadDate)
      }
      this.setData({
        PPTCardList02: res.data,
        video_classify: res.data,

      })
    })
    wx.cloud.database().collection('PPT_card').get().then(res => {
      for (var i = 0; i < res.data.length; i++) {
        res.data[i].uploadDate = util.formatTime(res.data[i].uploadDate)
      }
      this.setData({
        PPTCardList04: res.data,
        ppt_classify: res.data
      })
    })
    wx.cloud.database().collection('course_list_card').get().then(res => {
      this.setData({
        PPTCardList03: res.data
      })
    })
    wx.cloud.database().collection('bottomList').get().then(res => {
      // console.log(res)
      this.setData({
        bottomImage: res.data[0].imgUrl
      })
    })
    //第一次打开页面为全部内容
    this.setData({

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