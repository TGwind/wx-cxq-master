// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const {
    db_card, //资源类型
    id,   //文章_id
  } = event

  db.collection(db_card).doc(id).update({
    data: {
      visitNum: db.command.inc(1), //自增
    },
  }).then(res=>{
    return res
  })

}