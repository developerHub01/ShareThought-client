import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { theme } from "../../Theme/Theme";
import { useEffect, useState } from "react";

interface IResponsiveSizes {
  channelImageSize: string;
  channelNameFontSize: string;
}

const mobileSizes = {
  channelImageSize: "100px",
  channelNameFontSize: "25px",
};
const extraSmallDeviceSizes = {
  ...mobileSizes,
  channelNameFontSize: "20px",
};
const tabSizes = {
  channelImageSize: "150px",
  channelNameFontSize: "30px",
};
const desktopSizes = {
  channelImageSize: "200px",
  channelNameFontSize: "40px",
};

const tabList = [
  {
    id: "home",
    text: "home",
    link: "",
  },
  {
    id: "category",
    text: "category",
    link: "category",
  },
  {
    id: "about",
    text: "about",
    link: "about",
  },
  {
    id: "search",
    text: "search",
    link: "search",
  },
];

const ChannelLayout = () => {
  const isTabDevice = useMediaQuery("(max-width:991px)");
  const isMobileDevice = useMediaQuery("(max-width:768px)");
  const isExtraSmallDevice = useMediaQuery("(max-width:550px)");
  const [activeTab, setActiveTab] = useState("");
  const { id: channelId } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!channelId) return;
    const activePath = pathname?.split(channelId)?.pop();

    if (!activePath) return setActiveTab((_prev) => "");

    switch (activePath.split("/").pop()) {
      case "category":
        return setActiveTab((_prev) => "category");
      case "about":
        return setActiveTab((_prev) => "about");
      case "search":
        return setActiveTab((_prev) => "search");
      default:
        return setActiveTab((_prev) => "");
    }
  }, [pathname]);

  // const [isMobileDevice, set]
  const [responsiveSizes, setResponsiveSizes] = useState<IResponsiveSizes>({
    ...desktopSizes,
  });

  useEffect(() => {
    if (isExtraSmallDevice)
      return setResponsiveSizes((prev) => ({
        ...prev,
        ...extraSmallDeviceSizes,
      }));
    if (isMobileDevice)
      return setResponsiveSizes((prev) => ({
        ...prev,
        ...mobileSizes,
      }));
    else if (isTabDevice)
      return setResponsiveSizes((prev) => ({
        ...prev,
        ...tabSizes,
      }));
    else
      return setResponsiveSizes((prev) => ({
        ...prev,
        ...desktopSizes,
      }));
  }, [isMobileDevice, isTabDevice]);

  return (
    <Stack direction={"column"} gap={2} position={"relative"}>
      <Box
        sx={{
          width: "100%",
          height: 200,
          overflow: "hidden",
          borderRadius: 3,
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="https://yt3.googleusercontent.com/VncMzajztbvYHjehd9xPHGeOq5h8_02I8n13K2V38VLWxrloBkrAS04XLE22PrER3AjpbNUeYw=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
          alt=""
        />
      </Box>
      <Stack
        direction={isExtraSmallDevice ? "column" : "row"}
        sx={{
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            maxWidth: responsiveSizes.channelImageSize,
            maxHeight: responsiveSizes.channelImageSize,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            flexShrink: 0,
            overflow: "hidden",
            border: `3px solid ${theme.palette.primary.main}`,
          }}
        >
          <img
            src="https://res.cloudinary.com/ddof4ku9y/image/upload/v1721080627/shareThought/channel/avatar/wcsto8j1cmruqeoedldc.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Stack
          direction={"column"}
          gap={1}
          sx={{
            justifyContent: "center",
            alignItems: isExtraSmallDevice ? "center" : "flex-start",
            textAlign: isExtraSmallDevice ? "center" : "left",
            gap: 1.5,
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h1"
            color="primary"
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            sx={{
              textTransform: "capitalize",
              fontSize: responsiveSizes.channelNameFontSize,
            }}
          >
            Channel Name
          </Typography>
          <Stack
            direction={"row"}
            sx={{
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" color="initial">
              10 followers
            </Typography>
            |
            <Typography variant="body2" color="initial">
              10 posts
            </Typography>
          </Stack>
          {isMobileDevice || (
            <Button
              variant="contained"
              sx={{
                borderRadius: 50,
                px: 4,
                textTransform: "capitalize",
                fontSize: 16,
              }}
            >
              Follow
            </Button>
          )}
        </Stack>
      </Stack>
      {isMobileDevice && (
        <Button
          variant="contained"
          sx={{
            borderRadius: 50,
            px: 4,
            textTransform: "capitalize",
            fontSize: 16,
          }}
        >
          Follow
        </Button>
      )}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      >
        {tabList.map(({ id, text, link }) => (
          <Link
            key={id}
            to={link}
            style={{
              fontSize: extraSmallDeviceSizes ? "12px" : "16px",
              flexGrow: 1,
              textAlign: "center",
              textTransform: "capitalize",
              textDecoration: "none",
              color: theme.palette.primary.main,
              padding: "5px",
              borderBottom:
                activeTab === link
                  ? `4px solid ${theme.palette.primary.main}`
                  : "",
            }}
          >
            {text}
          </Link>
        ))}
      </Stack>
      <Outlet />
    </Stack>
  );
};

export default ChannelLayout;
