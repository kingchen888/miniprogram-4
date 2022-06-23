// page/register/register.js
const db = wx.cloud.database()
const adminsCollection = db.collection('admins')
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        _id: "",
        name: "",
        years: "",
        telephone: "",
        positionItems: ['医师','主治医师','副主任医师','主任医师'],
        departmentItems: ['内科','外科','骨科','儿科','五官科','皮肤科','神经科','妇产科','传染科'],
        registrationCode: "",
        password: "",
    },
    positionChange:function(e){
      var that=this
      let i=e.detail.value;
      let value=this.data.positionItems[i];
      that.setData({position:value})
    },
    departmentChange:function(e){
      var that=this
      let i=e.detail.value;
      let value=this.data.departmentItems[i];
      this.setData({department:value});
    },
    //弹窗事件
    
      //获取文本框值的事件
    onChange_id:function (e) {
        var that = this;
        that.setData({
            _id: e.detail
        })
        // console.log(that.data._id)
    },
    onChange_name:function (e) {
        var that = this;
        that.setData({
            name: e.detail
        })
    },
    onChange_years:function (e) {
        var that = this;
        that.setData({
            years: e.detail
        })
    },
    onChange_telephone:function (e) {
        var that = this;
        that.setData({
            telephone: e.detail
        })
    },
    // onChange_position:function (e) {
    //     var that = this;
    //     that.setData({
    //         position: e.detail
    //     })
    // },
    onChange_department:function (e) {
        var that = this;
        that.setData({
            department: e.detail
        })
    },
    onChange_registrationCode:function (e) {
        var that = this;
        that.setData({
            registrationCode: e.detail
        })
    },
    onChange_password:function (e) {
        var that = this;
        that.setData({
            password: e.detail
        })
    },
    // 跳转登录界面函数
    jumpLogin:function (e) {
        wx.navigateTo({
            url: '../login/login',
        })
    },
    // 新增数据函数
    addData:function(event) {
        var that = this;
        adminsCollection.add({
            data:{
                _id: that.data._id,
                department: that.data.department,
                name: that.data.name,
                password: that.data.password,
                position: that.data.position,
                registrationCode: that.data.registrationCode,
                telephone: that.data.telephone,
                years: that.data.years,
            },
            // success:res => {
            //     console.log(res)
            // }
        }).then(res =>{
            // console.log(res)//测试用
        })
    },
    // 判断符合条件注册成功，否则注册失败
    register:function(event) {
        var that = this;
        var _id=that.data._id
        var department=that.data.department
        var name=that.data.name
        var password=that.data.password
        var position=that.data.position
        var registrationCode=that.data.registrationCode
        var telephone=that.data.telephone
        var years=that.data.years
        if (_id.length==0 || department.length==0 || name.length==0 || password.length ==0 || position.length==0 || registrationCode==0 || telephone.length==0 || years.length==0) {
            //错误提示
            Toast('请正确输入');
        }
        else if (registrationCode!="MAQIANGREAT") {
            //错误提示
            Toast('注册码错误');
        }else{
            //调用addData函数增加用户
            that.addData();
            //调用函数jumpLogin跳转到登录页面
            that.jumpLogin();
        }
        
        
               
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        adminsCollection.get().then(res => {
            that.setData({//将数据放入data中，用于查询
                admins: res.data
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