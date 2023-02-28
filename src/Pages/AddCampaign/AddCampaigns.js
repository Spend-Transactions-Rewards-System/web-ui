import React from 'react';
import { useState } from "react";
import AddCampaignForm from '../../Components/AddCampaignForm/AddCampaignForm';

const AddCampaign = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      consent: '',
      roles: [],
      duration: '',
      theme: ''
    });
  
    const updateFormData = (newFormData) => {
      setFormData(newFormData);
    }
  
    return (
      <AddCampaignForm formData={formData} setFormData={updateFormData} />
    );
  }
  
  export default AddCampaign;