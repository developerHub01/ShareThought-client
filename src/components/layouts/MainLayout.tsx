import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../ui/SearchBar";
import {
  Avatar,
  Container,
  Fade,
  Menu,
  MenuItem,
  MenuProps,
  Tooltip,
} from "@mui/material";
import { Stack } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeColors } from "../../constants/ThemeColors";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import HomeIcon from "@mui/icons-material/Home";
import { Utils } from "../../utils/utils";
import ChannelList from "@mui/icons-material/ViewCarousel";
import HistoryIcon from "@mui/icons-material/History";
import ReadLaterIcon from "@mui/icons-material/Bookmark";
import PlaylistIcon from "@mui/icons-material/ViewList";
import RightArrowIcon from "@mui/icons-material/ArrowForwardIos";
import AvatarIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  "& > .MuiPaper-root": {
    background: theme.palette.primary.main,
    color: ThemeColors.BACKGROUND,
    "& svg": {
      color: ThemeColors.BACKGROUND,
    },
    "& .MuiDivider-root": {
      background: theme.palette.primary["light"],
    },
  },
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const topMenuItems = [
  {
    id: "home",
    text: "home",
    link: "/",
    Icon: HomeIcon,
  },
  {
    id: "subscriptions",
    text: "subscriptions",
    link: "/",
    Icon: SubscriptionsIcon,
  },
];

const yourMenuItems = [
  {
    id: "myChannels",
    text: "my channels",
    link: "/",
    Icon: ChannelList,
  },
  {
    id: "history",
    text: "history",
    link: "/",
    Icon: HistoryIcon,
  },
  {
    id: "savedCategoy",
    text: "Saved Categories",
    link: "/",
    Icon: PlaylistIcon,
  },
  {
    id: "readLater",
    text: "read later",
    link: "/",
    Icon: ReadLaterIcon,
  },
  {
    id: "subscribedChannel",
    text: "Subscribed channel",
    link: "/",
    Icon: ChannelList,
  },
];

const avatarMenuList = [
  {
    id: "profile",
    text: "My Profile",
    link: "/profile",
    Icon: AvatarIcon,
  },
  {
    id: "myChannelList",
    text: "My Channels",
    link: "/my-channels",
    Icon: ChannelList,
  },
];

const AvatarMenu = styled((props: MenuProps) => (
  <Menu
    MenuListProps={{
      "aria-labelledby": "profile_avatar",
    }}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    TransitionComponent={Fade}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    marginTop: 15,
    background: theme.palette.primary.main,
    boxShadow: theme.shadows["24"],
    "& .MuiButtonBase-root": {
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      a: {
        color: ThemeColors.BACKGROUND,
        "& .MuiSvgIcon-root": {
          color: ThemeColors.BACKGROUND,
        },
      },
    },
  },
}));

const MainLayout = () => {
  const isMobileDevice = useMediaQuery("(max-width:991px)");
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorAvatar, setAnchorAvatar] = useState<null | HTMLElement>(null);
  const avatarOpenMode = Boolean(anchorAvatar);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setOpen((_prev) => !isMobileDevice);
  }, [isMobileDevice]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAvatarButtonOpen = (event: React.MouseEvent<HTMLElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAnchorAvatar((_prev) => event.currentTarget);
  };
  const handleAvatarButtonClose = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setAnchorAvatar((_prev) => null);
  };

  const hideNavItems = isMobileDevice && open;

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          "& ..css-6hp17o-MuiList-root-MuiMenu-list": {
            background: "red",
          },
        }}
      >
        <Toolbar
          sx={{
            gap: 2,
            py: 1,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {hideNavItems ? (
            <Box flexGrow={1} />
          ) : (
            <>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: ThemeColors.BACKGROUND,
                }}
              >
                <Typography variant="h6" noWrap component="div">
                  {isMobileDevice ? "SH" : "Share Thought"}
                </Typography>
              </Link>

              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                flexGrow={1}
              >
                <SearchBar />
              </Stack>
            </>
          )}
          <Avatar
            src="https://yt3.ggpht.com/yti/ANjgQV94LTz3AkjAWSYx90bu-iF18H41UT_5YyeqdGaUyfQ5bA=s88-c-k-c0x00ffffff-no-rj"
            id="profile_avatar"
            aria-controls={avatarOpenMode ? "profile_avatar_menu" : undefined}
            aria-haspopup="true"
            aria-expanded={avatarOpenMode ? "true" : undefined}
            onClick={handleAvatarButtonOpen}
            sx={{
              cursor: "pointer",
            }}
          >
            User
          </Avatar>
          <AvatarMenu
            MenuListProps={{
              "aria-labelledby": "profile_avatar",
            }}
            anchorEl={anchorAvatar}
            open={avatarOpenMode}
            onClose={handleAvatarButtonClose}
          >
            {avatarMenuList.map(({ id, text, link, Icon }) => (
              <MenuItem key={id} onClick={handleAvatarButtonClose}>
                <Link
                  to={link}
                  style={{
                    display: "flex",
                    textDecoration: "none",
                  }}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText>{text}</ListItemText>
                </Link>
              </MenuItem>
            ))}
          </AvatarMenu>
        </Toolbar>
      </AppBar>
      <Drawer variant={"permanent"} open={open}>
        <DrawerHeader
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: ThemeColors.BACKGROUND,
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="h1"
              pl={1.5}
              sx={{
                userSelect: "none",
              }}
            >
              Share Thought
            </Typography>
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {topMenuItems.map(({ id, text, link, Icon }) => (
            <ListItem key={id} disablePadding sx={{ display: "block" }}>
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                  color: ThemeColors.BACKGROUND,
                }}
              >
                <Tooltip
                  title={Utils.toCapitalize(text)}
                  arrow
                  placement="right"
                >
                  <ListItemButton
                    color="primary"
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={Utils.toCapitalize(text)}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {open && (
            <ListItem disablePadding sx={{ display: "block" }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: ThemeColors.BACKGROUND,
                }}
              >
                <Tooltip title="You" arrow placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: "flex-start",
                    }}
                  >
                    <ListItemText
                      primary="You"
                      sx={{
                        opacity: open ? 1 : 0,
                        flexGrow: 0,
                      }}
                    />
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        ml: 2,
                      }}
                    >
                      <RightArrowIcon
                        fontSize="small"
                        sx={{
                          fontSize: 18,
                        }}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          )}
          {yourMenuItems.map(({ id, text, link, Icon }) => (
            <ListItem key={id} disablePadding sx={{ display: "block" }}>
              <Link
                to={link}
                style={{
                  textDecoration: "none",
                  color: ThemeColors.BACKGROUND,
                }}
              >
                <Tooltip
                  title={Utils.toCapitalize(text)}
                  arrow
                  placement="right"
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={Utils.toCapitalize(text)}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
          px: 1,
        }}
      >
        <DrawerHeader />

        <Container
          sx={{
            px: 0,
            pt: 2,
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
