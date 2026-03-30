import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Film, Heart } from 'lucide-react';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(20, 20, 20, 0.98)',
        borderTop: '1px solid rgba(229, 9, 20, 0.2)',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Film size={20} color="#e50914" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Movie Explorer © 2024
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Developed with
            </Typography>
            <Heart size={16} color="#e50914" fill="#e50914" />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              by Yurii Koretskyi
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}