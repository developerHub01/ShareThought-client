import { Box } from "@mui/material";
import PostCard from "../ui/PostCard";

const postList = [
  {
    _id: "66959943a7c5b51b5f0d86fc",
    channelId: {
      _id: "668967d122a8affe05999d3c",
      channelName: "user3-channel2 updated",
      channelAvatar:
        "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080627/shareThought/channel/avatar/wcsto8j1cmruqeoedldc.jpg",
    },
    title: "Test post 4",
    content:
      "This is the content of the post, providing valuable information to the readers.",
    banner:
      "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080155/shareThought/post/post_banner/isbkezrigbf8sqtdqlzr.jpg",
    views: 0,
    isPublished: true,
    createdAt: "2024-07-15T21:48:51.420Z",
    updatedAt: "2024-07-15T21:48:51.420Z",
    publishedAt: "2024-07-15T21:48:51.420Z",
  },
  {
    _id: "66959933a7c5b51b5f0d86f8",
    channelId: {
      _id: "668967d122a8affe05999d3c",
      channelName: "user3-channel2 updated",
      channelAvatar:
        "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080627/shareThought/channel/avatar/wcsto8j1cmruqeoedldc.jpg",
    },
    title: "Test post 2",
    content:
      "This is the content of the post, providing valuable information to the readers.",
    banner:
      "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080139/shareThought/post/post_banner/jmjtvlhnisqw62yhmwqg.jpg",
    views: 0,
    isPublished: true,
    createdAt: "2024-07-15T21:48:35.493Z",
    updatedAt: "2024-07-15T21:48:35.493Z",
    publishedAt: "2024-07-15T21:48:35.493Z",
  },
  {
    _id: "66959924a7c5b51b5f0d86f4",
    channelId: {
      _id: "668967d122a8affe05999d3c",
      channelName: "user3-channel2 updated",
      channelAvatar:
        "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080627/shareThought/channel/avatar/wcsto8j1cmruqeoedldc.jpg",
    },
    title: "Test post 1",
    content:
      "This is the content of the post, providing valuable information to the readers.",
    banner:
      "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080124/shareThought/post/post_banner/jffqqhbqtx1h3exnsr1f.jpg",
    views: 0,
    isPublished: true,
    createdAt: "2024-07-15T21:48:20.380Z",
    updatedAt: "2024-07-15T21:48:20.380Z",
    publishedAt: "2024-07-15T21:48:20.380Z",
  },
  {
    _id: "66959907a7c5b51b5f0d86f0",
    channelId: {
      _id: "668967d122a8affe05999d3c",
      channelName: "user3-channel2 updated",
      channelAvatar:
        "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080627/shareThought/channel/avatar/wcsto8j1cmruqeoedldc.jpg",
    },
    title: "Test post 3",
    content:
      "This is the content of the post, providing valuable information to the readers.",
    banner:
      "https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080094/shareThought/post/post_banner/xlzqyxn0pl4suyyqxwms.png",
    views: 0,
    isPublished: true,
    createdAt: "2024-07-15T21:47:51.324Z",
    updatedAt: "2024-07-15T21:47:51.324Z",
    publishedAt: "2024-07-15T21:47:51.325Z",
  },
];

const PostList = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gap: 2.5,
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      }}
    >
      {postList.map((post) => (
        <PostCard key={post._id} {...post} />
      ))}
    </Box>
  );
};

export default PostList;
