// pageChat/message/message.js
const app = getApp()
const db = wx.cloud.database()
const messageCollection = db.collection('message')
const util = require("../../utils/util")
const _ = db.command
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        value:"",
        openid:"",
        admin_id:"",
        defaultAvatar:"https://p5.ssl.qhimgs1.com/sdr/400__/t0114c5236e6cd6c115.jpg",
        avatarUrl:"",
        scroll_top:"",
    },
    onChange:function (event)  {
        var that = this;
        // event.detail 为当前输入的值
        //将数据放入data中，用于查询
        that.setData({
            value:event.detail.value
        })
      },
    //若没有创建该聊天，则创建该聊天，该包含openid和admin_id唯一确定一条集合
    //type有三个属性：text、image、file
    creatMessage:function(event) {
        var that = this;
        messageCollection.add({
            data:{
                message:[{
                    content: that.data.value,
                    creatTime:util.formatTime(new Date()),
                    type: "text",//这个变量是文本
                    current_id: that.data.admin_id,
                    userInfo:that.data.userInfo,
                }],
                openid: that.data.openid,
                admin_id:that.data.admin_id//这里是进入聊天界面对方的ID
            },
            success(res){
                console.log("创建聊天成功")
                that.setData({
                    value:""
                })
                that.getMessage()
            },
            fail(res) {
                console.log("创建聊天失败")
            }
        })
    },
    //点击事件，长度为0不发送
    send_out:function(e) {
        var that = this
        if(that.data.value.length==0) {
            console.log("消息长度为0")
        }else {
            that.updateMessage()
        }
    },
    //存在该聊天时，新增一条消息，不存在，则创建聊天
    updateMessage:function(e) {
        var that = this
        messageCollection.where({
            openid: that.data.openid,//这里是进入聊天界面对方的ID
            admin_id:that.data.admin_id
        }).get({
            success(res) {
                that.setData({
                    messageList:res.data,
                })
                console.log("查询成功")
                if(that.data.messageList.length==0) {
                    console.log("不存在该聊天")
                    console.log("创建聊天")
                    that.creatMessage()
                    that.getMessage()
                }else{
                    //更新该聊天
                    messageCollection.where({
                        openid: that.data.openid,//这里是进入聊天界面对方的ID
                        admin_id:that.data.admin_id
                    }).update({
                        data:{
                            message:_.push({
                                content:that.data.value,
                                creatTime:util.formatTime(new Date()),
                                type: "text",
                                current_id: that.data.admin_id,
                                // userInfo:that.data.userInfo
                                userInfo:app.globalData.userInfo
                            })
                        },
                        success:res =>{
                        console.log('更新聊天成功')
                        that.getMessage()
                        that.setData({
                            value:""
                        })
                        }
                    }).then(json=>{
                        console.log('更新聊天')
                    }).then(function (response) {
                        console.log("成功")
                    }).catch(function (err) {
                        console.log(err);
                    })
                }
            }
        })
    },
    //查询数据库中该聊天的内容并渲染
    getMessage:function(e) {
        var that = this
        messageCollection.where({
            openid:that.data.openid,
            admin_id:that.data.admin_id
        }).field({
            message:true,
        }).get({
            success(res) {
                that.setData({
                    messageList:res.data
                })
                console.log("查询成功")
                setTimeout(function () {
                    console.log(that.data.messageList)
                }, 600)
            },
            fail(res) {
                console.log("查询失败")
            }
        })
    },
    //自动滚动到底部
    // 页面滚动到底部
  pageScrollToBottom: function() {
      var that = this
    wx.createSelectorQuery().select('.scroll').boundingClientRect(function(rect){
      // 使页面滚动到底部
      that.setData({
        scroll_top:rect.height+'px',
      })
    //   console.log(rect.height)
    }).exec()
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        let name = options.name
        let avatarUrl = options.avatarUrl
        let openid = options.openid
        console.log(options.openid)
        setTimeout(function () {
            that.setData({
                name:name,
                avatarUrl:avatarUrl,
                openid:openid,
                userInfo:app.globalData.userInfo,
                admin_id:app.globalData.admin_id,
            })
            console.log(app.globalData.userInfo)
            console.log(app.globalData.admin_id)
            console.log(that.data.userInfo)
            console.log(that.data.admin_id)
            that.getMessage()
        }, 600)
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

    },
})