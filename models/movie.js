import {
    HTTP
}
from '../util/http-p.js'

class MovieModel extends HTTP {
    data = null
    all(){
      console.log('abc')
    }
    getMovieDetail(id) {
      return this.request({
          url: `movie/${id}/detail`
      })
  }
    getDramaMovieList() {
        return this.request({
            url: 'movie/dramamovie_list'
        })
    }
    getComedyMovieList() {
        return this.request({
            url: 'movie/comedymovie_list'
        })
    }
    getActionMovieList() {
        return this.request({
            url: 'movie/actionmovie_list'
        })
    }
    getScifiMovieList() {
        return this.request({
            url: 'movie/scifimovie_list'
        })
    }

    
}

export {
  MovieModel
}