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
          <div className="flex items-center justify-end text-gray-500">
            <Link to={`/posts/${post.id}`}>
              <button className="flex items-center space-x-1 hover:text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
