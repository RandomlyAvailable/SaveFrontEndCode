import MuiCard from "./CardComp";
import "./styles.css";
import { Box, Paper, Stack, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import IPF from "./Inputfield";
import Navbar from "./Navbar";
import RepliedTo from "./ReplyTo";
import * as React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function EachPost() {
  const replyRef = React.useRef();
  const { postId } = useParams();
  const [postcomments, setPostcomments] = React.useState([]);
  const [postusers, setPostusers] = React.useState({});
  const [added, setAdded] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [posts, setPosts] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("http://localhost:3000/users/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data[0].user_id);
          setUserId(res.data[0].user_id);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  React.useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${postId}`)
      .then((res) => {
        setPosts(res.data);
        setPostcomments(res.data.comments);
        setPostusers(res.data.user);
        console.log(postcomments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [added]);

  function handleSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const data = {
        user_id: userId,
        post_id: posts.id,
        content: replyRef.current.value,
      };
      axios
        .post("http://localhost:3000/comments", { comment: data })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      replyRef.current.value = "";
      setAdded((prev) => {
        return prev + 1;
      });
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 750);
    }
  }

  return (
    <>
      <Navbar userId={userId} />
      <Paper
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "10px",
          gap: "10px",
          marginTop: "100px",
        }}
      >
        <Stack
          divider={<Divider orientation="horizontal" flexItem padding={1} />}
          spacing={2}
        >
          <MuiCard
            title={posts.title}
            content={posts.content}
            category={posts.category}
            username={postusers.username}
            created_at={"dd-mm-yyyy"}
            post_id={"1"}
          />

          <h2 style={{ margin: "auto" }}>Comments</h2>
        </Stack>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
            marginRight: "12px",
          }}
          noValidate
          autoComplete="off"
          justifyContent="space-between"
        >
          <TextField
            fullWidth
            label="Comment Here"
            variant="outlined"
            multiline
            inputRef={replyRef}
            onKeyPress={handleSubmission}
          />
          {open && (
            <Alert severity="success">Reply Submitted Succesfully</Alert>
          )}
        </Box>
        {postcomments &&
          postcomments.map((pos, index) => (
            <MuiCard
              title={"hello"}
              content={pos.content}
              category={posts.category}
              username={pos.user.username}
              created_at={pos.created_at}
              post_id={"1"}
            />
          ))}
      </Paper>
    </>
  );
}

export default EachPost;
