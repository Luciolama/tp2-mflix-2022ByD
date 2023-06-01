const express = require('express');
const router = express.Router();
const controller = require('../controllers/movies');
const moviesdb = require('../data/movies');

router.get('/', async (req, res) => {    
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize): 0;
    const page = req.query.page ? parseInt(req.query.page): 0;
    
    res.json(await controller.getAllMovies(pageSize, page));
});

module.exports = router;

router.get('/:id', async (req,res) => {
   
    const moovie = await moviesdb.getMovieById(req.params.id);

    res.json(moovie);
})

router.get('/awards/win', async (req,res)=>{

    const movies = await moviesdb.getMoviesWithAwards();

    res.json(movies);
})
