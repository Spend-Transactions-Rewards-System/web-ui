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
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addCampaign);
  const navigate = useNavigate();
  const [isFormEdited, setIsFormEdited] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    cardProgram: null,
    pointsPerDollar: "",
    minSpend: "",
    merchant: null,
    category: [],
    startDate: null,
    endDate: null,
    notificationTitle: "",
    notificationMessage: ""
  });

  console.log(formData)

  const handleConfirm = (success) => {
    navigate("/campaigns", {
      state: {
        addSuccess: success,
      }
    })
  }

  useEffect(() => {
    if (formData.length > 0) {
      const currFile = formData[formData.length - 1];

      const query = {
        "title": currFile["title"],
        "startDate": currFile["startDate"],
        "endDate": currFile["endDate"],
        "mcc": currFile["merchant"],
        "category": currFile["category"],
        "minSpend": parseInt(currFile["minSpend"], 10),
        "pointsPerDollar": parseInt(currFile["pointsPerDollar"], 10),
        "card_program_id": cardIdDict[currFile["cardProgram"]],
        "notifications_list": [currFile["notificationTitle"], currFile["notificationMessage"]],
        "notification_title": currFile["notificationTitle"],
        "notification_message": currFile["notificationMessage"]
      }
      mutate(query, {
        onSuccess: () => { handleConfirm(true) },
        onError: (err) => { handleConfirm(false) },
      })
    }
  }, [formData.length])



  useEffect(() => {
    const isEdited = () => {
      return Object.values(formData).some((field) => {
        if (Array.isArray(field)) {
          return field.length > 0;
        } else {
          return field !== null && field !== "";
        }
      });
    };
    setIsFormEdited(isEdited)
  }, [formData]);


  useEffect(() => {

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";

      for (let i = 0; i < formData.length; i++) {
        if (isFormEdited) {
          const confirmed = window.confirm();
          if (confirmed) {
            formData[i]["abort"].abort();
          }
          break;
        };
      };
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [])

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