// pages/user/user.js
import Notify from '@vant/weapp/notify/notify';

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      openid: "",
      userAvatarUrl: "cloud://tcb-cxq-7gw1h3uze1299e21.7463-tcb-cxq-7gw1h3uze1299e21-1316471607/预设图片/默认头像.png", //这里放了一张默认图片
      userNickName: "", //用户昵称
      //是否展示弹出层
      show: false,
      bgColor:"",
    },
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  //登录
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
            app.globalData.openid = loginres.result.openid
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
                app.globalData.userInfo = res.data[0]
                that.setData({
                  userInfo: app.globalData.userInfo
                })
                Notify({
                  type: "success",
                  message: '登陆成功',
                  duration: 2000, //持续的时间
                  background: '#0268FF',
                })
              }
            })
          }
        })
      }
    })
  },
  register() {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  //打开历史观看
  gotoHistroy() {
    wx.navigateTo({
      url: '/pages/user/histroy',
    })
  },
  gotoLike() {
    wx.navigateTo({
      url: '/pages/user/like',
    })
  },
  gotoCollection() {
    wx.navigateTo({
      url: '/pages/user/collection',
    })
  },
  gotoToSee() {
    wx.navigateTo({
      url: '/pages/user/toSee',
    })
  },
  gotoMessage() {
    wx.navigateTo({
      url: '/pages/user/message',
    })

  },
  gotoCustomization() {
    wx.navigateTo({
      url: '/pages/user/customization',
    })

  },
  gotoJoinVip() {
    wx.navigateTo({
      url: '/pages/user/joinVip',
    })

  },
  gotoService() {
    wx.navigateTo({
      url: '/pages/user/Service',
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  nightTheme(){
    var background = "#191A1B"
    this.setData({
      bgColor: background
    })
    app.globalData.bgColor = background//实现全局变量的修改，此时app.globalData.background的值为"#F4A7B9"
    wx.setNavigationBarColor({//设置导航栏颜色
      frontColor: '#000000',//注意frontColor的值只能为000000或者111111
      backgroundColor: app.globalData.bgColor
    });
    wx.setTabBarStyle({
      backgroundColor: background,
    })
  },

  onLoad() {
    //点进个人页面就尝试登录
    this.login()
    this.setData({//设置主题颜色
      bgColor: app.globalData.bgColor
    })
  },
  onShow() {
    //每次打开页面就刷新用户信息
    // this.setData({
    //   userInfo: app.globalData.userInfo
    // })
    // console.log(this.data.userInfo)
  },

})