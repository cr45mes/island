// pages/movie-detail/movie-detail.js
import {
  MovieModel
} from '../../models/movie.js'
const movieModel = new MovieModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading:false,
    showContent:true,
    filmDetail:{},
    tag:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    const id = options.mid
    movieModel.getMovieDetail(id)
      .then(res => {
        console.log(res.moviedetail)
        this.setData({filmDetail:res.moviedetail})
        this.setData({tag:JSON.parse(res.moviedetail.genres.replace(/'/g, '"'))})
        console.log(JSON.parse(res.moviedetail.genres.replace(/'/g, '"')))
        console.log(Array.isArray(res.moviedetail.genres))
      })
      // wx.request({
      //   url: `http://t.talelin.com/v2/movie/subject/${mid}`,
      //   success:(res)=>{
      //       console.log(res.data)
      //       this.setData({filmDetail:res.data})
      //   }
      // })
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