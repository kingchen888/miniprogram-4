// pages/personalData/personalData.js
const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('user')
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showEdit:true,
        showButton:false,
        nickName:"",
        genderStr:"",
        country:"",
        province:"",
        city:""
    },
    edit:function(e) {
        var that = this
        that.setData({
            showEdit:false,
            showButton:true
        })
    },
      //获取文本框值的事件
      onChange_genderStr:function (e) {
        var that = this;
        that.setData({
            genderStr: e.detail
        })
    },
    onChange_country:function (e) {
        var that = this;
        that.setData({
            country: e.detail
        })
    },
    onChange_province:function (e) {
        var that = this;
        that.setData({
            province: e.detail
        })
    },
    onChange_city:function (e) {
        var that = this;
        that.setData({
            city: e.detail
        })
    },
    //查询赋值
    queryAssignment: function(e) {
        var that = this;
        // var id="oUvqx5SeaG_qmouRQ3QQcUyucfXs"
        userCollection.doc(that.data.openid).field({
            nickName: true,
            genderStr: true,
            country: true,
            province: true,
            city:true,
          }).get({
            success: res => {
                that.setData({
                    user: res.data,
                    nickName: res.data.nickName,
                    genderStr: res.data.genderStr,
                    country: res.data.country,
                    province: res.data.province,
                    city: res.data.city,
                })
            }
          })
    },
    // 判断符合条件修改成功，否则修改失败
    confirmModification:function(event) {
        var that = this;
        var genderStr=that.data.genderStr
        var country=that.data.country
        var province=that.data.province
        var city=that.data.city
        if (genderStr.length==0 || country.length==0 || province.length==0 || city.length==0) {
            // 错误提示
            Toast('请正确输入');
        }else if(genderStr!="男" && genderStr!="女"){
            Toast('性别输入有误');
        }else{
            // var id="oUvqx5SeaG_qmouRQ3QQcUyucfXs"
            // console.log("yes")
            userCollection.doc(that.data.openid).update({
                data: {
                    genderStr: that.data.genderStr,
                    country: that.data.country,
                    province: that.data.province,
                    city: that.data.city,
                }
            })
            that.setData({
                showEdit:true,
                showButton:false,
            })
            Toast('修改成功');
        }  
    },
    //得到全局变量openid的值
    getOpenid:function(e) {
        var that = this;
        wx.showLoading({
            title: '妲己在努力奔跑哦 ~ ~',
        })
        setTimeout(function () {
            wx.hideLoading()
            // console.log(app.globalData.openid)
            that.setData({
                openid:app.globalData.openid
            })
        }, 600)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        that.getOpenid()
        //先将数据库中已有的渲染出来
        setTimeout(function () {
            that.queryAssignment();
        }, 600)
    },
})