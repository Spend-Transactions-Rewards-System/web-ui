import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ConfirmDialog from '../../Components/ConfirmDialog/ConfirmDialog';
import AddCampaignForm from '../../Components/AddCampaignForm/AddCampaignForm';

const AddCampaign = () => {
  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
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

  const handleConfirm = () => {
    navigate("/campaigns", {
      state: {
        addSuccess: true, 
        // addSuccess false, if got error, else true
      }
    })
  }
    
  return (
    <div>
      <script>{document.title="Add Campaign"}</script>
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