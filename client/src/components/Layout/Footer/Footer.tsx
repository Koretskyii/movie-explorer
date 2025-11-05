import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        width: '100%',
        py: 2,
      }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around', 
          alignItems: 'center',
          width: '100%',
          padding: 0,
          margin: 0,
          listStyle: 'none',
          color: 'white',
        }}
      >
        <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
          Movie Explorer &#169; 2024. All rights reserved.
        </ListItem>
        <ListItem sx={{ textAlign: 'center', width: 'auto' }}>
          Developed by Yurii Koretskyi
        </ListItem>
      </List>
    </Box>
  );
}