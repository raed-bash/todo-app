import Card from "src/components/card/card";
import { ColumnLayout } from "src/styled-components";
import TaskIcon from "@mui/icons-material/Task";

function TaskSection() {
  return (
    <ColumnLayout>
      <Card Icon={TaskIcon} value={230} title="All Tasks" pathname="/task" />
      <Card
        Icon={TaskIcon}
        value={230}
        title="All Completed Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="All Uncompleted Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="All Deleted Completed Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="All Deleted Uncompleted Tasks"
        pathname="/task"
      />
      <Card Icon={TaskIcon} value={230} title="My Tasks" pathname="/task" />
      <Card
        Icon={TaskIcon}
        value={230}
        title="My Completed Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="My Uncompleted Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="My Deleted Completed Tasks"
        pathname="/task"
      />
      <Card
        Icon={TaskIcon}
        value={230}
        title="My Deleted Uncompleted Tasks"
        pathname="/task"
      />
    </ColumnLayout>
  );
}
export default TaskSection;
