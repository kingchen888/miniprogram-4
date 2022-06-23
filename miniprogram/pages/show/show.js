// pages/neike/neike.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        record:[],
        id:''
    },
    // 将科普文章ID传递给下一个页面news
    getShow:function(e){
        var that = this
         // 传递绑定的科普文章id参数，点击跳转至show页面
        let recordID = e.currentTarget.dataset.id
        wx.navigateTo({
            url: '../news/news?recordID='+recordID
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id=options.id;//接收上一个页面传来的科室id
        this.setData({
        id:id
        })
        this.getOne(id)
        },
    getOne(id){//以传过来的科室id参数作为依据在新页面获取对应的数据
        var that=this;
        const db = wx.cloud.database({
          env:"ydt666666-3g8z7dyi91fccf55",
          // _openid:null
        });
        // 查询与departmentID相对应的科普文章，并将其赋给record数组，通过record数组渲染到wxml页面
        db.collection("kepu").where({
            departmentID:id,
        }).get().then(res=>{   
        console.log(res.data)
        that.setData({
          record:res.data,
        })
        })
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