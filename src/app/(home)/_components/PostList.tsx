import PostsWrapper from "@/components/wrappers/PostsWrapper";
import PostCard from "@/components/cards/post/PostCard";
const postList = new Array(50).fill(0);

const PostList = () => {
  return (
    <PostsWrapper>
      {postList.map((_, index) => (
        <PostCard key={index} />
      ))}
    </PostsWrapper>
  );
};

export default PostList;
