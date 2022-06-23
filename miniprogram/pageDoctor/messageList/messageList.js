// pageLogin/messageList/messageList.js
const app = getApp()
const db = wx.cloud.database()
const messageCollection = db.collection('message')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name:"",
        avatarUrl:"",
        // avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJBIw33uwqRBhby8fKiciahwBt8SKkGyTyT1YVibNz6Ko2QN1vU7NyAtQnvnk5gtVNDylxI5BDWt0jqQ/132",
    },
    //得到所有该医生的消息们
    getMessageList:function(e) {
        var that = this
        messageCollection.where({
            admin_id:that.data.admin_id
        }).get({
            success(res) {
                that.setData({
                    message:res.data
                })
                setTimeout(function() {
                    console.log(that.data.message)
                    console.log(that.data.message[0])
                    console.log(that.data.message[0].message)
                    console.log(that.data.message[0].message[0])
                    console.log(that.data.message[0].message[0].userInfo)
                    console.log(that.data.message[0].message[0].userInfo.avatarUrl)
                    console.log(that.data.message[0].message[0].userInfo.nickName)//木
                    that.setData({
                        name:that.data.message[0].message[0].userInfo.nickName,
                        avatarUrl:that.data.message[0].message[0].userInfo.avatarUrl,
                        openid:that.data.message[0].message[0].userInfo.openid
                    })
                },600)
            }
        })
    },

    //跳转到消息页面
    jumpMessage:function(e) {
        var that = this
        that.getMessageList()
        console.log(e)
        console.log("索引为"+e.currentTarget.dataset.index)
        wx.navigateTo({
            url: '../message/message?openid='+that.data.message[e.currentTarget.dataset.index].message[0].userInfo.openid+'&avatarUrl='+that.data.message[e.currentTarget.dataset.index].message[0].userInfo.avatarUrl+'&name='+that.data.message[e.currentTarget.dataset.index].message[0].userInfo.nickName,
        }).then(json=>{
            console.log('success')
          }).then(function (response) {
            console.log("123")
          }).catch(function (err) {
            console.log(err);
          })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that = this;
        console.log(app.globalData.admin_id)
        that.setData({
            admin_id:app.globalData.admin_id
        })
        that.getMessageList()
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