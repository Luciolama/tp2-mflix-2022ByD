const conn = require('./conn');
const DATABASE = 'sample_mflix';
const MOVIES = 'movies';
const { ObjectId } = require('mongodb');


async function getAllMovies(pageSize, page){
    const connectiondb = await conn.getConnection();
    const movies = await connectiondb
                        .db(DATABASE)
                        .collection(MOVIES)
                        .find({}).limit(pageSize).skip(pageSize * page)
                        .toArray();    
    return movies;
}

async function getMovieById(id){
    const connectiondb = await conn.getConnection();

    const movie = await connectiondb.db(DATABASE).collection(MOVIES).findOne({ _id: new ObjectId(id) });
    return movie;
}

async function getMoviesWithAwards(){

    const connectiondb = await conn.getConnection();

    const movies = await connectiondb
    .db(DATABASE)
    .collection(MOVIES)
    .find({ 'awards.wins':{$gt:0}}, {projection : {title:1, plot:1, poster: 1, _id:false}}).toArray();

    return movies;
}

module.exports = {getAllMovies, getMovieById,getMoviesWithAwards};
