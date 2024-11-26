import { useState, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { DropzoneArea } from 'mui-file-dropzone';

import { _posts } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { PostItem } from '../post-item';
import { PostSort } from '../post-sort';
import { PostSearch } from '../post-search';

// ----------------------------------------------------------------------

export function BlogView() {
  const [sortBy, setSortBy] = useState('latest');

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [fileObjects, setFileObjects] = useState<File[]>([]); // Added type <File[]>

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      setCoverPhoto(files[0]);
      setFileObjects(files);
    } else {
      setCoverPhoto(null);
      setFileObjects([]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !text || !coverPhoto) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('coverPhoto', coverPhoto);

    try {
      // Replace '/api/blogs' with your actual API endpoint
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Handle success (e.g., refresh the blog list, show a success message)
        alert('Blog post created successfully!');
        // Reset form and close modal
        handleCloseModal();
        setTitle('');
        setText('');
        setCoverPhoto(null);
        setFileObjects([]); // Reset fileObjects
      } else {
        // Handle server errors
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to create blog post.'}`);
      }
    } catch (error: any) {
      // Handle network errors
      alert(`Error: ${error.message || 'Network error.'}`);
    }
  };

  // Memoize the editor options to prevent re-initialization
  const editorOptions = useMemo(
    () => ({
      placeholder: 'Write your blog content here...',
      spellChecker: false,
    }),
    []
  );

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blog
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleOpenModal}
        >
          New Blog
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <PostSearch posts={_posts} />
        <PostSort
          sortBy={sortBy}
          onSort={handleSort}
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Box>

      <Grid container spacing={3}>
        {_posts.map((post, index) => {
          const latestPostLarge = index === 0;
          const latestPost = index === 1 || index === 2;

          return (
            <Grid key={post.id} xs={12} sm={latestPostLarge ? 12 : 6} md={latestPostLarge ? 6 : 3}>
              <PostItem
                post={post}
                latestPost={latestPost}
                latestPostLarge={latestPostLarge}
              />
            </Grid>
          );
        })}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />

      {/* Modal for New Blog */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="new-blog-modal-title"
        aria-describedby="new-blog-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="new-blog-modal-title" variant="h6" component="h2" gutterBottom>
            New Blog
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Cover Photo
            </Typography>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText="Drag and drop an image here or click"
              onChange={handleFileChange}
              filesLimit={1}
              fileObjects={fileObjects}
               // showPreviewsInDropzone
              showPreviewsInDropzone // Omit the ={true}
             
            />
          </Box>

          <Box mt={2}>
            <SimpleMDE
              value={text}
              onChange={setText}
              options={editorOptions}
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="contained" color="inherit" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardContent>
  );
}

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
