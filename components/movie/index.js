// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      // const bid = this.properties.book.id
      // wx.navigateTo({
      //   url:`/pages/book-detail/book-detail?bid=${bid}`
      // }) 
      console.log('被点到了',this.properties.movie)

      const mid = this.properties.movie.id
      wx.navigateTo({
        url: `/pages/movie-detail/movie-detail?mid=${mid}`,
      })
    }

  }
})
