import { Box, Tab, Tabs } from "@mui/material";
import { memo, useState } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Props = {
  onChange: (currentTap: number) => void;
};
function TabsHandler({ onChange }: Props) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Exist" {...a11yProps(0)} />
          <Tab label="Deleted" {...a11yProps(1)} />
        </Tabs>
      </Box>
    </Box>
  );
}

export default memo(TabsHandler);
