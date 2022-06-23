import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";

// pageLogin/changePwd/changePwd.js
const app = getApp()
const db = wx.cloud.database()
const adminsCollection = db.collection('admins')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentPwd:"",
        newPwd:"",
        confirmPwd:""
    },

      //获取文本框值的事件
      onChange_currentPwd:function (e) {
        var that = this;
        that.setData({
            currentPwd: e.detail
        })
    },
      //获取文本框值的事件
      onChange_newPwd:function (e) {
        var that = this;
        that.setData({
            newPwd: e.detail
        })
    },
      //获取文本框值的事件
      onChange_confirmPwd:function (e) {
        var that = this;
        that.setData({
            confirmPwd: e.detail
        })
    },
    //updata
    updata:function(e) {
        var that = this;
        var id=app.globalData.admin_id
        adminsCollection.doc(id).update({
            data: {
                password: that.data.confirmPwd
            }
        })
        //调用函数跳转页面
        setTimeout(function () {
            that.jumpAdministrators()
        }, 300)
    },
    //判断新密码和确认密码是否一致，修改它
    modify: function (e) {
        var that = this;
        var newPwd = that.data.newPwd
        var confirmPwd = that.data.confirmPwd
        if(newPwd.length==0 || confirmPwd.length==0) {
            Toast('请正确输入');
        }else if(newPwd != confirmPwd) {
            Toast('密码不一致');
        } else {
            //调用函数更新
            Toast('修改密码成功');
            that.updata();
        }
    },
    //检查当前密码是否正确
    confirmModification:function(e) {
        var that = this;
        var id=app.globalData.admin_id
        adminsCollection.doc(id).field({
            password:true
        }).get({
            success: res =>{
                that.setData({
                    admin:res.data
                })
                // console.log(res.data.password)
                // console.log(that.data.password)
                wx.showLoading({
                    title: '妲己在努力奔跑哦 ~ ~',
                    })
                    setTimeout(function () {
                        wx.hideLoading()
                        if(that.data.admin.password == that.data.currentPwd) {
                            // console.log("yes")
                            //调用函数修改密码
                            that.modify()
                        }else {
                            // console.log("no")
                            Toast('密码错误');
                        }
                    }, 1000)
            },
        })
    },
    jumpAdministrators: function (e) {
        wx.navigateTo({
          url: '..',
        })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    }
})