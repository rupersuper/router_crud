import { Link, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  return (
    <div className="w-[500px] mt-16">
      <div className="bg-white shadow-md rounded-lg p-4 mb-4 relative flex flex-col">
        <div className="h-10">
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
        </div>

        <div className="flex justify-between">
          <input
            className="mr-2 w-4/5 rounded-md"
            required
            placeholder="Напишите что-нибудь..."
            type="text"
            // value={newPostContent}
            // onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button
            className="hover:text-blue-500 bg-slate-100 w-2/6"
            // onClick={handleCreatePost}
          >
            Изменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
