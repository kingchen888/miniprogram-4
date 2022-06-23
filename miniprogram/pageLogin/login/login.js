// page/index/index.js
const db = wx.cloud.database()
const app = getApp()
const adminsCollection = db.collection('admins')
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      _id: '',
      password:'',
    },
    onChange:function (event)  {
      var that = this;
      // event.detail 为当前输入的值
      let _id=event.detail
      //将数据放入data中，用于查询
      that.setData({
        _id: _id
      })
    },
    onChangePwd:function (event) {
      var that = this;
      that.setData({
        password: event.detail
      })
      // console.log(that.data.password);//查询之前存入data的password
    },
    getData:function (e) {
      var that = this;
      app.globalData.admin_id=that.data._id
      adminsCollection.doc(that.data._id).field({
        _id:true,
        password:true,
        registrationCode:true
      }).get({
        success: res => {
          that.setData({
              admins: res.data
          })
          app.globalData.userInfo=that.data.admins
          if(that.data.admins.registrationCode=="MAQIANGREAT"&&that.data.admins._id=="admin"&&that.data.admins.password=="admin_pwd") {
            // console.log(that.data._id)
            // console.log(that.data.password)
            Toast('登录成功');
            that.jumpAdministrators();
          }else if(that.data.admins.registrationCode=="MAQIANGREAT"&&that.data.admins._id==that.data._id&&that.data.admins.password==that.data.password) {
            // console.log("跳到首页")
            Toast('登录成功');
            that.jumpIndex();
          }else{
            Toast('用户名或密码错误');
          }
      }
      })
    },
    onLogin:function(e) {
      var that = this;
      var _id=that.data._id
      var password=that.data.password
      if (_id.length==0 || password.length ==0) {
        //错误提示
        Toast('请正确输入');
      }else {
        that.getData();
        Toast('用户名或密码错误');
      }
    },
    jumpRegistration:function(e) {
      wx.navigateTo({
        url: '../register/register',
      })
    },
    jumpAdministrators: function (e) {
      wx.navigateTo({
        url: '../administrators/administrators',
      })
    },
    jumpIndex: function (e) {
      wx.reLaunch({
        url: '../../pageDoctor/doctorIndex/doctorIndex',
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var that = this;
      // setTimeout(() => {
      //   that.getData()
      // },10)
      wx.showLoading({
        title: '妲己在努力奔跑哦 ~ ~',
        })
        setTimeout(function () {
            wx.hideLoading()
            console.log(app.globalData.openid)
        }, 1000)
    }
})