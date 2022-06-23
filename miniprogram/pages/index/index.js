// pages/medical/medical.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
     // 跳转至在线问诊界面
     getConsultation:function(e){
      wx.navigateTo({
        url: '../consultation/consultation'
    })
    },
    // 跳转至预约挂号界面
    getAppointment:function(e){
      wx.navigateTo({
        url: '../appointment/appointment'
    })
    },
    // 跳转至知识科普页面
    getKepu:function(e){
        wx.navigateTo({
            url: '../knowledge/knowledge'
        })
    },
    // 跳转至医保查询页面
    getInsurance:function(e) {  
        wx.navigateToMiniProgram({
            appId: "wx308bd2aeb83d3345",
            path:
            "pages/jump/main?serviceId=1000836&path=https%3A%2F%2Fmp.weixin.qq.com%2Finsurance%2Fcard%2Fcreditjump%3Fcityid%3D99999%26%23wechat_redirect",
            envVersion: "release"
            
            })
            
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})