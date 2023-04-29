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
        console.log(cid,type)
        const type = this.properties.type
        if (!cid) {
            classicModel.getLatest().then(res => {
                this.setData({
                    classic: res,
                    likeCount: res.fav_nums,
                    likeStatus: res.like_status
                })
            })
        } else {
            classicModel.getById(cid, type).then(res => {
              console.log(res.id,res.type)
                this._getLikeStatus(res.id, res.type)
                this.setData({
                    classic: res,
                    latest: classicModel.isLatest(res.index),
                    first: classicModel.isFirst(res.index)
                })
            })
        }
    },

    methods: {
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