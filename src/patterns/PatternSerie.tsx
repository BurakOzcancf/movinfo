import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Mark from "./Mark";
import { addFavSerie } from "../store/bookmarks-slice";
import { useAppSelector } from "store";
import { tv } from "types";

const Category = ({ heading, data }: { heading: string; data: tv[] }) => {
  const dispatch = useDispatch();
  const serie = useAppSelector(state => state.bookmark.favSerie)
  const poster = "https://www.themoviedb.org/t/p/original/";
  return (
    <div>
      <h2
        style={heading ? { display: "block" } : { display: "none" }}
        className="px-4 text-center font-medium text-4xl mt-8 mb-4"
      >
        {heading}
      </h2>
      {data ? (
        <div
          style={data[0] ? { display: "grid" } : { display: "none" }}
          className="p-4 relative items-center gap-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-5xl justify-center m-auto "
        >
          {data.map((item: tv) => (
            <div
              key={item.id}
              className="group relative hover:scale-105 transition-all"
            >
              <Link to={`/info_serie/${item.id}`}>
                <img src={poster + item.poster_path} alt={item.title} />
              </Link>
              <span
                className="absolute group-hover:opacity-100 opacity-0 transition-all delay-300 w-full  bottom-0 right-0 bg-gradient-to-t from-black to-transparent bg-opacity-60 rounded-b-2xl p-4 "
                onClick={() => dispatch(addFavSerie(item))}
              >
                <Mark category={serie} item={item.id} />
              </span>
            </div>
          ))}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Category;
