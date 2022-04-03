import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Blog() {
  const dispatch = useDispatch();
  const blogData = useSelector((store) => store.app.blog);

  return (
    <div>
      Blog
      <button
        onClick={() => {
          dispatch({
            type: "LOAD_SOME_DATA",
          });
        }}
      >
        load some data
      </button>
    </div>
  );
}
