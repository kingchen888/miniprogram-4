// pages/myself/myself.js
const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('user')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openid:"",
        showPower:true,
        userInfo:{},
        genderStr: "",
        country: "",
        province: "",
        city:"",
    },
    //查询赋值
    queryAssignment: function(e) {
        var that = this;
        // var id="oUvqx5SeaG_qmouRQ3QQcUyucfXs"
        console.log(app.globalData.openid)
        userCollection.doc(app.globalData.openid).field({
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
    //获取用户的授权信息
    getUserProfile: function(e) {
        var that = this;
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                // console.log(res)
                // 把你的用户信息存到一个变量中方便下面使用
              let userInfo= res.userInfo
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true,
                showPower:false
              })
              wx.login({
                  success (res) {
                    //   console.log(res.code)
                      let code = res.code
                    if (res.code) {
                      //发起网络请求
                      wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx337fd49d1b957751&secret=c87218c59eb46827aaea46b3b80e7e0c&js_code='+code+'&grant_type=authorization_code',
                        success:(res) => {
                        //   console.log(res)
                          userInfo.openid=res.data.openid
                          //先将数据库中已有的渲染出来
                          app.globalData.openid=userInfo.openid//定义全局变量
                          app.globalData.userInfo=userInfo
                        setTimeout(function () {
                            that.queryAssignment();
                        }, 600)
                          that.selectUserData()
                        }
                      })
                    } else {
                      console.log('登录失败！' + res.errMsg)
                    }
                  }
                })
            }
          })
    },

    getOpenid:function(e) {
        var that = this;
        wx.showLoading({
            title: '妲己在努力奔跑哦 ~ ~',
        })
        setTimeout(function () {
            wx.hideLoading()
            console.log(app.globalData.openid)
            that.setData({
                openid:app.globalData.openid
            })
        }, 600)
    },
    //获取数据
    // getData:function (e) {
    //     var that = this;
    //     // that.getOpenid();
    //     userCollection.doc(that.data.openid).get({
    //       success: res => {
    //           console.log("yes")
    //           setTimeout(function() {
    //             that.setData({
    //                 user: res.data
    //             })
    //           },600)
    //         },
    //         fail: res => {
    //             console.log("no")
    //         }
    //     })
    //   },
    //跳转界面
    jumpEditProfile: function (e) {
        wx.navigateTo({
          url: '../personalData/personalData'
        })
      },
   

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        

        // console.log(app.globalData.name)
        // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.userInfo" 这个 scope
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 必须是在用户已经授权的情况下调用
                    wx.getUserProfile({
                        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                        success: (res) => {
                          this.setData({
                            userInfo: res.userInfo,
                            hasUserInfo: true,
                            showPower:false
                          })
                        }
                      })
                }
            }
        })
    },
    // 新增数据函数
    addUser:function(event) {
        var that = this;
        userCollection.add({
            data:{
                _id:that.data.userInfo.openid,
                avatarUrl: that.data.userInfo.avatarUrl,
                city: that.data.userInfo.city,
                country: that.data.userInfo.country,
                gender: that.data.userInfo.gender,
                language: that.data.userInfo.language,
                nickName: that.data.userInfo.nickName,
                openid: that.data.userInfo.openid,
                province: that.data.userInfo.province,
            },
        }).then(res =>{
            // console.log(res)//测试用
        })
    },
    //查找该用户是否授权过
    selectUserData: function(e) {
        var that = this
        console.log(that.data.userInfo.openid)
        userCollection.doc(that.data.userInfo.openid).get({
            success: res => {
              that.setData({
                  user: res.data
              })
                  //存在这个用户的数据，直接跳转界面并传参数
                  console.log("已经授权过")
            },
            fail: res => {
                console.log("没有改用户数据，正在将该用户数据添加到数据库中")
                //调用addUser新增用户数据
                that.addUser()
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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