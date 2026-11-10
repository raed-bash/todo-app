import { ReactNode } from "react";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";

export type InfoItem = {
  label: string;
  value?: ReactNode;
  icon?: ReactNode;
  // take the full row (long text)
  full?: boolean;
};

type Props = { title?: string; action?: ReactNode; items: InfoItem[] };

// Titled card of label/value fields used by the view pages.
function InfoSection({ title, action, items }: Props) {
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, my: 2 }}>
      {(title || action) && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 2.5,
              py: 1.5,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} sx={{ flex: 1 }}>
              {title}
            </Typography>
            {action}
          </Box>
          <Divider />
        </>
      )}
      <Grid container spacing={2.5} sx={{ p: 2.5 }}>
        {items.map(({ label, value, icon, full }) => (
          <Grid key={label} item xs={12} sm={full ? 12 : 6} md={full ? 12 : 4}>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              {icon && (
                <Box
                  sx={{
                    display: "flex",
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: "action.hover",
                    color: "primary.main",
                    "& svg": { fontSize: 20 },
                  }}
                >
                  {icon}
                </Box>
              )}
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}
                >
                  {label}
                </Typography>
                <Box
                  sx={{
                    typography: "body1",
                    fontWeight: 500,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {value || value === 0 ? (
                    value
                  ) : (
                    <Typography component="span" color="text.disabled">
                      —
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default InfoSection;
