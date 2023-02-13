var util = require('../../utils/util.js').default;

Page({
  data: {
    searchInput: "", //搜索内容字符串
    search_answer: []

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
  inputChange(event) {
    // console.log(event.detail)
    //实现数据同步，数据绑定，搜索字符串与输入框同步
    this.setData({
      searchInput: event.detail
    })

  },
  search(e) {
    console.log(e)
    // wx.cloud.callFunction({
    //   name: "search",
    //   data: {
    //     key: e.detail
    //   },
    //   // 成功回调
    //   success: res => {
    //     console.log(res);
    //     console.log(res.result);
    //   },
    //   fail: err => {
    //     console.error('[云函数] [delQuesById] 调用失败', err)
    //   }
    // })
    var that = this
    var key = e.detail
    const db = wx.cloud.database()
    db.collection('img_txt_card').where({
      title: db.RegExp({
        regexp: '.*' + key + '.*',
        options: 'i',
      })
    }).get().then(img_txt_res => {
      console.log(img_txt_res)
      db.collection('video_card').where({
        title: db.RegExp({
          regexp: '.*' + key + '.*',
          options: 'i',
        })
      }).get().then(video_res => {
        console.log(video_res)
        db.collection('PPT_card').where({
          title: db.RegExp({
            regexp: '.*' + key + '.*',
            options: 'i',
          })
        }).get().then(ppt_res => {
          console.log(ppt_res)
          let search_ans = ppt_res.data.concat(video_res.data).concat(img_txt_res.data)
          for (var i = 0; i < search_ans.length; i++) {
            search_ans[i].uploadDate = util.formatTime(search_ans[i].uploadDate)
          }
          that.setData({
            search_answer: search_ans
          })
        })
      })
    })
  }




})