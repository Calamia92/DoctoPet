import React, { useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { styled } from '@mui/system';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

const FileInput = styled('input')({
  display: 'none',
});

interface File {
  name: string;
  content: string;
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  const [viewingFile, setViewingFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const fileList = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        content: URL.createObjectURL(file)
      }));
      setFiles(prevFiles => [...prevFiles, ...fileList]);
    }
  };

  const handleFileDelete = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  const handleFileView = (file: File) => {
    setViewingFile(file);
    setOpen(true);
  };

  const handleFileDownload = (file: File) => {
    const link = document.createElement('a');
    link.href = file.content;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClose = () => {
    setOpen(false);
    setViewingFile(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        File Management
      </Typography>
      <label htmlFor="file-upload">
        <FileInput
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileUpload}
        />
        <Button variant="contained" color="primary" component="span" startIcon={<UploadIcon />}>
          Upload Files
        </Button>
      </label>
      <List>
        {files.map(file => (
          <ListItem key={file.name}>
            <ListItemText primary={file.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="view" onClick={() => handleFileView(file)}>
                <VisibilityIcon />
              </IconButton>
              <IconButton edge="end" aria-label="download" onClick={() => handleFileDownload(file)}>
                <DownloadIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleFileDelete(file.name)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>View File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {viewingFile ? viewingFile.name : ''}
          </DialogContentText>
          {viewingFile && viewingFile.content && (
            <img src={viewingFile.content} alt={viewingFile.name} style={{ maxWidth: '100%' }} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FileManager;
