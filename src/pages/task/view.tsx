import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch } from "src/app/hooks";
import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";
import InfoSection from "src/components/text-view/info-section";
import NotesIcon from "@mui/icons-material/Notes";
import EventIcon from "@mui/icons-material/Event";
import ScheduleIcon from "@mui/icons-material/Schedule";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { getTaskAsync } from "./reducer/actions";
import { Task } from "./reducer/slice";
import { PriorityChip } from "./components/priority-chip";
import { formatDueDate, isOverdue } from "./task-dates";
import TaskComments from "./components/comments";

const formatDate = (d?: Date | string | null) =>
  d ? new Date(d).toLocaleString() : undefined;

function TaskView() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id, userId: userIdStr } = useParams();
  const userId = userIdStr ? parseInt(userIdStr) : undefined;
  const [task, setTask] = useState<Task | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(getTaskAsync({ id, userId }, setTask, () => setNotFound(true)));
  }, [dispatch, id, userId]);

  if (notFound) return <Typography>Task not found.</Typography>;

  if (!task)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Typography variant="h4" sx={{ flex: 1, wordBreak: "break-word" }}>
          {task.completed ? <del>{task.title}</del> : task.title}
        </Typography>
        <Button onClick={() => navigate(-1)}>Back</Button>
        {!task.removedAt && (
          <Button
            variant="contained"
            onClick={() => navigate(`../edit/${task.id}`, { relative: "path" })}
          >
            Edit
          </Button>
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
        <Chip
          size="small"
          color={task.completed ? "success" : "default"}
          label={task.completed ? "Completed" : "inCompleted"}
        />
        <PriorityChip priority={task.priority} />
        {isOverdue(task) && <Chip size="small" color="error" label="Overdue" />}
        {task.removedAt && <Chip size="small" label="Deleted" />}
      </Box>

      <InfoSection
        title="Details"
        items={[
          {
            label: "Description",
            value: task.description,
            icon: <NotesIcon />,
            full: true,
          },
          {
            label: "Due Date",
            value: formatDueDate(task.dueDate),
            icon: <EventIcon />,
          },
          {
            label: "Created At",
            value: formatDate(task.createdAt),
            icon: <ScheduleIcon />,
          },
          {
            label: "Updated At",
            value: formatDate(task.updatedAt),
            icon: <UpdateIcon />,
          },
          ...(task.removedAt
            ? [
                {
                  label: "Deleted At",
                  value: formatDate(task.removedAt),
                  icon: <DeleteIcon />,
                },
              ]
            : []),
        ]}
      />

      <TaskComments taskId={task.id} />
    </Box>
  );
}

export default withAllowedRoles(TaskView, PagesController.task.roles);
