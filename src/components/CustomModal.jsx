import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function CustomModal({ open, close, component , ...props }) {
  //  console.log('props',component)

  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: props.width || 400,
            bgcolor: props.bg || 'background.paper',
            border: '0px solid #fff',
            boxShadow: 30,
            p: 4,
            borderRadius : props.borderRadius || '12px',
          }}
        >
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          {component}
        </Box>
      </Modal>
    </div>
  );
}
