import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(" ");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPosts();
  }, [posts]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:5000/get-blogs");
    const data = await response.json();
    setPosts(data.blogs);
    console.log("your data is ", data.blogs);
  };

  const deletePost = async (id) => {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      toast.success("blogs delete successfully");
    } else {
      toast.error("blogs delete failed");
    }
  };

  const updatePost = async (id) => {
    console.log(
      "this is your title ,description , id -> ",
      title,
      description,
      id
    );

    const response = await fetch(`http://localhost:5000/update-blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (response.status === 200) {
      toast.success("blogs update successfully");
    } else {
      toast.error("blogs update failed");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" my-5 flex flex-col gap-5   ">
        {posts.map((post) => {
          return (
            <div
              className="w-[40vw] mx-auto p-3 rounded-md shadow-md "
              key={post._id}
            >
              <div className=" flex justify-end text-lg gap-3   ">
                <AiFillDelete
                  className=" text-grey-400  hover:text-red-400  cursor-pointer "
                  onClick={() => deletePost(post._id)}
                />
                <MdOutlineEdit
                  className={`${
                    selectedPost === post._id && editPost
                      ? "text-red-400 scale-110"
                      : "text-grey-400 "
                  } text-grey-400  hover:text-red-400 cursor-pointer hover:scale-110 transition-all `}
                  onClick={() => {
                    setEditPost(!editPost);
                    setSelectedPost(post._id);
                  }}
                />
              </div>
              <h2
                className="font-bold text-lg my-1 outline-none focus:bg-grey-300"
                contentEditable={editPost}
                onInput={(e) => setTitle(e.target.innerText)}
              >
                {post.title} 
              </h2>
              <h3
                className="text-grey-500 text-lg font-semibold selection:bg-green-300 
                outline-none focus:bg-grey-200
                "
                contentEditable={editPost}
                onInput={(e) => setDescription(e.target.innerText)}
              >
                {post.description}
              </h3>
              <button
                className={` ${
                  selectedPost === post._id && editPost ? "block" : "hidden"
                } bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md text-white `}
                onClick={() => updatePost(post._id)}
              >
                Save
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
