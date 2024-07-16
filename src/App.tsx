import "./App.css";
import React from "react";
import userLogo from "./assets/user.svg";

type Post = {
  id: number;
  content: string;
  created: number;
};

const App: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = React.useState("");

  React.useEffect(() => {
    fetch("http://localhost:5173/api/posts")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPosts(json);
      });
  }, []);

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
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
          <div className="flex items-center mb-4">
            <img
              src={userLogo}
              alt=""
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <h2 className="font-semibold text-left">Ilnaz Gilyazov</h2>
              <p className="text-sm text-gray-500">
                Основатель группы • {new Date(post.created).toDateString()}
              </p>
            </div>
          </div>
          <p className="mb-4 text-left font-bold">{post.content}</p>
          <div className="flex items-center justify-between text-gray-500">
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span>👍</span>
              <span>Нравится</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500">
              <span>💬</span>
              <span>Комментировать</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
