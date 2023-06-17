import { useEffect, useState } from "react";
import { PostForm } from "../components/Form";
import { useNavigate } from "react-router-dom";
import { createPost, getTags } from "../apis/api";

const PostCreatePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const getTagsAPI = async () => {
      const tags = await getTags();
      const tagContents = tags.map((tag) => {
        return tag.content;
      });
      setTags(tagContents);
    };
    getTagsAPI();
  }, []);

	const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    createPost(formData, navigate);
  };

  return (
    <div className="flex flex-col items-center w-3/5">
      <h3 className="font-bold text-4xl">New Post</h3>
      <PostForm
        onSubmit={onSubmit}
        tags={tags}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PostCreatePage;