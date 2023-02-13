var util = require('../../utils/util.js').default;

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vedioinfo: {},
    openid: "",
    likeValue: false, //喜欢按钮是否被激活
    starValue: false,
    likeList: [],
    starList: [],
    indexLike: null, //当前文章在likeList中的下角标
    indexStar: null, //当前文章在starList中的下角标
    timeList:[]  //格式化之后的时间
  },

  //判断该用户对当前文章是否收藏、喜欢
  jude() {
    const len1 = this.data.likeList.length
    var i
    for (i = 0; i < len1; i++) {
      if (this.data.likeList[i].title == this.data.vedioinfo.title) {
        this.setData({
          likeValue: true,
          indexLike: i //记录当前文章在全局变量likeList中的索引值，方便删除操作
        })
        break
      }
    }
    const len2 = this.data.starList.length
    for (i = 0; i < len2; i++) {
      if (this.data.starList[i].title == this.data.vedioinfo.title) {
        this.setData({
          starValue: true,
          indexStar: i //记录当前文章在全局变量likeList中的索引值，方便删除操作
        })
        break
      }
    }
    wx.hideLoading({})
  },
  //将该图文添加到该用户喜欢列表
  onLike() {
    const that = this
    //如果喜欢已经未被激活，说明此次点击为设置喜欢
    if (that.data.likeValue == false) {
      // console.log(that.data.Info.title)
      // console.log(that.data.openid)
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('likeList').where({
        openid: that.data.openid
      }).update({
        data: {
          vedio_list: _.push(that.data.vedioinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.likeList.push(that.data.vedioinfo) //更新全局变量
      that.setData({
        likeValue: true,
        likeList: app.globalData.likeList
      })
    }
    //如果喜欢已被激活，说明此次点击为取消喜欢
    else {
      // console.log(that.data.Info.title)
      // console.log(that.data.openid)
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('likeList').where({
        openid: that.data.openid
      }).update({
        data: {
          vedio_list: _.pop(that.data.vedioinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      //从全局变量likeList中删除该元素
      app.globalData.likeList.splice(that.data.index, 1)
      that.setData({
        likeValue: false,
        likeList: app.globalData.likeList,
        indexLike: null
      })
    }

  },

  //将该图文添加到该用户收藏列表
  onStar() {
    const that = this
    //如果收藏未被激活，说明此次点击为设置收藏
    if (that.data.starValue == false) {
      // console.log(that.data.Info.title)
      // console.log(that.data.openid)
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('starList').where({
        openid: that.data.openid
      }).update({
        data: {
          vedio_list: _.push(that.data.vedioinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.starList.push(that.data.vedioinfo) //更新全局变量
      that.setData({
        starValue: true,
        starList: app.globalData.starList
      })
    }
    //如果收藏已被激活，说明此次点击为取消收藏
    else {
      // console.log(that.data.Info.title)
      // console.log(that.data.openid)
      const _ = wx.cloud.database().command
      wx.cloud.database().collection('starList').where({
        openid: that.data.openid
      }).update({
        data: {
          vedio_list: _.pop(that.data.vedioinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      //从全局变量likeList中删除该元素
      app.globalData.starList.splice(that.data.indexStar, 1)
      that.setData({
        starValue: false,
        starList: app.globalData.starList,
        indexStar: null
      })
    }
  },
  gotoSeek(e) {
    console.log(e)
    let n = this.formatSeconds(this.data.vedioinfo.nodeTime[e.currentTarget.dataset.index])
    console.log("时分秒", n)
    let goto = parseInt(this.data.vedioinfo.nodeTime[e.currentTarget.dataset.index])
    console.log(goto)
    var video = wx.createVideoContext('myVideo', this)
    video.seek(goto)
    video.play()
  },
  //将节点秒数转化为分秒格式
  formatTimenode(){
    let list = this.data.vedioinfo.nodeTime
    let ans = []
    for(let i = 0 ; i<list.length;i++){
      ans.push(this.formatSeconds(list[i]))
    }
    this.setData({
      timeList: ans
    })
    
  },
  //格式转化函数
  formatSeconds(value) {

    n = n.toString()
    return n[1] ? n : '0' + n
  },
  formatSeconds: function (value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    var result = "" + parseInt(theTime);

    if (result < 10) {
      result = '0' + result;
    }
    if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + ":" + result;
      if (theTime1 < 10) {
        result = '0' + result;
      }
    } else {
      result = '00:' + result;
    }
    // if (theTime2 > 0) {
    //   result = "" + parseInt(theTime2) + ":" + result;
    //   if (theTime2 < 10) {
    //     result = '0' + result;
    //   }
    // } else {
    //   result = '00:' + result;
    // }
    return result
  },
  onLoad(options) {
    //在页面间传递对象时，先把对象转换为json字符串，在跳转页面接收后将json字符串转化为对象再存储
    const vedioinfo = JSON.parse(options.vedioinfo)
    this.setData({
      vedioinfo: vedioinfo,
      openid: app.globalData.openid,
      likeList: app.globalData.likeList,
      starList: app.globalData.starList
    })
    wx.setNavigationBarTitle({
      title: vedioinfo.title
    })
    //更新阅读量
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateVisitNum',
      // 传递给云函数的event参数
      data: {
        db_card: "video_card",
        id: this.data.vedioinfo._id,
      }
    }).then(res => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    })
    // console.log(this.data.vedioinfo)
    this.formatTimenode()
    this.jude()

  },

})