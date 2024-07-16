import React from "react";

type Post = {
  id: number;
  content: string;
  created: number;
};

const CreatePost = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = React.useState("");

  const handleCreatePost = () => {
    const newPost = {
      content: newPostContent,
    };

    fetch("http://localhost:7070/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((res) => res.json())
      .then((json) => {
        setPosts((prevPosts) => [json, ...prevPosts]);
        setNewPostContent("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="w-[500px] mt-16">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <div className="flex justify-between">
          <input
            className="mr-2 w-4/5 rounded-md"
            required
            placeholder="Напишите что-нибудь..."
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button
            className="hover:text-blue-500 bg-slate-100 w-2/6"
            onClick={handleCreatePost}
          >
            Создать пост
          </button>
        </div>
      </div>
    </div>
  );
};
