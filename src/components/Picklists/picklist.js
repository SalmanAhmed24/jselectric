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
    setLoading(true);
    axios
      .get(apiUrl)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  console.log(picklistData);
  const handleCloseDrawer = () => {
    setDrawer(!drawer);
  };
  const addPicklist = (data) => {
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/addUserType`;
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
    console.log("here");
    let url;
    if (picklistName == "User Type") {
      url = `${apiPath.prodPath}/api/userType/`;
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
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        if (picklistName == "User Type") {
          setPicklistData(res.data.userTypes);
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <section className={`${poppins.className} employee-wrap`}>
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
