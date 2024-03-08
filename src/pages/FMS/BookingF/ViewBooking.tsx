import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/themeConfigSlice";
import IconUserPlus from "../../../components/Icon/IconUserPlus";
import IconListCheck from "../../../components/Icon/IconListCheck";
import IconLayoutGrid from "../../../components/Icon/IconLayoutGrid";
import IconSearch from "../../../components/Icon/IconSearch";
import IconUser from "../../../components/Icon/IconUser";
import IconFacebook from "../../../components/Icon/IconFacebook";
import IconInstagram from "../../../components/Icon/IconInstagram";
import IconLinkedin from "../../../components/Icon/IconLinkedin";
import IconTwitter from "../../../components/Icon/IconTwitter";
import IconX from "../../../components/Icon/IconX";
import axios from "axios";
import config from "../../../congif/config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MultiSelect } from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import saveAs from "file-saver";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { includes } from "lodash";
import moment from "moment";
import update from "immutability-helper";

interface Customer {
  customer_id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  Tax_reg_no: string;
  address: string;
  citys: string;
  state: string;
  postal_code: string;
  country: string;
  address2: string;
  citys2: string;
  state2: string;
  postal_code2: string;
  country2: string;
  username: string;
  password: string;
  credit_limit: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}

interface Client {
  client_id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  address2: string;
  citys2: string;
  state2: string;
  postal_code2: string;
  country2: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface Border {
  type: string;
  charges: number;
  border_id: number;
  borderName: string;
  country_id: number;
}

interface BorderRoute {
  route_id: number;
  route_name: string;
  originCountry: number;
  originState: number;
  originCity: number;
  destinationCountry: number;
  destinationState: number;
  destinationCity: number;
  totalFare: number;
  border: Border[];
  createdAt: string;
  updatedAt: string;
}

interface Data {
  customerCreditBalance: number;
  booking_id: number;
  new_booking_id: string;
  date: string;
  customer_id: number;
  customerCreditLimit: null;
  customerCreditUsed: null;
  client_id: number;
  route_id: number;
  route_fare: number;
  all_border_fare: number;
  total_ammount: number;
  drivers: string;
  amountPayToDriver: number;
  document_path: null;
  driverDocumentFile: null;
  passportDocumentFile: null;
  idcardDocumentFile: null;
  truckDocumentFile: null;
  payment_status: string;
  remarkOnDriver: string;
  tracking_id: null;
  booking_status: string;
  invoice_status: string;
  ammount_to_balance_driver: null;
  createdAt: string;
  updatedAt: string;
  driver_id: null;
  customer: Customer;
  client: Client;
  border_Route: BorderRoute;
  driver: null;
}

interface ViewBookingProps {
  type?: "INVOICE";
}

const ViewBooking = ({ type }: ViewBookingProps) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [queryParameters] = useSearchParams();

  //   const booking_id = queryParameters.get("booking_id");

  const { booking_id } = useParams();

  const [driverTotal, setDriverTotal] = useState<any>([]);
  const [defaultParams] = useState({
    booking_id: "",
    date: "",
    route_id: 0,
    client_id: 0,
    route_fare: 0,
    all_border_fare: 0,
    total_ammount: 0,
    ammount_to_driver: "",
    customer_id: 0,
    drivers: driverTotal,
    amountPayToDriver: 0,
  });
  const invoice = {
    penalty_ammount: "",
    driver_remark: "",
  };
  const [invoiceData, setInvoiceData] = useState(invoice);
  const [documentFile, setDocumentFile] = useState(null);
  const [consignment, setConsignment] = useState<any>(null);
  const [driverDocumentFile, setDriverDocumentFile] = useState(null);
  const [passportDocumentFile, setPassportDocumentFile] = useState(null);

  const [idcardDocumentFile, setIdCardDocumentFile] = useState(null);

  const [truckDocumentFile, setTruckDocumentFile] = useState(null);
  const [anotherField, setAnotherField] = useState<any>(0);

  const [userData, setUserData] = useState<any>([]);
  const [customerData, setCustomerData] = useState<any>([]);
  const [clientData, setClientData] = useState<any>([]);
  const [driverData, setDriverData] = useState<any>([]);
  const [selectedDriverData, setSelectedDriverData] = useState<any>([]);
  const [routeData, setRouteData] = useState<any>([]);
  const [bookingsData, setBookingsData] = useState<Data | null>(null);
  const [filterrouteData, setFilterrouteData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showDriverInfo, setShowDriverInfo] = useState(false);

  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [viewContactModal, setViewContactModal] = useState<any>(false);
  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [viewMode, setViewMode] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [changeDate, setChangeDate] = useState(getFormattedDate());
  const [changePassportDate, setChangePassportDate] = useState(
    getFormattedDate()
  );
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const [changeVehicleDate, setChangeVehicleDate] = useState(
    getFormattedDate()
  );

  const [changeIdCardDate, setChangeIdCardDate] = useState(getFormattedDate());

  const [addInvoiceType, setAddInvoiceType] = useState(false);
  const [viewInvoiceType, setViewInvopiceType] = useState(false);
  const [filteredBookingsData, setFilteredBookingsData] = useState<any>([]);
  const [borderCharges, setBorderCharges] = useState<any>({});
  const [invoiceDataAll, setInvoiceDataAll] = useState([]);
  const [totalRouteFare, setRouteFare] = useState(0);
  const [totalBorderCharges, setTotalBorderCharges] = useState(0);
  const todayDate = new Date();

  const RouteFare = (fare: any) => {
    fare = fare.target.value;
    console.log(fare);

    setRouteFare((prevValue: any) => prevValue + fare);
    console.log(totalRouteFare, "88888888888");
  };

  const calculateDriverTotalAmount = (selectedDriverData:any, d:any) => { 
    const totalAmount = Number(totalBorderCharges || 0) +
      Number(getDriverBuyingAmount(d.driver_id)) +
      Number(selectedDriverData.find((e: any)=>e.driver_id === d.driver_id).waiting_amount || 0)
    
      return totalAmount;
  }

  const openModal = (contact: any = null) => {
    const json = JSON.parse(JSON.stringify(defaultParams));
    setParams(json);
    if (contact) {
      let json1 = JSON.parse(JSON.stringify(contact));
      setParams(json1);
    }

    // You can perform any necessary actions before opening the modal here
    setModalOpened(true);
  };

  const closeModal = () => {
    // You can perform any necessary actions before closing the modal here
    setModalOpened(false);
  };

  // Helper function to get the current date in "YYYY-MM-DD" format
  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    params.date = today;
    return `${year}-${month}-${day}`;
  }

  const handleSelectChange = (values: any[]) => {
    const selectedData = driverData?.filter((driver: any) =>
      values?.includes(driver?.driver_id) ? true : false
    );
    setSelectedDriverData(selectedData);

    setSelectedValues(values);
  };

  useEffect(() => {
    if (bookingsData?.drivers) {
      const drivers: {
        amount: string;
        id: number;
        name: string;
      }[] = bookingsData?.drivers ? JSON.parse(bookingsData?.drivers) : [];
    // if (bookingsData?.drivers) {
    //   const drivers: {
    //     amount: string;
    //     id: number;
    //     name: string;
    //   }[] = JSON.parse(bookingsData?.drivers);

      handleSelectChange(drivers?.map(({ id }) => id));
      // console.log("Driver", drivers);
    }
  }, [bookingsData]);

  const getDriverBuyingAmount = (id: string | number): number => {
    if (bookingsData?.drivers) {
      const drivers: {
        amount: number;
        id: number;
        name: string;
      }[] = bookingsData?.drivers ? JSON.parse(bookingsData?.drivers) : [];
      const foundAmount = drivers?.find(({ id }) => id)?.amount;

      return foundAmount || 0;
    } else {
      return 0;
    }
  };

  const getTotalBookingAmount = () => {
    if (bookingsData?.drivers) {
      const drivers: {
        amount: number;
        id: number;
        name: string;
        waiting_amount: number;
      }[] = bookingsData?.drivers?JSON.parse(bookingsData?.drivers):[];

      let totalDriversBuying = 0;

      drivers?.forEach(({ amount, waiting_amount }) => {
        totalDriversBuying +=
          Number(amount) +
          Number(bookingsData?.all_border_fare || 0) +
          Number(waiting_amount ? waiting_amount : 0);
      });

      selectedDriverData?.forEach((data : any) => {
        totalDriversBuying += Number(data?.waiting_amount || 0);
      });

      return totalDriversBuying;
    } else {
      return 0;
    }
  };

  const fetch = async () => {
    const responce = await axios.get(`${config.API_BASE_URL}/drivers`);

    const driver = await axios.get(`${config.API_BASE_URL}/drivers`);
    setDriverData(driver?.data);

    const customer = await axios.get(`${config.API_BASE_URL}/customers`);
    setCustomerData(customer?.data?.data);

    const client = await axios.get(`${config.API_BASE_URL}/client`);
    setClientData(client?.data?.data);

    const routes = await axios.get(`${config.API_BASE_URL}/routes`);

    setRouteData(routes?.data?.routes);

    setUserData(responce?.data);

    const bookings = await axios.get(
      `${config.API_BASE_URL}/bookings/${booking_id}`
    );

    setBookingsData(bookings?.data);

    setTotalBorderCharges(bookings?.data?.all_border_fare)
    setBorderCharges(JSON.parse(JSON.parse(bookings?.data?.border_charges)))

    const invoicDatas = await axios.get(`${config.API_BASE_URL}/invoice`);
    setInvoiceDataAll(invoicDatas?.data);

    setFilteredBookingsData(bookings?.data?.data); //
  };

  useEffect(() => {
    if (booking_id) {
      console.log("Call");
      dispatch(setPageTitle("Contacts"));

      fetch();
    }
  }, [addContactModal, params, booking_id]);

  const [value, setValue] = useState<any>("list");

  const changeValue = (e: any) => {
    const { value, id, name } = e.target;
    setParams({ ...params, [name]: value });
  };
  const changeValueInvoice = (e: any) => {
    const { value, id, name } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const [search, setSearch] = useState<any>("");
  // static for now
  let [contactList] = useState<any>(userData);

  const [filteredItems, setFilteredItems] = useState<any>(userData);

  useEffect(() => {
    setFilteredItems(() => {
      return userData.filter((item: any) => {
        return item.name.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList, userData, params]);
  contactList = userData;

  const saveUser = async (e: any) => {
    e.preventDefault();

    try {
      if (params.booking_id && !addInvoiceType) {
        if (documentFile) {
          const formData = new FormData();
          formData.append("document", documentFile);
          const update = await axios.put(
            `${config.API_BASE_URL}/bookings/${params.booking_id}`,
            formData
          );
          showMessage(" updated successfully.");
          setDocumentFile(null);
          closeModal();
          await fetch();
        } else {
          const update = await axios.put(
            `${config.API_BASE_URL}/bookings/${params.booking_id}`,
            params
          );
          showMessage("Booking has been updated successfully.");
        }
      } else if (params.booking_id && addInvoiceType) {
        if (consignment) {
          // Merge params and invoiceData
          // params.total_ammount = calculateTotalAmount();
          const requestData = {
            ...params,
            ...invoiceData,
            isPaid: true,
            borderCharges: Object.values(borderCharges)[0],
            // borderCharges: borderCharges,
            // invoiceId: 11,
            total_ammount: calculateTotalAmount(),
          };
          
          

          const formData: any = new FormData();

          // Append key-value pairs from requestData to formData
          Object.entries(requestData).forEach(([key, value]) => {
            formData.append(key, value);
          });

          formData.append("consignment", consignment);

          const invoiceResponse = await axios.post(
            `${config.API_BASE_URL}/invoice`,
            formData
          );

          const data = {
            total_ammount: calculateTotalAmount(),
          };
          const update = await axios.put(
            `${config.API_BASE_URL}/bookings/${params.booking_id}`,
            data
          );

          const updatePromises = Object?.entries(borderCharges).map(
            async ([borderId, newValue]) => {
              try {
                const response = await axios.put(
                  `${config.API_BASE_URL}/routes/border/charges/${borderId}`,
                  {
                    // Assuming you want to update a specific property, replace 'propertyName' with the actual property name
                    charges: newValue,
                  }
                );

                if (response.status === 200 || response.status === 204) {
                  // Additional logic if needed
                }
              } catch (error) {
                // Handle errors if needed
              }
            }
          );
          const result = await Promise.all(updatePromises);

          showMessage("Invoice Add successful");
          setConsignment(null);
          closeModal();
          await fetch();
        } else {
          const update = await axios.put(
            `${config.API_BASE_URL}/bookings/${params.booking_id}`,
            params
          );
          showMessage("Booking has been updated successfully.");
        }
      } else {
        const data = { ...params };
        const dataDriverIdAsNumber = parseInt(data.driver_id, 10);
        const matchedDriver = driverData?.find(
          (driver: any) => driver?.driver_id === dataDriverIdAsNumber
        );
        if (matchedDriver) {
          const drivingLicenseExpiryDate = new Date(
            matchedDriver.drivingLicenseExpiryDate
          );
          const passportExpiryDate = new Date(matchedDriver.passportExpiryDate);
          const idcardExpiryDate = new Date(matchedDriver.idCardExpiryDate);
          const vehicleExpiryDate = new Date(matchedDriver.truckExpiryDate);

          if (drivingLicenseExpiryDate < todayDate) {
            matchedDriver.drivingLicenseExpiryDate = changeDate;
          }

          if (passportExpiryDate < todayDate) {
            matchedDriver.passportExpiryDate = changePassportDate;
          }

          if (idcardExpiryDate < todayDate) {
            matchedDriver.idCardExpiryDate = changeIdCardDate;
          }

          if (vehicleExpiryDate < todayDate) {
            matchedDriver.truckExpiryDate = changeVehicleDate;
          }
          if (
            drivingLicenseExpiryDate < todayDate ||
            passportExpiryDate < todayDate ||
            idcardExpiryDate < todayDate ||
            vehicleExpiryDate < todayDate
          ) {
            const updateDriver = await axios.put(
              `${config.API_BASE_URL}/drivers/${dataDriverIdAsNumber}`,
              matchedDriver
            );
          }
        }

        data.new_booking_id = generateBookingNumber();
        data.total_ammount = calculateTotalAmount();
        // data.drivers = params.drivers
        console.log(data, "dattttttt");

        if (
          driverDocumentFile ||
          passportDocumentFile ||
          idcardDocumentFile ||
          truckDocumentFile ||
          data
        ) {
          const formData: any = new FormData();

          // Append key-value pairs
          const appendFormData = (data: any, formData: any, parentKey = "") => {
            for (const key in data) {
              if (data.hasOwnProperty(key)) {
                const keyName = parentKey ? `${parentKey}[${key}]` : key;
                console.log(keyName, "...........................");

                if (
                  typeof data[key] === "object" &&
                  data[key] !== null &&
                  keyName !== "date"
                ) {
                  // Convert objects to JSON strings before appending
                  formData.append(keyName, JSON.stringify(data[key]));
                } else {
                  // Append simple key-value pairs
                  formData.append(keyName, data[key]);
                }
              }
            }
          };

          appendFormData(data, formData);

          // Append passport file if exists
          if (passportDocumentFile) {
            formData.append("passportDocumentFile", passportDocumentFile);
          }

          // Append driving file if exists
          if (driverDocumentFile) {
            formData.append("driverDocumentFile", driverDocumentFile);
          }

          // Append ID card file if exists
          if (idcardDocumentFile) {
            formData.append("idcardDocumentFile", idcardDocumentFile);
          }
          if (truckDocumentFile) {
            formData.append("truckDocumentFile", truckDocumentFile);
          }

          try {
            console.log(formData, "formData", params);

            const addBooking = await axios.post(
              `${config.API_BASE_URL}/bookings`,
              formData
            );
            if (addBooking.status === 201 || addBooking.status === 200) {
              showMessage("Booking has been saved successfully.");
              setConsignment(null);
              closeModal();
              // navigator.push("/booking");
              navigate("/booking/booking");
              await fetch();
            }
            // showMessage('Booking has been saved successfully.');
          } catch (error: any) {
            // Handle error as needed
          }
        }
        const updatePromises = Object?.entries(borderCharges).map(
          async ([borderId, newValue]) => {
            try {
              const response = await axios.put(
                `${config.API_BASE_URL}/routes/border/charges/${borderId}`,
                {
                  // Assuming you want to update a specific property, replace 'propertyName' with the actual property name
                  charges: newValue,
                }
              );

              if (response.status === 200 || response.status === 204) {
                // Additional logic if needed
              }
            } catch (error) {
              // Handle errors if needed
            }
          }
        );
        const result = await Promise.all(updatePromises);
      }

      setAddContactModal(false);
    } catch (error) {
      // Handle error
    }
  };

  const showMessage = (msg = "", type = "success") => {
    const toast: any = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: "toast" },
    });
    toast.fire({
      icon: type,
      title: msg,
      padding: "10px 20px",
    });
  };

  function generateBookingNumber() {
    const prefix = "BOOK";
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generate a random number

    const bookingNumber = `${prefix}-${timestamp}-${randomSuffix}`;

    return bookingNumber;
  }

  const addbooking = async (user: any = null) => {
    setAddContactModal(true);
    setParams(defaultParams);
    setViewMode(false);
    setAddInvoiceType(false);
    setViewInvopiceType(false);
  };

  const handleDocumentChange = (e: any) => {
    setDocumentFile(e.target.files[0]);
  };

  const handleinvoiceDocumentChange = (e: any) => {
    setConsignment(e.target.files[0]);
  };

  const handleDownloadDocument = (contact: any) => {
    const documentUrl = `${config.API_DOC_URL}/uploads/${contact?.document_path}`;

    // Trigger the download using the saveAs function
    saveAs(documentUrl, "Download");
  };

  const handleChangeDriverAmt = (newValue: any, id: any, name: any) => {
    newValue = newValue.target.value;
    // setDriverTotal((prevValues: any) => ({
    //   ...prevValues,
    //   id : id,
    //   amount: newValue,
    // }));
    // setDriverTotal((prevValues : any) => {
    //   [...prevValues ,{id : id , amount : newValue}]
    // });

    setDriverTotal((prevValues: any) => {
      const updatedValues = prevValues.map((item: any) =>
        item.id === id ? { ...item, amount: newValue } : item
      );

      // If the item with the specified id doesn't exist, add it to the array
      if (!updatedValues.some((item: any) => item.id === id)) {
        updatedValues.push({ id: id, amount: newValue, name: name });
      }

      return updatedValues;
    });

    console.log("................driverTotal", driverTotal);

    params.amountPayToDriver = driverTotal.reduce(
      (acc: any, item: any) => acc + Number(item.amount),
      0
    );
    console.log(params.amountPayToDriver, ".......", driverTotal);
  };

  const handleDownloadBorderReceipt = (contact: any) => {
    const documentUrl = `${config.API_DOC_URL}/uploads/${consignment?.consignment}`;

    // Trigger the download using the saveAs function
    saveAs(documentUrl, "Download");
  };

  const handleDownloadConsignmentReceipt = () => {
    const matchingInvoice: any = invoiceDataAll.find(
      (invoice: any) =>
        invoice?.booking?.new_booking_id === params?.new_booking_id
    );

    if (matchingInvoice) {
      const documentUrl = `${config.API_DOC_URL}/uploads/${matchingInvoice?.consignmentDocumentStatus}`;

      // Trigger the download using the saveAs function
      saveAs(documentUrl, "Download");
    } else {
      // Set default values in the invoiceData state
    }
  };
  const handleDriverDocument = (e: any) => {
    setDriverDocumentFile(e.target.files[0]);
  };
  const handlePassportDocument = (e: any) => {
    setPassportDocumentFile(e.target.files[0]);
  };
  const handleIcardDocument = (e: any) => {
    setIdCardDocumentFile(e.target.files[0]);
  };
  const handleTruckdDocument = (e: any) => {
    setTruckDocumentFile(e.target.files[0]);
  };

  const calculateTotalAmount = () => {
    const baseAmount = parseInt(params.route_fare) || 0;
    const penaltyAmount = parseInt(invoiceData?.penalty_ammount) || 0;

    // Calculate ammountDriver only if addInvoiceType is true
    // const ammountDriver = addInvoiceType ? parseInt(params?.ammount_to_driver) || 0 : 0;

    const borderAmount: any = borderCharges
      ? Object.values(borderCharges).reduce(
          (acc: any, charge: any) => acc + (parseInt(charge) || 0),
          0
        )
      : 0;

    // return baseAmount + penaltyAmount + borderAmount;
    return borderAmount;
  };

  const amountPayDiver = (id: any) => {
    console.log(driverTotal, "driverTotals");

    return (
      calculateTotalAmount() +
      driverTotal.reduce(
        (acc: any, item: any) =>
          id === item.id ? acc + Number(item.amount) : 0,
        0
      )
    );
  };

  console.log(calculateTotalAmount(), "calculateTotalAmount");

  const formattedBorderData =
    driverData && driverData.length
      ? driverData.map((driver: any) => {
          return {
            label: `${driver?.name} ${driver.phone}`,
            value: driver?.driver_id,
          };
        })
      : [];

  // const updatedDriver : any = driverTotal.filter((item : any) => selectedValues.includes(item.id));
  // setDriverTotal(updatedDriver)
  // console.log(driverTotal , "0000000000000000")

  // console.log(selectedValues, "Selected Value" , updatedDriver);

  useEffect(() => {
    if (filterrouteData?.border && filterrouteData.border.length > 0) {
      const initialCharges: any = {};
      JSON.parse(filterrouteData.border).forEach((border: any) => {
        initialCharges[border?.border_id] = border.charges;
      });
      setBorderCharges(initialCharges);
    }

    const updatedDriver = driverTotal.filter((item: any) =>
      selectedValues.includes(item.id)
    );
    setDriverTotal(updatedDriver);

    params.amountPayToDriver = driverTotal.reduce(
      (acc: any, item: any) => acc + Number(item.amount),
      0
    );
    params.drivers = driverTotal;
    console.log(".......", driverTotal);
  }, [filterrouteData, selectedValues, params]);

  useEffect(() => {
    let totalSum = 0;
    console.log('borderCharges', borderCharges);
    
    for (let key in borderCharges) {
      // Convert string values to integers before adding
      totalSum += parseInt(borderCharges[key]);
    }

    setTotalBorderCharges(totalSum);
  }, [borderCharges]);

  // const saveUser = async (e: any) => {
  //   e.preventDefault();

  //   try {
  //     if (params.booking_id && !addInvoiceType) {
  //       if (documentFile) {
  //         const formData = new FormData();
  //         formData.append("document", documentFile);
  //         const update = await axios.put(
  //           `${config.API_BASE_URL}/bookings/${params.booking_id}`,
  //           formData
  //         );
  //         showMessage(" updated successfully.");
  //         setDocumentFile(null);
  //         closeModal();
  //         await fetch();
  //       } else {
  //         const update = await axios.put(
  //           `${config.API_BASE_URL}/bookings/${params.booking_id}`,
  //           params
  //         );
  //         showMessage("Booking has been updated successfully.");
  //       }
  //     } else if (params.booking_id && addInvoiceType) {
  //       if (consignment) {
  //         // Merge params and invoiceData
  //         // params.total_ammount = calculateTotalAmount();
  //         const requestData = {
  //           ...params,
  //           ...invoiceData,
  //           isPaid: true,
  //           borderCharges: Object.values(borderCharges)[0], // Extract the value from the object
  //           invoiceId: generateInvoiceNumber(),
  //           total_ammount: calculateTotalAmount(),
  //         };

  //         const formData: any = new FormData();

  //         // Append key-value pairs from requestData to formData
  //         Object.entries(requestData).forEach(([key, value]) => {
  //           formData.append(key, value);
  //         });

  //         formData.append("consignment", consignment);

  //         const invoiceResponse = await axios.post(
  //           `${config.API_BASE_URL}/invoice`,
  //           formData
  //         );

  //         const data = {
  //           total_ammount: calculateTotalAmount(),
  //         };
  //         const update = await axios.put(
  //           `${config.API_BASE_URL}/bookings/${params.booking_id}`,
  //           data
  //         );

  //         const updatePromises = Object?.entries(borderCharges).map(
  //           async ([borderId, newValue]) => {
  //             try {
  //               const response = await axios.put(
  //                 `${config.API_BASE_URL}/routes/border/charges/${borderId}`,
  //                 {
  //                   // Assuming you want to update a specific property, replace 'propertyName' with the actual property name
  //                   charges: newValue,
  //                 }
  //               );

  //               if (response.status === 200 || response.status === 204) {
  //                 // Additional logic if needed
  //               }
  //             } catch (error) {
  //               // Handle errors if needed
  //             }
  //           }
  //         );
  //         const result = await Promise.all(updatePromises);

  //         showMessage("Invoice Add successful");
  //         setConsignment(null);
  //         closeModal();
  //         await fetch();
  //       } else {
  //         const update = await axios.put(
  //           `${config.API_BASE_URL}/bookings/${params.booking_id}`,
  //           params
  //         );
  //         showMessage("Booking has been updated successfully.");
  //       }
  //     } else {
  //       const data = { ...params };
  //       const dataDriverIdAsNumber = parseInt(data.driver_id, 10);
  //       const matchedDriver = driverData?.find(
  //         (driver: any) => driver?.driver_id === dataDriverIdAsNumber
  //       );
  //       if (matchedDriver) {
  //         const drivingLicenseExpiryDate = new Date(
  //           matchedDriver.drivingLicenseExpiryDate
  //         );
  //         const passportExpiryDate = new Date(matchedDriver.passportExpiryDate);
  //         const idcardExpiryDate = new Date(matchedDriver.idCardExpiryDate);
  //         const vehicleExpiryDate = new Date(matchedDriver.truckExpiryDate);

  //         if (drivingLicenseExpiryDate < todayDate) {
  //           matchedDriver.drivingLicenseExpiryDate = changeDate;
  //         }

  //         if (passportExpiryDate < todayDate) {
  //           matchedDriver.passportExpiryDate = changePassportDate;
  //         }

  //         if (idcardExpiryDate < todayDate) {
  //           matchedDriver.idCardExpiryDate = changeIdCardDate;
  //         }

  //         if (vehicleExpiryDate < todayDate) {
  //           matchedDriver.truckExpiryDate = changeVehicleDate;
  //         }
  //         if (
  //           drivingLicenseExpiryDate < todayDate ||
  //           passportExpiryDate < todayDate ||
  //           idcardExpiryDate < todayDate ||
  //           vehicleExpiryDate < todayDate
  //         ) {
  //           const updateDriver = await axios.put(
  //             `${config.API_BASE_URL}/drivers/${dataDriverIdAsNumber}`,
  //             matchedDriver
  //           );
  //         }
  //       }

  //       data.new_booking_id = generateBookingNumber();
  //       data.total_ammount = calculateTotalAmount();

  //       // return console.log(data,"data")

  //       // Add new booking (POST request)
  //       // return console.log(data,"datadtarta")
  //       // if (driverDocumentFile) {
  //       //     const formData = new FormData();
  //       //     Object.entries(data).forEach(([key, value]) => {
  //       //         formData.append(key, value);
  //       //     });
  //       //     formData.append('driverDocumentFile', driverDocumentFile);
  //       //     const addBooking = await axios.post(`${config.API_BASE_URL}/bookings`, formData);
  //       //     console.log(addBooking, 'Add successful');
  //       //     showMessage('Booking has been saved successfully.');
  //       // }

  //       if (
  //         driverDocumentFile ||
  //         passportDocumentFile ||
  //         idcardDocumentFile ||
  //         truckDocumentFile ||
  //         data
  //       ) {
  //         const formData: any = new FormData();

  //         // Append key-value pairs
  //         Object.entries(data).forEach(([key, value]) => {
  //           formData.append(key, value);
  //         });

  //         // Append passport file if exists
  //         if (passportDocumentFile) {
  //           formData.append("passportDocumentFile", passportDocumentFile);
  //         }

  //         // Append driving file if exists
  //         if (driverDocumentFile) {
  //           formData.append("driverDocumentFile", driverDocumentFile);
  //         }

  //         // Append ID card file if exists
  //         if (idcardDocumentFile) {
  //           formData.append("idcardDocumentFile", idcardDocumentFile);
  //         }
  //         if (truckDocumentFile) {
  //           formData.append("truckDocumentFile", truckDocumentFile);
  //         }

  //         try {
  //           const addBooking = await axios.post(
  //             `${config.API_BASE_URL}/bookings`,
  //             formData
  //           );
  //           // showMessage('Booking has been saved successfully.');
  //         } catch (error: any) {
  //           // Handle error as needed
  //         }
  //       }
  //       const updatePromises = Object?.entries(borderCharges).map(
  //         async ([borderId, newValue]) => {
  //           try {
  //             const response = await axios.put(
  //               `${config.API_BASE_URL}/routes/border/charges/${borderId}`,
  //               {
  //                 // Assuming you want to update a specific property, replace 'propertyName' with the actual property name
  //                 charges: newValue,
  //               }
  //             );

  //             if (response.status === 200 || response.status === 204) {
  //               // Additional logic if needed
  //             }
  //           } catch (error) {
  //             // Handle errors if needed
  //           }
  //         }
  //       );
  //       const result = await Promise.all(updatePromises);
  //     }

  //     setAddContactModal(false);
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  function generateInvoiceNumber() {
    const prefix = "INVOICE";
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generate a random number

    const bookingNumber = `${prefix}-${timestamp}-${randomSuffix}`;

    return bookingNumber;
  }

  const getWaitingAmount = (id: any) => {
    return (
      selectedDriverData?.find((data: any) => data?.driver_id === id)
        ?.waiting_amount || 0
    );
  };

  const addInvoice = async (e: any) => {
    e.preventDefault();
  
    
    try {
      if (consignment) {
     
        
        // Merge params and invoiceData
        // params.total_ammount = calculateTotalAmount();
        const driverData = JSON.parse(JSON.parse(bookingsData?.drivers) || "");

        console.log('running', driverData);
        const drivers = driverData?.map((item : any) => {
          return {
            ...item,
            waiting_amount: getWaitingAmount(item?.id),
          };
        });
        // console.log('running', drivers);
        // const drivers:
        const requestData = {
          ...params,
          ...bookingsData,
          ...invoiceData,
          isPaid: true,
          customer_id: bookingsData?.customer_id,
          // borderCharges: Object.values(borderCharges)[0],  
          borderCharges: JSON.stringify(borderCharges),  
          invoiceId: generateInvoiceNumber(),
          total_ammount: getTotalBookingAmount(),
          drivers: JSON.stringify(drivers),
          booking_id,
        };

        console.log("requestData>>", requestData);

        const formData: any = new FormData();

        // Append key-value pairs from requestData to formData
        Object.entries(requestData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        formData.append("consignment", consignment);

        const invoiceResponse = await axios.post(
          `${config.API_BASE_URL}/invoice`,
          formData
        );

        const data = {
          total_ammount: getTotalBookingAmount(),
          drivers: JSON.stringify(drivers),
        };

        const update = await axios.put(
          `${config.API_BASE_URL}/bookings/${booking_id}`,
          data
        );

        const updatePromises = Object?.entries(borderCharges).map(
          async ([borderId, newValue]) => {
            try {
              const response = await axios.put(
                `${config.API_BASE_URL}/routes/border/charges/${borderId}`,
                {
                  // Assuming you want to update a specific property, replace 'propertyName' with the actual property name
                  charges: newValue,
                }
              );

              if (response.status === 200 || response.status === 204) {
                // Additional logic if needed
              }
            } catch (error) {
              // Handle errors if needed
            }
          }
        );

        const result = await Promise.all(updatePromises);

        navigate("/booking/booking")
        showMessage("Invoice Add successful");
        
        setConsignment(null);
      }
    } catch (error) {
      // Handle error
      
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl ml-10">
            {type === "INVOICE" ? "Add Invoice" : "Booking Details"}
          </h2>
        </div>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto "></div>
      </div>
      <div className="">
        <form onSubmit={(e) => saveUser(e)}>
          {/* <div> */}
          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="routename">Booking Id</label>
              <input
                id="booking_id"
                name="booking_id"
                value={bookingsData?.new_booking_id}
                type="text"
                placeholder="Enter Booking Id"
                className="form-input"
                disabled={viewMode || params.booking_id || viewInvoiceType}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="text"
                value={moment(bookingsData?.createdAt)?.format("DD-MM-YYYY")}
                name="date"
                className="form-input"
                disabled={viewMode || viewInvoiceType}
                required
              />
            </div>
            {/* </div> */}
          </div>

          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="routename">Select Customer</label>
              <select
                name="customer_id"
                onChange={(e) => changeValue(e)}
                className="form-select text-white-dark"
                value={bookingsData?.customer?.customer_id}
                disabled={viewMode || viewInvoiceType || addInvoiceType}
                required
              >
                <option value={0}>Select Customer</option>
                {customerData?.map((customer: any) => (
                  <option
                    key={customer.customer_id}
                    value={parseInt(customer.customer_id)}
                  >
                    {customer.company_name}
                  </option>
                ))}
              </select>

              <div className="flex">
                {customerData.map((value: any) =>
                  value.customer_id ===
                  parseInt(
                    bookingsData?.customer?.customer_id?.toString() || ""
                  ) ? (
                    <div className="flex">
                      <label className="ml-8 mt-2 font-bold text-blue-500">
                        Balance: {value.balance}
                      </label>
                      <label className="ml-8 mt-2 font-bold text-green-500">
                        Credit Limit: {value.credit_limit}
                      </label>
                      <label className="ml-8 mt-2 font-bold text-red-500">
                        Credit Use: {value.credit_limit - value.balance}
                      </label>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
            <div>
              <label htmlFor="">Receiver</label>
              <div>
                <select
                  name="client_id"
                  onChange={(e) => changeValue(e)}
                  value={bookingsData?.client_id}
                  // onClick={() => (params.client_id = client.client_id)}
                  className="form-select text-white-dark"
                  required
                  disabled={viewMode || viewInvoiceType || addInvoiceType}
                >
                  <option value="0">Select Receiver</option>
                  {clientData.map((client: any) => (
                    <option
                      key={client.client_id}
                      value={parseInt(client.client_id)}
                    >
                      {client.company_name}
                    </option>
                  ))}
                </select>

                {bookingsData?.client?.client_id ? (
                  <div>
                    {clientData.map((client: any) =>
                      client.client_id ===
                      parseInt(
                        bookingsData?.client?.client_id?.toString() || ""
                      ) ? (
                        <div className="flex">
                          <label className="ml-8 mt-2 font-bold text-blue-500">
                            {" "}
                            Name : {client.contact_person}
                          </label>
                          <label className="ml-8 mt-2 font-bold text-green-500">
                            phone_number : {client.phone_number}
                          </label>
                          {/* <label className="mr-4 font-bold text-red-500">balance : {client.balance}</label> */}
                        </div>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {/* <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4"> */}

          <div className="mt-4">
            <div>
              {driverData && (
                <div>
                  <MultiSelect
                    className="mt-4 text-b"
                    label="Select Driver"
                    placeholder="Select Driver"
                    data={formattedBorderData}
                    value={selectedValues}
                    onChange={handleSelectChange}
                    disabled={viewMode}
                  />

                  <div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr>
                            <th className="border p-4">Driver Name</th>
                            <th className="border p-4">Passport</th>
                            <th className="border p-4">Passport EXPIRE AT:</th>
                            <th className="border p-4">ID Card</th>
                            <th className="border p-4">ID Card EXPIRE AT:</th>
                            <th className="border p-4">Driver License</th>
                            <th className="border p-4">LIC EXPIRE AT:</th>
                            <th className="border p-4">Vehicle Documents</th>
                            <th className="border p-4">
                              Vehicle Documents EXPIRE AT:
                            </th>
                            <th className="border p-4">Buying Amount </th>
                            <th className="border p-4">Border Charges </th>

                            {type === "INVOICE" && (
                              <th className="border p-4">Waiting Amount</th>
                            )}

                            <th className="border p-4">Total </th>
                            {/* <th className="border p-4">waiting Amount</th> */}
                          </tr>
                        </thead>

                        {selectedDriverData.map((d: any, i: any) => (
                          <tbody>
                            <tr>
                              <td className={`pr-4 font-bold text-black`}>
                                {d.name}
                              </td>

                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.passportExpiryDate) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {d.passport_number}
                              </td>

                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.passportExpiryDate) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {new Date(d.passportExpiryDate) < new Date() ? (
                                  <>
                                    <input
                                      id=""
                                      type="date"
                                      onChange={(e) =>
                                        setChangeVehicleDate(e.target.value)
                                      }
                                      value={changeVehicleDate}
                                      name="expireDate"
                                      className="form-input"
                                      disabled={viewMode || viewInvoiceType}
                                      required
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />

                                    <div>
                                      <label
                                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                        htmlFor="driver_documents"
                                      >
                                        Passport Document
                                      </label>
                                      <input
                                        id="driver_documents"
                                        name="driver_documents"
                                        onChange={handleTruckdDocument}
                                        type="file"
                                        placeholder="Enter Truck Document"
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        required
                                        disabled={viewMode || viewInvoiceType}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    {new Date(d.passportExpiryDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("-")}
                                  </div>
                                )}
                              </td>

                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.truckExpiryDate) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {d.truckNumber}
                              </td>
                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.truckExpiryDate) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {new Date(d.truckExpiryDate) < new Date() ? (
                                  <>
                                    <input
                                      id=""
                                      type="date"
                                      onChange={(e) =>
                                        setChangeVehicleDate(e.target.value)
                                      }
                                      value={changeVehicleDate}
                                      name="expireDate"
                                      className="form-input"
                                      disabled={viewMode || viewInvoiceType}
                                      required
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />

                                    <div>
                                      <label
                                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                        htmlFor="driver_documents"
                                      >
                                        Truck Document
                                      </label>
                                      <input
                                        id="driver_documents"
                                        name="driver_documents"
                                        onChange={handleTruckdDocument}
                                        type="file"
                                        placeholder="Enter Truck Document"
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        required
                                        disabled={viewMode || viewInvoiceType}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    {new Date(d.truckExpiryDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("-")}
                                  </div>
                                )}
                              </td>

                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.drivingLicenseExpiryDate) <
                                  new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {d.drivingLicenseNumber}
                              </td>
                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.drivingLicenseExpiryDate) <
                                  new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {new Date(d.drivingLicenseExpiryDate) <
                                new Date() ? (
                                  <>
                                    <input
                                      id=""
                                      type="date"
                                      onChange={(e) =>
                                        setChangeVehicleDate(e.target.value)
                                      }
                                      value={changeVehicleDate}
                                      name="drivingLicenseExpiryDate"
                                      className="form-input"
                                      disabled={viewMode || viewInvoiceType}
                                      required
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />

                                    <div>
                                      <label
                                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                        htmlFor="driver_documents"
                                      >
                                        Document
                                      </label>
                                      <input
                                        id="driver_documents"
                                        name="driver_documents"
                                        onChange={handleTruckdDocument}
                                        type="file"
                                        placeholder="Enter Truck Document"
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        required
                                        disabled={viewMode || viewInvoiceType}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    {new Date(d.drivingLicenseExpiryDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("-")}
                                  </div>
                                )}
                              </td>

                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.passport_number) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {d.passport_number}
                              </td>
                              <td
                                className={`pr-4 font-bold ${
                                  new Date(d.passportExpiryDate) < new Date()
                                    ? "text-red-500"
                                    : "text-green-500"
                                }`}
                              >
                                {new Date(d.passportExpiryDate) < new Date() ? (
                                  <>
                                    <input
                                      id=""
                                      type="date"
                                      onChange={(e) =>
                                        setChangeVehicleDate(e.target.value)
                                      }
                                      value={changeVehicleDate}
                                      name="passportExpiryDates"
                                      className="form-input"
                                      disabled={viewMode || viewInvoiceType}
                                      required
                                      min={
                                        new Date().toISOString().split("T")[0]
                                      }
                                    />

                                    <div>
                                      <label
                                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                        htmlFor="driver_documents"
                                      >
                                        Document
                                      </label>
                                      <input
                                        id="driver_documents"
                                        name="driver_documents"
                                        onChange={handleTruckdDocument}
                                        type="file"
                                        placeholder="Enter Truck Document"
                                        className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        required
                                        disabled={viewMode || viewInvoiceType}
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <div>
                                    {new Date(d.passportExpiryDate)
                                      .toLocaleDateString("en-GB")
                                      .split("/")
                                      .join("-")}
                                  </div>
                                )}
                              </td>

                              <td>
                                <input
                                  id="booking_id"
                                  name="test"
                                  value={getDriverBuyingAmount(d.driver_id)}
                                  type="number"
                                  placeholder="Enter buying Amount"
                                  className="form-input"
                                  required
                                  // disabled={viewMode || viewInvoiceType}
                                />
                              </td>
                              <td>
                                <input
                                  id="booking_id"
                                  name="test"
                                  // onChange={(e: any) =>
                                  //   handleChangeDriverAmt(e, d.driver_id)
                                  // }
                                  value={totalBorderCharges}
                                  // value={bookingsData?.all_border_fare}
                                  type="number"
                                  placeholder="total"
                                  className="form-input"
                                  required
                                  // disabled={viewMode || viewInvoiceType}
                                />
                              </td>

                              {type === "INVOICE" && (
                                <td>
                                  <input
                                    id="waiting_amount"
                                    name="test"
                                    onChange={(e) => {
                                      const updatedData = update(
                                        selectedDriverData,
                                        {
                                          [i]: {
                                            waiting_amount: {
                                              $set: Number(e?.target?.value),
                                            },
                                          },
                                        }
                                      );
                                      setSelectedDriverData(updatedData);
                                    }}
                                    value={bookingsData?.waiting_amount}
                                    type="number"
                                    placeholder="Waiting Amount"
                                    className="form-input"
                                    required
                                    // disabled={viewMode || viewInvoiceType}
                                  />
                                </td>
                              )}

                              <td>
                                <input
                                  id="booking_id"
                                  name="test"
                                  // onChange={}
                                  value={
                                    calculateDriverTotalAmount(selectedDriverData, d)
                                  }
                                  type="number"
                                  placeholder="total"
                                  className="form-input"
                                  required
                                  // disabled={viewMode || viewInvoiceType}
                                />
                              </td>

                              {/* <td>
                                  <input
                                    id="booking_id"
                                    name=""
                                    onChange={(e: any) =>
                                      handleChangeDriverAmt(e, d.driver_id)
                                    }
                                    value={params.test}
                                    type="number"
                                    placeholder="Enter  waiting Amount"
                                    className="form-input"
                                    required
                                    // disabled={viewMode || viewInvoiceType}
                                  />
                                </td> */}
                            </tr>
                          </tbody>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-4">
            <div>
              <label htmlFor="">Select Route Name</label>
              <select
                name="route_id"
                // onChange={(e) => {
                //   params.route_id = parseInt(e.target.value);
                //   const selectedRouteData = routeData.find(
                //     (route: any) => route.route_id === parseInt(bookingsData?.route_id)
                //   );
                //   setFilterrouteData(selectedRouteData);
                //   console.log(selectedRouteData, "selectedRouteData");
                //   params.route_fare = selectedRouteData.totalFare;
                //   const all_border_fare = Array.isArray(
                //     selectedRouteData.borders
                //   )
                //     ? selectedRouteData.border.reduce(
                //         (acc: any, border: any) => acc + border.charges,
                //         0
                //       )
                //     : 0;
                //   params.all_border_fare = all_border_fare;
                // }}
                id="ctnSelect1"
                className="form-select text-white-dark"
                value={bookingsData?.route_id}
                required
                disabled={viewMode || viewInvoiceType || addInvoiceType}

                // placeholder="Enter Country"
              >
                <option value={0}>Select Route Name</option>
                {routeData.map((country: any) => (
                  <option key={country?.route_id} value={country?.route_id}>
                    {country?.route_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Table displaying selected route data */}

            {bookingsData?.route_id && (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      {/* Customize the table headers based on your data structure */}
                      <th className="border p-4">Border Name</th>
                      <th className="border p-4">border type</th>
                      <th className="border p-4">border charges</th>
                      {/* Add more headers as needed */}
                    </tr>
                  </thead>
                  <tbody>

                    {/* {JSON.stringify(bookingsData?.border_charges)}
                    {JSON.stringify(bookingsData?.border_Route?.border)} */}
                    {JSON.parse(bookingsData?.border_Route?.border).map((i: any) => (
                      <tr key={i.borderName}>
                        {/* Display data corresponding to the selected route */}
                        <td className="border p-4">{i?.borderName}</td>
                        <td className="border p-4">{i?.type}</td>
                        <td className="border p-4">
                          fff
                          <input
                          type="text"
                          defaultValue={JSON.parse(JSON.parse(bookingsData?.border_charges))[i?.border_id] || ""}
                          onChange={(e) =>{
                                setBorderCharges((prevCharges: any) => ({
                                  ...prevCharges,
                                  [i.border_id]: e.target.value,
                                }))
                                console.log('border-charges', borderCharges, e.target.value);
                                
                          }}
                            />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="routename">Buying Amount</label>
              <input
                id="booking_id"
                name="driverTotal"
                // onChange={(e) => changeValue(e)}
                value={bookingsData?.amountPayToDriver}
                type="number"
                placeholder="Enter Route Fare"
                className="form-input"
                required
                disabled={viewMode || viewInvoiceType}
              />
            </div>

            <div>
              <label htmlFor="border_charges_totalename">
                Total Border Charges
              </label>
              <input
                id="border_charges_total"
                name="border_charges_total"
                // onChange={(e) => changeValue(e)}
                // value={bookingsData?.all_border_fare}
                value={totalBorderCharges}
                type="number"
                className="form-input"
                required
                disabled={viewMode || viewInvoiceType}
              />
            </div>

            {!addInvoiceType && (
              <div>
                <label htmlFor="routename">Total Booking Amount</label>
                <input
                  id="total_amount"
                  onChange={(e) => changeValue(e)}
                  value={getTotalBookingAmount()}
                  type="number"
                  name="total_amount"
                  readOnly
                  placeholder="Enter Total Amount"
                  className="form-input"
                  required
                  disabled={viewMode || viewInvoiceType}
                />
              </div>
            )}

            {type === "INVOICE" && (
              <>
                <div>
                  <div>
                    <label htmlFor="routename">Drivers Remark</label>
                    <input
                      id="driver_remark"
                      onChange={(e) => changeValueInvoice(e)}
                      value={invoiceData.driver_remark}
                      type="text"
                      name="driver_remark"
                      placeholder="Enter Remark"
                      className="form-input"
                      // required
                      // disabled={viewMode}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="routename">Upload Receipt</label>
                    <input
                      type="file"
                      id="consignment"
                      name="consignment"
                      className="form-input"
                      onChange={handleinvoiceDocumentChange}
                      accept=".pdf, .doc, .docx"
                      required
                      multiple
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div>
                    <label htmlFor="routename">
                      Upload Consignment Document
                    </label>
                    <input
                      type="file"
                      id="consignment"
                      name="consignment"
                      className="form-input"
                      onChange={handleinvoiceDocumentChange}
                      accept=".pdf, .doc, .docx"
                      required
                      multiple
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {addInvoiceType ? (
            <>
              <div className="mt-4">
                <div>
                  <label htmlFor="routename">Drivers Remark</label>
                  <input
                    id="driver_remark"
                    onChange={(e) => changeValueInvoice(e)}
                    value={invoiceData.driver_remark}
                    type="text"
                    name="driver_remark"
                    placeholder="Enter Remark"
                    className="form-input"
                    // required
                    // disabled={viewMode}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <label htmlFor="routename">penalty Amount</label>
                  <input
                    id="penalty_ammount"
                    onChange={(e) => changeValueInvoice(e)}
                    value={invoiceData.penalty_ammount}
                    type="number"
                    name="penalty_ammount"
                    placeholder="Enter Penalty Amount"
                    className="form-input"
                    // required
                    // disabled={viewMode}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <div>
                    <label htmlFor="routename">
                      Upload Consignment Document
                    </label>
                    <input
                      type="file"
                      id="consignment"
                      name="consignment"
                      className="form-input"
                      onChange={handleinvoiceDocumentChange}
                      accept=".pdf, .doc, .docx"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <label htmlFor="routename">Total Amount</label>
                  <input
                    id="total_amount"
                    onChange={(e) => changeValue(e)}
                    value={calculateTotalAmount()}
                    type="number"
                    name="total_amount"
                    readOnly
                    placeholder="Enter Total Amount"
                    className="form-input"
                    required
                    disabled={viewMode || viewInvoiceType}
                  />
                </div>
              </div>
            </>
          ) : viewInvoiceType ? (
            <>
              <div className="mt-4">
                <div>
                  <label htmlFor="routename">Drivers Remark</label>
                  <input
                    id="driver_remark"
                    onChange={(e) => changeValueInvoice(e)}
                    value={invoiceData.driver_remark}
                    type="text"
                    name="driver_remark"
                    placeholder="Enter Remark"
                    className="form-input"
                    // required
                    disabled={viewInvoiceType}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <label htmlFor="routename">penalty Amount</label>
                  <input
                    id="penalty_ammount"
                    onChange={(e) => changeValueInvoice(e)}
                    value={invoiceData.penalty_ammount}
                    type="number"
                    name="penalty_ammount"
                    placeholder="Enter Penalty Amount"
                    className="form-input"
                    // required
                    disabled={viewInvoiceType}
                  />
                </div>
              </div>

              {!viewInvoiceType ? (
                <div className="mt-4">
                  <div>
                    <div>
                      <label htmlFor="routename">
                        Upload Consignment Document
                      </label>
                      <input
                        type="file"
                        id="consignment"
                        name="consignment"
                        className="form-input"
                        onChange={handleinvoiceDocumentChange}
                        accept=".pdf, .doc, .docx"
                        required
                        disabled={viewInvoiceType}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4">
                  <label
                    className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    htmlFor="driver_documents"
                  >
                    Consignment Receipt
                  </label>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleDownloadConsignmentReceipt()}
                  >
                    View Consignment Receipt
                  </button>
                </div>
              )}
            </>
          ) : (
            ""
          )}

          {type === "INVOICE" && (
            <div className="flex justify-end items-center mt-8">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => {
                  setAddContactModal(false);
                  navigate("/booking/booking");
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary ltr:ml-4 rtl:mr-4"
                onClick={(e) => addInvoice(e)}
              >
                Add Invoice
              </button>
            </div>
          )}

          {!viewContactModal && (
            <div className="flex justify-end items-center mt-8">
              {/*  */}
              {/* <div className="flex gap-4 items-center justify-center">
                                                        <button
                                                            onClick={() => setIsOpen(!isOpen)}
                                                            className="bg-success ltr:ml-4 rtl:mr-4 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                                        >
                                                            view
                                                        </button>
                                                    </div> */}

              {/* Pop-up Box */}
              {/* {isOpen && (
                <div
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-50 flex items-center justify-center"
                >
                  <div className="bg-white p-8 rounded shadow-lg w-96">
                    <p>Details of Client</p>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )} */}
              {/* <button
                type="submit"
                className="btn btn-primary ltr:ml-4 rtl:mr-4"
              >
                {params.booking_id &&
                !addInvoiceType &&
                !viewMode &&
                !viewInvoiceType
                  ? "Edit Booking"
                  : params.booking_id && addInvoiceType
                  ? "Add Invoice"
                  : params.booking_id &&
                    viewInvoiceType &&
                    !addInvoiceType &&
                    !viewMode
                  ? "Edit Booking"
                  : "Add Booking"}
              </button> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ViewBooking;
