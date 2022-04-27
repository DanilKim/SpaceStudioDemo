import Box from '@mui/material/Box';

export default function TabPanel(props) {
    return (
        <div>
            {props.value === props.index && 
            <Box sx={{ p: 0, m: 0, width: props.width }}>
                {props.children}
            </Box>}
        </div> 
    );
}
