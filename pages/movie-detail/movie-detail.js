// pages/movie-detail/movie-detail.js
import {
  MovieModel
} from '../../models/movie.js'
import {
  LikeModel
} from '../../models/like.js'
const movieModel = new MovieModel()
const likeModel = new LikeModel()
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
        console.log(res[2])
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
  onLike(event) {
    
    console.log('ee',event)
    if(event.detail.behavior=='like') {
      console.log('ee',this.data.filmDetail.genres)
      const arr = JSON.parse(this.data.filmDetail.genres);
      if (arr.includes("剧情")) {
        var app = getApp();
        app.globalData.suanfa = {
          content: '一个牙齿流汗的疯子,瞪得我心怦怦直跳',
          fav_nums:0,
          id:9,
          image:'https://img9.doubanio.com/view/photo/l/public/p2278443464.webp',
          index:8,
          like_status:false,
          title:'为你推荐 - 死亡诗社',
          type:100
        }
        console.log('aaaaaaaa',app.globalData.suanfa)
        // wx.setStorageSync('classic-8', app.globalData.suanfa)
      }else if (arr.includes("科幻")) {
        console.log('科幻')
        var app = getApp();
        app.globalData.suanfa = {
          content: 'You must be died,because I can‘t feel any,any things any more',
          fav_nums:0,
          id:9,
          image:'https://img9.doubanio.com/view/photo/m/public/p1299486184.webp',
          index:8,
          like_status:false,
          title:'为你推荐 - E.T.外星人',
          type:100
        }
      }else if (arr.includes("喜剧")) {
        console.log('喜剧')
        var app = getApp();
        app.globalData.suanfa = {
          content: '穷人的世界是黑白的， 有钱人的世界才是彩色的。',
          fav_nums:0,
          id:9,
          image:'https://img9.doubanio.com/view/photo/l/public/p2688468484.webp',
          index:8,
          like_status:false,
          title:'为你推荐 - 大佛普拉斯',
          type:100
        }
      }else if (arr.includes("动作")) {
        console.log('动作')
        var app = getApp();
        app.globalData.suanfa = {
          content: 'That old saying,how you always hurt the one you love? Well,it works both ways.',
          fav_nums:0,
          id:9,
          image:'https://img1.doubanio.com/view/photo/m/public/p2881486209.webp',
          index:8,
          like_status:false,
          title:'为你推荐 - 搏击俱乐部',
          type:100
        }
      }

    }
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.filmDetail.id, 101)
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