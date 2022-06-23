// pages/consultation/consultation.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentItems:['内科','外科','骨科','儿科','五官科','皮肤科','神经科','妇产科','传染科'],
    doctorItems:[],
  },
 
  //将选择的科室，医生和时间赋给wxml上，在wxml上显示
   departmentChange:function(e){
    let i=e.detail.value;
    let value=this.data.departmentItems[i];
    this.setData({department:value});
    var that=this;
    const db = wx.cloud.database();
    const data = db.collection("admins").where({
      department:value
    }).get({
      success:function(res){
        console.log(res.data)
        that.setData({
          doctorItems:res.data
        })
      }
    })
  },
  doctorChange:function(e){
    let i=e.detail.value;
    let value=this.data.doctorItems[i].name;
    this.setData({doctor:value})
  },

  onSubmit(res){
    wx.showLoading({
      title: '数据提交中......',
      duration:500,
    })
    wx.navigateTo({
      url: '../message/message?department='+this.data.department+'&name='+this.data.doctor,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
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