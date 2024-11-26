import { useState, useCallback, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { DashboardContent } from 'src/layouts/dashboard';
import { LabItem } from './LabItem';
import { LabSearch } from './LabSearch';
import { LabSort } from './LabSort';
 

// Interface for Lab data
interface Lab {
    _id: string;
    name: string;
    location: string;
    contactNumber: string;
    email: string;
    isOpen24Hours: boolean;
    googleMapsLink?: string;
    latitude?: number | null;
    longitude?: number | null;
  }
  

// Interface for Sort Options
interface SortOption {
  value: string;
  label: string;
}

// ----------------------------------------------------------------------

export function PinkConnectView() {
  const [labs, setLabs] = useState<Lab[]>([]);
  const [sortBy, setSortBy] = useState<string>('latest');
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Fetch labs data
  useEffect(() => {
    async function fetchLabs() {
      const response = await fetch('/api/labs'); // Replace with actual API endpoint
      const data: Lab[] = await response.json();
      setLabs(data);
    }
    fetchLabs();
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [contactNumber, setContactNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isOpen24Hours, setIsOpen24Hours] = useState<boolean>(false);
  const [googleMapsLink, setGoogleMapsLink] = useState<string>('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSubmit = async () => {
    if (!name || !location || !contactNumber || !email || !googleMapsLink) {
      alert('Please fill in all required fields.');
      return;
    }

    const newLab: Lab = { 
      _id: '', // _id will be provided by the backend upon creation
      name, 
      location, 
      contactNumber, 
      email, 
      isOpen24Hours, 
      googleMapsLink, 
      latitude, 
      longitude 
    };

    try {
      const response = await fetch('/api/labs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLab),
      });

      if (response.ok) {
        alert('Lab created successfully!');
        handleCloseModal();
        setLabs([...labs, newLab]); // Update local labs list
        setName('');
        setLocation('');
        setContactNumber('');
        setEmail('');
        setIsOpen24Hours(false);
        setGoogleMapsLink('');
        setLatitude(null);
        setLongitude(null);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to create lab.'}`);
      }
    } catch (error: any) {
      alert(`Error: ${error.message || 'Network error.'}`);
    }
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Labs
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleOpenModal}
        >
          New Lab
        </Button>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        <LabSearch labs={labs} onSearchResults={(filteredLabs) => setLabs(filteredLabs)} />
        <LabSort
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
        {labs.map((lab) => (
          <Grid key={lab._id} xs={12} sm={6} md={4}>
            <LabItem lab={lab} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />

      {/* Modal for New Lab */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="new-lab-modal-title"
      >
       <Box sx={modalStyle}>
          <Typography id="new-lab-modal-title" variant="h6" component="h2" gutterBottom>
            New Lab
          </Typography>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Google Maps Link" value={googleMapsLink} onChange={(e) => setGoogleMapsLink(e.target.value)} fullWidth margin="normal" required />
          <TextField label="Latitude" type="number" value={latitude ?? ''} onChange={(e) => setLatitude(parseFloat(e.target.value))} fullWidth margin="normal" />
          <TextField label="Longitude" type="number" value={longitude ?? ''} onChange={(e) => setLongitude(parseFloat(e.target.value))} fullWidth margin="normal" />
          
          {/* Right-aligned Submit button */}
          <Box display="flex" justifyContent="flex-end" mt={2}>
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
