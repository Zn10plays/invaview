import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import UploadIcon from '@mui/icons-material/Upload';
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';

interface SmallNavProps {

}

export default function SmallNav(props: SmallNavProps) {
  return <Paper variant={'outlined'} sx={{m: 1, p: '2px 4px', display: 'flex'}}>
    <IconButton><FilterListIcon/></IconButton>
    <span style={{flex: '1 1'}}></span>
    <Paper sx={{display: 'flex', alignItems: 'center'}}>
      <TextField
        size={'small'}
        placeholder='search your photos'
        margin='none'
        InputProps={{
          endAdornment: <InputAdornment position="end">
            <IconButton>
              <SearchIcon/>
            </IconButton>
          </InputAdornment>,
        }}/>
    </Paper>
    <Button component="label" endIcon={<UploadIcon/>} sx={{mx: 1}}  color={'inherit'}>
      Upload
      <input hidden accept="image/*" multiple type="file" />
    </Button>
  </Paper>
}