const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pptinfo: {},
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
      if (this.data.likeList[i].title == this.data.pptinfo.title) {
        this.setData({
          likeValue: true,
          indexLike: i //记录当前文章在全局变量likeList中的索引值，方便删除操作
        })
        break
      }
    }

    const len2 = this.data.starList.length
    for (i = 0; i < len2; i++) {
      if (this.data.starList[i].title == this.data.pptinfo.title) {
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
          ppt_list: _.push(that.data.pptinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.likeList.push(that.data.pptinfo) //更新全局变量
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
          ppt_list: _.pop(that.data.pptinfo.title)
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
          ppt_list: _.push(that.data.pptinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      app.globalData.starList.push(that.data.pptinfo) //更新全局变量
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
          ppt_list: _.pop(that.data.pptinfo.title)
        }
      }).then(res => {
        // console.log(res)
      })
      //从全局变量中删除该元素
      app.globalData.starList.splice(that.data.indexStar, 1)
      that.setData({
        starValue: false,
        starList: app.globalData.starList,
        indexStar: null
      })
    }
  },

  downLoadPPT() {
    const that = this
    wx.cloud.downloadFile({ //云端存储下载
      fileID: 'cloud://tcb-cxq-7gw1h3uze1299e21.7463-tcb-cxq-7gw1h3uze1299e21-1316471607/蓝色.pptx'
    }).then(res => {
      wx.getFileSystemManager().saveFile({
        tempFilePath: res.tempFilePath, //本地临时文件路径
        filePath: wx.env.USER_DATA_PATH + "/" + that.data.pptinfo.title + '.pptx', //文件名自定义
        success(pres) {
          //打开保存的文件
          wx.openDocument({
            filePath: pres.savedFilePath, //临时文件路径
            fileType: 'pptx', //指定文件类型
            showMenu: true,
            success: fres => {
              console.log("打开文件", fres)
            },
            fail: fres => {
              console.log('打开失败', fres)
            }
          })
        }
      })
    }).catch(error => {
      // handle error
      console.error();
    })
  },

  //点击图片放大预览
  previewImg(e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.imgurllist[0], //当前图片地址,点开后的第一个显示的图片
      urls: e.currentTarget.dataset.imgurllist, //所有要预览的图片的地址集合数组形式
      // urls: [url], //一张图写法

    })
  },

  //从云获取当前PPT整套图片，但是此前页面已经获取数据，这里直接从上个页面接受ppt对象json数据即可，无需从服务器请求
  // getPPTImg(options) {
  //   //获取当前PPT整套图片
  //   const that = this
  //   var title = options.title
  //   //查询当前PPT信息
  //   wx.cloud.database().collection("PPT_card").where({
  //     title: title
  //   }).get().then(res => {
  //     that.setData({
  //       coverImgUrl: res.data[0].coverImgUrl,
  //       imgArr: res.data[0].imgUrlList
  //     })
  //     wx.hideLoading({
  //     })
  //   })
  // },


  onLoad(options) {
    wx.showLoading({
      title: '加载中'
    })
    const pptinfo = JSON.parse(options.pptinfo)
    this.setData({
      pptinfo: pptinfo,
      openid: app.globalData.openid,
      likeList: app.globalData.likeList,
      starList: app.globalData.starList

    })
    wx.setNavigationBarTitle({
      title: pptinfo.title
    })
    //更新阅读量
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateVisitNum',
      // 传递给云函数的event参数
      data: {
        db_card: "PPT_card",
        id: this.data.pptinfo._id,
      }
    }).then(res => {
      console.log(res)

    }).catch(err => {
      console.log(err)
    })
    this.jude()
    wx.hideLoading({})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow(option) {

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