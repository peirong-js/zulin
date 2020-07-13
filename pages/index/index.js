const app = getApp();

import { getIndexData, getCoupons, getTemlIds, getLiveList} from '../../api/api.js';
import { CACHE_SUBSCRIBE_MESSAGE } from '../../config.js';
import Util from '../../utils/util.js';
import { getGroomList } from '../../api/store.js';
import wxh from '../../utils/wxh.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    itemNew:[],
    activityList:[],
    menus: [],
    bastBanner: [],
    bastInfo: '',
    bastList: [],
    fastInfo: '',
    fastList: [],
    firstInfo: '',
    firstList: [],
    salesInfo: '',
    likeInfo: [],
    lovelyBanner: {},
    benefit:[],
    indicatorDots: false,
    circular: true,
    autoplay: true,
    interval: 3000,
    duration: 500,
    parameter:{
      'navbar':'0',
      'return':'0'
    },
    window: false,
    iShidden:false,
    navH: "",
    newGoodsBananr:'',
    selfLongitude: '',
    selfLatitude: '',
    liveList: [],
    liveInfo:{},
    address:''
  },
  closeTip:function(){
    wx.setStorageSync('msg_key',true);
    this.setData({
      iShidden:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wxh.selfLocation(1);
    this.setData({
      navH: app.globalData.navHeight
    });
    if (options.spid) app.globalData.spid = options.spid;
    if (options.scene) app.globalData.code = decodeURIComponent(options.scene);
    if (wx.getStorageSync('msg_key')) this.setData({ iShidden:true});
    this.getTemlIds();
    this.getLiveList();
  },
  getLiveList:function(){
    getLiveList(1,20).then(res=>{
      if(res.data.length == 1){
        this.setData({liveInfo:res.data[0]});
      }else{
        this.setData({liveList:res.data});
      }
    }).catch(res=>{

    })
  },
  /**
   * 商品详情跳转
   */
  goDetail: function (e) {
    let item = e.currentTarget.dataset.items
    if (item.activity && item.activity.type === "1") {
      wx.navigateTo({
        url: `/pages/activity/goods_seckill_details/index?id=${item.activity.id}&time=${item.activity.time}&status=1`
      });
    } else if (item.activity && item.activity.type === "2") {
      wx.navigateTo({ url: `/pages/activity/goods_bargain_details/index?id=${item.activity.id}` });
    } else if (item.activity && item.activity.type === "3") {
      wx.navigateTo({
        url: `/pages/activity/goods_combination_details/index?id=${item.activity.id}`
      });
    } else {
      wx.navigateTo({ url: `/pages/goods_details/index?id=${item.id}` });
    }
  },
  getTemlIds(){
    let messageTmplIds = wx.getStorageSync(CACHE_SUBSCRIBE_MESSAGE);
    if (!messageTmplIds){
      getTemlIds().then(res=>{
        if (res.data) 
          wx.setStorageSync(CACHE_SUBSCRIBE_MESSAGE, JSON.stringify(res.data));
      })
    }
  },
  catchTouchMove: function (res) {
    return false
  },
  onColse:function(){
    this.setData({ window: false});
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
    this.getIndexConfig();
    this.getIndexGroomList();
    if(app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
  },
  get_issue_coupon_list:function(){
    var that = this;
    getCoupons({page:1,limit:3}).then(res=>{
      console.log(res)
      that.setData({ couponList: res.data });
      if (!res.data.length) that.setData({ window: false });
    });
  },
  getIndexGroomList: function () {
    var that = this;
    getGroomList(1).then(res=>{
      /* console.log(res.data.list);
      let store_list = res.data.list;
      let store_show = [];
      for(let y=0;y<store_list.length;y++){
        qqmapsdk.geocoder({
          address: store_list[y].store_location, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
          success: function(res) {
            let store_distance = that.getDistance(res.result.location.lat,res.result.location.lng,that.data.user_location_lat,that.data.user_location_lon)
            console.log(store_distance);
            if(store_distance<=10){
              store_show.push(store_list[y])
            };
            console.log(store_show)
            that.setData({store_show:store_show})
          },
          fail: function(error) {
            console.error(error);
          }
        })
      }
      console.log(store_show)
      that.setData({store_show:store_show}) */
      that.setData({ imgUrls: res.data.banner, bastList: res.data.list })
    });
  },


  getIndexConfig:function(){
    var that = this;
    getIndexData().then(res=>{
      console.log(res)
      that.setData({
        imgUrls: res.data.banner,
        /* menus: res.data.menus, */
        itemNew: res.data.roll,
        activityList: res.data.activity,
        bastBanner: res.data.info.bastBanner,
        bastInfo: res.data.info.bastInfo,
        /* bastList: res.data.info.bastList, */
        fastInfo: res.data.info.fastInfo,
        fastList: res.data.info.fastList,
        firstInfo: res.data.info.firstInfo,
        firstList: res.data.info.firstList,
        salesInfo: res.data.info.salesInfo,
        likeInfo: res.data.likeInfo,
        lovelyBanner: res.data.lovely.length ? res.data.lovely[0] : {},
        benefit: res.data.benefit,
        couponList: res.data.couponList,
        newGoodsBananr: res.data.newGoodsBananr
      });
      /* console.log(res.data.info.bastList); */
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res.authSetting['scope.userInfo']) {
            that.setData({ window: that.data.couponList.length ? true : false });
          } else {
            that.setData({ window: false, iShidden: true});
          }
        }
      });
    });

  },

    /* //下拉刷新
    onPullDownRefresh() {//下拉刷新
      wx.showNavigationBarLoading();
      this.get_location;
  
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, */



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({ window:false});
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
    this.getIndexConfig();
    if (app.globalData.isLog && app.globalData.token) this.get_issue_coupon_list();
    wx.stopPullDownRefresh();
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