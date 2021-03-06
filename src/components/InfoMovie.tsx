import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PatternPerson from "../patterns/PatternPerson";
import { movie, person } from '../types'

const Info: React.FC = () => {
  const params = useParams();
  const [movinfo, setMovinfo] = useState<movie>();
  //const [similar, setSimilar] = useState("");
  const [cast, setCast] = useState<person[]>([]);
  const poster = "https://www.themoviedb.org/t/p/original/";
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API}&language=en-US`
      )
      .then((response) => {
        setMovinfo(response.data);
      });
    // axios
    //   .get(
    //     `https://api.themoviedb.org/3/movie/${params.id}/similar?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`
    //   )
    //   .then((response) => {
    //     setSimilar(response.data.results);
    //   });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API}&language=en-US`
      )
      .then((response) => {
        setCast(response.data.cast);
      });
  }, [params]);
  console.log(movinfo);
  return (
    <div>
      {movinfo && (
        <div className="max-w-7xl  m-auto md:w-5/6 lg:w-3/4">
          <h1 className="text-center text-3xl m-2">{movinfo.title}</h1>
          <div className="flex items-center">
            <img
              className="w-3/12 rounded-md ml-10 -mr-5 z-10"
              src={poster + movinfo.poster_path}
              alt={movinfo.title}
            />
            <img
              className="m-auto rounded-md -ml-10 w-9/12"
              src={poster + movinfo.backdrop_path}
              alt={movinfo.title}
            />
          </div>
          <ul className="p-4">
            <li>
              <h2 className="text-2xl">Overview</h2>
              <p className="opacity-90">{movinfo.overview}</p>
            </li>
            <li>
              Language:{" "}
              <span className="rounded-full px-2 bg-yellow-400 text">
                {movinfo.original_language}
              </span>{" "}
            </li>
            <li>
              Release Date:{" "}
              <span className="opacity-90">{movinfo.release_date}</span>{" "}
            </li>
            <li>
              Vote:{" "}
              <span className="rounded-full px-2 bg-yellow-400 text">
                {movinfo.vote_average}
              </span>{" "}
            </li>
            <li>
              Production:{" "}
              {movinfo.production_companies.map((item, index) => (
                <span
                  key={index}
                  className=" bg-yellow-400 mx-1 rounded-md px-1"
                >
                  {item.name}
                </span>
              ))}
            </li>
            <li>
              Production Country:{" "}
              <span className="opacity-90">
                {movinfo.production_countries.map((item, index) => (
                  <span key={index}> -{item.name} </span>
                ))}
              </span>
            </li>
          </ul>
          <h2 className="text-2xl">Similar Movies</h2>
          {/* {similar && (
            <div className="flex overflow-x-auto gap-2 p-2">
              {similar.map((item) => (
                <img
                  className="w-32"
                  key={item.id}
                  src={poster + item.poster_path}
                  alt={item.title}
                />
              ))}
            </div>
          )} */}
          <PatternPerson heading={"Cast"} data={cast} />
        </div>
      )}

      {/* <span>{movinfo.production_countries.map((item) => item.name)} </span> */}
    </div>
  );
};

export default Info;
