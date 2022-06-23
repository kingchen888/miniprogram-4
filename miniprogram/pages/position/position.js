// pages/position/position.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 纬度和经度，并赋初值
    latitude: 10.11,
    longitude: 10.11,
    modeItems:['car','walk','bus'],
  },

  // 将用户选择的导航方式渲染到wxml上
  modeChange:function(e){
    let i=e.detail.value;
    let value=this.data.modeItems[i];
    this.setData({mode:value})
  },

  onSubmit:function(e){
    console.log('表单被提交')
    console.log(e)
  },

  // 提交表单并开始导航
  onSubmit(res){
    var that=this
    wx.showLoading({
      title: '开始导航......',
      duration:500,
    })
   
    // 获取用户输入的目标地址和导航方式
    var address=res.detail.value.address
    var modeID=res.detail.value.modeID
    console.log(address,modeID)
    let i=res.detail.value.modeID
    let mode=this.data.modeItems[i]


    //腾讯地图
    // 引入SDK核心类，将用户输入的地址转换为经纬度
    //qqmap-wx-jssdk.min需要你下载引入到自己的项目
    var QQMapWX = require('../../utils/qqmap-wx-jssdk');

    // 实例化API核心类
     var qqmapsdk = new QQMapWX({
      key: 'ZH6BZ-GFYR3-GKM3W-3RYX2-UXAQV-FPBTM' // 必填
    });
    //调用地址解析接口
    qqmapsdk.geocoder({
       //获取表单传入地址
       address:res.detail.value.address,
       success: function (res) { //成功后的回调
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
         that.setData({ //赋值
           longitude: longitude,
           latitude: latitude,
           markers: [{
            latitude,
             longitude 
          }]
        })
       // console.log(that.data.latitude,that.data.longitude)
      },
      fail: function (error) {
        console.error(error);
      },
   })

  //  将用户输入的目标地址，并将转换后的经纬度传递至腾讯地图插件
    let plugin = requirePlugin('routePlan');
    let key = 'ZH6BZ-GFYR3-GKM3W-3RYX2-UXAQV-FPBTM'; //使用在腾讯位置服务申请的key
    let referer = '医点通519'; //调用插件的app的名称
    // console.log(this.longitude,)
    let endPoint = JSON.stringify({ //终点
      'name':address,
      'latitude': that.data.latitude,
      'longitude':that.data.longitude
    });
    
    // 跳转至腾讯地图插件
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint+'&mode='+mode
    });

  },

  // 重置表单
  onReset:function(e){
    console.log('已重置')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //获取当前的地理位置
    wx.getLocation({
      // 获取成功
      success: function (res) {
        //赋值经纬度
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
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