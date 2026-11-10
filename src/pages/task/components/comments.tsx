import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { axiosInstance } from "src/app/axios";
import { endPoint } from "src/utils/endpoint";

type Comment = {
  id: number;
  body: string;
  createdAt: string;
  user: { id: number; username: string };
};

const MAX_LENGTH = 2000;

function TaskComments({ taskId }: { taskId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const url = endPoint("task", taskId, "comments");

  useEffect(() => {
    axiosInstance
      .get<Comment[]>(url)
      .then(({ data }) => setComments(data))
      .catch(() => {});
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    setSending(true);
    axiosInstance
      .post<Comment>(url, { body: text })
      .then(({ data }) => {
        setComments((prev) => [...prev, data]);
        setBody("");
      })
      .catch(() => {})
      .finally(() => setSending(false));
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Comments ({comments.length})
      </Typography>
      {comments.map((comment, i) => (
        <Box key={comment.id}>
          {i > 0 && <Divider sx={{ my: 1 }} />}
          <Typography variant="body2">
            <b>{comment.user.username}</b>{" "}
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
            >
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </Typography>
          <Typography sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {comment.body}
          </Typography>
        </Box>
      ))}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", gap: 1, mt: 2, alignItems: "flex-start" }}
      >
        <TextField
          label="Add a comment"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          inputProps={{ maxLength: MAX_LENGTH }}
          size="small"
          multiline
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={sending || !body.trim()}
        >
          Send
        </Button>
      </Box>
    </Paper>
  );
}

export default TaskComments;
