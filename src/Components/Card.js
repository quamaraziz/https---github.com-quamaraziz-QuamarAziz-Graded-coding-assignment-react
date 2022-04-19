import react from "react";

const Card=(movie)=>{
   
    let img_path="https://image.tmdb.org/t/p/w500";
    return(
        <>
            <div className="movie">
                <a href={`https://www.themoviedb.org/movie/${movie.info.id}`} alt="link-to-site">
                    <img src={img_path+movie.info.poster_path} className="poster"></img>
                </a>                
                <button class="favourite" type="button">&#x2764;</button>
                {/* <button type="button" onClick={()=> toggleFavAction(movie)}>Fav</button> */}
                <div className="movie-details">
                    <div className="box">
                        
                        <h4 className="title">{movie.info.title}</h4>
                        <p className="rating">{movie.info.vote_average}</p>
                    </div>
                    <div className="overview">
                        <h1>overview</h1>
                        {movie.info.overview}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card;