import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Lab } from './types';

interface LabItemProps {
  lab: Lab;
}

export function LabItem({ lab }: LabItemProps) {
  return (
    <Box p={2} border={1} borderColor="grey.300" borderRadius={2} boxShadow={1}>
      <Typography variant="h6">{lab.name}</Typography>
      <Typography variant="body2" color="textSecondary">
        Location: {lab.location}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Contact: {lab.contactNumber}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Email: {lab.email}
      </Typography>
      {lab.googleMapsLink && (
        <Button
          href={lab.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
        >
          View on Google Maps
        </Button>
      )}
      {lab.isOpen24Hours && (
        <Typography variant="body2" color="textPrimary" sx={{ mt: 1 }}>
          Open 24 Hours
        </Typography>
      )}
    </Box>
  );
}
