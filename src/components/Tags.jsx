import React from "react";
import { Link } from "react-router-dom";

const Tags = (props) => {
  const handleTagClick = (e) => {
    axios
      .get(baseURL + "/blog/tag/" + tagName)
      .then((res) => {
        setSearchedBlogs(res.data);
      })
      .catch((err) => {
        history.push("/Blogastic/error");
      });
  }

  return (
    <section id="tags">
      <h3>Popular Tags</h3>
      {
        props.tags.map((tag) => {
          return <Link onClick={handleTagClick} key={tag} to="/Blogastic/blog/tags">#{tag}<br /></Link>
        })
      }
    </section>
  );
};

export default Tags;