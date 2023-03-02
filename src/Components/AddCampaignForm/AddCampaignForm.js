import { useState, useEffect } from "react";
import {
  LocalizationProvider,
  DatePicker
} from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from "moment";
import CustomButton from "../../Components/CustomButton/CustomButton";
import ConfirmDialog from "./ConfirmDialog";
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

  const [error, setError] = useState({
    title: false,
    roles: false,
    pointsPerDollar: false,
    minSpend: false,
    startDate: false,
    endDate: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // setIsFormValid(Object.values(formData).every(Boolean) && Object.values(error).every(val => !val));
  useEffect(() => {
    setIsFormValid(
      error["title"] === false &&
      error["roles"] === false &&
      error["pointsPerDollar"] === false &&
      error["minSpend"] === false &&
      error["startDate"] === false &&
      error["endDate"] === false &&
      formData["title"] !== "" &&
      formData["cardProgram"] !== "" &&
      formData["pointsPerDollar"] !== "" &&
      formData["minSpend"] !== "" &&
      formData["merchant"] !== "" &&
      formData["startDate"] !== null &&
      formData["endDate"] !== null &&
      formData["message"] !== ""
    );

  }, [error, formData]);

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

    if (name === "startDate") {
      setError((state) => ({
        ...state,
        startDate: value < new Date((new Date()).setHours(0, 0, 0, 0)) ? true : false,
      }));


      if (formData.endDate !== null) {
        setError((state) => ({
          ...state,
          endDate: formData.endDate < value ? true : false,
        }));
      }

      setFormData((state) => ({
        ...state,
        [name]: value
      }));
    }

    if (name === "endDate") {
      setError((state) => ({
        ...state,
        endDate: value < formData.startDate ? true : false,
      }));

      setFormData((state) => ({
        ...state,
        [name]: value
      }));
    }
  }
  // useEffect(() => {
  //   console.log("isformvalid:", isFormValid);
  // }, [isFormValid]);

  const [open, setOpen] = useState(false);

  const handleAddCampaignClick = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    // Handle the confirm action here
    setOpen(false);
  };

  return (
    <div className="outerdiv">
      <Card sx={{ overflowX: "auto", borderRadius: '25px' }}>
        <CardContent sx={{ p: 2, pl: 10 }}>
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
                      <TextField {...params} size="small" sx={{ width: "180px", mr: 1 }}
                        error={error["startDate"]}
                        helperText={error["startDate"] ? "Date cannot be before today" : ""} />
                    )}
                  />
                  <DatePicker
                    name="endDate"
                    label="End Date"
                    value={formData.endDate}
                    inputFormat="DD/MM/YYYY"
                    onChange={(event) => handleOnChangeDate("endDate", event._d)}
                    renderInput={(params) => (
                      <TextField {...params} size="small" sx={{ width: "180px", mr: 1 }}
                        error={error["endDate"]}
                        helperText={error["endDate"] ? "End date must be after start date" : ""} />
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
        {isFormValid ? (
          <CustomButton handleOnClick={handleAddCampaignClick} text="Add campaign" nameOfClass="customButton" />
        ) : (
          <CustomButton text="Add campaign" nameOfClass="customButtonGrey" />
        )}

        <ConfirmDialog
          open={open}
          setOpen={setOpen}
          handleConfirm={handleConfirm}
          id="campaign-123"
          text="Are you sure you want to add campaign?"
          header="Confirm action"
        />
      </div>
    </div>
  )
}

export default AddCampaignForm;



