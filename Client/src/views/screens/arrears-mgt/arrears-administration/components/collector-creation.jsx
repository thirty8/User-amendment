import React, { useEffect, useState } from "react";
import CustomTable from "../../../control-setups/components/CustomTable";
import Header from "../../../../../components/others/Header/Header";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import { headers } from "../../../teller-ops/teller/teller-activities";
import ButtonComponent from "../../../../../components/others/Button/ButtonComponent";
import {
  FiCheckCircle,
  FiPlus,
  // FiPlusCircle,
  FiTrash,
  FiX,
} from "react-icons/fi";
import { Modal, ScrollArea } from "@mantine/core";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import InputField from "../../../../../components/others/Fields/InputField";
import SelectField from "../../../../../components/others/Fields/SelectField";
import ButtonType from "../../../../../components/others/Button/ButtonType";
import { Spin } from "antd";
import Swal from "sweetalert2";
import { BsPen } from "react-icons/bs";
import { FaPercentage } from "react-icons/fa";

function CollectorCreation() {
  /*
 
   ____ _____  _  _____ _____ ____  
  / ___|_   _|/ \|_   _| ____/ ___| 
  \___ \ | | / _ \ | | |  _| \___ \ 
   ___) || |/ ___ \| | | |___ ___) |
  |____/ |_/_/   \_\_| |_____|____/ 
                                    
 
*/
  const [loading, setLoading] = useState(true);
  const [amendDetails, setAmendDetails] = useState(false);
  const [collectorDetails, setCollectorDetails] = useState([]);
  const [collectorNames, setCollectorNames] = useState([]);
  const [collectorGroup, setCollectorGroup] = useState([]);
  const [arrearsDay, setArrearsDay] = useState([]);
  const [products, setProducts] = useState([]);
  const [collectorZone, setCollectorZone] = useState([]);
  const [checkedBranches, setCheckedBranches] = useState([]);
  const [checkedProducts, setCheckedProducts] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [acrModal, setAcrModal] = useState(false);
  const [acrLoading, setacrLoading] = useState(false);
  const [acrRemain, setAcrRemain] = useState(0);
  const [bgModal, setBgModal] = useState(false);
  const [collectorEnquiryData, setCollectorEnquiryData] = useState([]);
  const [collectorEnquiryDataValue, setcollectorEnquiryDataValue] =
    useState("");

  // ENQUIRY STATES
  const [experienceLevelEnquiryValue, setExperienceLevelEnquiryValue] =
    useState("");
  const [collectorGroupEnquiryValue, setCollectorGroupEnquiryValue] =
    useState("");
  const [collectorZoneEnquiryValue, setCollectorZoneEnquiryValue] =
    useState("");
  const [maxDaysEnquiryValue, setMaxDaysEnquiryValue] = useState("");
  const [minDaysEnquiryValue, setMinDaysEnquiryValue] = useState("");
  const [maxRatioEnquiryValue, setMaxRatioEnquiryValue] = useState("");
  const [minRatioEnquiryValue, setMinRatioEnquiryValue] = useState("");

  // CREATION STATES
  const [collectorNameCreateValue, setCollectorNameCreateValue] = useState("");
  const [experienceLevelCreateValue, setExperienceLevelCreateValue] =
    useState("");
  const [collectorGroupCreateValue, setCollectorGroupCreateValue] =
    useState("");
  const [collectorZoneCreateValue, setCollectorZoneCreateValue] = useState("");
  const [collectorGroupZoneCreateValue, setCollectorGroupZoneCreateValue] =
    useState("");
  const [maxDaysCreateValue, setMaxDaysCreateValue] = useState("");
  const [minDaysCreateValue, setMinDaysCreateValue] = useState("");
  const [ratioCreateValue, setratioCreateValue] = useState("");

  const [collectorZoneValue, setCollectorZoneValue] = useState("");
  const [branchButtonActive, setBranchButtonActive] = useState(false);
  const [productButtonActive, setProductButtonActive] = useState(false);
  const [branches, setBranches] = useState([]);
  const [ratio, setRatio] = useState("");
  const [collectorNameValue, setCollectorNameValue] = useState("");
  const [collectorAmendNames, setCollectorAmendNames] = useState([]);
  const [collectorGroupValue, setCollectorGroupValue] = useState("");
  const [createCollectorModal, setCreateCollectorModal] = useState(false);
  const [editCollectorModal, setEditCollectorModal] = useState(false);
  const [selectedCollector, setSelectedCollector] = useState({});
  const [globalCollectorCreateValue, setGlobalCollectorCreateValue] =
    useState("");
  const [loadingCollectorBranches, setLoadingCollectorBranches] =
    useState(true);
  const [loadingCollectorProducts, setLoadingCollectorProducts] =
    useState(true);

  // Handling the checking of the box
  const handleCheckboxChange = (br_code, br_description) => {
    const isAlreadyChecked = checkedBranches.some(
      (branch) => branch.br_code?.split(" - ")[0] === br_code
    );

    if (isAlreadyChecked) {
      // If the branch is already checked, remove it from the checkedBranches
      setCheckedBranches((prevChecked) =>
        prevChecked.filter(
          (branch) => branch.br_code?.split(" - ")[0] !== br_code
        )
      );
    } else {
      // If the branch is not checked, add it to the checkedBranches
      setCheckedBranches((prevChecked) => [
        ...prevChecked,
        { br_code, br_description },
      ]);
    }
  };

  // Handling checking of Product
  const handleCheckboxProductChange = (prodCode, prodDesc) => {
    const isProductChecked = checkedProducts.some(
      (checkedProduct) => checkedProduct.prod_code?.split(" - ")[0] === prodCode
    );

    if (isProductChecked) {
      // If the product is already checked, remove it from the checkedProducts list
      setCheckedProducts((prevCheckedProducts) =>
        prevCheckedProducts.filter(
          (product) => product.prod_code?.split(" - ")[0] !== prodCode
        )
      );
    } else {
      // If the product is not checked, add it to the checkedProducts list
      setCheckedProducts((prevCheckedProducts) => [
        ...prevCheckedProducts,
        { prod_code: prodCode, prod_desc: prodDesc },
      ]);
    }
  };

  //   HEADERS
  var acrHeaders = [
    <div className="text-left">Collector Type</div>,
    <div>Remaining ACR (%)</div>,
    <div>Used ACR (%)</div>,
  ];

  var collectorDetailsHeader = [
    <div style={{ textAlign: "left" }}>Collector Name</div>,
    <div style={{ textAlign: "left" }}>Zone Description</div>,
    <div style={{ textAlign: "left" }}>Collector Group</div>,
    <div
      style={{
        textAlign: "right",
      }}
    >
      Min Days
    </div>,
    <div
      style={{
        textAlign: "right",
      }}
    >
      Max Days
    </div>,
    <div className="text-left">Experience level</div>,
    <div className="text-left">ACR (%) </div>,
    <div>Action</div>,
  ];

  var linkToBranchHeaders = [
    <div>Tick</div>,
    <div className="text-left">Branch</div>,
  ];

  var linkToProductHeaders = [
    <div>Tick</div>,
    <div className="text-left">Product</div>,
  ];

  // BRANCHES
  var zones = branches?.map((branch) => {
    const isBranchChecked = checkedBranches.some(
      (checkedBranch) => checkedBranch.br_code === branch.br_code
    );

    return [
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonType
          type={"checkbox"}
          checked={isBranchChecked}
          onChange={() =>
            handleCheckboxChange(branch?.br_code, branch?.br_description)
          }
        />
      </div>,
      <div style={{ textAlign: "left" }}>{branch?.br_description}</div>,
    ];
  });

  // PRODUCTS
  var prods = products?.map((product) => {
    const isProductChecked = checkedProducts.some(
      (checkedProduct) => checkedProduct.prod_code === product.prod_code
    );

    return [
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonType
          checked={isProductChecked}
          type={"checkbox"}
          onChange={() => {
            handleCheckboxProductChange(
              product?.prod_code,
              product?.description
            );
          }}
        />
      </div>,
      <div style={{ textAlign: "left" }}>
        {product?.prod_code + " - " + product?.description}
      </div>,
    ];
  });

  // BRANCH TABLE FOR CREATION, TICK TO ADD BRANCH
  var zonesAmend = branches?.map((branch) => {
    const isBranchChecked = checkedBranches?.some(
      (checkedBranch) =>
        checkedBranch.br_code?.split(" - ")[0] === branch.br_code
      // checkedBranch.br_code?.split(" - ")[0] === branch.br_code
    );

    return [
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonType
          type={"checkbox"}
          checked={isBranchChecked}
          onChange={() =>
            handleCheckboxChange(branch?.br_code, branch?.br_description)
          }
        />
      </div>,
      <div style={{ textAlign: "left" }}>{branch?.br_description}</div>,
    ];
  });

  var prodsAmend = products?.map((product) => {
    const isProductChecked = checkedProducts?.some(
      (checkedProduct) =>
        checkedProduct.prod_code?.split(" - ")[0] === product.prod_code
    );
    return [
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonType
          checked={isProductChecked}
          type={"checkbox"}
          onChange={() => {
            handleCheckboxProductChange(
              product?.prod_code,
              product?.description
            );
          }}
        />
      </div>,
      <div style={{ textAlign: "left" }}>
        {product?.prod_code + " - " + product?.description}
      </div>,
    ];
  });

  /*
   _   _ ____  _____   _____ _____ _____ _____ ____ _____ ____  
  | | | / ___|| ____| | ____|  ___|  ___| ____/ ___|_   _/ ___| 
  | | | \___ \|  _|   |  _| | |_  | |_  |  _|| |     | | \___ \ 
  | |_| |___) | |___  | |___|  _| |  _| | |__| |___  | |  ___) |
   \___/|____/|_____| |_____|_|   |_|   |_____\____| |_| |____/ 
                                                                
*/

  const enquireCollectorDetail = () => {
    axios
      .post(
        API_SERVER + "/api/get-collector-details",
        {
          username: collectorEnquiryDataValue,
          zone_name: collectorZoneEnquiryValue,
          collector_group: collectorGroupEnquiryValue,
          exp_level: experienceLevelEnquiryValue,
          min_days: minDaysEnquiryValue,
          max_days: maxDaysEnquiryValue,
          min_ratio: minRatioEnquiryValue,
          max_ratio: maxRatioEnquiryValue,
        },
        { headers: headers }
      )
      .then(function (response) {
        setLoading(false);
        setCollectorDetails(response.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // GET GRID DATA
    enquireCollectorDetail();

    // GET COLLECTOR NAMES
    axios
      .get(API_SERVER + "/api/get-collector-names", { headers: headers })
      .then(function (response) {
        setCollectorNames(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    // GET AMEND LOV
    axios
      .get(API_SERVER + "/api/get-collector-amend-details", {
        headers: headers,
      })
      .then(function (response) {
        setCollectorAmendNames(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));

    //   GET GLOBAL COLLECTOR
    axios
      .get(API_SERVER + "/api/get-collector-zone", { headers: headers })
      .then(function (response) {
        setCollectorZone(response.data);
      })
      .catch((err) => console.log(err));

    //   GET EXPERIENCE LEVELS
    axios
      .get(API_SERVER + "/api/get-collector-experience-level", {
        headers: headers,
      })
      .then(function (response) {
        setExperienceLevel(response.data);
      })
      .catch((err) => console.log(err));

    // GET COLLECTOR PRODUCTS
    axios
      .get(API_SERVER + "/api/get-collector-products", {
        headers: headers,
      })
      .then(function (response) {
        setProducts(response.data);
      })
      .catch((err) => console.log(err));

    // ENQUIRE ON COLLECTOR
    axios
      .get(API_SERVER + "/api/get-enquiry-on-collector-details", {
        headers: headers,
      })
      .then(function (response) {
        setCollectorEnquiryData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-collector-branch-chk",
        { username: selectedCollector?.user_name },
        { headers: headers }
      )
      .then(function (response) {
        setCheckedBranches(response.data);
        setLoadingCollectorBranches(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCollectorBranches(false);
      });

    axios
      .post(
        API_SERVER + "/api/get-collector-product-chk",
        { username: selectedCollector?.user_name },
        { headers: headers }
      )
      .then(function (response) {
        setCheckedProducts(response.data);
        setLoadingCollectorProducts(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingCollectorProducts(false);
      });
  }, [selectedCollector]);

  useEffect(() => {
    handleCollectorBranches(collectorZoneValue);
  }, [collectorZoneValue]);

  useEffect(() => {
    axios
      .post(
        API_SERVER + "/api/get-collector-group",
        { username: collectorNameValue },
        { headers: headers }
      )
      .then(function (response) {
        setCollectorGroup(response.data);
      })
      .catch((err) => console.log(err));
  }, [collectorNameValue]);

  /*
 
   _____ _   _ _   _  ____ _____ ___ ___  _   _ ____  
  |  ___| | | | \ | |/ ___|_   _|_ _/ _ \| \ | / ___| 
  | |_  | | | |  \| | |     | |  | | | | |  \| \___ \ 
  |  _| | |_| | |\  | |___  | |  | | |_| | |\  |___) |
  |_|    \___/|_| \_|\____| |_| |___\___/|_| \_|____/ 
                                                      
 
*/

  function formatNumberWithoutDecimals(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  const handleCollectorBranches = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-branches-from-zone-name",
        { zone_name: value },
        { headers: headers }
      )
      .then(function (response) {
        setBranches(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleCollectorBranchesAllChecked = (value) => {
    axios
      .post(
        API_SERVER + "/api/get-branches-from-zone-name",
        { zone_name: "000" },
        { headers: headers }
      )
      .then(function (response) {
        setBranches(response.data);
        setCheckedBranches(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getMinAndMaxDays = (code) => {
    axios
      .post(
        API_SERVER + "/api/get-min-and-max-days",
        { collectorCode: code },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "geez stoff");
        setArrearsDay(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getMinAndMaxDaysForAmendment = (code) => {
    axios
      .post(
        API_SERVER + "/api/get-min-and-max-days",
        { collectorCode: code },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "geez stoff");

        setSelectedCollector({
          ...selectedCollector,
          collector_min_days: response?.data[0]?.collector_min_days,
          collector_max_days: response?.data[0]?.collector_max_days,
        });
      })
      .catch((err) => console.log(err));
  };

  const getMinAndMaxDaysForCreation = (code) => {
    axios
      .post(
        API_SERVER + "/api/get-min-and-max-days",
        { collectorCode: code },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "geez stoff");
        // setArrearsDayCreation(response.data);
        setSelectedCollector({
          ...selectedCollector,
          collector_min_days: response?.data[0]?.collector_min_days,
          collector_max_days: response?.data[0]?.collector_max_days,
        });
      })
      .catch((err) => console.log(err));
  };

  /*
 
                                                   _             
      __ _  ___ _ __    __ _ _ __ ___  _   _ _ __ (_)_ __   __ _ 
     / _` |/ __| '__|  / _` | '__/ _ \| | | | '_ \| | '_ \ / _` |
    | (_| | (__| |    | (_| | | | (_) | |_| | |_) | | | | | (_| |
     \__,_|\___|_|     \__, |_|  \___/ \__,_| .__/|_|_| |_|\__, |
                       |___/                |_|            |___/ 
 
*/

  let acrGrouping = [];
  let codeToRatioMap = {};

  // Compute the acrGrouping
  var detailsOfCollectors = collectorDetails?.map((collector) => {
    const code = collector?.collector_group;
    const ratio = collector?.ratio ?? 0;

    // Add ratio to the corresponding code in the map
    if (codeToRatioMap[code]) {
      codeToRatioMap[code] += parseFloat(ratio);
    } else {
      codeToRatioMap[code] = parseFloat(ratio);
    }

    return collector;
  });

  // Convert the codeToRatioMap back to an array format and add remaining key
  acrGrouping = Object.keys(codeToRatioMap).map((code) => ({
    code: code,
    acr: codeToRatioMap[code],
    remaining: 100 - codeToRatioMap[code],
  }));

  // Create a map for quick lookup of remaining values
  let codeToRemainingMap = acrGrouping.reduce((acc, { code, remaining }) => {
    acc[code] = remaining;
    return acc;
  }, {});

  // Update the detailsOfCollectors to include the remaining value
  detailsOfCollectors = detailsOfCollectors.map((collector) => {
    const code = collector?.collector_group;
    const remaining = codeToRemainingMap[code] ?? 0;

    return [
      <div style={{ textAlign: "left" }}>
        {collector?.user_name + " - " + collector?.fullname}
      </div>,
      <div style={{ textAlign: "left" }}>{collector?.zone_name}</div>,
      <div style={{ textAlign: "left" }}>{collector?.collector_group}</div>,
      <div
        style={{
          textAlign: "right",
        }}
      >
        {formatNumberWithoutDecimals(collector?.collector_min_days)}
      </div>,
      <div
        style={{
          textAlign: "right",
        }}
      >
        {formatNumberWithoutDecimals(collector?.collector_max_days)}
      </div>,
      <div
        style={{
          textAlign: "left",
        }}
      >
        {collector?.exp_level}
      </div>,

      <div
        style={{
          textAlign: "right",
        }}
      >
        {collector?.ratio ? collector?.ratio + "%" : collector?.ratio}
      </div>,

      <div className="flex items-center justify-center">
        <ButtonComponent
          buttonIcon={<BsPen />}
          title="Amend collector"
          buttonWidth={"28px"}
          buttonHeight={"28px"}
          buttonBackgroundColor={"orange"}
          onClick={() => {
            setEditCollectorModal(true);
            setSelectedCollector({ ...collector, remaining }); // Pass the remaining value here
            console.log({ ...collector, remaining }, "grp SELECTED COLLECTOR");
            handleCollectorBranches(collector?.zone_name?.split(" - ")[0]);
          }}
        />

        <div className="ml-4">
          <ButtonComponent
            buttonIcon={<FiTrash />}
            title="Remove collector"
            buttonWidth={"28px"}
            buttonHeight={"28px"}
            buttonBackgroundColor={"red"}
            onClick={() => {
              // setAmendCollectorModal(true);
              // setselectedAmendmentObject({
              //   ...selectedAmendmentObject,
              //   collector_code: i?.collector_code,
              //   description: i?.description,
              //   collector_min_days: i?.collector_min_days,
              //   collector_max_days: i?.collector_max_days,
              // });
              // console.log(i, "mayaa");
            }}
          />
        </div>
      </div>,
    ];
  });

  let acrTableData = acrGrouping.map((item) => {
    return [
      <div className="text-left">{item.code}</div>,
      <div className="text-black font-bold">{item.remaining}%</div>,
      <div className="text-red-500 font-bold">
        {100 - parseFloat(item.remaining)}%
      </div>,
    ];
  });

  /*
   ____                         _                
  |  _ \ _ __ ___   ___ ___  __| |_   _ _ __ ___ 
  | |_) | '__/ _ \ / __/ _ \/ _` | | | | '__/ _ \
  |  __/| | | (_) | (_|  __/ (_| | |_| | | |  __/
  |_|   |_|  \___/ \___\___|\__,_|\__,_|_|  \___|
                                                 
*/

  const removeCollector = () => {
    var zoneCode = selectedCollector?.zone_name?.split(" - ")[0];
    var collectorCode = selectedCollector?.collector_group?.split(" - ")[0];
    axios
      .post(
        API_SERVER + "/api/collector-removal-ok",
        {
          user_name_v: selectedCollector?.user_name,
          zone_name_v: zoneCode,
          global_branch: selectedCollector?.globaluser,
          clt_code_v: collectorCode,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCollector = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var ip = localStorage.getItem("ipAddress");
    var hostname = userInfo?.id;
    var branch = userInfo?.branchCode;

    enquireCollectorDetail();

    console.log(
      {
        user_name_v: collectorNameCreateValue,
        zone_name_v: collectorZoneCreateValue,
        globaluser_v: globalCollectorCreateValue,
        global_branch: branch,
        clt_code_v: collectorGroupCreateValue?.split(" - ")[0],
        chk_v: checkedBranches?.length > 0 ? "Y" : "N",
        machine_ip_v: ip,
        hostname_v: hostname,
        prog_v: "React",
        frm: "CCCR",
        POSTED_BY_V: hostname,
        EXP_LEVEL_V: experienceLevelCreateValue,
        RATIO_V: ratioCreateValue,
        accesses: checkedBranches,
        products: checkedProducts,
      },
      "Collector Creation"
    );
    axios
      .post(
        API_SERVER + "/api/collector-creation-ok",
        {
          user_name_v: collectorNameCreateValue,
          zone_name_v: collectorZoneCreateValue,
          globaluser_v: globalCollectorCreateValue,
          global_branch: branch,
          clt_code_v: collectorGroupCreateValue?.split(" - ")[0],
          chk_v: checkedBranches?.length > 0 ? "Y" : "N",
          machine_ip_v: ip,
          hostname_v: hostname,
          prog_v: "React",
          frm: "CCCR",
          POSTED_BY_V: hostname,
          EXP_LEVEL_V: experienceLevelCreateValue,
          RATIO_V: ratioCreateValue,
          accesses: checkedBranches,
          products: checkedProducts,
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "CREATE");
        console.log(response.data?.responseMessage?.split(" - ")[0], "JORJORR");
        if (response.data?.responseMessage?.split(" - ")[0] === "INF") {
          Swal.fire(response.data?.responseMessage, "", "success");
          setCreateCollectorModal(false);
          // CLEAR THE STOFF
          setCreateCollectorModal(false);
          setMaxDaysCreateValue("");
          setMinDaysCreateValue("");
          setCollectorGroupCreateValue("");
          setCollectorNameCreateValue("");
          setCollectorZoneCreateValue("");
          setCollectorGroupZoneCreateValue("");
          setExperienceLevelCreateValue("");
          setGlobalCollectorCreateValue("");
          setCheckedBranches([]);
          setCheckedProducts([]);
          setratioCreateValue("");
          setArrearsDay([]);

          enquireCollectorDetail("");
        } else {
          Swal.fire(response.data?.responseMessage, "", "error");
        }
      })
      .catch((err) => console.log(err));
  };

  const amendCollector = () => {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    var ip = localStorage.getItem("ipAddress");
    var hostname = userInfo?.id;
    var branch = userInfo?.branchCode;

    // console.log(
    //   {
    //     user_name_v: selectedCollector?.user_name,
    //     zone_name_v: selectedCollector?.zone_name?.split(" - ")[0],
    //     globaluser_v:
    //       selectedCollector?.zone_name === "Global Collector" ? "Y" : "N",
    //     global_branch: branch,
    //     clt_code_v: selectedCollector?.collector_group?.split(" - ")[0],
    //     chk_v: checkedBranches?.length > 0 ? "Y" : "N",
    //     machine_ip_v: ip,
    //     hostname_v: hostname,
    //     prog_v: "React",
    //     frm: "CCCR",
    //     POSTED_BY_V: hostname,
    //     EXP_LEVEL_V: selectedCollector?.exp_level?.split(" - ")[0],
    //     RATIO_V: selectedCollector?.ratio,
    //     accesses: checkedBranches.reduce((uniqueBranches, branch) => {
    //       const br_code = branch?.br_code?.split(" - ")[0];

    //       if (
    //         br_code &&
    //         !uniqueBranches.some((item) => item.br_code === br_code)
    //       ) {
    //         let br_description = branch?.br_description
    //           ? branch?.br_description.split(" - ")[1]
    //           : branch?.br_code && branch?.br_code.length > 4
    //           ? branch?.br_code.split(" - ")[1]
    //           : null;
    //         if (br_description !== undefined || br_code) {
    //           console.log(uniqueBranches, "UNIQUE");
    //           uniqueBranches.push({
    //             br_code,
    //             br_description: br_description || "",
    //           });
    //         }
    //       }

    //       return uniqueBranches;
    //     }, []),
    //     products: checkedProducts.reduce((uniqueProducts, product) => {
    //       const exists = uniqueProducts.some(
    //         (item) => item.prod_code === product.prod_code.split(" - ")[0]
    //       );
    //       if (!exists) {
    //         uniqueProducts.push({
    //           prod_code:
    //             product?.prod_code || product?.prod_code?.length > 5
    //               ? product?.prod_code?.split(" - ")[0]
    //               : product?.prod_code,
    //           prod_desc:
    //             product?.prod_code?.split(" - ")[1] ||
    //             product?.prod_code?.length > 4
    //               ? product?.prod_code?.split(" - ")[1]
    //               : product?.prod_desc,
    //         });
    //       }

    //       return uniqueProducts;
    //     }, []),
    //   },
    //   "Biggest"
    // );

    axios
      .post(
        API_SERVER + "/api/collector-amendment",
        {
          user_name_v: selectedCollector?.user_name,
          zone_name_v: selectedCollector?.zone_name?.split(" - ")[0],
          globaluser_v:
            selectedCollector?.zone_name === "Global Collector" ? "Y" : "N",
          global_branch: branch,
          clt_code_v: selectedCollector?.collector_group?.split(" - ")[0],
          chk_v: checkedBranches?.length > 0 ? "Y" : "N",
          machine_ip_v: ip,
          hostname_v: hostname,
          prog_v: "React",
          frm: "CCCR",
          POSTED_BY_V: hostname,
          EXP_LEVEL_V: selectedCollector?.exp_level?.split(" - ")[0],
          RATIO_V: selectedCollector?.ratio,
          accesses: checkedBranches.reduce((uniqueBranches, branch) => {
            const br_code = branch?.br_code?.split(" - ")[0];

            if (
              br_code &&
              !uniqueBranches.some((item) => item.br_code === br_code)
            ) {
              let br_description = branch?.br_description
                ? branch?.br_description.split(" - ")[1]
                : branch?.br_code && branch?.br_code.length > 4
                ? branch?.br_code.split(" - ")[1]
                : null;
              if (br_description !== undefined || br_code) {
                console.log(uniqueBranches, "UNIQUE");
                uniqueBranches.push({
                  br_code,
                  br_description: br_description || "",
                });
              }
            }

            return uniqueBranches;
          }, []),
          products: checkedProducts.reduce((uniqueProducts, product) => {
            const exists = uniqueProducts.some(
              (item) => item.prod_code === product.prod_code.split(" - ")[0]
            );
            if (!exists) {
              uniqueProducts.push({
                prod_code:
                  product?.prod_code || product?.prod_code?.length > 5
                    ? product?.prod_code?.split(" - ")[0]
                    : product?.prod_code,
                prod_desc:
                  product?.prod_code?.split(" - ")[1] ||
                  product?.prod_code?.length > 4
                    ? product?.prod_code?.split(" - ")[1]
                    : product?.prod_desc,
              });
            }

            return uniqueProducts;
          }, []),
        },
        { headers: headers }
      )
      .then(function (response) {
        console.log(response.data, "CREATE");
        console.log(response.data?.responseMessage?.split(" - ")[0], "JORJORR");
        if (response.data?.responseMessage?.split(" - ")[0] === "INF") {
          Swal.fire({
            title: response.data?.responseMessage,
            icon: "success",
          });
          setEditCollectorModal(false);
          setCreateCollectorModal(false);
          // CLEAR THE STUFF
          setMaxDaysCreateValue("");
          setMinDaysCreateValue("");
          setCollectorGroupCreateValue("");
          setCollectorNameCreateValue("");
          setCollectorZoneCreateValue("");
          setCollectorGroupZoneCreateValue("");
          setExperienceLevelCreateValue("");
          setGlobalCollectorCreateValue("");
          setCheckedBranches([]);
          setCheckedProducts([]);
          setratioCreateValue("");
          setArrearsDay([]);

          enquireCollectorDetail("");
        } else {
          Swal.fire({
            title: response.data?.responseMessage,
            icon: "error",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const getRemainingAcr = (value) => {
    const code = value;
    if (codeToRemainingMap[code] !== undefined) {
      console.log(`Remaining ACR for ${code}: ${codeToRemainingMap[code]}`);
      setAcrRemain(codeToRemainingMap[code]);
      return codeToRemainingMap[code];
    } else {
      console.log(`No remaining ACR found for 100`);
      setAcrRemain(100);
      return 100;
    }
  };

  const handleACRvalidation = () => {
    if (
      parseFloat(ratioCreateValue) > 100 ||
      parseFloat(ratioCreateValue) === 0
    ) {
      Swal.fire(
        "Account to Collector Ratio value should be between 1% to 100%",
        "",
        "error"
      );
    }
  };

  /*
 
   _____                   _               ____            _   _             
  | ____|_ __   __ _ _   _(_)_ __ _   _   / ___|  ___  ___| |_(_) ___  _ __  
  |  _| | '_ \ / _` | | | | | '__| | | |  \___ \ / _ \/ __| __| |/ _ \| '_ \ 
  | |___| | | | (_| | |_| | | |  | |_| |   ___) |  __/ (__| |_| | (_) | | | |
  |_____|_| |_|\__, |\__,_|_|_|   \__, |  |____/ \___|\___|\__|_|\___/|_| |_|
                  |_|             |___/                                      
 
*/

  return (
    <div className="flex flex-col w-full px-12">
      <ActionButtons
        displayAuthorise={"none"}
        displayCancel={"none"}
        displayDelete={"none"}
        displayHelp={"none"}
        displayRefresh={"none"}
        displayReject={"none"}
        displayView={"none"}
        displayOk={"none"}
        onNewClick={() => {
          setcollectorEnquiryDataValue("");
          setExperienceLevelEnquiryValue("");
          setCollectorGroupEnquiryValue("");
          setCollectorZoneEnquiryValue("");
          setMinDaysEnquiryValue("");
          setMaxDaysEnquiryValue("");
          setMinRatioEnquiryValue("");
          setMaxRatioEnquiryValue("");
          enquireCollectorDetail();
        }}
        onFetchClick={() => {
          enquireCollectorDetail();
        }}
      />

      <br />

      <div className=" space-y-4 w-full  border border-[#d3d3d3] p-2 rounded-md pb-8">
        <Header title={"Collector Enquiry"} headerShade />
        <div className="flex items-center">
          <div className="flex w-full">
            <div className="w-[50%]">
              <ListOfValue
                label="Collector Name"
                labelWidth={"30%"}
                inputWidth={"50%"}
                data={collectorEnquiryData}
                onChange={(value) => setcollectorEnquiryDataValue(value)}
                value={collectorEnquiryDataValue}
              />
            </div>

            <div className="w-[50%]">
              <InputField
                label={"Experience Level"}
                labelWidth={"20%"}
                inputWidth={"50%"}
                textAlign={"right"}
                onChange={(e) => setExperienceLevelEnquiryValue(e.target.value)}
                value={experienceLevelEnquiryValue}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[50%]">
            <ListOfValue
              label={"Collector Group"}
              id={"collector-group"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              data={collectorGroup}
              onChange={(value) => {
                setCollectorGroupEnquiryValue(value);
                setTimeout(() => {
                  const input = document.getElementById("global-collector");
                  input?.focus();
                }, 0);

                // PASSING VALUE TO GET MIN DAYS AND MAX DAYS
                getMinAndMaxDays(value?.split(" - ")[0]);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const input = document.getElementById("global-collector");
                  input?.focus();
                }
              }}
              value={collectorGroupEnquiryValue}
            />
          </div>

          <div className="w-[50%]">
            <ListOfValue
              label="Collector Zone"
              labelWidth={"20%"}
              inputWidth={"50%"}
              data={collectorZone}
              onChange={(value) => setCollectorZoneEnquiryValue(value)}
              value={collectorZoneEnquiryValue}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[50%]">
            <InputField
              label={"Min Days"}
              labelWidth={"30%"}
              inputWidth={"20%"}
              textAlign={"right"}
              onChange={(e) => setMinDaysEnquiryValue(e.target.value)}
              value={minDaysEnquiryValue}
            />
          </div>

          <div className="w-[50%]">
            <InputField
              label="Max Days"
              labelWidth={"20%"}
              inputWidth={"20%"}
              textAlign={"right"}
              onChange={(e) => setMaxDaysEnquiryValue(e.target.value)}
              value={maxDaysEnquiryValue}
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-[50%]">
            <InputField
              label={"Min Ratio"}
              labelWidth={"30%"}
              inputWidth={"20%"}
              textAlign={"right"}
              onChange={(e) => setMinRatioEnquiryValue(e.target.value)}
              value={minRatioEnquiryValue}
            />
          </div>

          <div className="w-[50%]">
            <InputField
              label="Max Ratio"
              labelWidth={"20%"}
              inputWidth={"20%"}
              textAlign={"right"}
              onChange={(e) => setMaxRatioEnquiryValue(e.target.value)}
              value={maxRatioEnquiryValue}
            />
          </div>
        </div>

        {/* <div className="flex items-center">
          <div className="w-[50%]">
            <InputField
              label={"Account to Collector Ratio"}
              showPopOver
              onClickOfPopUp={() => setAcrModal(true)}
              labelWidth={"30%"}
              inputWidth={"20%"}
              textAlign={"right"}
              onChange={(e) => setRatio(e.target.value)}
              value={ratio}
            />
          </div>

          <div className="w-[50%]"></div>
        </div> */}
      </div>

      <hr />
      <div className="flex justify-start mt-4 mb-4 gap-3">
        <ButtonComponent
          label={"Create Collector"}
          buttonHeight={"30px"}
          buttonWidth={"170px"}
          buttonBackgroundColor={"#3b82f6"}
          buttonIcon={<FiPlus />}
          onClick={() => {
            setCreateCollectorModal(true);
            // handleCollectorBranches(
            //   selectedCollector?.zone_name?.split(" - ")[0]
            // );
          }}
        />

        <ButtonComponent
          label={"Remaining ACR"}
          buttonHeight={"30px"}
          buttonWidth={"170px"}
          buttonIcon={<FaPercentage />}
          buttonBackgroundColor={"#141414"}
          onClick={() => {
            setAcrModal(true);
          }}
        />
      </div>
      <div style={{ marginBottom: "80px" }}>
        <Header title={"Collector Details"} headerShade />
        <CustomTable
          data={detailsOfCollectors}
          headers={collectorDetailsHeader}
          load={loading}
          rowsPerPage={5}
        />
      </div>

      {/*
 
    ____ ____  _____    _  _____ _____      ____ ___  _     _     _____ ____ _____ ___  ____       __  __  ___  ____    _    _     
   / ___|  _ \| ____|  / \|_   _| ____|    / ___/ _ \| |   | |   | ____/ ___|_   _/ _ \|  _ \     |  \/  |/ _ \|  _ \  / \  | |    
  | |   | |_) |  _|   / _ \ | | |  _|     | |  | | | | |   | |   |  _|| |     | || | | | |_) |    | |\/| | | | | | | |/ _ \ | |    
  | |___|  _ <| |___ / ___ \| | | |___    | |__| |_| | |___| |___| |__| |___  | || |_| |  _ <     | |  | | |_| | |_| / ___ \| |___ 
   \____|_| \_\_____/_/   \_\_| |_____|    \____\___/|_____|_____|_____\____| |_| \___/|_| \_\    |_|  |_|\___/|____/_/   \_\_____|
                                                                                                                              
*/}
      <Modal
        opened={createCollectorModal}
        onClose={() => {
          setCreateCollectorModal(false);
          setMaxDaysCreateValue("");
          setMinDaysCreateValue("");
          setCollectorGroupCreateValue("");
          setCollectorNameCreateValue("");
          setCollectorZoneCreateValue("");
          setCollectorGroupZoneCreateValue("");
          setExperienceLevelCreateValue("");
          setGlobalCollectorCreateValue("");
          setCheckedBranches([]);
          setCheckedProducts([]);
          setratioCreateValue("");
          setArrearsDay([]);
          enquireCollectorDetail("");
        }}
        withCloseButton={false}
        size={"xl"}
        trapFocus={false}
        padding={bgModal ? 10 : 0}
        scrollAreaComponent={ScrollArea.Autosize}
        radius={"sm"}
      >
        <div
          className="border border-[#ccc] p-2"
          style={{ zoom: 0.99, display: !bgModal ? "block" : "none" }}
        >
          <Header
            title={"Collector Details"}
            headerShade
            handleClose={() => setCreateCollectorModal(false)}
            closeIcon
          />

          {/* DETAILS TO CREATE */}
          <div className="space-y-4 py-4">
            <div className="py-4 rounded-sm space-y-4">
              <ListOfValue
                label={"Collector Name"}
                required
                labelWidth={"20%"}
                inputWidth={"75%"}
                data={collectorNames}
                onChange={(value) => {
                  setCollectorNameCreateValue(value);
                  setTimeout(() => {
                    const input = document.getElementById("collector-group");
                    input?.focus();
                  }, 0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const input = document.getElementById("collector-group");
                    input?.focus();
                  }
                }}
                value={collectorNameCreateValue}
              />

              <div className="flex items-center">
                <div className="w-1/2">
                  <ListOfValue
                    label={"Collector Group"}
                    required
                    id={"collector-group"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    data={collectorGroup}
                    onChange={(value) => {
                      setCollectorGroupCreateValue(value);
                      console.log(value?.split(" - ")[0], "geez");
                      setTimeout(() => {
                        const input =
                          document.getElementById("global-collector");
                        input?.focus();
                      }, 0);

                      getRemainingAcr(value);

                      // PASSING VALUE TO GET MIN DAYS AND MAX DAYS
                      getMinAndMaxDays(value?.split(" - ")[0]);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input =
                          document.getElementById("global-collector");
                        input?.focus();
                      }
                    }}
                    value={collectorGroupCreateValue}
                  />
                </div>
                <div className="w-1/2">
                  <ListOfValue
                    label={"Experience Level"}
                    required
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    data={experienceLevel}
                    onChange={(value) => {
                      setExperienceLevelCreateValue(value);
                    }}
                    value={experienceLevelCreateValue}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-[50%]">
                  <SelectField
                    label={"Global Collector"}
                    required
                    id={"global-collector"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    value={globalCollectorCreateValue}
                    onChange={(value) => {
                      setGlobalCollectorCreateValue(value);
                      console.log(value);

                      if (value === "Y") {
                        handleCollectorBranchesAllChecked();
                      } else {
                        setCheckedBranches([]);
                      }
                    }}
                    data={[
                      { label: "Yes", value: "Y" },
                      { label: "No", value: "N" },
                    ]}
                  />
                </div>
                <div className="w-[50%]">
                  {globalCollectorCreateValue === "Y" ? (
                    <InputField
                      label={"Collector Zone"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"50%"}
                      id="collector-zone"
                      disabled
                    />
                  ) : (
                    <ListOfValue
                      label={"Collector Zone"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"50%"}
                      id="collector-zone"
                      data={collectorZone}
                      onChange={(value) => {
                        setCollectorZoneCreateValue(value);
                        // console.log(value, "RRIII");
                        handleCollectorBranches(value);
                      }}
                      value={collectorZoneCreateValue}
                    />
                  )}
                </div>
              </div>

              <div className="flex">
                <div className="w-[50%]">
                  <InputField
                    label={"Min Arrears Days"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    disabled
                    textAlign={"right"}
                    value={arrearsDay[0]?.collector_min_days}
                  />
                </div>

                <div className="w-[50%]">
                  <InputField
                    label={"Max Arrears Days"}
                    labelWidth={"40%"}
                    inputWidth={"50%"}
                    disabled
                    textAlign={"right"}
                    value={arrearsDay[0]?.collector_max_days}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-[50%]">
                  <InputField
                    label={"Account to Collector Ratio (%)"}
                    labelWidth={"60%"}
                    type={"number"}
                    required
                    inputWidth={"30%"}
                    textAlign={"right"}
                    value={ratioCreateValue}
                    onBlur={handleACRvalidation}
                    onChange={(e) => setratioCreateValue(e.target.value)}
                  />
                </div>

                <div className="w-[50%]"></div>
              </div>
            </div>

            <hr />

            {/* BUTTONS */}
            <div className="flex items-center justify-between">
              <div>
                <ButtonComponent
                  label={"Remaining ACR"}
                  buttonHeight={"30px"}
                  buttonWidth={"170px"}
                  buttonIcon={<FaPercentage />}
                  buttonBackgroundColor={"#141414"}
                  onClick={() => {
                    setAcrModal(true);
                    setBgModal(false);
                  }}
                />
              </div>

              <div className="flex items-center justify-end mr-5">
                <ButtonComponent
                  label={"Save"}
                  buttonHeight={"29px"}
                  buttonWidth={"80px"}
                  buttonBackgroundColor={"green"}
                  buttonIcon={<FiCheckCircle />}
                  onClick={() => {
                    if (parseFloat(ratioCreateValue) > parseFloat(acrRemain)) {
                      Swal.fire(
                        "Account to Collector Ratio (ACR) should not be more than the remaining ratio",
                        "",
                        "error"
                      );
                    } else if (!ratioCreateValue) {
                      Swal.fire(" Ratio (ACR) is required", "", "error");
                    } else {
                      createCollector();
                      enquireCollectorDetail("");
                      // alert("created!!");
                    }
                  }}
                />

                <div className="ml-4">
                  <ButtonComponent
                    label={"Exit"}
                    buttonHeight={"29px"}
                    buttonWidth={"80px"}
                    buttonBackgroundColor={"red"}
                    buttonIcon={<FiX />}
                    onClick={() => {
                      setCreateCollectorModal(false);
                      setMaxDaysCreateValue("");
                      setMinDaysCreateValue("");
                      setCollectorGroupCreateValue("");
                      setCollectorNameCreateValue("");
                      setCollectorZoneCreateValue("");
                      setCollectorGroupZoneCreateValue("");
                      setExperienceLevelCreateValue("");
                      setGlobalCollectorCreateValue("");
                      setCheckedBranches([]);
                      setCheckedProducts([]);
                      setratioCreateValue("");
                      setArrearsDay([]);
                      enquireCollectorDetail("");
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center w-full" style={{ zoom: 0.85 }}>
              <div className="border border-[#ccc] p-2 rounded-sm w-[50%] mr-2">
                <Header title={"Link To Branch"} headerShade />

                <div className={`h-56 overflow-y-scroll`}>
                  <CustomTable
                    data={zones}
                    headers={linkToBranchHeaders}
                    loading={loadingCollectorBranches}
                    hidePagination
                    rowsPerPage={40}
                  />
                </div>
              </div>
              <div className="border border-[#ccc] p-2 rounded-sm w-[50%]">
                <Header title={"Link To Product"} headerShade />

                <div className={`h-56 overflow-y-scroll`}>
                  <CustomTable
                    data={prods}
                    headers={linkToProductHeaders}
                    loading={loadingCollectorProducts}
                    hidePagination
                    rowsPerPage={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/*
 
      _    __  __ _____ _   _ ____  __  __ _____ _   _ _____      _    _   _ ____    ____  _____ _     _____ _____ ___ ___  _   _                       _       _  
     / \  |  \/  | ____| \ | |  _ \|  \/  | ____| \ | |_   _|    / \  | \ | |  _ \  |  _ \| ____| |   | ____|_   _|_ _/ _ \| \ | |  _ __ ___   ___   __| | __ _| | 
    / _ \ | |\/| |  _| |  \| | | | | |\/| |  _| |  \| | | |     / _ \ |  \| | | | | | | | |  _| | |   |  _|   | |  | | | | |  \| | | '_ ` _ \ / _ \ / _` |/ _` | | 
   / ___ \| |  | | |___| |\  | |_| | |  | | |___| |\  | | |    / ___ \| |\  | |_| | | |_| | |___| |___| |___  | |  | | |_| | |\  | | | | | | | (_) | (_| | (_| | | 
  /_/   \_\_|  |_|_____|_| \_|____/|_|  |_|_____|_| \_| |_|   /_/   \_\_| \_|____/  |____/|_____|_____|_____| |_| |___\___/|_| \_| |_| |_| |_|\___/ \__,_|\__,_|_| 
                                                                                                                                                                   
 Amendment and Deletion Modal
*/}
      <Modal
        opened={editCollectorModal}
        onClose={() => {
          setEditCollectorModal(false);
          setAmendDetails(false);
          setBranchButtonActive(false);
          setProductButtonActive(false);
          setCheckedBranches([]);
          setCheckedProducts([]);
        }}
        withCloseButton={false}
        size={"xl"}
        trapFocus={false}
        padding={10}
        scrollAreaComponent={ScrollArea.Autosize}
        radius={"sm"}
      >
        <div style={{ zoom: 0.95 }}>
          <Header
            title={"Collector Details"}
            headerShade
            handleClose={() => {
              setEditCollectorModal(false);
              setAmendDetails(false);
            }}
            closeIcon
          />

          <br />

          {/* DETAILS TO CREATE */}

          <div className="space-y-4 py-4 ">
            <div className="py-4 border border-[#ccc] rounded-sm space-y-4">
              <div className=" w-full">
                {amendDetails ? (
                  <ListOfValue
                    label={"Collector Name"}
                    required
                    labelWidth={"20%"}
                    inputWidth={"70%"}
                    value={selectedCollector?.user_name}
                    onChange={(value) =>
                      setSelectedCollector({
                        ...selectedCollector,
                        user_name: value,
                      })
                    }
                    data={collectorAmendNames}
                  />
                ) : (
                  <InputField
                    label={"Collector Name"}
                    required
                    disabled
                    labelWidth={"20%"}
                    inputWidth={"70%"}
                    value={
                      selectedCollector?.user_name +
                        " - " +
                        selectedCollector?.fullname ===
                      "undefined - undefined"
                        ? ""
                        : selectedCollector?.user_name +
                          " - " +
                          selectedCollector?.fullname
                    }
                  />
                )}
              </div>

              <div className="flex items-center">
                <div className="w-1/2">
                  {amendDetails ? (
                    <ListOfValue
                      label={"Collector Group"}
                      required
                      id={"collector-group"}
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      data={collectorGroup}
                      onChange={(value) => {
                        setCollectorGroupValue(value);
                        setSelectedCollector({
                          ...selectedCollector,
                          collector_group: value,
                        });
                        setTimeout(() => {
                          const input =
                            document.getElementById("global-collector");
                          input?.focus();
                        }, 0);

                        // PASSING VALUE TO GET MIN DAYS AND MAX DAYS
                        getMinAndMaxDaysForAmendment(value?.split(" - ")[0]);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const input =
                            document.getElementById("global-collector");
                          input?.focus();
                        }
                      }}
                      value={selectedCollector?.collector_group}
                    />
                  ) : (
                    <InputField
                      label={"Collector Group"}
                      required
                      disabled={amendDetails ? false : true}
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      value={selectedCollector?.collector_group}
                    />
                  )}
                </div>
                <div className="w-1/2">
                  {amendDetails ? (
                    <ListOfValue
                      label={"Experience Level"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      data={experienceLevel}
                      onChange={(value) => {
                        setSelectedCollector({
                          ...selectedCollector,
                          exp_level: value,
                        });
                      }}
                      value={selectedCollector?.exp_level?.split(" - ")[0]}
                    />
                  ) : (
                    <InputField
                      label={"Experience Level"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      disabled={amendDetails ? false : true}
                      value={selectedCollector?.exp_level}
                    />
                  )}
                </div>
              </div>

              <div className="flex">
                <div className="w-[50%]">
                  {amendDetails ? (
                    <SelectField
                      label={"Global Collector"}
                      required
                      id={"global-collector"}
                      labelWidth={"40%"}
                      data={[
                        { label: "Yes", value: "Y" },
                        { label: "No", value: "N" },
                      ]}
                      value={selectedCollector?.globaluser}
                      inputWidth={"40%"}
                      onChange={(value) => {
                        setSelectedCollector({
                          ...selectedCollector,
                          globaluser: value,
                        });
                      }}
                    />
                  ) : (
                    <InputField
                      label={"Global Collector"}
                      required
                      id={"global-collector"}
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      disabled={amendDetails ? false : true}
                      value={
                        selectedCollector?.zone_name === "Global Collector"
                          ? "Yes"
                          : "No"
                      }
                    />
                  )}
                </div>

                <div className="w-[50%]">
                  {amendDetails ? (
                    <ListOfValue
                      label={"Collector Zone"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      id="collector-zone"
                      data={collectorZone}
                      onChange={(value) => {
                        setCollectorZoneValue(value);
                        setSelectedCollector({
                          ...selectedCollector,
                          zone_name: value,
                        });
                        handleCollectorBranches(value);
                      }}
                      value={selectedCollector?.zone_name?.split(" - ")[0]}
                    />
                  ) : (
                    <InputField
                      label={"Collector Zone"}
                      required
                      labelWidth={"40%"}
                      inputWidth={"40%"}
                      id="collector-zone"
                      disabled
                      value={selectedCollector?.zone_name}
                    />
                  )}
                </div>
              </div>

              <div className="flex">
                <div className="w-[50%]">
                  <InputField
                    label={"Min Arrears Days"}
                    labelWidth={"40%"}
                    inputWidth={"40%"}
                    disabled
                    textAlign={"right"}
                    value={formatNumberWithoutDecimals(
                      parseFloat(selectedCollector?.collector_min_days)
                    )}
                    // value={arrearsDayAmend[0]?.collector_min_days}
                  />
                </div>

                <div className="w-[50%]">
                  <InputField
                    label={"Max Arrears Days"}
                    labelWidth={"40%"}
                    inputWidth={"40%"}
                    disabled={amendDetails ? false : true}
                    textAlign={"right"}
                    value={formatNumberWithoutDecimals(
                      parseFloat(selectedCollector?.collector_max_days)
                    )}
                    // value={arrearsDayAmend[0]?.collector_max_days}
                  />
                </div>
              </div>

              <div className="w-[50%]">
                <InputField
                  label={"Account to Collector Ratio (%)"}
                  required
                  disabled={amendDetails ? false : true}
                  labelWidth={"60%"}
                  inputWidth={"20%"}
                  textAlign={"right"}
                  value={selectedCollector?.ratio}
                  onChange={(e) => {
                    setSelectedCollector({
                      ...selectedCollector,
                      ratio: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <ButtonComponent
                  label={amendDetails ? "Cancel" : "Edit"}
                  buttonHeight={"29px"}
                  buttonWidth={"90px"}
                  buttonBackgroundColor={amendDetails ? "orange" : "#4287f5"}
                  buttonIcon={amendDetails ? <FiX /> : <BsPen />}
                  onClick={() => {
                    setAmendDetails(!amendDetails);
                  }}
                />

                <div className="ml-4">
                  <ButtonComponent
                    label={"Remove Collector"} // prc_remove_collector
                    buttonHeight={"29px"}
                    buttonWidth={"185px"}
                    buttonBackgroundColor={"red"}
                    buttonIcon={<FiTrash />}
                    onClick={() =>
                      selectedCollector?.flag === "A"
                        ? Swal.fire({
                            title: `Are you sure you want to remove ${selectedCollector?.user_name} as a collector?`,
                            text: "",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, remove Collector",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              var zoneCode =
                                selectedCollector?.zone_name?.split(" - ")[0];
                              var collectorCode =
                                selectedCollector?.collector_group?.split(
                                  " - "
                                )[0];
                              axios
                                .post(
                                  API_SERVER + "/api/collector-removal-ok",
                                  {
                                    user_name_v: selectedCollector?.user_name,
                                    zone_name_v: zoneCode,
                                    global_branch:
                                      selectedCollector?.globaluser,
                                    clt_code_v: collectorCode,
                                  },
                                  { headers: headers }
                                )
                                .then(function (response) {
                                  console.log(response.data);
                                  if (
                                    response.data?.responseMessage?.split(
                                      " - "
                                    )[0] === "INF"
                                  ) {
                                    Swal.fire({
                                      title: response.data?.responseMessage,
                                      text: "",
                                      icon: "success",
                                    });
                                    setEditCollectorModal(false);
                                    enquireCollectorDetail("");
                                  } else {
                                    Swal.fire({
                                      title:
                                        response.data?.responseMessage?.split(
                                          ":"
                                        )[0],
                                      text: response.data?.responseMessage?.split(
                                        ":"
                                      )[1],
                                      icon: "error",
                                    });
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }
                          })
                        : Swal.fire({
                            title:
                              "ERR - 0000: Cannot remove collector - pending approval!",
                            text: "",
                            icon: "error",
                          })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-end">
                <ButtonComponent
                  label={"Apply changes"}
                  disabled={amendDetails ? false : true}
                  buttonHeight={"29px"}
                  buttonWidth={"170px"}
                  buttonColor={amendDetails ? "white" : "gray"}
                  buttonBackgroundColor={amendDetails ? "green" : "#ccc"}
                  buttonIcon={<FiCheckCircle />}
                  onClick={() => {
                    if (
                      amendDetails &&
                      parseFloat(selectedCollector?.ratio) <=
                        parseFloat(selectedCollector?.remaining) &&
                      parseFloat(selectedCollector?.ratio) > 0
                    ) {
                      amendCollector();
                      enquireCollectorDetail("");
                      // alert("amended");
                    } else {
                      Swal.fire(
                        "Account to Collector Ratio (ACR) should not be more than the remaining ratio",
                        "",
                        "error"
                      );
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex items-center w-full" style={{ zoom: 0.85 }}>
              <div className="border border-[#ccc] p-2 rounded-sm w-[50%] mr-2">
                <Header title={"Link To Branch"} headerShade />

                <div className={`h-56 overflow-y-scroll`}>
                  <CustomTable
                    data={
                      selectedCollector?.globaluser === "Y"
                        ? [["Global Collector", "Global"]]
                        : zonesAmend
                    }
                    headers={
                      selectedCollector?.globaluser === "Y"
                        ? [["Type Of Collector"], ["Zone"]]
                        : linkToBranchHeaders
                    }
                    loading={loadingCollectorBranches}
                    hidePagination
                    rowsPerPage={40}
                  />
                </div>
              </div>
              <div className="border border-[#ccc] p-2 rounded-sm w-[50%]">
                <Header title={"Link To Product"} headerShade />

                <div className={`h-56 overflow-y-scroll`}>
                  <CustomTable
                    data={prodsAmend}
                    headers={linkToProductHeaders}
                    loading={loadingCollectorProducts}
                    hidePagination
                    rowsPerPage={40}
                  />
                </div>
              </div>
            </div>

            {branchButtonActive && (
              <div style={{ zoom: 0.9 }}>
                <br />
                <hr />
                <br />

                <div className="border border-[#ccc] pb-4 rounded-sm">
                  <Header
                    title={"Branches"}
                    headerShade
                    handleClose={() => setBranchButtonActive(false)}
                    closeIcon={<FiX />}
                  />

                  <div>
                    {loadingCollectorBranches === true ? (
                      <div className="flex flex-col mt-2 items-center justify-center text-center">
                        <Spin size="large" />
                        <p>Loading branches...</p>
                      </div>
                    ) : (
                      <div className="flex items-center mt-2">
                        {checkedBranches?.map((i) => {
                          return (
                            <div className="mr-2">
                              <InputField value={i?.br_code} disabled />{" "}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {checkedBranches?.length === 0 &&
                      loadingCollectorBranches === false && (
                        <p className="animate-pulse text-center">No data</p>
                      )}
                  </div>
                </div>
              </div>
            )}

            {productButtonActive && (
              <div style={{ zoom: 0.9 }}>
                <br />
                <hr />
                <br />
                <Header
                  title={"Products"}
                  headerShade
                  handleClose={() => setProductButtonActive(false)}
                  closeIcon={<FiX />}
                />

                <div>
                  {loadingCollectorProducts === true ? (
                    <div className="flex flex-col mt-2 items-center justify-center">
                      <Spin size="large" />
                      <p>Loading products...</p>
                    </div>
                  ) : (
                    <p>Products will be here </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        opened={acrModal}
        onClose={() => {
          setAcrModal(false);
          setBgModal(false);
        }}
        withCloseButton={false}
        size={"lg"}
        trapFocus={false}
        padding={10}
        scrollAreaComponent={ScrollArea.Autosize}
        radius={"sm"}
      >
        <div
          style={{ zoom: 0.9 }}
          className="p-2 border border-[#ccc] rounded-sm"
        >
          <Header
            title="Remaining ACR (%)"
            headerShade
            closeIcon
            handleClose={() => {
              setAcrModal(false);
            }}
          />
          <div className="text-sm italic text-gray-500 pb-4 mt-2 px-3">
            <span className="font-bold">Account to Collector Ratio - </span>
            The allocations can also be auto distributed based on a preset
            percentage split ensuring that they add up to 100%.
          </div>

          {/* <Header title={"Account to Collector Ratio (ACR %)"} headerShade /> */}
          <CustomTable
            headers={acrHeaders}
            data={acrTableData}
            load={acrLoading}
            hidePagination
            rowsPerPage={40}
          />
        </div>
      </Modal>
    </div>
  );
}

export default CollectorCreation;
