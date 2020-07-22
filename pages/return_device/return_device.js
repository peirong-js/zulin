// pages/return_device/return_device.js
const app = getApp();
import { order_return} from '../../api/user.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parameter: {
      'navbar': '1',
      'return': '1',
      'title': '归还',
      'color': true,
      'class': '0'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      order_id:options.order_id
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
    this.now_date();
  },

  //获取当前日期
  now_date:function(){
    /* let now = new Date();
    let year = now.getFullYear(); //得到年份
    let month = (now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1);//得到月份
    let date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();//得到日期
    //时  
    let h = date.getHours();  
    //分  
    let m = date.getMinutes();  
    //秒  
    let s = date.getSeconds(); 
    let today_date = year+'-'+month+'-'+date+' '+h+':'+m+':'+s;
    this.setData({
      today_date:today_date,
    }) */
     //获取当前时间戳  
    let timestamp = Date.parse(new Date());  
    timestamp = timestamp / 1000;  
    console.log("当前时间戳为：" + timestamp); 
    
    //获取当前时间  
    let n = timestamp * 1000;  
    let date = new Date(n);  
    //年  
    let Y = date.getFullYear();  
    //月  
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);  
    //日  
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();  
    //时  
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();  
    //分  
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();  
    //秒  
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();  

    console.log("当前时间：" +Y+'-'+M+'-'+D+' '+h+":"+m+":"+s);  
    let today_date = Y+'-'+M+'-'+D+' '+h+":"+m+":"+s
    this.setData({
      today_date:today_date,
      timestamp:timestamp
    })
   
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  //提交表单
  submit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    order_return(e.detail.value).then(res=>{
      console.log(res)
    });
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