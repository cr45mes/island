import {
    HTTP
}
from '../util/http-p.js'

class MovieModel extends HTTP {
    data = null
    all(){
      console.log('abc')
    }
    getDramaMovieList() {
        return this.request({
            url: 'movie/dramamovie_list'
        })
    }

    
}

export {
  MovieModel
}