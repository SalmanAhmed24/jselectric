"use client";
import { Poppins } from "next/font/google";
import React, { useState, useEffect } from "react";
import "./style.scss";
import axios from "axios";
import PicklistTable from "../subComponents/tables/picklistTable";
import PicklistDrawer from "../subComponents/drawers/picklistDrawer";
import { apiPath } from "@/utils/routes";
import Swal from "sweetalert2";
const poppins = Poppins({
  weight: ["300", "400", "600", "800", "900"],
  subsets: ["latin"],
});
function PicklistComp({ picklistName }) {
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [picklistData, setPicklistData] = useState([]);
  useEffect(() => {
    let apiUrl;
    if (picklistName == "User Type") {
      apiUrl = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Checked Out") {
      apiUrl = `${apiPath.prodPath}/api/checkedOut/`;
    }
    if (picklistName == "Position") {
      apiUrl = `${apiPath.prodPath}/api/position/`;
    }
    if (picklistName == "Tool Category") {
      apiUrl = `${apiPath.prodPath}/api/toolCategory/`;
    }
    if (picklistName == "Tool Sub-Category") {
      apiUrl = `${apiPath.prodPath}/api/subtoolCategory/`;
    }
    if (picklistName == "Device Category") {
      apiUrl = `${apiPath.prodPath}/api/deviceCategory/`;
    }
    if (picklistName == "Task Category") {
      apiUrl = `${apiPath.prodPath}/api/taskCategory/`;
    }
    if (picklistName == "Task Status") {
      apiUrl = `${apiPath.prodPath}/api/taskStatus/`;
    }
    if (picklistName == "Task Priority") {
      apiUrl = `${apiPath.prodPath}/api/taskPriority/`;
    }
    if (picklistName == "Notes Status") {
      apiUrl = `${apiPath.prodPath}/api/notesStatus/`;
    }
    if (picklistName == "Notes Category") {
      apiUrl = `${apiPath.prodPath}/api/notesCategory/`;
    }
    if (picklistName == "Customer Type") {
      apiUrl = `${apiPath.prodPath}/api/customerType/`;
    }
    if (picklistName == "Customer Term") {
      apiUrl = `${apiPath.prodPath}/api/customerTerm/`;
    }
    if (picklistName == "Tax Code") {
      apiUrl = `${apiPath.prodPath}/api/taxCode/`;
    }
    if (picklistName == "Material Level") {
      apiUrl = `${apiPath.prodPath}/api/materialLevel/`;
    }
    if (picklistName == "Labor Level") {
      apiUrl = `${apiPath.prodPath}/api/laborLevel/`;
    }
    if (picklistName == "Salesperson Code") {
      apiUrl = `${apiPath.prodPath}/api/salesPersonCode/`;
    }
    if (picklistName == "Job Type") {
      apiUrl = `${apiPath.prodPath}/api/jobType/`;
    }
    if (picklistName == "Job Tag") {
      apiUrl = `${apiPath.prodPath}/api/jobTag/`;
    }
    if (picklistName == "Job PM") {
      apiUrl = `${apiPath.prodPath}/api/jobPM/`;
    }
    if (picklistName == "Job CTM") {
      apiUrl = `${apiPath.prodPath}/api/jobCTM/`;
    }
    if (picklistName == "Phase") {
      apiUrl = `${apiPath.prodPath}/api/phase/`;
    }
    if (picklistName == "Reimbursal Type") {
      apiUrl = `${apiPath.prodPath}/api/reimbursalType/`;
    }
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Checked Out") {
          setPicklistData(res.data.checkedOut);
        }
        if (picklistName == "Position") {
          setPicklistData(res.data.positions);
        }
        if (picklistName == "Tool Category") {
          setPicklistData(res.data.toolCategory);
        }
        if (picklistName == "Tool Sub-Category") {
          setPicklistData(res.data.subtoolCategorys);
        }
        if (picklistName == "Device Category") {
          setPicklistData(res.data.deviceCategory);
        }
        if (picklistName == "Task Category") {
          setPicklistData(res.data.taskCategory);
        }
        if (picklistName == "Notes Category") {
          setPicklistData(res.data.notesCategory);
        }
        if (picklistName == "Task Status") {
          setPicklistData(res.data.taskStatus);
        }
        if (picklistName == "Task Priority") {
          setPicklistData(res.data.taskPriority);
        }
        if (picklistName == "Notes Status") {
          setPicklistData(res.data.notesStatus);
        }
        if (picklistName == "Customer Type") {
          setPicklistData(res.data.customerTypes);
        }
        if (picklistName == "Customer Term") {
          setPicklistData(res.data.customerTerms);
        }
        if (picklistName == "Tax Code") {
          setPicklistData(res.data.taxCodes);
        }
        if (picklistName == "Material Level") {
          setPicklistData(res.data.materialLevels);
        }
        if (picklistName == "Labor Level") {
          setPicklistData(res.data.laborLevels);
        }
        if (picklistName == "Salesperson Code") {
          setPicklistData(res.data.salesPersonCodes);
        }
        if (picklistName == "Job Type") {
          setPicklistData(res.data.jobTypes);
        }
        if (picklistName == "Job Tag") {
          setPicklistData(res.data.jobTags);
        }
        if (picklistName == "Job PM") {
          setPicklistData(res.data.jobPMs);
        }
        if (picklistName == "Job CTM") {
          setPicklistData(res.data.jobCTMs);
        }
        if (picklistName == "Phase") {
          setPicklistData(res.data.phases);
        }
        if (picklistName == "Reimbursal Type") {
          setPicklistData(res.data.reimbursalTypes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addPicklist = (data) => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/addUserType`;
    }
    if (picklistName == "Checked Out") {
      url = `${apiPath.prodPath}/api/checkedOut/addCheckedOut`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/addposition`;
    }
    if (picklistName == "Tool Category") {
      url = `${apiPath.prodPath}/api/toolCategory/addtoolCategory`;
    }
    if (picklistName == "Device Category") {
      url = `${apiPath.prodPath}/api/deviceCategory/adddeviceCategory`;
    }
    if (picklistName == "Task Category") {
      url = `${apiPath.prodPath}/api/taskCategory/addtaskCategory`;
    }
    if (picklistName == "Notes Category") {
      url = `${apiPath.prodPath}/api/notesCategory/addnotesCategory`;
    }
    if (picklistName == "Task Status") {
      url = `${apiPath.prodPath}/api/taskStatus/addtaskStatus`;
    }
    if (picklistName == "Task Priority") {
      url = `${apiPath.prodPath}/api/taskPriority/addtaskPriority`;
    }
    if (picklistName == "Notes Status") {
      url = `${apiPath.prodPath}/api/notesStatus/addnotesStatus`;
    }
    if (picklistName == "Tool Sub-Category") {
      url = `${apiPath.prodPath}/api/subtoolCategory/addsubtoolCategory`;
    }
    if (picklistName == "Customer Type") {
      url = `${apiPath.prodPath}/api/customerType/addCustomerType`;
    }
    if (picklistName == "Customer Term") {
      url = `${apiPath.prodPath}/api/customerTerm/addCustomerTerm`;
    }
    if (picklistName == "Tax Code") {
      url = `${apiPath.prodPath}/api/taxCode/addtaxCode`;
    }
    if (picklistName == "Material Level") {
      url = `${apiPath.prodPath}/api/materialLevel/addmaterialLevel`;
    }
    if (picklistName == "Labor Level") {
      url = `${apiPath.prodPath}/api/laborLevel/addlaborLevel`;
    }
    if (picklistName == "Salesperson Code") {
      url = `${apiPath.prodPath}/api/salesPersonCode/addsalesPersonCode`;
    }
    if (picklistName == "Job Type") {
      url = `${apiPath.prodPath}/api/jobType/addJobType`;
    }
    if (picklistName == "Job Tag") {
      url = `${apiPath.prodPath}/api/jobTag/addJobTag`;
    }
    if (picklistName == "Job PM") {
      url = `${apiPath.prodPath}/api/jobPM/addJobPM`;
    }
    if (picklistName == "Job CTM") {
      url = `${apiPath.prodPath}/api/jobCTM/addJobCTM`;
    }
    if (picklistName == "Phase") {
      url = `${apiPath.prodPath}/api/phase/addphase`;
    }
    if (picklistName == "Reimbursal Type") {
      url = `${apiPath.prodPath}/api/reimbursalType/addReimbursalType`;
    }
    axios
      .post(url, data)
      .then((res) => {
        if (res.data && res.data.error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Error adding ${picklistName}`,
            timer: 1500,
          });
        }
        handleCloseDrawer();
        refreshData();
      })
      .catch((err) => console.log(err));
  };
  const refreshData = () => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/`;
    }
    if (picklistName == "Checked Out") {
      url = `${apiPath.prodPath}/api/checkedOut/`;
    }
    if (picklistName == "Position") {
      url = `${apiPath.prodPath}/api/position/`;
    }
    if (picklistName == "Tool Category") {
      url = `${apiPath.prodPath}/api/toolCategory/`;
    }
    if (picklistName == "Device Category") {
      url = `${apiPath.prodPath}/api/deviceCategory/`;
    }
    if (picklistName == "Task Category") {
      url = `${apiPath.prodPath}/api/taskCategory/`;
    }
    if (picklistName == "Notes Category") {
      url = `${apiPath.prodPath}/api/notesCategory/`;
    }
    if (picklistName == "Task Status") {
      url = `${apiPath.prodPath}/api/taskStatus/`;
    }
    if (picklistName == "Task Priority") {
      url = `${apiPath.prodPath}/api/taskPriority/`;
    }
    if (picklistName == "Notes Status") {
      url = `${apiPath.prodPath}/api/notesStatus/`;
    }
    if (picklistName == "Tool Sub-Category") {
      url = `${apiPath.prodPath}/api/subtoolCategory/`;
    }
    if (picklistName == "Customer Type") {
      url = `${apiPath.prodPath}/api/customerType/`;
    }
    if (picklistName == "Customer Term") {
      url = `${apiPath.prodPath}/api/customerTerm/`;
    }
    if (picklistName == "Tax Code") {
      url = `${apiPath.prodPath}/api/taxCode/`;
    }
    if (picklistName == "Material Level") {
      url = `${apiPath.prodPath}/api/materialLevel/`;
    }
    if (picklistName == "Labor Level") {
      url = `${apiPath.prodPath}/api/laborLevel/`;
    }
    if (picklistName == "Salesperson Code") {
      url = `${apiPath.prodPath}/api/salesPersonCode/`;
    }
    if (picklistName == "Job Type") {
      url = `${apiPath.prodPath}/api/jobType/`;
    }
    if (picklistName == "Job Tag") {
      url = `${apiPath.prodPath}/api/jobTag/`;
    }
    if (picklistName == "Job PM") {
      url = `${apiPath.prodPath}/api/jobPM/`;
    }
    if (picklistName == "Job CTM") {
      url = `${apiPath.prodPath}/api/jobCTM/`;
    }
    if (picklistName == "Phase") {
      url = `${apiPath.prodPath}/api/phase/`;
    }
    if (picklistName == "Reimbursal Type") {
      url = `${apiPath.prodPath}/api/reimbursalType/`;
    }
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
        }
        if (picklistName == "Checked Out") {
          setPicklistData(res.data.checkedOut);
        }
        if (picklistName == "Position") {
          setPicklistData(res.data.positions);
        }
        if (picklistName == "Tool Category") {
          setPicklistData(res.data.toolCategory);
        }
        if (picklistName == "Device Category") {
          setPicklistData(res.data.deviceCategory);
        }
        if (picklistName == "Task Category") {
          setPicklistData(res.data.taskCategory);
        }
        if (picklistName == "Notes Category") {
          setPicklistData(res.data.notesCategory);
        }
        if (picklistName == "Task Status") {
          setPicklistData(res.data.taskStatus);
        }
        if (picklistName == "Task Priority") {
          setPicklistData(res.data.taskPriority);
        }
        if (picklistName == "Notes Status") {
          setPicklistData(res.data.notesStatus);
        }
        if (picklistName == "Tool Sub-Category") {
          setPicklistData(res.data.subtoolCategorys);
        }
        if (picklistName == "Customer Type") {
          setPicklistData(res.data.customerTypes);
        }
        if (picklistName == "Customer Term") {
          setPicklistData(res.data.customerTerms);
        }
        if (picklistName == "Tax Code") {
          setPicklistData(res.data.taxCodes);
        }
        if (picklistName == "Material Level") {
          setPicklistData(res.data.materialLevels);
        }
        if (picklistName == "Labor Level") {
          setPicklistData(res.data.laborLevels);
        }
        if (picklistName == "Salesperson Code") {
          setPicklistData(res.data.salesPersonCodes);
        }
        if (picklistName == "Job Type") {
          setPicklistData(res.data.jobTypes);
        }
        if (picklistName == "Job Tag") {
          setPicklistData(res.data.jobTags);
        }
        if (picklistName == "Job PM") {
          setPicklistData(res.data.jobPMs);
        }
        if (picklistName == "Job CTM") {
          setPicklistData(res.data.jobCTMs);
        }
        if (picklistName == "Phase") {
          setPicklistData(res.data.phases);
        }
        if (picklistName == "Reimbursal Type") {
          setPicklistData(res.data.reimbursalTypes);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap cus-emp-wrap`}>
      <div className="add-btn-wrap">
        <h2 className={poppins.className}>{picklistName}</h2>
        <button
          onClick={() => setDrawer(true)}
          className={`${poppins.className} btn-add`}
        >
          Add {picklistName}
        </button>
      </div>
      <div className="table-wrap">
        <PicklistTable
          loading={loading}
          picklistData={picklistData}
          picklistName={picklistName}
          refreshData={refreshData}
        />
      </div>
      <PicklistDrawer
        addPicklist={addPicklist}
        open={drawer}
        onClose={handleCloseDrawer}
        picklistName={picklistName}
      />
    </section>
  );
}

export default PicklistComp;
