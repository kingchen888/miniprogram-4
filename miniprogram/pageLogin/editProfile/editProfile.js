// page/register/register.js
const db = wx.cloud.database()
const app = getApp()
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
        position: "",
        department: "",
        password: "",
    },
    //弹窗事件
    
      //获取文本框值的事件
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
    onChange_position:function (e) {
        var that = this;
        that.setData({
            position: e.detail
        })
    },
    onChange_department:function (e) {
        var that = this;
        that.setData({
            department: e.detail
        })
    },



    // 跳转界面函数
    jump:function (e) {
        wx.navigateTo({
            url: '../#/#',
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
    // 判断符合条件修改成功，否则修改失败
    confirmModification:function(event) {
        var that = this;
        var department=that.data.department
        var name=that.data.name
        var position=that.data.position
        var telephone=that.data.telephone
        var years=that.data.years
        if (department.length==0 || name.length==0 || position.length==0 || telephone.length==0 || years.length==0) {
            // 错误提示
            Toast('请正确输入');
        }else{
            // 调用函数jumpLogin跳转到登录页面
            // that.jump();
            var id=app.globalData.admin_id
            console.log("yes")
            adminsCollection.doc(id).update({
                data: {
                    years: that.data.years,
                    telephone: that.data.telephone,
                    position: that.data.position,
                    department: that.data.department,
                }
            })
        }  
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.queryAssignment();
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

    },
    //查询赋值
    queryAssignment: function(e) {
        var that = this;
        var id=app.globalData.admin_id
        adminsCollection.doc(id).field({
            name: true,
            years: true,
            telephone: true,
            position: true,
            department:true,
            password:true,
          }).get({
            success: res => {
                that.setData({
                    admins: res.data,
                    years: res.data.years,
                    telephone: res.data.telephone,
                    position: res.data.position,
                    department: res.data.department,
                })
            }
          })
    }
})