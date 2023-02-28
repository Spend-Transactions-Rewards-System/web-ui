import { useState } from "react";

import { 
  LocalizationProvider, 
  DatePicker 
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import _ from "lodash";
import "../../Pages/Campaigns/AddCampaign.css";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";


const AddCampaignForm = () => {

  const [formData, setFormData] = useState({
      title: "",
      cardProgram: "",
      pointsPerDollar: "",
      minSpend: "",
      merchant: "",
      startDate: null,
      endDate: null,
      message: ""
  });

  console.log(formData)

  const [error, setError] = useState({
    title: false,
    roles: false,
    pointsPerDollar: false,
    minSpend: false,
    startDate: false,
    endDate: false,
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

      if (name === "pointsPerDollar") {
        setError((state) => ({
          ...state,
          pointsPerDollar: value < 1 ? true : false,
        }));
      }

      if (name === "minSpend") {
        setError((state) => ({
          ...state,
          minSpend: value < 1 ? true : false,
        }));
      }

      setFormData((state) => ({ 
        ...state,
        [name]: value,
      })); 

  }

  const handleOnChangeDate = (name, value) => {
        setFormData((state) => ({
            ...state, 
            [name]: value
        }));
  }

  
  return(
    <div className="outerdiv">
        <Card sx={{overflowX: "auto", borderRadius: '25px'}}>
          <CardContent sx={{p:2, pl: 10}}>
          <FormControl className="form">
              <Box className="twoColumns">
                  <Typography className="variable">Campaign Title</Typography>
                  <Box className="secondColumn">
                      <TextField 
                          value={formData.title ? formData.title : ""}
                          size="small"
                          fullWidth
                          label="Enter title"
                          name="title"
                          onChange={handleOnChange}
                      />
                  </Box>
              </Box>
              <Box className="twoColumns">
                <Box>
                  <Typography className="variable flexColumn">
                      Card Program
                      {/* <Link
                        className="projectLink"
                        to="/projects/samples/themes"
                        target="_blank"
                      >
                        <i>View themes</i>
                      </Link> */}
                  </Typography>
                </Box>
                <Box className="secondColumn">
                  <TextField
                      size="small"
                      fullWidth
                      select
                      name="cardProgram"
                      label="Select card program"
                      value={formData.cardProgram}
                      onChange={handleOnChange}
                    >
                      {_.map(["SCIS Freedom Card", "SCIS PlatinumMiles", "SCIS PremiumMiles Card", "SCIS Shopping Card"], (value) => {
                        return (
                          <MenuItem 
                            key={value} 
                            id={value.toLowerCase()} 
                            value={value.toLowerCase()}
                          >
                            {value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                </Box>
            </Box>
            <Box className="twoColumns">
                  <Box>
                    <Typography className="variable">Number of points per dollar</Typography>
                  </Box>
                  <Box className="secondColumn">
                      <TextField 
                          value={formData.pointsPerDollar ? formData.pointsPerDollar : ""}
                          size="small"
                          fullWidth
                          name="pointsPerDollar"
                          type="number"
                          label="Enter number of points"
                          InputProps={{ inputProps: { min: 1 } }}
                          onChange={handleOnChange}
                          error={error["pointsPerDollar"]}
                          helperText={error["pointsPerDollar"] ? "Must be at least 1" : ""}
                      />
                  </Box>
              </Box>

              <Box className="twoColumns">
                  <Box>
                    <Typography className="variable">Minimum Spend</Typography>
                    <Typography className="variable-subtitle">(SGD)</Typography>
                  </Box>
                  <Box className="secondColumn">
                      <TextField 
                          value={formData.minSpend ? formData.minSpend : ""}
                          size="small"
                          fullWidth
                          name="minSpend"
                          type="number"
                          label="Enter minimum spend"
                          InputProps={{ inputProps: { min: 1 } }}
                          onChange={handleOnChange}
                          error={error["minSpend"]}
                          helperText={error["minSpend"] ? "Must be at least 1" : ""}
                      />
                  </Box>
              </Box>

              <Box className="twoColumns">
                <Box>
                  <Typography className="variable flexColumn">
                      Merchant
                  </Typography>
                </Box>
                <Box className="secondColumn">
                  <TextField
                      size="small"
                      fullWidth
                      select
                      name="merchant"
                      label="Select merchant"
                      value={formData.merchant}
                      onChange={handleOnChange}
                    >
                      {_.map(["MCC 1", "MCC 2", "MCC 3", "MCC 4"], (value) => {
                        return (
                          <MenuItem 
                            key={value} 
                            id={value.toLowerCase()} 
                            value={value.toLowerCase()}
                          >
                            {value}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                </Box>
            </Box>
                    

                  {/* date stuff below */}
                  <Box className="twoColumns">
                    <Typography className="variable">Start & End Date (DD/MM/YYYY)</Typography>
                    <Box className="secondColumn">
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          name="startDate"
                          label="Start Date"
                          value={formData.startDate}
                          inputFormat="DD/MM/YYYY"
                          onChange={(event) => handleOnChangeDate("startDate", event._d)}
                          renderInput={(params) => (    
                            <TextField {...params} size="small" sx={{ width: "180px", mr: 1 }} />
                          )}
                        />
                        <DatePicker
                          name="endDate"
                          label="End Date"
                          value={formData.endDate}
                          inputFormat="DD/MM/YYYY"
                          onChange={(event) => handleOnChangeDate("endDate", event._d)}
                          renderInput={(params) => (
                            <TextField {...params} size="small" sx={{ width: "180px", mr: 1 }} />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                         
              <Box className="twoColumns">
                  <Typography className="variable">Notification message</Typography>
                  <Box className="secondColumn">
                    <TextField
                        name="message"
                        value={formData?.message}
                        size="small"
                        fullWidth
                        multiline
                        label="Enter message"
                        minRows={3}
                        inputProps={{ maxLength: 200 }}
                        helperText={`${formData["message"] ? formData["message"].length : 0} / 200`}
                        onChange={handleOnChange}
                    />
                  </Box>
              </Box>

              
                    
          </FormControl>
          
          </CardContent>
          
      </Card>
      <div className="addCampaignButton">
      <CustomButton text="Add campaign"/>
      </div>
      
    </div>
  )
}

export default AddCampaignForm;



