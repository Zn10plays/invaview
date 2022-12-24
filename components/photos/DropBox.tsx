import Box from "@mui/material/Box";
import {DragEvent, useState} from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface DropBoxProps {
  children: JSX.Element[] | JSX.Element;
  onUpload(file: File | FileList): Promise<void>
}

export default function DropBox(props: DropBoxProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleModalClose = () => {
    setIsDragging(false);
  }

  const handeDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isDragging || event.dataTransfer.files.length === 0) return;
    setIsDragging(true);
  };
  const handeDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };
  return <Box sx={{flex: '1 1'}} onDragOver={handeDrag} onDrop={handeDrop}>
    <Modal
      open={isDragging}
      onClose={handleModalClose}
    >
      <Paper sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        opacity: '.50'
      }}>
        <Typography variant="h6" component="h2">
          You can drop your photos here
        </Typography>
      </Paper>
    </Modal>
    {props.children}
  </Box>
}