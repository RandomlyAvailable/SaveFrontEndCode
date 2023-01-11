import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Avatar,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import { useState } from "react";

const MuiCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [hit, setHit] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleLike() {
    if (!hit) {
      setLikes((prevLikes) => {
        return prevLikes + 1;
      });
      setHit(true);
    } else {
      setLikes((prevLikes) => {
        return prevLikes - 1;
      });
      setHit(false);
    }
  }

  return (
    <Box
      width="800px"
      margin="auto"
      className="comment-box-main"
      marginTop="20px"
    >
      <Card>
        <CardContent>
          <div className="username-cat">
            <Button>{props.username}</Button>
            <p className="posted-ago">{`created at ${props.created_at}`}</p>
          </div>
          <Stack
            divider={<Divider orientation="horizontal" flexItem padding={1} />}
          >
            <Stack
              direction="row"
              spacing={2}
              padding={0.5}
              alignItems="center"
            >
              <Avatar
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmD58whxL-_MXL295xAuRMUM6ag9DWs6oIxbwGmy9C6w&s"
              />
              <Typography
                gutterBottom
                vartiant="h1"
                component="div"
                className="heading-card"
              >
                <div className="replied-to">
                  {/* here is where the replied to will be */}
                </div>
              </Typography>
            </Stack>
            <Typography variant="body" color="text.Secondary" padding="10px">
              {props.content}
            </Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleLike}
            variant="outlined"
            startIcon={<FavoriteBorderRoundedIcon />}
            sx={{ marginLeft: "16px" }}
          >
            {likes}
          </Button>
          <Button
            variant="outlined"
            startIcon={<ReplyRoundedIcon />}
            sx={{ marginLeft: "16px" }}
            onClick={handleClickOpen}
          >
            Reply
          </Button>
        </CardActions>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ width: "600px" }}>
            {props.post_content}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Comment"
            type="text"
            fullWidth
            variant="standard"
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Reply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MuiCard;
