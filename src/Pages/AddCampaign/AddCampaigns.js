import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import AddCampaignForm from '../../Components/AddCampaignForm/AddCampaignForm';
import { addCampaign } from "../../API/api";

const AddCampaign = () => {

  const cardIdDict = {
    "SCIS Freedom Card": 0,
    "SCIS PlatinumMiles": 1,
    "SCIS PremiumMiles Card": 2,
    "SCIS Shopping Card": 3
  }
  const { mutate } = useMutation(addCampaign);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    cardProgram: null,
    pointsPerDollar: "",
    minSpend: "",
    merchant: null,
    startDate: null,
    endDate: null,
    notificationTitle: "",
    notificationMessage: ""
  });

  const handleConfirm = () => {
    const query = {
      "title": formData["title"],
      "startDate": formData["startDate"],
      "endDate": formData["endDate"],
      "mcc": formData["merchant"],
      "minSpend": parseInt(formData["minSpend"], 10),
      "pointsPerDollar": parseInt(formData["pointsPerDollar"], 10),
      "card_program_id": cardIdDict[formData["cardProgram"]],
      "notification_title": formData["notificationTitle"],
      "notification_message": formData["notificationMessage"]
    }
    
    mutate(query, {
      onSuccess: () => { navigate("/campaigns", { state: { addSuccess: true } }) },
      onError: () => { navigate("/campaigns", { state: { addSuccess: false } }) }
    })
  }

  useEffect(() => {

    const formDataValue = Object.values(formData);

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue="";
    } 

    for (let i = 0; i < formDataValue.length ; i++) {
      if (formDataValue[i] !== null && formDataValue[i].length !== 0) {
        window.addEventListener('beforeunload', handleBeforeUnload);
        return() => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
      }
    }

  }, [formData])
    
  return (
    <div>
      <script>{document.title = "Add Campaign"}</script>
      <AddCampaignForm
        formData={formData}
        setFormData={setFormData}
        setOpen={setOpen}
      />
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
        text="Are you sure you want to do this?"
        header="Confirm action"
      />
    </div>

  );
}

export default AddCampaign;