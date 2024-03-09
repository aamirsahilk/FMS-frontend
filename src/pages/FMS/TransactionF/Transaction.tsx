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
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import update from "immutability-helper";
import ReactSelect from "react-select";

const Transaction = () => {
  const dispatch = useDispatch();
  const [defaultParams] = useState({
    transaction_id: "",
    date: "",
    route_name: "",
    origin: "",
    bookings: "",
    destination: "",
    driver_name: "",
    payable_ammount: "",
    ammount_to_driver: "",
    mode: "",
    cheque_number: "",
    bookingID: "",
    new_trackingId: "",
    amount: "",
    waitingAmount: {},
  });

  const [drivers, setDrivers] = useState([]);
  const [userData, setUserData] = useState<any>([]);
  const [bookingData, setBookingData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [filterDriverData, setFilterDriverData] = useState<any>([]);

  const [params, setParams] = useState<any>(
    JSON.parse(JSON.stringify(defaultParams))
  );
  const [addContactModal, setAddContactModal] = useState<any>(false);
  const [viewContactModal, setViewContactModal] = useState<any>(false);

  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [viewMode, setViewMode] = useState(false);
  const [bookingId, setBookingId] = useState("");
  // Helper function to get the current date in "YYYY-MM-DD" format
  let updateWaitingAmount: any = {};
  const fetch = async () => {
    const response = await axios.get(`${config.API_BASE_URL}/drivers`);

    setDrivers(response?.data);

    const { data } = await axios.get(
      `${config.API_BASE_URL}/bookings?payment_status=unpaid`
    );

    const activeBookingData = data?.data?.filter(
      (item: any) => item?.booking_status !== "complete"
    );
    setUserData(activeBookingData);
    const responce = await axios.get(`${config.API_BASE_URL}/transactions`);
    setBookingData(responce.data);
  };

  useEffect(() => {
    dispatch(setPageTitle("Contacts"));

    fetch();
  }, [addContactModal]);

  const [value, setValue] = useState<any>("list");

  const changeValue = (e: any) => {
    const { value, id, name } = e.target;
    setParams({ ...params, [name]: value });
  };

  const [search, setSearch] = useState<any>("");
  // static for now
  let [contactList] = useState<any>(userData);

  const [filteredItems, setFilteredItems] = useState<any>(userData);

  useEffect(() => {
    setFilteredItems(() => {
      return userData.filter((item: any) => {
        return item.payment_status.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search, contactList, userData]);
  contactList = userData;

  // const saveUser = async () => {
  //     if (Object.values(params).some((x) => x === null || x === '')) {
  //         showMessage('somthing  is missing', 'error');
  //         return true;
  //     }
  //     // if (!params.company_name) {
  //     //     showMessage('somthing  is missing', 'error');
  //     //     return true;
  //     // }
  //     // if (!params.email) {
  //     //     showMessage('somthing  is missing', 'error');
  //     //     return true;
  //     // }
  //     // if (!params.phone_number) {
  //     //     showMessage('somthing  is missing', 'error');
  //     //     return true;
  //     // }
  //     // if (!params.contact_person) {
  //     //     showMessage('somthing  is missing', 'error');
  //     //     return true;
  //     // }
  //     // if (!params.password) {
  //     //     showMessage('Password is required.', 'error');
  //     //     return true;
  //     // }

  //     console.log(params, 'paraams >>>>>>>>>>>>>>>>>');
  //     if (params.client_id) {
  //         //update user

  //         delete params.id;
  //         let user: any = filteredItems.find((d: any) => d.client_id === params.client_id);
  //         // const update = await axios.put(`http://localhost:3004/api/users:${params.id}`,params)
  //         // console.log(update);
  //         const update = await axios.put(`${config.API_BASE_URL}/client/${params.client_id}`, params);
  //         console.log(update, 'lets checck');
  //     } else {
  //         //add user
  //         let maxUserId = filteredItems.length ? filteredItems.reduce((max: any, character: any) => (character.id > max ? character.id : max), filteredItems[0].id) : 0;

  //         let user = {
  //             id: maxUserId + 1,
  //             path: 'profile-35.png',
  //             name: params.name,
  //             email: params.email,
  //             phone: params.phone,
  //             role: params.role,
  //             location: params.location,
  //             posts: 20,
  //             followers: '5K',
  //             following: 500,
  //         };
  //         filteredItems.splice(0, 0, user);
  //         //   searchContacts()
  //         delete params.id;
  //         delete params.location;
  //         // params.params.id = 10000
  //         params.username = params.phone_number;
  //         let addUSer = await axios.post('http://localhost:3004/api/client', params);
  //         setAddContactModal(false);
  //         showMessage('User has been saved successfully.');
  //     }
  //     setAddContactModal(false);
  // };

  const editUser = async (user: any = null) => {
    const json = JSON.parse(JSON.stringify(defaultParams));
    if (user) {
      let json1 = JSON.parse(JSON.stringify(user));
      // setParams(json);
      setParams(json1);
      formik.setValues(json1);

      // console.log(update);
    }
    // const update = await axios.put(`http://localhost:3004/api/client/${params.id}`,params)
    // console.log(update , "update >>>>>>>>>>>>>>>>>>>");
    setViewContactModal(false);
    setAddContactModal(true);
  };

  const deleteUser = async (user: any = null) => {
    // setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
    await axios.delete(
      `${config.API_BASE_URL}/transactions/${user.transaction_id}`
    );
    showMessage("Transection has been deleted successfully.");
    await fetch();
  };

  const viewUser = async (user: any = null) => {
    const json = JSON.parse(JSON.stringify(defaultParams));
    
    if (user) {
      let json1 = JSON.parse(JSON.stringify(user));
      console.log('user', json1);
      setParams(json1);
      formik.setValues(json1);
      Driverdata(json1);
    }
    setAddContactModal(true);
    setViewMode(true);
    // alert();
    
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
  const validationSchema = Yup.object().shape({
    // transaction_id: Yup.string().required('Transaction Id is required'),
    date: Yup.string().required("Date is required"),
    route_name: Yup.string().required("Route Name is required"),
    origin: Yup.string().required("Origin is required"),
    bookings: Yup.string().required("Bookings is required"),
    destination: Yup.string().required("Destination is required"),
    // payable_ammount: Yup.string().required("Payable Ammount is required"),
    // ammount_to_driver: Yup.string().required("Ammout To Driver is required"),
    mode: Yup.string().required("Mode is required"),
    cheque_number: Yup.string().when("mode", {
      is: (mode: string) => mode !== "cash", // Add conditions based on your validation logic
      then: Yup.string().required("Cheque Number is required"),
      otherwise: Yup.string().notRequired(),
    }),
    // driver_name: Yup.string().required("Driver Name is required"),
  });

  const initialValues = {
    transaction_id: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
    route_name: "",
    origin: "",
    bookings: "",
    mode: "",
    cheque_number: "",
    new_trackingId: "",
    ammount_to_balance_driver: "",
    destination: "",
    drivers: [
      {
        id: "",
        name: "",
        Driver_Payable: "",
        Border_Charges: "",
        waitingAmt: "",
        paidAmount: "",
        total: "",
        balance: "",
      },
    ],
    amount: 0,
  };

  const formik: any = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values: any) => {
      console.log("values>>", values);

      try {
        if (params?.transaction_id) {
          const totalAmmount =
            Number(formik.values.ammount_to_driver) -
            Number(formik.values.payable_ammount);
          const totalAmmountPaid =
            Number(formik.values.ammount_to_driver) +
            Number(formik.values.payable_ammount);

          const trasectionOject = {
            ammount_to_driver: totalAmmount,
            ammount_to_balance_driver: totalAmmountPaid,
          };

          // const update = await axios.put(`${config.API_BASE_URL}/bookings/${params.bookingID}`, trasectionOject);

          const data = { ...params };
          data.ammount_to_driver = totalAmmount;
          const response = await axios.put(
            `${config.API_BASE_URL}/transactions/${params.transaction_id}`,
            data
          );
          console.log(data, "data");

          if (response.status === 200 || response.status === 204) {
            showMessage(`Customer updated`);
            formik.resetForm();
            setAddContactModal(false);
            setFilterDriverData([]);
          } else {
          }
        } else {
          let ammount_to_driver = 0;

          const totalAmmountPaid =
            Number(formik.values.ammount_to_balance_driver) +
            Number(formik.values.payable_ammount);

          const drivers = filterDriverData?.map((data) => {
            ammount_to_driver += Number(data?.current_pay_amount);

            return {
              amount: data?.amount,
              id: data?.id,
              pay_amount: data?.pay_amount + data?.current_pay_amount,
            };
          });

          const update: any = await axios.put(
            `${config.API_BASE_URL}/bookings/${values.booking_id}`,
            { drivers: JSON.stringify(drivers) }
          );

          const data: any = { ...values, bookingID: values.booking_id };
          data.ammount_to_driver = ammount_to_driver;
          data.payable_ammount = ammount_to_driver;

          data.new_trackingId = generateTransectionNumber();
          const Data = await axios.post(
            `${config.API_BASE_URL}/transactions`,
            data
          );

          showMessage("Booking has been updated successfully.");

          if (Data.status === 201) {
            showMessage(`New customer created`);
            formik.resetForm();
            setAddContactModal(false);
            setFilterDriverData([]);
          } else {
          }
        }
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          Object.values(error.response.data.message).map((m: any) => {
            showMessage(m);
          });
        } else {
          console.log("Something went wrong:", error);
        }
      }
    },
  });

  console.log("formik>>", formik?.errors);

  const saveUser = async (e: any) => {
    const trasction = await axios.post(
      `${config.API_BASE_URL}/transactions`,
      formik.values
    );
    if (trasction.status === 201) {
      setViewContactModal(false);
      showMessage("transactions has been saved successfully.");
    }
    e.preventDefault();
  };

  function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const addTransection = async (user: any = null) => {
    formik.setValues(initialValues); // Set the initial values
    setAddContactModal(true);
    setParams(initialValues);
  };

  function generateTransectionNumber() {
    const prefix = "TRANSACTION";
    const timestamp = new Date().getTime(); // Get the current timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generate a random number

    const bookingNumber = `${prefix}-${timestamp}-${randomSuffix}`;

    return bookingNumber;
  }

  const getDriverName = (id: number | string) => {
    return drivers?.find((driver: any) => driver?.driver_id === id)?.name || "";
  };

  async function Driverdata(json) {

    // console.log(userData, 'find', json.bookings, formik.values.bookings);
    const value = json ? json.bookings : formik.values.bookings;
    const selectedBooking = userData.find(
      (id: any) => id?.new_booking_id === value
      );
      
      if (!selectedBooking) {
        return;
      }

    const driver = JSON.parse(selectedBooking?.drivers);

    console.log("driver>>>", driver);

    const DriverSummary = Object.keys(driver).map((id) => {
      // const selectedDriver = formik.values.drivers.find(
      //   (driverData: any) => driverData.id === driver[id].id
      // );
      //console.log('pay-----',driver[id].pay_amount);
      
      const waiting_amount: number = driver[id]?.waiting_amount || 0;
      const pay_amount = driver[id].pay_amount || 0;

      const total =
        parseInt(driver[id].amount) +
        selectedBooking.all_border_fare +
        waiting_amount;

      return {
        id: driver[id].id,
        name: getDriverName(driver[id].id),
        Driver_Payable: driver[id].amount,
        amount: driver[id].amount,
        Border_Charges: selectedBooking.all_border_fare,
        waiting_amount,
        pay_amount,
        total,
        balance: total - pay_amount,
      };
    });

    

    formik.values.drivers = DriverSummary;
    console.log('driverdata', DriverSummary);
    
    setFilterDriverData(DriverSummary);

    //   filterDriver.push({
    //     id: driver[id],
    //     name: driverData.find((name: any) => name.driver_id === driver[id].id)
    //       .name,
    //     Driver_Payable: driver[id].amount,
    //     Border_Charges: selectedBooking.all_border_fare,
    //     Waiting_Amount: waitingAmt,
    //     total,
    //     paidAmount,
    //     balance: total - paidAmount,
    //   });
  }
  console.log(">>>>>>>>>>>>>>>>>>>>>", formik.values.drivers);

  // const handleInputChange = (e: any, Id: any, type: string) => {
  //   let waiting_amount: any;
  //   let amount = 0;

  //   type === "c" && (waiting_amount = e.target.value);
  //   type === "amount" && (amount = e.target.value);
  //   switch (type) {
  //     case "waiting_amount":
  //       waiting_amount = e.target.value;

  //       let updateValue = formik.values.drivers.map((id: any) => {
  //         if (id.id === Id) {
  //           id.waiting_amount = parseInt(waiting_amount);
  //         }
  //         return id;
  //       });
  //       formik.values.drivers = updateValue;
  //       setFilterDriverData(updateValue);
  //       console.log("updateValue >>>>>>>>>>>>>>>>>>>>>>>>>", updateValue);

  //       break;
  //     case "amount":
  //       amount = e.target.value;
  //       formik.values.amount = amount;
  //       params.amount = amount;
  //       break;
  //     default:
  //       break;
  //   }
  //   Driverdata();

  //   // setFilterDriverData(filterDriver);

  //   // Update the state or perform any other logic with the changed value
  // };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Booking Payments</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addTransection()}
              >
                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                Add Booking Payments
              </button>
            </div>
            <div>
              <Button className="btn btn-primary" onClick={open}>
                Filter
              </Button>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${
                  value === "list" && "bg-primary text-white"
                }`}
                onClick={() => setValue("list")}
              >
                <IconListCheck />
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${
                  value === "grid" && "bg-primary text-white"
                }`}
                onClick={() => setValue("grid")}
              >
                <IconLayoutGrid />
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Contacts"
              className="form-input py-2 ltr:pr-11 rtl:pl-11 peer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="button"
              className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary"
            >
              <IconSearch className="mx-auto" />
            </button>
          </div>
        </div>
      </div>
      {value === "list" && (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
          <div className="table-responsive">
            <table className="table-striped table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Payment Id</th>
                  <th>Date</th>
                  <th>Booking Id</th>
                  {/* <th>Driver Name</th> */}
                  <th>Amount</th>
                  <th>mode</th>
                  <th className="!text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
             
                {bookingData.map((contact: any, index: any) => {
                  return (
                    <tr key={contact.id}>
                      <td className="whitespace-nowrap">
                        {index === 0 ? 1 : index + 1}
                      </td>
                      <td className="whitespace-nowrap">
                        {contact?.transaction_id}
                      </td>
                      <td className="whitespace-nowrap">
                        {moment(contact?.date).format("DD/MM/YYYY")}
                      </td>
                      <td className="whitespace-nowrap">{contact?.bookings}</td>
                      {/* <td className="whitespace-nowrap">
                        {contact?.driver_name}
                      </td> */}
                      <td className="whitespace-nowrap">
                        {contact?.payable_ammount}
                      </td>
                      <td className="whitespace-nowrap">{contact?.mode}</td>
                      <td>
                        <div className="flex gap-4 items-center justify-center">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => viewUser(contact)}
                          >
                            view
                          </button>
                          {/* <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editUser(contact)}>
                                                        Edit
                                                    </button> */}
                          {/* <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteUser(contact)}>
                                                        Delete
                                                    </button> */}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Transition appear show={addContactModal} as={Fragment}>
        <Dialog
          as="div"
          open={addContactModal}
          onClose={() => {
            setAddContactModal(false);
            setFilterDriverData([]);
            setViewMode(false);
          }}
          className="relative z-[51]"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[black]/60" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 py-8">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden  text-black dark:text-white-dark">
                  <button
                    type="button"
                    onClick={() => {
                      setAddContactModal(false);
                      setFilterDriverData([]);
                      setViewMode(false);
                    }}
                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                  >
                    <IconX />
                  </button>
                  <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    {viewMode
                      ? "Transaction Details"
                      : params.transaction_id
                      ? "Edit Transaction"
                      : "Add Transaction"}
                  </div>
                  <div className="p-5">
                    <form onSubmit={formik.handleSubmit}>
                      <div className='grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4"'>
                        <div className="mr-5">
                          <label htmlFor="routename">Transaction Id</label>
                          <input
                            id="transactionid"
                            name="transaction_id"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={
                              formik.values.new_trackingId ||
                              generateTransectionNumber()
                            }
                            type="text"
                            placeholder="Enter Transaction Id"
                            className="form-input"
                            required
                            disabled={viewMode || params.transaction_id}
                          />
                          {formik.touched.transaction_id &&
                            formik.errors.transaction_id && (
                              <div className="text-red-500 text-sm">
                                {formik?.errors?.transaction_id}
                              </div>
                            )}
                        </div>
                        <div className="mr-5">
                          <label htmlFor="routename">Select Booking ID</label>
                            {/* {JSON.stringify(formik.values.bookings)} */}
                          <ReactSelect
                            name="bookings"
                            id="bookings"
                            placeholder="Select Booking ID"
                            options={
                              userData && userData?.length > 0
                                ? userData?.map((data) => {
                                    return {
                                      label: data?.new_booking_id,
                                      value: data?.new_booking_id,
                                    };
                                  })
                                : []
                            }
                            value={{
                              label: formik.values.bookings,
                              value: formik.values.bookings,
                            }}
                            onChange={(e) => {
                              // formik.values.bookings = e?.value;
                              formik.setFieldValue('bookings', e?.value);
                              userData?.map((v: any) => {
                                if (
                                  v.new_booking_id === formik.values.bookings
                                ) {
                                  formik.values.route_name =
                                    v.border_Route.route_name;
                                  formik.values.route_name =
                                    v.border_Route.route_name;
                                  formik.values.origin =
                                    v.border_Route.Booking_origin_Country.country_name;
                                  formik.values.destination =
                                    v.border_Route.Booking_destination_Country.country_name;
                                  formik.values.booking_id = v.booking_id;

                                  // setBookingId(v.booking_id);
                                }
                                // formik.handleChange(e);
                              });
                              Driverdata();
                            }}
                          />

                          {/* {!formik.values.bookings && (
                            <p className="opacity-70 top-2.5 left-2.5 absolute">
                              Select Customer
                            </p>
                          )} */}

                          {/* <label htmlFor="routename">Select Bookings</label>

                          <select
                            name="bookings"
                            onChange={(e) => {
                              formik.values.bookings = e.target.value;
                              userData?.map((v: any) => {
                                if (
                                  v.new_booking_id === formik.values.bookings
                                ) {
                                  formik.values.route_name =
                                    v.border_Route.route_name;
                                  formik.values.route_name =
                                    v.border_Route.route_name;
                                  formik.values.origin =
                                    v.border_Route.Booking_origin_Country.country_name;
                                  formik.values.destination =
                                    v.border_Route.Booking_destination_Country.country_name;
                                  formik.values.booking_id = v.booking_id;

                                  // setBookingId(v.booking_id);
                                }
                                formik.handleChange(e);
                              });
                              Driverdata();
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.bookings}
                            className="form-select text-white-dark"
                            required
                            disabled={viewMode}
                          >
                            <option value="">Select Bookings</option>
                            {userData?.map((booking_: any) => (
                              <option
                                key={booking_.new_booking_id}
                                value={booking_.new_booking_id}
                              >
                                {booking_.new_booking_id}
                              </option>
                            ))}
                          </select> */}
                          {formik.touched.bookings &&
                            formik.errors.bookings && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.bookings}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                        {/* {JSON.stringify(formik?.values?.date.substring(0, 10))} */}
                          <label htmlFor="routename">Date</label>
                          <input
                            id="date"
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            // value=
                            value={formik?.values?.date.substring(0, 10)}
                            placeholder="--/--/--"
                            className="form-input"
                            disabled={viewMode}
                            // defaultValue={}
                            required
                          />
                          {formik.touched.date && formik.errors.date && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.date}
                            </div>
                          )}
                        </div>
                        <div>
                          <label htmlFor="routename">Route Name</label>
                          <input
                            id="routename"
                            type="text"
                            name="route_name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.route_name}
                            placeholder="Enter Route Name"
                            className="form-input"
                            required
                            disabled={viewMode}
                            readOnly
                          />
                          {formik.touched.route_name &&
                            formik.errors.route_name && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.route_name}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="routename">Origin</label>
                          <input
                            name="origin"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.origin}
                            placeholder="Enter Origin"
                            className="form-input text-white-dark"
                            required
                            disabled={viewMode}
                            readOnly
                          ></input>
                          {formik.touched.origin && formik.errors.origin && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.origin}
                            </div>
                          )}
                        </div>
                        <div>
                          <label htmlFor="routename">Destination</label>
                          <input
                            name="destination"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.destination}
                            placeholder="Enter Destination"
                            className="form-input text-white-dark"
                            required
                            disabled={viewMode}
                            readOnly
                          ></input>
                          {formik.touched.destination &&
                            formik.errors.destination && (
                              <div className="text-red-500 text-sm">
                                {formik.errors.destination}
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="p-5 mt-5 mb-5">
                        <table className="min-w-full bg-white border border-gray-200">
                          <thead>
                            <tr className="bg-gray-100">
                              {/* <th className="py-2 px-4 border-b border-gray-200">ID</th> */}
                              <th className="py-2 px-4 border-b border-gray-200">
                                Name
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Buying Amount
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Border Charges
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Waiting Amount
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Total Amount
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Paid Amount
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Balance
                              </th>
                              <th className="py-2 px-4 border-b border-gray-200">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                              {JSON.stringify(filterDriverData)}
                            {filterDriverData &&
                              filterDriverData?.length > 0 &&
                              filterDriverData.map((row: any, index) => (
                                <tr key={row.id}>
                                  {/* <td className="py-2 px-4 border-b border-gray-200">{row.id}</td> */}
                                  <td className="py-2 px-4 border-b text-center  border-gray-200">
                                    {row.name}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    {row.Driver_Payable}
                                  </td>
                                  <td className="">{row.Border_Charges}</td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    {row?.waiting_amount || "-"}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    {row.total}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    {row.pay_amount}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    {row.balance}
                                  </td>
                                  <td className="py-2 px-4 border-b text-center border-gray-200">
                                    <input
                                      id="current_pay_amount"
                                      type="number"
                                      name="current_pay_amount"
                                      value={row?.current_pay_amount}
                                      onChange={(e) => {
                                        const updatedData = update(
                                          filterDriverData,
                                          {
                                            [index]: {
                                              current_pay_amount: {
                                                $set: Number(e?.target?.value),
                                              },
                                            },
                                          }
                                        );

                                        setFilterDriverData(updatedData);
                                        // handleInputChange(e, row.id, "amount");
                                      }}
                                      // value={params.amount}
                                      className="form-input"
                                      // disabled={viewMode || viewInvoiceType}
                                      required
                                    />
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4">
                        <div>
                          <label htmlFor="routename">Payment Mode</label>
                          <select
                            name="mode"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.mode}
                            className="form-select text-white-dark"
                            required
                            disabled={viewMode}
                          >
                            <option value="">Select payment mode</option>
                            <option value="cash"> cash</option>
                            <option value="check"> check</option>
                            <option value="wire"> wire</option>
                          </select>
                          {/* {formik.touched.bookings && formik.errors.bookings && <div className="text-red-500 text-sm">{formik.errors.bookings}</div>} */}
                          {formik.touched.mode && formik.errors.mode && (
                            <div className="text-red-500 text-sm">
                              {formik.errors.mode}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        {formik.values.mode != "cash" ? (
                          <div>
                            <label htmlFor="routename">
                              Cheque Number / Ref No
                            </label>
                            <input
                              id="payable_ammount"
                              type="number"
                              name="cheque_number"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.cheque_number}
                              placeholder="Enter Cheque Number / ref No"
                              className="form-input"
                              required
                              disabled={viewMode}
                            />
                            {formik.touched.cheque_number &&
                              formik.errors.cheque_number && (
                                <div className="text-red-500 text-sm">
                                  {formik.errors.cheque_number}
                                </div>
                              )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      {!viewContactModal && !viewMode && (
                        <div className="flex justify-end items-center mt-8">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => {
                              setAddContactModal(false);
                              setFilterDriverData([]);
                            }}
                          >
                            Cancel
                          </button>

                          {params.transaction_id ? ( // Check if params.vehicle_id exists
                            <button
                              type="submit"
                              className="btn btn-primary ltr:ml-4 rtl:mr-4"
                              // onClick={() => {
                              //     // Handle edit action
                              // }}
                            >
                              Update
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="btn btn-primary ltr:ml-4 rtl:mr-4"
                              // onClick={() => {
                              //     // Handle submit action
                              // }}
                            >
                              Submit
                            </button>
                          )}
                        </div>
                      )}
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* filter */}
      <Modal opened={opened} onClose={close} title="Filter">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid mt-4 grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="routename">Date From</label>
              <input
                id="date"
                type="date"
                name="date_from"
                onChange={(e) => changeValue(e)}
                value={params.date_from}
                placeholder="--/--/--"
                className="form-input"
                required
              />
            </div>
            <div>
              <label htmlFor="routename">Date To</label>
              <input
                id="date"
                type="date"
                name="date_to"
                onChange={(e) => changeValue(e)}
                value={params.date_to}
                placeholder="--/--/--"
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="routename">Select Driver</label>
            <select
              id="routename"
              name="driver"
              onChange={(e) => changeValue(e)}
              value={params.driver_name}
              className="form-select"
              required
            >
              <option value="">Select Driver</option>
              <option value="c1">D1</option>
              <option value="c2">D2</option>
              <option value="c3">D3</option>
            </select>
          </div>
          <div className="flex justify-end items-center w-100 mt-8">
            <button type="button" className="btn btn-outline-success">
              Filter
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Transaction;
