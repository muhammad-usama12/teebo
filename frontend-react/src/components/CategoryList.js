import React from "react";
import "./Category.scss"
import CategoryListItem from "./CategoryListItem"

// We pass props from Article.js, and App.js
export default function CategoryList(props) {

  const categoriesArray = props.name.shows
  const eachcategory = categoriesArray.map((category) => (
    <CategoryListItem
      key={category.id}
      name={category.name} 
      img={category.image_url}
    />
  ))
  return (
    <section>
      <div className="general-filter">
        <CategoryListItem
          name="Show All"
        />
        <CategoryListItem
          name="Hide Spoilers"
        />
      </div>
      <div className="category-list">
        { eachcategory }
      </div>
    </section>
  );
}