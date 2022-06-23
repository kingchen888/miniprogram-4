let db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        record:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        var id=options.recordID;//接收上一个页面show传来的科普文章id
        this.setData({
            id:id
        })
        this.getOne(id)
        },
        getOne(id){//以传过来的科普文章id参数作为依据在新页面获取对应的数据
        var that=this;
        const db = wx.cloud.database();
        // 通过上一个页面传过来的id参数查询获取相对应科普文章，并将其赋值给record数组，通过record数组渲染到wxml页面
        db.collection("kepu").where({
            _id:id,
        }).get().then(res=>{   
            console.log(res.data)
        that.setData({
            record:res.data
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