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
    tag:[],
    posting: false,
    comments: [],
    likeStatus: false,
    likeCount: 0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.showLoading()
    const id = options.mid
    const detail = movieModel.getMovieDetail(id)
    const comments = movieModel.getComments(id)
    const likeStatus = movieModel.getLikeStatus(id)
    console.log('aaaaaaaaaaaaaaaa',likeStatus)

    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          filmDetail:res[0].moviedetail,
          tag:JSON.parse(res[0].moviedetail.genres.replace(/'/g, '"')),
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })
    
    // movieModel.getMovieDetail(id)
    //   .then(res => {
    //     console.log('fffff',res)
    //     this.setData({filmDetail:res.moviedetail})
    //     this.setData({tag:JSON.parse(res.moviedetail.genres.replace(/'/g, '"'))})
        
    //   })
      // wx.request({
      //   url: `http://t.talelin.com/v2/movie/subject/${mid}`,
      //   success:(res)=>{
      //       console.log(res.data)
      //       this.setData({filmDetail:res.data})
      //   }
      // })
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    const comment = event.detail.text || event.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    movieModel.postComment(this.data.filmDetail.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: "none"
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })

        this.setData({
          comments: this.data.comments,
          posting: false
        })
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