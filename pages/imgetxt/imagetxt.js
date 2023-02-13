const app = getApp()
var util = require('../../utils/util.js').default;

Page({
  data: {
    Info: null,
    openid: "",
    likeValue: false, //喜欢按钮是否被激活
    starValue: false,
    likeList: [],
    starList: [],
    indexLike: null, //当前文章在likeList中的下角标
    indexStar: null, //当前文章在starList中的下角标

  },

  //判断该用户对当前文章是否收藏、喜欢
  jude() {
    const len1 = this.data.likeList.length
    var i
    for (i = 0; i < len1; i++) {
      if (this.data.likeList[i].title == this.data.Info.title) {
        this.setData({
          likeValue: true,
          indexLike: i //记录当前文章在全局变量likeList中的索引值，方便删除操作
        })
        break
      }
    }
    const len2 = this.data.starList.length
    for (i = 0; i < len2; i++) {
      if (this.data.starList[i].title == this.data.Info.title) {
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
          img_txt_list: _.push(that.data.Info.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.likeList.push(that.data.Info) //更新全局变量
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
          img_txt_list: _.pop(that.data.Info.title)
        }
      }).then(res => {
        // console.log(res)
      })
      //从全局变量likeList中删除该元素
      app.globalData.likeList.splice(that.data.indexLike, 1)
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
          img_txt_list: _.push(that.data.Info.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.starList.push(that.data.Info) //更新全局变量
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
          img_txt_list: _.pop(that.data.Info.title)
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.info)
    const info = JSON.parse(decodeURIComponent(options.info))
    // console.log(info)
    this.setData({
      Info: info,
      openid: app.globalData.openid,
      likeList: app.globalData.likeList,
      starList: app.globalData.starList
    })
    wx.setNavigationBarTitle({
      title: info.title
    })
    //更新阅读量
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateVisitNum',
      // 传递给云函数的event参数
      data: {
        db_card: "img_txt_card",
        id: this.data.Info._id,
      }
    }).then(res => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    })

    wx.showLoading({
      title: '加载中'
    })
    this.jude()

  },
  onshow(){
    // this.setData({
    //   [Info.uploadDate]: util.formatTime(this.data.Info.uploadDate)
    // })
  }

})