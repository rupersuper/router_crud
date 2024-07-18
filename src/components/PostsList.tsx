import React from "react";
import userLogo from "../assets/user.svg";
import CreatePostButton from "./CreatePostButton";
import { Link } from "react-router-dom";

type Post = {
  id: number;
  content: string;
  created: number;
};

const PostList = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:7070/posts")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPosts(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <CreatePostButton />
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
          <Link to={`/posts/${post.id}`}>
            <p className="mb-4 text-left font-bold">{post.content}</p>
          </Link>
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

export default PostList;
