import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import PostIssueForm from "./PostIssueForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IPostIssueModal {
  showModal: boolean;
  closeModal: () => void;
}

const PostIssueModal = ({ showModal, closeModal }: IPostIssueModal) => {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  if (!showModal) return <></>;
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showModal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <Box sx={style}>
            <PostIssueForm />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PostIssueModal;
