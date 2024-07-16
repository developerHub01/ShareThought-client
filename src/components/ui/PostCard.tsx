import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { formatDistance, subDays } from "date-fns";
import { IPost } from "../../interfaces/interface";
import { Link } from "react-router-dom";

const handleTextTrim = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;

  return text.substring(0, maxLength) + "...";
};

const PostCard = ({
  banner,
  title,
  publishedAt,
  channelId: { _id: channelId, channelName, channelAvatar },
}: IPost) => {
  const timeAgo = formatDistance(
    subDays(new Date(publishedAt), 0),
    new Date(),
    { addSuffix: true }
  );

  return (
    <Card
      sx={{
        cursor: "pointer",
        borderRadius: 2,
      }}
    >
      <Link to="/">
        <CardMedia
          component={"img"}
          image={banner}
          alt={title}
          sx={{
            aspectRatio: 16 / 9,
          }}
        />
      </Link>
      <CardContent>
        <Stack direction={"row"} gap={2}>
          <Link to={`/channel/${channelId}`}>
            <Avatar src={channelAvatar} alt={channelName}>
              {channelName}
            </Avatar>
          </Link>
          <Stack direction={"column"}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h4"
                color="initial"
                sx={{
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {handleTextTrim(title, 40)}
              </Typography>
            </Link>
            <Link
              to={`/channel/${channelId}`}
              style={{
                textDecoration: "none",
              }}
            >
              <Typography variant="subtitle2" color="initial">
                {handleTextTrim(channelName, 32)}
              </Typography>
            </Link>
            <Typography variant="subtitle2" color="initial">
              {timeAgo}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard;
