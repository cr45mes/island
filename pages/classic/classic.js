import {
    ClassicModel
} from '../../models/classic.js'
import {
    LikeModel
} from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()

Component({

    /**
     * 页面的初始数据
     */

    properties: {
        cid: Number,
        type: Number,
        needNavi:{
          type:Boolean,
          value:true
        }
    },

    data: {
        classic: null,
        latest: true,
        first: false,
        likeCount: 0,
        likeStatus: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    
    attached(options) {
      this.intervalId = setInterval(() => {
        // 获取 app.js 的 globalData 对象
        const app = getApp();
        const suanfa = app.globalData.suanfa;
        // 判断 suanfa 是否为空        
        if(Object.keys(suanfa).length === 0){
          console.log('111111CVBS')
        }else{
          console.log(suanfa);
          clearInterval(this.intervalId);
          console.log('index',this.data.classic.index)
          let index = this.data.classic.index
          suanfa.index =index
          this.setData({
            classic: suanfa,
            likeCount: suanfa.fav_nums,
            likeStatus: suanfa.like_status
          })
        }
        // if (suanfa) {
        //   
        //   // 如果不为空，停止计时器
        //   
        // }
      }, 2000);
      // wx.showModal({
      //   title: '登录',
      //   content: '将获取用户信息，请点击确认',
      //   success (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //       // wx.getUserProfile({
      //       //   desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //       //   success: (res) => {
      //       //     console.log(res)
                
      //       //   }
      //       // })
      //     } else if (res.cancel) {
      //       console.log('用户点击取消')
      //     }
      //   }
      // })
      
        const cid = this.properties.cid
        console.log('cid',cid,type)
        const type = this.properties.type
        if (!cid) {
            classicModel.getLatest().then(res => {
              res.image = res.image.replace(/3000\//g, "5000/assets/");
              console.log('res.image',res.image)
                this.setData({
                    classic: res,
                    likeCount: res.fav_nums,
                    likeStatus: res.like_status
                })
            })
            var app = getApp();
            console.log('aaaaaaaa',app.globalData.suanfa)
            if(Object.keys(app.globalData.suanfa).length === 0){
              console.log('cba')
            }else{
              var app = getApp();
              console.log('nba')
              
              this.setData({
                classic: app.globalData.suanfa,
                likeCount: app.globalData.suanfa.fav_nums,
                likeStatus: app.globalData.suanfa.like_status
            })
            
            wx.setStorageSync('classic-8', app.globalData.suanfa)
            }
        } else {
            classicModel.getById(cid, type).then(res => {
              console.log(res.id,res.type)
                this._getLikeStatus(res.id, res.type)
                res.image = res.image.replace(/3000\//g, "5000/assets/")
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        }
    },
   
    
    methods: {
      customEvent: function () {
        console.log('custom event has been triggered')
        // 执行其他操作
      },
        onLike: function(event) {
            const behavior = event.detail.behavior
            likeModel.like(behavior, this.data.classic.id,
                this.data.classic.type)
        },

        onNext: function(event) {
            this._updateClassic('next')
        },

        onPrevious: function(event) {
            this._updateClassic('previous')
        },

        _updateClassic: function(nextOrPrevious) {
            console.log(this.data.classic)
            const index = this.data.classic.index
            const classic = classicModel.getClassic(index, nextOrPrevious)
            classic.then(res => {
                this._getLikeStatus(res.id, res.type)
                res.image = res.image.replace(/3000\//g, "5000/assets/")
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        },

        _getLikeStatus: function(artID, category) {
          console.log(artID,category)
            const status = likeModel.getClassicLikeStatus(artID, category)
            status.then(
                (res) => {
                    this.setData({
                        likeCount: res.fav_nums,
                        likeStatus: res.like_status
                    })
                })
        },
    }
})