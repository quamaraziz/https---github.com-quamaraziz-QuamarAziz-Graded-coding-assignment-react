import { getDefaultNormalizer } from "@testing-library/react";
import react,{useState} from "react";
import { useEffect } from "react/cjs/react.development";
import Card from "./Card";

let API_key="&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Comming Soon","In Theatres","Top Rated Indian","Top Rated","Favourites"];

let currentDate = new Date();
let yr = currentDate.getFullYear();
let m = currentDate.getMonth();
let d = currentDate.getDate();
console.log(d);currentDate.setUTCFullYear(yr, m, d)
const ymd = currentDate.toISOString().split('T')[0].split('-')
const result = `${ymd[0]}-${ymd[1]}-${ymd[2]}`;

const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData=(movieType)=>{
        if(movieType=="Comming Soon")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2022-04-20"+API_key;
        }
        if(movieType=="In Theatres")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2022-04-01&primary_release_date.lte="+result+API_key;
        }
        if(movieType=="Top Rated Indian")
        {
            url=base_url+"/discover/movie?with_original_language=hi&primary_release_year=2014&sort_by=vote_average.desc&vote_count.gte=7.5"+API_key;
        }
        if(movieType=="Top Rated")
        {
            url=base_url+"/discover/movie?with_primary_release_year=2015&sort_by=vote_average.desc&vote_count.gte=8"+API_key;
        }
        if(movieType=="Favourites")
        {
            url=base_url+"/discover/movie?with_original_language=hi&popularity=sort_by.desc"+API_key;
        }
        setUrl(url);

    }
    const searchMovie=(evt)=>{
        if(evt.key=="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(" ");
        }
    }
    return(
        <>
            <div class="backdrop">
                <div class="Container">      
                    <div class="Header">
                        <div class="appName">
                            <img class="appImage" src={require("../images/movie-header-icon.png")}/>
                            ShowBizz
                        </div>
                    
                        <div class="searchBox">
                            <img class="searchIcon" src={require("../images/searching.png")}/>
                            <input class="searchInput" type="text" 
                                placeholder='Search Movies' 
                                onChange={(e)=>{setSearch(e.target.value)}} 
                                value={search} onKeyPress={searchMovie}>
                            </input>
                        </div>
                    </div>
                        <nav>
                            <ul>
                                {
                                    arr.map((value,pos)=>{
                                        return(
                                            <li><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                        )
                                    })
                                }
                                
                            </ul>
                        </nav>
                </div>
        
                <div className="movie-container" >
                    {
                        (movieData.length==0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                            return(
                                <Card info={res} key={pos}/>
                            )
                        })
                    }
                </div>
            </div>
            
        </>
    )
}
export default Main;