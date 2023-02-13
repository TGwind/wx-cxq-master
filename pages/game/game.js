// 引入utils.js
var util = require('../../utils/util.js').default;

Page({

  data: {
    //页面顶部轮播图
    swiperList: [],
    //底部贴图
    bottomImage: "",
    //显示的tab页面的索引
    activeTab: 0,
    activeButton1: '全部',
    activeButton2: '全部',

    PPTCardList01: [],
    img_txt_card_list: [],
    ppt_card_list: [],
    video_card_list: [],
    gamelist: [],
    PPTCardList02: [{
        coverImgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序图2.0/比赛技巧/现场答辩.jpg", //图片资源地址
        title: '让渐变色为你的你哈啊增添视觉效果', //PPT介绍文本
        tags: ["渐变", "色彩", "基础"], //PPT标签
        visitNum: 0, //访问量
        hehadf: 123
      },
      {
        coverImgUrl: 'cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序图2.0/比赛技巧/答辩PPT.jpg',
        title: '炫酷的PPT布局教学，实用技能',
        tags: ["渐变", "布局", "基础"],
        visitNum: 0,
        jijijf: "afsdfff"
      },
      {
        coverImgUrl: 'cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序图2.0/比赛技巧/项目策划书.jpg',
        title: '炫酷的PPT布局教学，实用技能',
        tags: ["渐变", "布局", "基础"],
        visitNum: 0,
      }
    ],
    PPTCardList03: [{
        imgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序图2.0/比赛模板/1.jpg",
        text: "第一届新电商大赛",
        visitNum: 0
      },
      {
        imgUrl: "cloud://wx-ppt-8gt4yksi9feb8662.7778-wx-ppt-8gt4yksi9feb8662-1314949596/小程序图2.0/比赛模板/AI宠物回家.jpg",
        text: "第一届新电商大赛",
        visitNum: 0
      },

    ],

  },
  //点击分类按钮
  gotoButton1(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    this.setData({
      activeButton1: button
    })
  },
  gotoButton2(e) {
    // console.log(e)
    const button = e.currentTarget.dataset.button
    this.setData({
      activeButton2: button
    })
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
  sort() {
    var list = [],
    // 微信小程序里所有对数据的修改只有在setData里修改才会在页面上渲染!!!在这里卡了很久
    list = this.data.img_txt_card_list.concat(this.data.ppt_card_list)
    list = list.concat(this.data.video_card_list)
    for(var i=0;i<list.length;i++){
      list[i].uploadDate = util.formatTime(list[i].uploadDate)
    }
    for (let i = 0, len = list.length; i < len; i++) {
      let currentRandom = parseInt(Math.random() * (len - 1));
      let current = list[i];
      list[i] = list[currentRandom];
      list[currentRandom] = current;
    }
    this.setData({
      gamelist: list
    })
    // this.getSrc()
    // var max_length=0;
    // if(this.data.img_txt_card_list.length>this.data.ppt_card_list.length){
    //   max_length = this.data.img_txt_card_list
    // }else{
    //   max_length = this.data.ppt_card_list.length
    // }
    // if(this.data.video_card_list.length>max_length){
    //   max_length = this.data.video_card_list.length
    // }
    // console.log(max_length)
    // for(var i=0,j=0 ;i<max_length;i++){
    //   if(this.data.img_txt_card_list[i]!=null){
    //     this.data.gamelist[j] = this.data.img_txt_card_list[i]
    //     j++
    //   }
    //   if(this.data.ppt_card_list[i]!=null){
    //     this.data.gamelist[j] = this.data.ppt_card_list[i]
    //     j++
    //   }
    //   if(this.data.video_card_list[i]!=null){
    //     this.data.gamelist[j] = this.data.video_card_list[i]
    //     j++
    //   }
    // }
    console.log(this.data.gamelist)

  },
  getSrc() {
    wx.cloud.database().collection('swiperList').get().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
    //获取数据
    wx.cloud.database().collection('img_txt_card').get().then(res => {
      this.setData({
        img_txt_card_list: res.data
      })
      // console.log(this.data.img_txt_card_list)
      wx.cloud.database().collection("PPT_card").get().then(res => {
        this.setData({
          ppt_card_list: res.data
        })
        // console.log(this.data.ppt_card_list)
        wx.cloud.database().collection("video_card").get().then(res => {
          this.setData({
            video_card_list: res.data
          })
          this.sort()
        })
      })
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSrc()
    wx.cloud.database().collection('bottomList').get().then(res => {
      console.log(res)
      this.setData({
        bottomImage: res.data[0].imgUrl
      })
    })
  }

})