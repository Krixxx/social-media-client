import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

//MUI
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';

import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatIcon from '@mui/icons-material/Chat';

import { useUserContext } from '../context/userContext';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications, markNotificationsRead } = useUserContext();

  dayjs.extend(relativeTime);

  const handleOpen = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
    onMenuOpened();
  };

  const onMenuOpened = () => {
    let unReadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification._id);

    if (unReadNotificationsIds.length > 0) {
      markNotificationsRead(unReadNotificationsIds);
    }
  };

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter((notification) => notification.read === false).length >
    0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(
                (notification) => notification.read === false
              ).length
            }
            color='secondary'
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? 'primary' : 'secondary';
        const icon =
          notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color='default'
              variant='body1'
              to={`/users/${notification.recipient}/post/${notification.postId}`}
            >
              {notification.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
    );

  return (
    <>
      <Tooltip placement='top' title='Nofications'>
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {notificationsMarkup}
      </Menu>
    </>
  );
};

export default Notifications;
