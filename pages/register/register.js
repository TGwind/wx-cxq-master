// pages/register/register.js
const app = getApp()
Page({

  data: {
    userAvatarUrl: "cloud://tcb-cxq-7gw1h3uze1299e21.7463-tcb-cxq-7gw1h3uze1299e21-1316471607/预设图片/默认头像.png",
    userNickName: "",
    tempFilePath: ""
  },

  // 上传图片
  doUpload() {
    const that = this
    // 选择图片
    wx.chooseMedia({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          tempFilePath: res.tempFiles[0].tempFilePath, //临时文件路径
          userAvatarUrl: res.tempFiles[0].tempFilePath
        })
      },
      fail: e => {
        console.error(e)
      },
      complete: () => {}
    })

  },

  //用户提交注册信息
  submitUserInfo(event) {
    const that = this
    const cloudPath = "用户头像/" + this.data.userNickName + ".jpg"
    const tempFilePath = this.data.tempFilePath
    console.log(cloudPath)
    wx.cloud.uploadFile({
      cloudPath: cloudPath, // 上传至云端的路径
      filePath: tempFilePath, // 小程序临时文件路径
      success(res) {
        wx.showLoading({
          title: '上传中',
        })
        app.globalData.userAvatarUrl = res.fileID //更新用户头像url（全局变量）

        wx.cloud.callFunction({
          name: "createuser",
          data: {
            openid: app.globalData.openid,
            userAvatarUrl: app.globalData.userAvatarUrl,
            userNickName: that.data.userNickName
          },
          success(cres) {
            wx.hideLoading()
            console.log("用户信息提交-->", cres)
            wx.showToast({
              icon: "success",
              title: '注册成功',
            })
            app.globalData.userInfo = cres.result
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/user/user',
              })
            }, 2000)

          }
        })
      },
      fail: e => {
        console.error('上传文件失败-->', e)
        wx.showToast({
          icon: 'none',
          title: '上传失败',
        })
      },
      complete: () => {
        that.setData({
          userAvatarUrl: app.globalData.userAvatarUrl, //将用户头像本地url修改为云存储url
        })
      }
    })
  }

})