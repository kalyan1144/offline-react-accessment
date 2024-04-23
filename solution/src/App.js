import { useState, useEffect } from 'react'
import './App.css';
import { Button, TextField, MenuItem, Grid } from '@mui/material';
import { isNameValid, getLocations } from './mock-api/apis'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function App() {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [location, setLocation] = useState('')
  const [locationOpt, setLocationOpt] = useState([])
  const [data, setData] = useState([])
  useEffect(() => {
    getLocationsOptions()
  }, [])
  const getLocationsOptions = () => {
    getLocations().then(res => setLocationOpt(res))
  }
  const handleInput = (name) => {
    isNameValid(name).then(res => {
      setNameError(!res)
    })
    setName(name)
  }
  const handleClear = () => {
    setName('')
    setLocation('')
    setNameError(false)
  }
  const handleAdd = () => {
    if (!nameError && name.length && location.length) {
      setData([...data, { name, location }])
    }
  }
  return (
    <div className="App" style={{margin:"3rem 25rem",border:"solid",padding:"25px"}}>

      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
        <div>
          <Grid container>
            <Grid item xs={5} lg={5} sx={{display:"flex",alignItems:'center',justifyContent:"right",marginRight:"20px"}}>
              <label>Name </label>
            </Grid>
            <Grid item xs={5} lg={5} >
              <TextField
                name='name'
                value={name}
                sx={{ width: "200px" }}
                onChange={(e) => handleInput(e.target.value)}
                size='small'
              />
              <label style={{color:"red"}}>{nameError?"This name has already been taken":""}</label>
            </Grid>
          </Grid>
          <br/>
          <Grid container>
            <Grid item xs={5} lg={5} sx={{display:"flex",alignItems:'center',justifyContent:"right",marginRight:"20px"}}>
              <label>Location </label>
            </Grid>
            <Grid item xs={5} lg={5}>
              <TextField
                select
                name='location'
                sx={{ width: "200px" }}
                value={location}
                onChange={(e) => setLocation(e.target.value)} size='small'>
                {
                  locationOpt && locationOpt?.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))
                }

              </TextField>
            </Grid>


          </Grid>
        </div>
      </div>

      <br /><br />
      <div style={{display:"flex",justifyContent:'right'}}>
        <Button variant="contained" style={{marginRight:"20px"}} onClick={handleClear}>Clear</Button>
      <Button variant="contained" disabled={nameError || !name.length || !location.length} onClick={handleAdd}>Add</Button>
      
      </div>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Location</StyledTableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.location}
              </StyledTableCell>
             </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>


    </div>
  );
}

export default App;
