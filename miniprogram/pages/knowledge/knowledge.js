// pages/knowledge/knowledge.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id:''
    },
    // 传递绑定的科室id参数，点击跳转至show页面
    getShow:function(e){
      // 将绑定的科室id赋值给id并用以传递参数至下一个页面
        let id=e.currentTarget.dataset.id
        console.log(e)
        this.setData({
            id:id
        })
        wx.navigateTo({
            url: '../show/show?id='+id
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