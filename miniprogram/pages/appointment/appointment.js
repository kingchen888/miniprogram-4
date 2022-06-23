// pages/appiontment/appointment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    departmentItems:['内科','外科','骨科','儿科','五官科','皮肤科','神经科','妇产科','传染科'],
    doctorInfo:[],
    doctorItems:[],
    timeItems:['7:00-8:00','8:00-9:00','9:00-10:00','10:00-11:00','11:00-12:00','14:00-15:00','15:00-16:00','16:00-17:00','19:00-20:00','20:00-21:00','21:00-22:00'],
    n:''
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
  timeChange:function(e){
    let i=e.detail.value;
    let value=this.data.timeItems[i];
    this.setData({time:value})
  },

  //提交表单
  onSubmit:function(e){
    console.log('表单被提交')
    console.log(e)
  },

  //将提交的数据写入数据库的预约表
  onSubmit(res){
    wx.showLoading({
      title: '数据提交中......',
      duration:500,
    })
    var {realname,phonenumber,hospital,departmentID,doctorID,timeID,remarks}=res.detail.value;
    console.log(realname,phonenumber,hospital,departmentID,doctorID,timeID,remarks)
    let i=res.detail.value.departmentID
    let department=this.data.departmentItems[i]
    let j=res.detail.value.doctorID
    let doctor=this.data.doctorItems[j].name
    let k=res.detail.value.timeID
    let time=this.data.timeItems[k]
    const db = wx.cloud.database()
    db.collection("appointment").add({
      data:{
        realname:realname,
        phonenumber:phonenumber,
        hospital:hospital,
        department:department,
        doctor:doctor,
        time:time,
        remarks:remarks
      } 
    }).then(res=>{
      console.log(res)
      wx.hideLoading({
        success: (res) => {
        },
      })
    })
  },

  // 重置表单
  onReset:function(e){
    console.log('表单已被重置')
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