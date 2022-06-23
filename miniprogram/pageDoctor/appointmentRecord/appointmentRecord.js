const db = wx.cloud.database({
  env:"ydt666666-3g8z7dyi91fccf55"
});
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:[],
    admin_id:''
  },
// 取消预约
removeAppointment:function(res){
  var that=this;
  // 将在wxml中绑定的记录id赋值给recordID
  let recordID=res.currentTarget.dataset.id
  // 点击取消预约出现弹窗
  wx.showModal({
    title: "提示",
    content: "是否要取消预约",
    success: function(res) {
    if (res.confirm) {
    console.log("用户点击确定")
    // 调用数据库删除相应ID的记录
    const db = wx.cloud.database({
      env:"ydt666666-3g8z7dyi91fccf55"
    });
    db.collection("appointment").doc(recordID).remove({
      success:(res)=>{
        console.log(res)
        if(res.stats.removed===1){
          wx.showToast({
            title: '删除成功！',
            icon: 'success',
            image: '',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      }
    })
    //  刷新当前页面
    that.onLoad()
    } 
    else if (res.cancel) {
    console.log("用户点击取消")
    }
  }
})
    
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this;
    that.setData({
        admin_id:app.globalData.admin_id
    })
    console.log(that.data.admin_id)
    db.collection("admins").where({
      _id:that.data.admin_id, 
    }).get({
      success(res){
        console.log(res.data)
        that.setData({
          name:res.data[0].name
        })
        console.log(that.data.name)
        db.collection("appointment").where({
          doctor:that.data.name, 
        }).get({
          success:function(res){
            console.log(res.data)
            that.setData({
              record:res.data
            })
          }
        })
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