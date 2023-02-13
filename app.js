App({
  globalData: {
    userAvatarUrl: "",
    userInfo: {},
    likeList: [],
    starList:[],
    bgColor: "#FAFAFA"

  },
  login() {
    const that = this
    wx.login({
      timeout: 3000,
      success(res) {
        console.log("用户cdoe-->", res)
        wx.cloud.callFunction({
          name: "login",
          data: {
            code: res.code
          },
          success: (loginres) => {
            console.log("get openid", loginres.result)
            that.globalData.openid = loginres.result.openid
            //查询数据库中该openid是否存在
            wx.cloud.database().collection('user').where({
              openid: loginres.result.openid
            }).get().then(res => {
              //不存在则新建一个用户记录
              if (res.data.length == 0) {
                wx.navigateTo({
                  url: '/pages/register/register',
                })
              }

              //存在则返回
              else {
                console.log("已存在用户-->", res)
                that.globalData.userInfo = res.data[0]
              }
            })
          }
        })
      }
    })
  },
  getlikeList() {
    // var util = require('../../utils/util.js').default;

    const that = this
    const db = wx.cloud.database()
    // console.log("全局变量",that.globalData)
    var userOpenid = that.globalData.userInfo.openid
    wx.cloud.database().collection("likeList").where({
      openid: userOpenid
    }).get().then(res => {
      // console.log("用户喜欢列表", res)
      //批量查询，_in()根据数组内容进行查询
      const _ = db.command
      //查询图文
      db.collection('img_txt_card').where({
        title: _.in(res.data[0].img_txt_list)
      }).get().then(img_txt_res => {
        var img_txt_list = img_txt_res.data
        //注意video和vedio，这两个单词都用到了，注意区分
        //查询视频
        db.collection('video_card').where({
          title: _.in(res.data[0].vedio_list)
        }).get().then(video_res => {
          var video_list = video_res.data
          //查询ppt
          db.collection('PPT_card').where({
            title: _.in(res.data[0].ppt_list)
          }).get().then(ppt_res => {
            //数组拼接使用contact
            var ppt_list = ppt_res.data
            var list = img_txt_list.concat(video_list).concat(ppt_list)
            // for(var i=0;i<list.length;i++){
            //   list[i].uploadDate = util.formatTime(list[i].uploadDate)
            // }
            that.globalData.likeList = list
            // console.log("全局变量likeList",that.globalData.likeList)
          })

        })

      })

    })
  },
  getstarList() {
    
    const that = this
    const db = wx.cloud.database()
    // console.log("全局变量",that.globalData)
    var userOpenid = that.globalData.userInfo.openid
    wx.cloud.database().collection("starList").where({
      openid: userOpenid
    }).get().then(res => {
      // console.log("用户喜欢列表", res)
      //批量查询，_in()根据数组内容进行查询
      const _ = db.command
      //查询图文
      db.collection('img_txt_card').where({
        title: _.in(res.data[0].img_txt_list)
      }).get().then(img_txt_res => {
        var img_txt_list = img_txt_res.data
        //注意video和vedio，这两个单词都用到了，注意区分
        //查询视频
        db.collection('video_card').where({
          title: _.in(res.data[0].vedio_list)
        }).get().then(video_res => {
          var video_list = video_res.data
          //查询ppt
          db.collection('PPT_card').where({
            title: _.in(res.data[0].ppt_list)
          }).get().then(ppt_res => {
            //数组拼接使用contact
            var ppt_list = ppt_res.data
            var list = img_txt_list.concat(video_list).concat(ppt_list)
            that.globalData.starList = list
            // console.log("全局变量likeList",that.globalData.likeList)
          })

        })

      })

    })
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.cloud.init({
      //云环境id
      env: 'tcb-cxq-7gw1h3uze1299e21',
      traceUser: true
    })
    this.login()
    this.getlikeList()
    this.getstarList()
  }
})