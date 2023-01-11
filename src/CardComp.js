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
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MuiCard = (props) => {
  const [likes, setLikes] = useState(0);
  const [hit, setHit] = useState(false);
  const [category, setCategory] = useState("");

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

  const navigate = useNavigate();

  function goToCat(e) {
    setCategory(e.currentTarget.textContent);
  }

  React.useEffect(() => {
    if (category !== "") {
      navigate(`/posts/category/${category}`);
    }
  }, [category]);

  const dandt = props.created_at.substring(0, 10);

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
            <Button className="to-bold" onClick={goToCat} variant="outlined">
              {props.category}
            </Button>
            <Button>{props.username}</Button>
            <p className="posted-ago">{`posted at ${dandt}`}</p>
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
                <h5>{props.title}</h5>
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
          >
            Reply
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default MuiCard;
