import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";

import userLogo from "../assets/user.svg";

type Post = {
  id: number;
  content: string;
  created: number;
};

const ViewPost = () => {
  const [post, setPost] = React.useState<Post | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    fetch(`http://localhost:7070/posts/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setPost(json.post);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!post) {
    return <div>подождите...</div>;
  }

  const handleDelePost = () => {
    fetch(`http://localhost:7070/posts/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/");
        } else {
          return res.json().then((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative">
      <Link to="/">
        <button className="absolute right-2 top-2 p-1">
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </Link>
      <div className="flex items-center mb-4">
        <img src={userLogo} alt="" className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h2 className="font-semibold text-left">Ilnaz Gilyazov</h2>
          <p className="text-sm text-gray-500">
            Основатель группы • {new Date(post.created).toDateString()}
          </p>
        </div>
      </div>
      <p className="mb-4 text-left font-bold">{post.content}</p>
      <div className="flex items-center justify-end gap-2 text-gray-500">
        <Link to={`/posts/edit/${id}`}>
          <button className="flex items-center space-x-1 bg-green-100 hover:text-blue-500">
            <span>Изменить</span>
          </button>
        </Link>

        <button
          className="flex items-center space-x-1 bg-red-100 hover:text-blue-500"
          onClick={handleDelePost}
        >
          <span>Удалить</span>
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
