import React from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const CreateBlog = () => {
  const navigate = useNavigate();

  const postData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const blog = {
      title,
      description,
    };

    // below code is to send the data to the backend server

    const response = await fetch("http://localhost:5000/post-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    if (response.status === 200) {
      toast.success("blog  created successfully");
      e.target.title.value = "";
      e.target.description.value = "";
      setTimeout(() => navigate("/"), 1000);
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className=" w-[90vw]  lg:w-[60vw]  mx-auto mt-10  ">
        <h1 className="text-2xl font-bold text-center ">Create Blog</h1>
        <form className="flex flex-col gap-5 " onSubmit={postData}>
          <label htmlFor="title" className="font-semibold text-lg ">
            Title :
          </label>
          <input
            type="text"
            name="title"
            id=""
            placeholder="Enter The Blog Title"
            className="px-3 py-2 rounded-md outline-none border-2 border-gray-300  "
          />

          <label htmlFor="Description" className="font-semibold text-lg ">
            Description :
          </label>
          <textarea
            name="description"
            rows="10"
            className="px-3 py-2 rounded-md outline-none border-2 border-gray-300  "
          ></textarea>
          <button
            type="submit"
            className="bg-purple-300 hover:bg-purple-500 py-3 rounded-md text-white text-xl font-bold"
          >
            Post
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
