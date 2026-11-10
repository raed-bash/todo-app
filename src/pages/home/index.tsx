import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-controller";
import {
  StatsResponse,
  TaskStats,
  getTaskStats,
} from "../task/reducer/actions";
import { PRIORITIES, Task } from "../task/reducer/slice";
import { axiosInstance } from "../../app/axios";
import { endPoint } from "../../utils/endpoint";
import { formatDueDate, isOverdue } from "../task/task-dates";
import { PriorityChip } from "../task/components/priority-chip";

const percent = (part: number, total: number) =>
  total ? Math.round((part / total) * 100) : 0;

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <Paper sx={{ p: 2, height: "100%" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" color={color}>
        {value}
      </Typography>
    </Paper>
  );
}

function StatsSection({ title, stats }: { title: string; stats: TaskStats }) {
  const done = percent(stats.completed, stats.total);
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <StatCard label="Total tasks" value={stats.total} />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard label="Open" value={stats.open} color="primary.main" />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard
            label="Completed"
            value={stats.completed}
            color="success.main"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard label="Overdue" value={stats.overdue} color="error.main" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="body2" color="text.secondary">
              Completion: {done}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={done}
              color="success"
              sx={{ height: 10, borderRadius: 5, mt: 1.5 }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Open tasks by priority
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              {[...PRIORITIES].reverse().map((p) => (
                <Box
                  key={p}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <PriorityChip priority={p} />
                  <Typography>{stats.openByPriority[p]}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// My open tasks with the nearest due dates (overdue ones come first).
function DueSoon() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axiosInstance
      .get<{ data: Task[] }>(endPoint("task"), {
        params: {
          completed: false,
          orderBy: "dueDate",
          orderDir: "asc",
          perPage: 5,
        },
      })
      .then(({ data }) => setTasks(data.data.filter((task) => task.dueDate)))
      .catch(() => {});
  }, []);

  if (tasks.length === 0) return null;

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        My next due tasks
      </Typography>
      <Paper sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <PriorityChip priority={task.priority} />
                </TableCell>
                <TableCell align="right">
                  {isOverdue(task) ? (
                    <Chip
                      size="small"
                      color="error"
                      label={`Overdue · ${formatDueDate(task.dueDate)}`}
                    />
                  ) : (
                    formatDueDate(task.dueDate)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    getTaskStats()
      .then(setStats)
      .catch(() => setFailed(true));
  }, []);

  if (failed) return <Typography>Could not load the dashboard.</Typography>;

  if (!stats)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {stats.team && (
        <StatsSection title="Employees' tasks" stats={stats.team} />
      )}
      <StatsSection title="My tasks" stats={stats.mine} />
      <DueSoon />

      {stats.perUser && (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Tasks per employee
          </Typography>
          <Paper sx={{ overflowX: "auto" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Open</TableCell>
                  <TableCell align="right">Completed</TableCell>
                  <TableCell sx={{ width: "30%" }}>Progress</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.perUser.map((u) => (
                  <TableRow
                    key={u.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/user/${u.id}`)}
                  >
                    <TableCell>{u.username}</TableCell>
                    <TableCell align="right">{u.total}</TableCell>
                    <TableCell align="right">{u.open}</TableCell>
                    <TableCell align="right">{u.completed}</TableCell>
                    <TableCell>
                      <LinearProgress
                        variant="determinate"
                        value={percent(u.completed, u.total)}
                        color="success"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {stats.perUser.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5}>No employees yet.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      )}
    </div>
  );
}

export default withAllowedRoles(Home, PagesController.home.roles);
