import React, { useState, useEffect, useRef, useContext } from "react";
import { MOVIES } from "./queries";
import { useQuery } from "@apollo/client";
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";

const MoviesContext = React.createContext();

const MoviesProvider = ({ children }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  const { loading, error, data } = useQuery(MOVIES);

  //search stuff
  const searchValue = useRef("");
  const searchMovies = () => {
    setSearch(searchValue.current.value);
  };

  //alert
  const added = "Added to watchlist!";
  const removed = "Removed from watchlist!";
  const [message, setMessage] = useState("");
  const [alertBox, setAlertBox] = useState(false);

  //search/query refetch
  useEffect(() => {
    if (loading) return;
    if (error) return;
    setAllMovies(data.movies.data);

    if (search === "") {
      setFilteredData([]);
    } else {
      setFilteredData(
        data.movies.data.filter((movie) =>
          movie?.attributes?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, data, error, loading]);

  //buttons
  const addToWatchlist = (id, e) => {
    if (user && isLoggedIn) {
      e.preventDefault();
      const newWatchlistItem = data.movies.data.filter(
        (movie) => movie.id === id
      );
      setWatchlist([...watchlist, newWatchlistItem]);
      setMessage(added);
      setAlertBox(true);

      setTimeout(() => {
        setAlertBox(false);
        setMessage("");
      }, 1500);
    } else {
      navigate("/login");
    }
  };

  const removeFromWatchlist = (id, e) => {
    e.preventDefault();
    const newWatchlist = watchlist.filter((movie) => {
      return movie[0].id !== id;
    });

    setWatchlist(newWatchlist);
    setMessage(removed);
    setAlertBox(true);

    setTimeout(() => {
      setAlertBox(false);
      setMessage("");
    }, 1500);
  };

  return (
    <MoviesContext.Provider
      value={{
        allMovies,
        filteredData,
        setFilteredData,
        searchValue,
        searchMovies,
        search,
        setSearch,
        watchlist,
        setWatchlist,
        addToWatchlist,
        removeFromWatchlist,
        alertBox,
        message,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
export { MoviesContext, MoviesProvider };
