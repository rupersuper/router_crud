import { Link } from "react-router-dom";

const CreatePostButton = () => {
  return (
    <Link
      to="/posts/new"
      className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-end"
    >
      <button className="hover:text-blue-500 bg-slate-100 w-2/6">
        Создать пост
      </button>
    </Link>
  );
};

export default CreatePostButton;
