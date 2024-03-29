// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('appointment').where({
      // department:"内科"
      null:null
    }).remove({
      success(res){
        return res
      },
      fail(err){
        return err
      }
    })
  }catch(e){
    console.log(e)
  }




  const wxContext = cloud.getWXContext()

  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}