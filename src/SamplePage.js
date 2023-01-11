import React from "react";
import { Route, Routes } from "react-router-dom";
import AllPosts from "./AllPosts";
import EachPost from "./EachPost";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CatPosts from "./CatPage";

const SamplePage = () => {
  return (
    <>
      <Routes>
        <Route path="/MainPage" element={<AllPosts />} />
        <Route path="/post/:postId" element={<EachPost />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/posts/category/:category" element={<CatPosts />} />
      </Routes>
    </>
  );
};

export default SamplePage;
