import * as React from 'react';
import {useMemo} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListSubheader } from '@mui/material';
import CreateModel from './CreateModel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const BoxSx = { color: 'inherit', width: 1, height: 1/3, mt:3, bgcolor: '#939393', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center'};
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const districts = [
    {'city': {'name':'성남시', 'id':1}, 'dong': [{'name':'gumi', 'id':11}, {'name':'geumgok', 'id':12}]},
    {'city': {'name':'용인시', 'id':2}, 'dong': [{'name':'dongchun', 'id':21}]}
];
const objectList = ['건물', '도로', '강'];


export default function SpaceSelectionCard(props) {

  const [city, setCity] = React.useState('');
  const [object, setObject] = React.useState([]);


  const renderDongSelect = (dist) => {
    const items = dist.dong.map( (d) => (
      <MenuItem key={d.id} value={d.name}>{d.name}</MenuItem>
    ));
    return [<ListSubheader key={dist.city.id} value={dist.city.name}>{dist.city.name}</ListSubheader>, items]
  };


  const cityChange = (event) => {
    setCity(event.target.value);
  }


  const objectChange = (event) => {
    const {
      target: { value },
    } = event;
    setObject(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  const handleSubmit = () => {
    CreateModel(city, object, props.med, props.setMed).then( val => props.setModel( [...props.models, ...val] ) );
    //useMemo( () => props.setModel( props.models.push(CreateModel(city, object, props.med, props.setMed), [city, object])));
  }

  return (
    <Box sx={BoxSx}>
      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel htmlFor="dong-select">District</InputLabel>
        <Select 
          defaultValue="" 
          id="dong-select" 
          label="District"
          value={city}
          onChange={cityChange}
        >
          {districts.map((dist) => (renderDongSelect(dist)))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="object-select">Object</InputLabel>
        <Select
          labelId="object-select"
          id="object-select"
          multiple
          value={object}
          onChange={objectChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {objectList.map((obj) => (
            <MenuItem key={obj} value={obj}>
              <Checkbox checked={object.indexOf(obj) > -1} />
              <ListItemText primary={obj} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} sx={{ mb: 0.5, ml: 7, width: 0.5, color: 'inherit', border: 0.7}} >
        생성
      </Button>
    </Box>
  );
}
