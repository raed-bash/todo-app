import { Modal, ModalOwnProps, Paper, SxProps, Theme } from "@mui/material";

const style: SxProps<Theme> | undefined = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

function ModalHandler({ children, ...props }: ModalOwnProps) {
  return (
    <Modal {...props}>
      <Paper sx={style}>{children}</Paper>
    </Modal>
  );
}

export default ModalHandler;
