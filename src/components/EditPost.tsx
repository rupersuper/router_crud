import { Link, useParams, useNavigate } from "react-router-dom";
import React from "react";

const EditPost = () => {
  const { id } = useParams();
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch(`http://localhost:7070/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setContent(json.post.content);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleUpdatePost = () => {
    const updatedPost = {
      id,
      content,
    };

    fetch(`http://localhost:7070/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/posts/${id}`);
        } else {
          return res.json().then((error) => {
            throw new Error(error);
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="w-[500px] mt-16">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative flex flex-col">
        <div className="h-10">
          <Link to={`/posts/${id}`}>
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
        </div>

        <div className="flex justify-between">
          <input
            className="mr-2 w-4/5 rounded-md"
            required
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="hover:text-blue-500 bg-slate-100 w-2/6"
            onClick={handleUpdatePost}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
