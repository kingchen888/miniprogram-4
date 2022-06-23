let db=wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    btnSub(res){
        wx.showLoading({
          title: '数据提交中......',
        })
        var {title,time,department,departmentID,content}=res.detail.value;
        //var resVlu=res.detail.value
        console.log(title,time,department,departmentID,content)
        db.collection("kepu").add({
          data:{
            title:title,
            time:time,
            department:department,
            departmentID:departmentID,
            content:content
          } 
        }).then(res=>{
          console.log(res)
          wx.hideLoading({
            success: (res) => {},
          })
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