// pageChat/message/message.js
const app = getApp()
const db = wx.cloud.database()
const messageCollection = db.collection('message')
const adminsCollection = db.collection('admins')
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
    //若没有创建该聊天，则创建该聊天，该包含openid和admin_id唯一确定一条记录
    //type有三个属性：text、image、file
    creatMessage:function(event) {
        var that = this;
        messageCollection.add({
            data:{
                message:[{
                    content: that.data.value,
                    creatTime:util.formatTime(new Date()),
                    type: "text",//这个变量是文本
                    current_id: that.data.openid,
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
            openid: that.data.openid,
            admin_id:that.data.admin_id//这里是进入聊天界面对方的ID
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
                        openid: that.data.openid,
                        admin_id:that.data.admin_id//这里是进入聊天界面对方的ID
                    }).update({
                        data:{
                            message:_.push({
                                content:that.data.value,
                                creatTime:util.formatTime(new Date()),
                                type: "text",
                                current_id: that.data.openid,
                                userInfo:that.data.userInfo
                            })
                        },
                    }).then(json=>{
                        that.setData({
                            value:""
                        })
                        that.getMessage()//重新渲染界面
                        console.log('更新聊天')
                      }).then(function (response) {
                        console.log("成功")
                      }).catch(function (err) {
                        console.log(err);
                      })
                }
            },
            fail(res) {
                console.log("查询失败")
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
                    messageList:res.data,
                scroll_top:"9000px",
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
    //得到对方用户的admin_id
    getAdmin_id:function(e) {
        var that = this
        adminsCollection.where({
            department:that.data.department,
            name:that.data.name
        }).field({
            _id:true
        }).get({
            success(res) {
                that.setData({
                    admin:res.data,
                })
                console.log("查询医生表成功")
                console.log(that.data.admin)
                console.log(that.data.admin[0]._id)
                that.setData({
                    admin_id:that.data.admin[0]._id
                })
            },
            fail(res) {
                console.log("查询医生表失败")
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this
        let department = options.department
        let name = options.name
        console.log(app.globalData.userInfo)
        that.setData({
            department:department,
            name:name,
            userInfo:app.globalData.userInfo,
            openid:app.globalData.openid,
            avatarUrl:app.globalData.userInfo.avatarUrl,
            scroll_top:"9000px",
        })
        that.getAdmin_id()
        setTimeout(function () {
            // that.pageScrollToBottom()
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

    }
})