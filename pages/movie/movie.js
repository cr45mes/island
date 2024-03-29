// pages/movie/movie.js

import {
  MovieModel
} from '../../models/movie.js'


const movieModel = new MovieModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    showWhat:'drama',
    hotMovie:[],
    dramaMovie:[],
    actionMovie:[],
    scifiMovie:[],
    comedyMovie:[]
  },
  changeTabs(e){
    console.log(e.detail.activeKey)
    this.setData({showWhat:e.detail.activeKey})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (optins) {
    movieModel.getDramaMovieList()
      .then(res => {
        console.log(res)
        this.setData({dramaMovie:res})
      })
    movieModel.getScifiMovieList()
      .then(res => {
        console.log(res)
        this.setData({scifiMovie:res})
      })
    movieModel.getActionMovieList()
      .then(res => {
        console.log(res)
        this.setData({actionMovie:res})
      })
    movieModel.getComedyMovieList()
      .then(res => {
        console.log(res)
        this.setData({comedyMovie:res})
      })
    // id
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
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  dianji(e) { 
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
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