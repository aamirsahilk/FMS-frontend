import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
import moment from "moment";
import IconLoader from "../../../components/Icon/IconLoader";
import { CSVLink } from "react-csv";
import _ from "lodash";

interface Driver {
  driver_id: number;
  name: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  VehicleDetails: string;
  DocumnetsDetails: string;
  passport_number: string;
  passportExpiryDate: string;
  idCardNumber: string;
  idCardExpiryDate: string;
  drivingLicenseNumber: string;
  drivingLicenseExpiryDate: string;
  truckNumber: string;
  truckExpiryDate: string;
  status: string;
  truckType: string;
  remark: string;
  createdAt: string;
  updatedAt: string;
}

interface Report {
  customerCreditBalance: number;
  booking_id: number;
  new_booking_id: string;
  date: string;
  customer_id: number;
  customerCreditLimit: number;
  customerCreditUsed: number;
  client_id: number;
  route_id: number;
  route_fare: number;
  all_border_fare: number;
  total_ammount: number;
  drivers: string;
  amountPayToDriver: number;
  document_path: string;
  driverDocumentFile: string;
  passportDocumentFile: string;
  idcardDocumentFile: string;
  truckDocumentFile: string;
  payment_status: string;
  remarkOnDriver: string;
  tracking_id: string | number;
  booking_status: string;
  invoice_status: string;
  ammount_to_balance_driver: number;
  createdAt: string;
  updatedAt: string;
  driver_id: number;
  customer: { company_name: string };
  client: { company_name: string };
  driver: null;
  border_Route: {
    route_name: string;
    Booking_destination_Country: { country_name: string };
    Booking_origin_Country: { country_name: string };
  };
  trackingsses: [];
}

const DriverReport = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState<any>("");
  const [value, setValue] = useState<"LIST" | "GRID">("LIST");

  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [reportsData, setReportsData] = useState<Report[]>([]);
  const [filterReportsData, setFilterReportsData] = useState<Report[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | number>("");
  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setPageTitle("Driver Report"));
  }, []);


  const handleFilter = () => {
    if (selectedDriver) {
      if (reportsData && reportsData?.length) {
        const data = reportsData?.filter(({ drivers }) =>
          Object.keys(JSON.parse(drivers))?.includes(selectedDriver?.toString())
        );

        setFilterReportsData(data);
      }
    } else {
      setFilterReportsData(reportsData);
    }

    setIsOpenFilterModal(false);
  };

  const findBookingAmounts = (bookingId: any, type: string) => {
    const selectedBooking = reportsData?.find(
      (data) => data?.new_booking_id === bookingId
    );

    const filterDriver = [];

    const driver = JSON.parse(JSON.parse(selectedBooking?.drivers || ""));
    for (const id in driver) {
      const waitingAmt = parseInt(driver[id].Waiting_Amount)
        ? parseInt(driver[id].Waiting_Amount)
        : 0;
      const paidAmount = driver[id].paidAmount ? driver[id].paidAmount : 0;
      const total =
        parseInt(driver[id].amount) +
        selectedBooking?.all_border_fare +
        waitingAmt;
      filterDriver.push({
        id: driver[id],
        Driver_Payable: driver[id].amount,
        Border_Charges: selectedBooking?.all_border_fare,
        Waiting_Amount: waitingAmt,
        total,
        paidAmount,
        balance: total - paidAmount,
      });
    }

    const totalAmount = filterDriver.reduce(
      (acc: any, amount: any) => acc + amount.total,
      0
    );

    const paidAmount = filterDriver.reduce(
      (acc: any, amount: any) => acc + amount.paidAmount,
      0
    );

    switch (type) {
      case "totalAmount":
        return totalAmount;
        break;
      case "paidAmount":
        return paidAmount;
        break;
      case "balance":
        return totalAmount - paidAmount;
        break;
      default:
        0;
    }
  };

  // Get Driver Wise Reports
  const getRouteReport = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${config.API_BASE_URL}/bookings`);
      if (response?.status === 200 && response?.data?.data) {
        setReportsData(response?.data?.data);
        setFilterReportsData(response?.data?.data);
      }
    } catch (error: any) {
      if (error?.response?.data && !error?.response?.data?.success) {
        setReportsData([]);
      }
    } finally {
      setIsOpenFilterModal(false);
      setIsLoading(false);
    }
  };

  // Get All  Driver
  const getAllDriver = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/drivers`);
      if (response?.status === 200 && response?.data) {
        setDrivers(response?.data);
      }
    } catch {}
  };

  // CSV Header
  const headers = [
    { label: "SR. NO.", key: "sr_no" },
    { label: "Route Name", key: "route_name" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Receiver Name", key: "receiver_name" },
    { label: "Booking ID", key: "booking_id" },
    { label: "Booking Date", key: "booking_date" },
    { label: "No of Drivers", key: "no_of_drivers" },
    { label: "Total Amount", key: "total_amount" },
    { label: "Paid Amount", key: "paid_amount" },
    { label: "Balance", key: "balance" },
    { label: "Tracking Status", key: "tracking_status" },
  ];

  // CSV Data
  const handleCsvData = () => {
    if (reportsData && reportsData?.length) {
      const CSVData = reportsData?.map(
        (
          {
            border_Route,
            booking_id,
            date,
            customer,
            client,
            drivers,
            new_booking_id,
            trackingsses,
          },
          index
        ) => {
          return {
            sr_no: index + 1,
            route_name: border_Route?.route_name,
            customer_name: customer?.company_name,
            receiver_name: client?.company_name,
            booking_id,
            booking_date: moment(date)?.format("DD-MM-YYYY hh:mm:ss A"),
            no_of_drivers: Object.keys(JSON.parse(drivers))?.length,
            total_amount: findBookingAmounts(new_booking_id, "totalAmount"),
            paid_amount: findBookingAmounts(new_booking_id, "paidAmount"),
            balance: findBookingAmounts(new_booking_id, "balance"),
            tracking_status:
              trackingsses && trackingsses.length > 0 ? (
                // Use lodash's get function to safely navigate nested properties
                _.get(
                  trackingsses[0],
                  "tracking.tracking_stage",
                  "No tracking data available"
                )
              ) : (
                <span className="whitespace-nowrap">
                  No tracking data available
                </span>
              ),
          };
        }
      );

      return CSVData;
    } else {
      return [];
    }
  };

 
  useEffect(() => {
    getAllDriver();
    getRouteReport();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl">Driver Report</h2>
        <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
          <div className="flex gap-3">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsOpenFilterModal(!isOpenFilterModal)}
              >
                Filter
              </button>
            </div>

            <div>
              <CSVLink
                className="btn btn-primary"
                data={handleCsvData()}
                headers={headers}
                filename={"Driver-reports"}
              >
                Export CSV
              </CSVLink>
            </div>

            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${
                  value === "LIST" && "bg-primary text-white"
                }`}
                onClick={() => setValue("LIST")}
              >
                <IconListCheck />
              </button>
            </div>
            <div>
              <button
                type="button"
                className={`btn btn-outline-primary p-2 ${
                  value === "GRID" && "bg-primary text-white"
                }`}
                onClick={() => setValue("GRID")}
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

      {value === "LIST" && (
        <div className="mt-5 panel p-0 border-0 overflow-hidden">
          <div className="table-responsive">
            <table className="table-striped table-hover">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Route Name</th>
                  <th>Customer</th>
                  <th>Receiver</th>
                  <th>Booking Id</th>
                  <th>Booking Date</th>
                  <th>No of Drivers</th>
                  <th>Total Amount</th>
                  <th>Paid Amount</th>
                  <th>Balance</th>
                  <th>Tracking Status</th>
                </tr>
              </thead>
              <tbody>
                {filterReportsData &&
                  filterReportsData?.length > 0 &&
                  filterReportsData.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="whitespace-nowrap">
                          {data.border_Route?.route_name}
                        </td>
                        <td className="whitespace-nowrap">
                          {data.customer?.company_name}
                        </td>
                        <td className="whitespace-nowrap">
                          {data.client?.company_name}
                        </td>
                        <td className="whitespace-nowrap">
                          {data.new_booking_id}
                        </td>
                        <td className="whitespace-nowrap">
                          {moment(data?.date)?.format("DD-MM-YYYY hh:mm:ss A")}
                        </td>
                        <td className="whitespace-nowrap">
                          {Object.keys(JSON.parse(data.drivers))?.length}
                        </td>
                        <td className="whitespace-nowrap">
                          {findBookingAmounts(
                            data.new_booking_id,
                            "totalAmount"
                          )}
                        </td>

                        <td className="whitespace-nowrap">
                          {findBookingAmounts(
                            data.new_booking_id,
                            "paidAmount"
                          )}
                        </td>

                        <td className="whitespace-nowrap">
                          {findBookingAmounts(data.new_booking_id, "balance")}
                        </td>

                        <td className="whitespace-nowrap">
                          {data.trackingsses &&
                          data?.trackingsses.length > 0 ? (
                            // Use lodash's get function to safely navigate nested properties
                            _.get(
                              data?.trackingsses[0],
                              "tracking.tracking_stage",
                              "No tracking data available"
                            )
                          ) : (
                            <span className="whitespace-nowrap">
                              No tracking data available
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {filterReportsData && !filterReportsData?.length && (
              <div className="py-10 text-center w-full">
                <p className="font-bold text-xl text-black/80">
                  Data Not Found
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {value === "GRID" && (
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-5 w-full">
          {filterReportsData &&
            filterReportsData?.length &&
            filterReportsData.map((contact: any) => {
              return (
                <div
                  className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative"
                  key={contact.id}
                >
                  <div className="bg-white dark:bg-[#1c232f] rounded-md overflow-hidden text-center shadow relative">
                    <div
                      className="bg-white/40 rounded-t-md bg-center bg-cover p-6 pb-0 bg-"
                      style={{
                        backgroundImage: `url('/assets/images/notification-bg.png')`,
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <img
                        className="object-contain w-4/5 max-h-40 mx-auto"
                        src={`/assets/images/${contact.path}`}
                        alt="contact_image"
                      />
                    </div>
                    <div className="px-6 pb-24 -mt-10 relative">
                      <div className="shadow-md bg-white dark:bg-gray-900 rounded-md px-2 py-4">
                        <div className="text-xl">{contact.name}</div>
                        <div className="text-white-dark">{contact.role}</div>
                        <div className="flex items-center justify-between flex-wrap mt-6 gap-3">
                          <div className="flex-auto">
                            <div className="text-info">{contact.posts}</div>
                            <div>Posts</div>
                          </div>
                          <div className="flex-auto">
                            <div className="text-info">{contact.following}</div>
                            <div>Following</div>
                          </div>
                          <div className="flex-auto">
                            <div className="text-info">{contact.followers}</div>
                            <div>Followers</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <ul className="flex space-x-4 rtl:space-x-reverse items-center justify-center">
                            <li>
                              <button
                                type="button"
                                className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
                              >
                                <IconFacebook />
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
                              >
                                <IconInstagram />
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
                              >
                                <IconLinkedin />
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="btn btn-outline-primary p-0 h-7 w-7 rounded-full"
                              >
                                <IconTwitter />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-1 gap-4 ltr:text-left rtl:text-right">
                        <div className="flex items-center">
                          <div className="flex-none ltr:mr-2 rtl:ml-2">
                            Email :
                          </div>
                          <div className="truncate text-white-dark">
                            {contact.email}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-none ltr:mr-2 rtl:ml-2">
                            Phone :
                          </div>
                          <div className="text-white-dark">{contact.phone}</div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-none ltr:mr-2 rtl:ml-2">
                            Address :
                          </div>
                          <div className="text-white-dark">
                            {contact.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-4 absolute bottom-0 w-full ltr:left-0 rtl:right-0 p-6">
                      <button
                        type="button"
                        className="btn btn-outline-primary w-1/2"
                        // onClick={() => editUser(contact)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger w-1/2"
                        // onClick={() => deleteUser(contact)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      <Transition appear show={isOpenFilterModal} as={Fragment}>
        <Dialog
          as="div"
          open={isOpenFilterModal}
          onClose={() => setIsOpenFilterModal(false)}
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
                <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                  <button
                    type="button"
                    onClick={() => setIsOpenFilterModal(false)}
                    className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                  >
                    <IconX />
                  </button>
                  <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                    Driver Wise Report
                  </div>
                  <div className="p-5">
                    <form>
                      <div className="mt-4">
                        <div>
                          <label htmlFor="routename">Select Driver</label>
                          <select
                            name="Driver"
                            onChange={(e) => {
                              setSelectedDriver(e?.target?.value);
                            }}
                            value={selectedDriver}
                            className="form-select text-white-dark"
                            required
                          >
                            <option value="">Select Driver</option>
                            {drivers &&
                              drivers?.length > 0 &&
                              drivers?.map(({ driver_id, name }) => (
                                <option value={driver_id}>{name}</option>
                              ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end items-center mt-8">
                        <button
                          type="button"
                          className="btn btn-outline-success ltr:ml-4 rtl:mr-4"
                          onClick={() => handleFilter()}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <IconLoader className="animate-[spin_2s_linear_infinite] inline-block align-middle ltr:mr-2 rtl:ml-2 shrink-0" />
                          ) : (
                            "Filter"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default DriverReport;
