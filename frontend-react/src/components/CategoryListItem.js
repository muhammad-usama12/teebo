import React, { useContext, useState } from "react";
import classNames from "classnames";
import axios from "axios";
import { ApplicationContext } from "./App";
import { getFavouritesByUser } from "../helpers/selectors";

export default function CategoryListItem(props) {
  const [clicked, setClicked] = useState(false);

  const { state} = useContext(ApplicationContext)

  const favouriteShows = getFavouritesByUser(state, 1)

  const categoryclass = classNames("pill-container category-item", {
    "profile-hide-spoiler": props.spoiler,
    "show-all": props.showAll,
    "clicked": props.spoiler && clicked
  });

  // hardcoded user
  const userId = 1;
  
  const updateFavourites = (tvShowId, userId) => {
    axios.post(`/api/favourites/new`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then(() => {
      console.log("user favourites after update", favouriteShows)
    })
    .catch(err => console.log("update favourites failed", err.message))
  }

  console.log("user favourites before delete/update", favouriteShows)

  const deleteFavourites = (tvShowId, userId) => {
    axios.post(`/api/favourites/`, {
      user_id: userId,
      tvshow_id: tvShowId
    })
    .then(() => {
      console.log("user favourites after delete", favouriteShows)
    })
    .catch(err => console.log("deleted favourites failed", err.message))
  }

  const handleClick = () => {
    if (props.spoiler) {
      if (!clicked) {
        props.onClick()
        return setClicked(true);
      } else {
        props.onClick()
        return setClicked(false)
      }
    }
    if (props.tvShowId) {
      let currentFavouriteShow = favouriteShows.find (favouriteShows => favouriteShows.id === props.tvShowId);
  
      if (currentFavouriteShow) {
        return deleteFavourites(props.tvShowId, userId);
      } else {
        return updateFavourites(props.tvShowId, userId)
      }
    }
    // if (props.tvShowId === currentFavouriteShow.id) {
    // } else if (!props.showAll) {
    // }
    props.onClick()
  }

  return (
    <div
      className={categoryclass}
      onClick={handleClick}
    >
      <p>{props.name}</p>
      <img src={props.img} alt=""></img>
    </div>
  );
}