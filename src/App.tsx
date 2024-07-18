import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import CreatePostForm from "./components/CreatePostForm";
import PostList from "./components/PostsList";
import ViewPost from "./components/ViewPost";
import EditPost from "./components/EditPost";

const App: React.FC = () => {
  return (
    <div className="w-[500px] mt-16">
      <Routes>
        <Route path="" element={<PostList />} />
        <Route path="/posts/new" element={<CreatePostForm />} />
        <Route path="/posts/:id" element={<ViewPost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
};

export default App;
