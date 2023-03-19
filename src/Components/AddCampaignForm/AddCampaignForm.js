import { useState, useEffect } from "react";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { BsDash } from "react-icons/bs";
import _ from "lodash";

import CustomButton from "../../Components/CustomButton/CustomButton";
import "./AddCampaignForm.css";

import {
  Autocomplete, 
  Box,
  Card,
  CardContent,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";

const AddCampaignForm = ({ formData, setFormData, setOpen }) => {

  const merchant_list = ["Kaligo", "Grab", "Shell"]
  
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({
    pointsPerDollar: false,
    minSpend: false,
    isToday: false,
    isAfterEndDate: false,
  });

  useEffect(() => {
    setIsFormValid(
      !(Object.values(error).includes(true) 
      || Object.values(formData).includes("") 
      || Object.values(formData).includes(null)
    ));

  }, [error, formData]);

  const handleOnChange = (name, value) => {
    
    if (name === "pointsPerDollar" || name === "minSpend") {
      setError((state) => ({
        ...state,
        [name]: value < 1,
      }));
    } else if (name === "startDate") {
      setError((state) => ({
        ...state,
        isToday: value <= new Date((new Date()).setHours(0, 0, 0, 0)),
        isAfterEndDate: formData["endDate"] !== null && value > formData["endDate"] 
      }));
    } else if (name === "endDate") {
      setError((state) => ({
        ...state,
        isAfterEndDate: value < formData["startDate"] 
      }));
    }

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  }

  return (
    <div>
      <Card sx={{ overflowX: "auto", borderRadius: '25px' }}>
        <CardContent sx={{ py: 5, pl: 10}}>
          <FormControl>
            <Box className="twoColumns">
              <Typography className="variable">Campaign Title</Typography>
              <Box className="secondColumn">
                <TextField
                  value={formData.title}
                  size="small"
                  fullWidth
                  label="Enter title"
                  name="title"
                  onChange={ (event) => handleOnChange("title", event.target.value) }
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Box>
                <Typography className="variable flexColumn">Card Program</Typography>
              </Box>
              <Box className="secondColumn">
                <Autocomplete
                    id="cardProgram"
                    options={["SCIS Freedom Card", "SCIS PlatinumMiles", "SCIS PremiumMiles Card", "SCIS Shopping Card"]}
                    fullWidth
                    value={formData.cardProgram}
                    renderInput={(params) => <TextField {...params} label="Select card program" size="small"  />}
                    onChange={ (event) => handleOnChange("cardProgram", event.target.textContent ) }
                    data-testid="cardProgram"
                  />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Box>
                <Typography className="variable">Number of points per dollar</Typography>
              </Box>
              <Box className="secondColumn">
                <TextField
                  value={formData.pointsPerDollar}
                  size="small"
                  fullWidth
                  name="pointsPerDollar"
                  type="number"
                  label="Enter number of points"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={ (event) => handleOnChange("pointsPerDollar", event.target.value) }
                  error={error["pointsPerDollar"]}
                  helperText={error["pointsPerDollar"] ? "Must be at least 1" : ""}
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Box>
                <Typography className="variable">Minimum Spend (SGD)</Typography>
              </Box>
              <Box className="secondColumn">
                <TextField
                  value={formData.minSpend}
                  size="small"
                  fullWidth
                  name="minSpend"
                  type="number"
                  label="Enter minimum spend"
                  InputProps={{ inputProps: { min: 1 } }}
                  onChange={ (event) => handleOnChange("minSpend", event.target.value) }
                  error={error["minSpend"]}
                  helperText={error["minSpend"] ? "Must be at least 1" : ""}
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Box>
                <Typography className="variable flexColumn">Merchant</Typography>
              </Box>
              <Box className="secondColumn">
                <Autocomplete
                  id="merchant"
                  options={merchant_list}
                  fullWidth
                  value={formData.merchant}
                  renderInput={(params) => <TextField {...params} label="Merchant" size="small"  />}
                  onChange={ (event) => handleOnChange("merchant", event.target.textContent ) }
                  data-testid="merchant"
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Typography className="variable">Start & End Date (DD/MM/YYYY)</Typography>
              <Box className="secondColumn">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    name="startDate"
                    label="Start Date"
                    value={formData.startDate}
                    inputFormat="DD/MM/YYYY"
                    onChange={(event) => handleOnChange("startDate", event._d)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        size="small" 
                        sx={{ width: "200px" }}
                        error={error["isToday"] || error["isAfterEndDate"]}
                        helperText={
                          error["isToday"] ? "Start date must be after today" 
                          : error["isAfterEndDate"] ? "Start date must be before end date"
                          : ""
                        } 
                        FormHelperTextProps={{sx: {ml: 0, fontSize: "10px"}}}
                      />
                    )}
                  />
                  <BsDash 
                    style={{
                      color:"#1B2559", 
                      margin: "0px 8px", 
                      marginBottom: error["isToday"] || error["isAfterEndDate"] ? "16px" : 0 
                    }}
                  />
                  <DatePicker
                    name="endDate"
                    label="End Date"
                    value={formData.endDate}
                    inputFormat="DD/MM/YYYY"
                    onChange={(event) => handleOnChange("endDate", event._d)}
                    renderInput={(params) => (
                      <TextField 
                        {...params} 
                        size="small" 
                        sx={{ width: "200px"}} 
                        helperText={ error["isToday"] || error["isAfterEndDate"] ? " " : ""} 
                        FormHelperTextProps={{sx: {ml: 0, fontSize: "10px"}}}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box className="twoColumns">
              <Typography className="variable">Notification Title</Typography>
              <Box className="secondColumn">
                <TextField
                  value={formData.notificationTitle}
                  size="small"
                  fullWidth
                  label="Enter notification title"
                  name="notificationTitle"
                  onChange={ (event) => handleOnChange("notificationTitle", event.target.value) }
                />
              </Box>
            </Box>
            <Box className="twoColumns">
              <Typography className="variable">Notification message</Typography>
              <Box className="secondColumn">
                <TextField
                  name="notificationMessage"
                  value={formData.notificationMessage}
                  size="small"
                  fullWidth
                  multiline
                  label="Enter message"
                  minRows={3}
                  inputProps={{ maxLength: 200 }}
                  helperText={`${formData["notificationMessage"].length} / 200`}
                  onChange={ (event) => handleOnChange("notificationMessage", event.target.value) }
                />
              </Box>
            </Box>
          </FormControl>
        </CardContent>
      </Card>
      <div className="addCampaignButton">
        <CustomButton 
          handleOnClick={() => setOpen(true)}
          text="Add campaign"
          disabled={!isFormValid}
        />
      </div>
    </div>
  )
}

export default AddCampaignForm;



