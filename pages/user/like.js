var util = require('../../utils/util.js').default;
const app = getApp()
Page({
  data: {
    userInfo: {},
    likeList: []
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
    // console.log(e)
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
    // console.log("全局变量likeList", app.globalData.likeList)
    var like_list = app.globalData.likeList
    for(var i=0;i<like_list.length;i++){
      like_list[i].uploadDate = util.formatTime(like_list[i].uploadDate)
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      likeList: like_list,
      likeNum: app.globalData.likeList.length
    })
    // console.log(this.data.userInfo)
    // wx.cloud.database().collection("likeList").where({
    //   openid: that.data.userInfo.openid
    // }).get().then(res => {
    //   console.log("用户喜欢列表", res)

    //   //批量查询，_in()根据数组内容进行查询
    //   const _ = db.command
    //   //查询图文
    //   db.collection('img_txt_card').where({
    //     title: _.in(res.data[0].img_txt_list)
    //   }).get().then(img_txt_res => {
    //     var img_txt_list = img_txt_res.data
    //     //注意video和vedio，这两个单词都用到了，注意区分
    //     //查询视频
    //     db.collection('video_card').where({
    //       title: _.in(res.data[0].vedio_list)
    //     }).get().then(video_res => {
    //       var video_list = video_res.data
    //       //查询ppt
    //       db.collection('PPT_card').where({
    //         title: _.in(res.data[0].ppt_list)
    //       }).get().then(ppt_res => {
    //         //数组拼接使用contact
    //         var ppt_list = ppt_res.data
    //         var list = img_txt_list.concat(video_list).concat(ppt_list)
    //         that.setData({
    //           likeList: list //最终喜欢列表
    //         })
    //       })
    //     })
    //   })


    // })
    //先要获取当前页面，再取值，因为小程序页面是嵌套的，直接用this.data是最外层页面的数据
    // const pageArr = getCurrentPages()
    // const thisPageData = pageArr[pageArr.length - 1].data
    // console.log("喜欢-图文",this.data.img_txt_list)


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