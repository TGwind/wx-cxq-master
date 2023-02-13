// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const {
    openid,
    userAvatarUrl,
    userNickName
  } = event
  db.collection('user').add({
    data: {
      openid: openid,
      userAvatarUrl:userAvatarUrl,
      userNickName:userNickName
    }
  })
  db.collection('likeList').add({
    data: {
      openid: openid,
      img_txt_list:[],
      vedio_list:[],
      ppt_list:[]
    }
  })
  db.collection('starList').add({
    data: {
      openid: openid,
      img_txt_list:[],
      vedio_list:[],
      ppt_list:[]
    }
  })
  return {
    openid: openid,
    userAvatarUrl:userAvatarUrl,
    userNickName:userNickName
  }
}