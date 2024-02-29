import { lazy } from "react";
import Customers from "../pages/FMS/CustomerF/Customers";
import Client from "../pages/FMS/ClientF/Client";
import Driver from "../pages/FMS/VehiclesF/Driver";
import UpdateDocuments from "../pages/FMS/UpdateDocuments";
import RouteBorder from "../pages/FMS/RouteBorder";
import Booking from "../pages/FMS/BookingF/Booking";
import Report from "../pages/FMS/ReportF/CountryReport";
import Tracking from "../pages/FMS/TrackingF/Tracking";
import Truck from "../pages/FMS/VehiclesF/Truck";
import Transaction from "../pages/FMS/TransactionF/Transaction";
import Componey from "../pages/FMS/SettingF/Componey";
import User from "../pages/FMS/SettingF/User";
import EmailConfog from "../pages/FMS/SettingF/EmailConfig";
import AssignCompany from "../pages/FMS/SettingF/AssignCompany";
import Role from "../pages/FMS/SettingF/Role";
import EmailConfig from "../pages/FMS/SettingF/EmailConfig";
import Customer from "../pages/FMS/CustomerF/Customers";
import TransactionInvoice from "../pages/FMS/TransactionF/TransactionInvoice";
import TrackingStages from "../pages/FMS/TrackingF/TrackingStages";
import City from "../pages/FMS/LocationF/City";
import Country from "../pages/FMS/LocationF/Country";
import State from "../pages/FMS/LocationF/State";
import Border from "../pages/FMS/LocationF/Border";
import Route from "../pages/FMS/LocationF/Route";
import BookingInvoiceFilter from "../pages/FMS/BookingF/BookingInvoiceFilter";
import Routereport from "../pages/FMS/ReportF/RouteReport";
import CustomerBookingReport from "../pages/FMS/ReportF/CustomerBookingReport";
import CustomerRecieptReport from "../pages/FMS/ReportF/CustomerRecieptReport";
import CustomerInvoiceReport from "../pages/FMS/ReportF/CustomerInvoiceReport";
import DriverBookingReport from "../pages/FMS/ReportF/DriverBookingReport";
import NewBooking from "../pages/FMS/BookingF/NewBooking";
import ViewBooking from "../pages/FMS/BookingF/ViewBooking";
import DriverReport from "../pages/FMS/ReportF/DriverReport";
import CustomerReport from "../pages/FMS/ReportF/customerReport";

const Index = lazy(() => import("../pages/Index"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Finance = lazy(() => import("../pages/Finance"));
const Crypto = lazy(() => import("../pages/Crypto"));
const Todolist = lazy(() => import("../pages/Apps/Todolist"));
const Mailbox = lazy(() => import("../pages/Apps/Mailbox"));
const Notes = lazy(() => import("../pages/Apps/Notes"));
const Contacts = lazy(() => import("../pages/Apps/Contacts"));
const Chat = lazy(() => import("../pages/Apps/Chat"));
const Scrumboard = lazy(() => import("../pages/Apps/Scrumboard"));
const Calendar = lazy(() => import("../pages/Apps/Calendar"));
const List = lazy(() => import("../pages/Apps/Invoice/List"));
const Preview = lazy(() => import("../pages/Apps/Invoice/Preview"));
const Add = lazy(() => import("../pages/Apps/Invoice/Add"));
const Edit = lazy(() => import("../pages/Apps/Invoice/Edit"));
const Tabs = lazy(() => import("../pages/Components/Tabs"));
const Accordians = lazy(() => import("../pages/Components/Accordians"));
const Modals = lazy(() => import("../pages/Components/Modals"));
const Cards = lazy(() => import("../pages/Components/Cards"));
const Carousel = lazy(() => import("../pages/Components/Carousel"));
const Countdown = lazy(() => import("../pages/Components/Countdown"));
const Counter = lazy(() => import("../pages/Components/Counter"));
const SweetAlert = lazy(() => import("../pages/Components/SweetAlert"));
const Timeline = lazy(() => import("../pages/Components/Timeline"));
const Notification = lazy(() => import("../pages/Components/Notification"));
const MediaObject = lazy(() => import("../pages/Components/MediaObject"));
const ListGroup = lazy(() => import("../pages/Components/ListGroup"));
const PricingTable = lazy(() => import("../pages/Components/PricingTable"));
const LightBox = lazy(() => import("../pages/Components/LightBox"));
const Alerts = lazy(() => import("../pages/Elements/Alerts"));
const Avatar = lazy(() => import("../pages/Elements/Avatar"));
const Badges = lazy(() => import("../pages/Elements/Badges"));
const Breadcrumbs = lazy(() => import("../pages/Elements/Breadcrumbs"));
const Buttons = lazy(() => import("../pages/Elements/Buttons"));
const Buttongroups = lazy(() => import("../pages/Elements/Buttongroups"));
const Colorlibrary = lazy(() => import("../pages/Elements/Colorlibrary"));
const DropdownPage = lazy(() => import("../pages/Elements/DropdownPage"));
const Infobox = lazy(() => import("../pages/Elements/Infobox"));
const Jumbotron = lazy(() => import("../pages/Elements/Jumbotron"));
const Loader = lazy(() => import("../pages/Elements/Loader"));
const Pagination = lazy(() => import("../pages/Elements/Pagination"));
const Popovers = lazy(() => import("../pages/Elements/Popovers"));
const Progressbar = lazy(() => import("../pages/Elements/Progressbar"));
const Search = lazy(() => import("../pages/Elements/Search"));
const Tooltip = lazy(() => import("../pages/Elements/Tooltip"));
const Treeview = lazy(() => import("../pages/Elements/Treeview"));
const Typography = lazy(() => import("../pages/Elements/Typography"));
const Widgets = lazy(() => import("../pages/Widgets"));
const FontIcons = lazy(() => import("../pages/FontIcons"));
const DragAndDrop = lazy(() => import("../pages/DragAndDrop"));
const Tables = lazy(() => import("../pages/Tables"));
const Basic = lazy(() => import("../pages/DataTables/Basic"));
const Advanced = lazy(() => import("../pages/DataTables/Advanced"));
const Skin = lazy(() => import("../pages/DataTables/Skin"));
const OrderSorting = lazy(() => import("../pages/DataTables/OrderSorting"));
const MultiColumn = lazy(() => import("../pages/DataTables/MultiColumn"));
const MultipleTables = lazy(() => import("../pages/DataTables/MultipleTables"));
const AltPagination = lazy(() => import("../pages/DataTables/AltPagination"));
const Checkbox = lazy(() => import("../pages/DataTables/Checkbox"));
const RangeSearch = lazy(() => import("../pages/DataTables/RangeSearch"));
const Export = lazy(() => import("../pages/DataTables/Export"));
const ColumnChooser = lazy(() => import("../pages/DataTables/ColumnChooser"));
const Profile = lazy(() => import("../pages/Users/Profile"));
const AccountSetting = lazy(() => import("../pages/Users/AccountSetting"));
const KnowledgeBase = lazy(() => import("../pages/Pages/KnowledgeBase"));
const ContactUsBoxed = lazy(() => import("../pages/Pages/ContactUsBoxed"));
const ContactUsCover = lazy(() => import("../pages/Pages/ContactUsCover"));
const Faq = lazy(() => import("../pages/Pages/Faq"));
const ComingSoonBoxed = lazy(() => import("../pages/Pages/ComingSoonBoxed"));
const ComingSoonCover = lazy(() => import("../pages/Pages/ComingSoonCover"));
const ERROR404 = lazy(() => import("../pages/Pages/Error404"));
const ERROR500 = lazy(() => import("../pages/Pages/Error500"));
const ERROR503 = lazy(() => import("../pages/Pages/Error503"));
const Maintenence = lazy(() => import("../pages/Pages/Maintenence"));
const LoginBoxed = lazy(() => import("../pages/Authentication/LoginBoxed"));
const RegisterBoxed = lazy(
  () => import("../pages/Authentication/RegisterBoxed")
);
const UnlockBoxed = lazy(() => import("../pages/Authentication/UnlockBox"));
const RecoverIdBoxed = lazy(
  () => import("../pages/Authentication/RecoverIdBox")
);
const LoginCover = lazy(() => import("../pages/Authentication/LoginCover"));
const RegisterCover = lazy(
  () => import("../pages/Authentication/RegisterCover")
);
const RecoverIdCover = lazy(
  () => import("../pages/Authentication/RecoverIdCover")
);
const UnlockCover = lazy(() => import("../pages/Authentication/UnlockCover"));
const About = lazy(() => import("../pages/About"));
const Error = lazy(() => import("../components/Error"));
const Charts = lazy(() => import("../pages/Charts"));
const FormBasic = lazy(() => import("../pages/Forms/Basic"));
const FormInputGroup = lazy(() => import("../pages/Forms/InputGroup"));
const FormLayouts = lazy(() => import("../pages/Forms/Layouts"));
const Validation = lazy(() => import("../pages/Forms/Validation"));
const InputMask = lazy(() => import("../pages/Forms/InputMask"));
const Select2 = lazy(() => import("../pages/Forms/Select2"));
const Touchspin = lazy(() => import("../pages/Forms/TouchSpin"));
const CheckBoxRadio = lazy(() => import("../pages/Forms/CheckboxRadio"));
const Switches = lazy(() => import("../pages/Forms/Switches"));
const Wizards = lazy(() => import("../pages/Forms/Wizards"));
const FileUploadPreview = lazy(
  () => import("../pages/Forms/FileUploadPreview")
);
const QuillEditor = lazy(() => import("../pages/Forms/QuillEditor"));
const MarkDownEditor = lazy(() => import("../pages/Forms/MarkDownEditor"));
const DateRangePicker = lazy(() => import("../pages/Forms/DateRangePicker"));
const Clipboard = lazy(() => import("../pages/Forms/Clipboard"));

const routes = [
  //     // dashboard
  // {
  //     path: '/',
  //     element: <Index />,
  // },
  {
    path: "/",
    element: <User />,
  },
  //     // {
  //     //     path: '/index',
  //     //     element: <Index />,
  //     // },
  //     // analytics page
  //     {
  //         path: '/analytics',
  //         element: <Analytics />,
  //     },
  //     // finance page
  //     {
  //         path: '/finance',
  //         element: <Finance />,
  //     },
  //     // crypto page
  //     {
  //         path: '/crypto',
  //         element: <Crypto />,
  //     },
  //     {
  //         path: '/apps/todolist',
  //         element: <Todolist />,
  //     },
  //     {
  //         path: '/apps/notes',
  //         element: <Notes />,
  //     },
  //     {
  //         path: '/apps/contacts',
  //         element: <Contacts />,
  //     },
  //     {
  //         path: '/apps/mailbox',
  //         element: <Mailbox />,
  //     },
  //     {
  //         path: '/apps/invoice/list',
  //         element: <List />,
  //     },
  //     // Apps page
  //     {
  //         path: '/apps/chat',
  //         element: <Chat />,
  //     },
  //     {
  //         path: '/apps/scrumboard',
  //         element: <Scrumboard />,
  //     },
  //     {
  //         path: '/apps/calendar',
  //         element: <Calendar />,
  //     },
  //     // preview page
  //     {
  //         path: '/apps/invoice/preview',
  //         element: <Preview />,
  //     },
  //     {
  //         path: '/apps/invoice/add',
  //         element: <Add />,
  //     },
  //     {
  //         path: '/apps/invoice/edit',
  //         element: <Edit />,
  //     },
  //     // components page
  //     {
  //         path: '/components/tabs',
  //         element: <Tabs />,
  //     },
  //     {
  //         path: '/components/accordions',
  //         element: <Accordians />,
  //     },
  //     {
  //         path: '/components/modals',
  //         element: <Modals />,
  //     },
  //     {
  //         path: '/components/cards',
  //         element: <Cards />,
  //     },
  //     {
  //         path: '/components/carousel',
  //         element: <Carousel />,
  //     },
  //     {
  //         path: '/components/countdown',
  //         element: <Countdown />,
  //     },
  //     {
  //         path: '/components/counter',
  //         element: <Counter />,
  //     },
  //     {
  //         path: '/components/sweetalert',
  //         element: <SweetAlert />,
  //     },
  //     {
  //         path: '/components/timeline',
  //         element: <Timeline />,
  //     },
  //     {
  //         path: '/components/notifications',
  //         element: <Notification />,
  //     },
  //     {
  //         path: '/components/media-object',
  //         element: <MediaObject />,
  //     },
  //     {
  //         path: '/components/list-group',
  //         element: <ListGroup />,
  //     },
  //     {
  //         path: '/components/pricing-table',
  //         element: <PricingTable />,
  //     },
  //     {
  //         path: '/components/lightbox',
  //         element: <LightBox />,
  //     },
  //     // elements page
  //     {
  //         path: '/elements/alerts',
  //         element: <Alerts />,
  //     },
  //     {
  //         path: '/elements/avatar',
  //         element: <Avatar />,
  //     },
  //     {
  //         path: '/elements/badges',
  //         element: <Badges />,
  //     },
  //     {
  //         path: '/elements/breadcrumbs',
  //         element: <Breadcrumbs />,
  //     },
  //     {
  //         path: '/elements/buttons',
  //         element: <Buttons />,
  //     },
  //     {
  //         path: '/elements/buttons-group',
  //         element: <Buttongroups />,
  //     },
  //     {
  //         path: '/elements/color-library',
  //         element: <Colorlibrary />,
  //     },
  //     {
  //         path: '/elements/dropdown',
  //         element: <DropdownPage />,
  //     },
  //     {
  //         path: '/elements/infobox',
  //         element: <Infobox />,
  //     },
  //     {
  //         path: '/elements/jumbotron',
  //         element: <Jumbotron />,
  //     },
  //     {
  //         path: '/elements/loader',
  //         element: <Loader />,
  //     },
  //     {
  //         path: '/elements/pagination',
  //         element: <Pagination />,
  //     },
  //     {
  //         path: '/elements/popovers',
  //         element: <Popovers />,
  //     },
  //     {
  //         path: '/elements/progress-bar',
  //         element: <Progressbar />,
  //     },
  //     {
  //         path: '/elements/search',
  //         element: <Search />,
  //     },
  //     {
  //         path: '/elements/tooltips',
  //         element: <Tooltip />,
  //     },
  //     {
  //         path: '/elements/treeview',
  //         element: <Treeview />,
  //     },
  //     {
  //         path: '/elements/typography',
  //         element: <Typography />,
  //     },

  //     // charts page
  //     {
  //         path: '/charts',
  //         element: <Charts />,
  //     },
  //     // widgets page
  //     {
  //         path: '/widgets',
  //         element: <Widgets />,
  //     },
  //     //  font-icons page
  //     {
  //         path: '/font-icons',
  //         element: <FontIcons />,
  //     },
  //     //  Drag And Drop page
  //     {
  //         path: '/dragndrop',
  //         element: <DragAndDrop />,
  //     },
  //     //  Tables page
  //     {
  //         path: '/tables',
  //         element: <Tables />,
  //     },
  //     // Data Tables
  //     {
  //         path: '/datatables/basic',
  //         element: <Basic />,
  //     },
  //     {
  //         path: '/datatables/advanced',
  //         element: <Advanced />,
  //     },
  //     {
  //         path: '/datatables/skin',
  //         element: <Skin />,
  //     },
  //     {
  //         path: '/datatables/order-sorting',
  //         element: <OrderSorting />,
  //     },
  //     {
  //         path: '/datatables/multi-column',
  //         element: <MultiColumn />,
  //     },
  //     {
  //         path: '/datatables/multiple-tables',
  //         element: <MultipleTables />,
  //     },
  //     {
  //         path: '/datatables/alt-pagination',
  //         element: <AltPagination />,
  //     },
  //     {
  //         path: '/datatables/checkbox',
  //         element: <Checkbox />,
  //     },
  //     {
  //         path: '/datatables/range-search',
  //         element: <RangeSearch />,
  //     },
  //     {
  //         path: '/datatables/export',
  //         element: <Export />,
  //     },
  //     {
  //         path: '/datatables/column-chooser',
  //         element: <ColumnChooser />,
  //     },
  //     // Users page

  //     // pages
  //     {
  //         path: '/pages/knowledge-base',
  //         element: <KnowledgeBase />,
  //     },
  //     {
  //         path: '/pages/contact-us-boxed',
  //         element: <ContactUsBoxed />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/contact-us-cover',
  //         element: <ContactUsCover />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/faq',
  //         element: <Faq />,
  //     },
  //     {
  //         path: '/pages/coming-soon-boxed',
  //         element: <ComingSoonBoxed />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/coming-soon-cover',
  //         element: <ComingSoonCover />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/error404',
  //         element: <ERROR404 />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/error500',
  //         element: <ERROR500 />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/error503',
  //         element: <ERROR503 />,
  //         layout: 'blank',
  //     },
  //     {
  //         path: '/pages/maintenence',
  //         element: <Maintenence />,
  //         layout: 'blank',
  //     },
  //     //Authentication
  {
    path: "/auth/boxed-signin",
    element: <LoginBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/boxed-signup",
    element: <RegisterBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/boxed-lockscreen",
    element: <UnlockBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/boxed-password-reset",
    element: <RecoverIdBoxed />,
    layout: "blank",
  },
  {
    path: "/auth/cover-login",
    element: <LoginCover />,
    layout: "blank",
  },
  {
    path: "/auth/cover-register",
    element: <RegisterCover />,
    layout: "blank",
  },
  {
    path: "/auth/cover-lockscreen",
    element: <UnlockCover />,
    layout: "blank",
  },
  {
    path: "/auth/cover-password-reset",
    element: <RecoverIdCover />,
    layout: "blank",
  },
  //     //forms page
  //     {
  //         path: '/forms/basic',
  //         element: <FormBasic />,
  //     },
  //     {
  //         path: '/forms/input-group',
  //         element: <FormInputGroup />,
  //     },
  //     {
  //         path: '/forms/layouts',
  //         element: <FormLayouts />,
  //     },
  //     {
  //         path: '/forms/validation',
  //         element: <Validation />,
  //     },
  //     {
  //         path: '/forms/input-mask',
  //         element: <InputMask />,
  //     },
  //     {
  //         path: '/forms/select2',
  //         element: <Select2 />,
  //     },
  //     {
  //         path: '/forms/touchspin',
  //         element: <Touchspin />,
  //     },
  //     {
  //         path: '/forms/checkbox-radio',
  //         element: <CheckBoxRadio />,
  //     },
  //     {
  //         path: '/forms/switches',
  //         element: <Switches />,
  //     },
  //     {
  //         path: '/forms/wizards',
  //         element: <Wizards />,
  //     },
  //     {
  //         path: '/forms/file-upload',
  //         element: <FileUploadPreview />,
  //     },
  //     {
  //         path: '/forms/quill-editor',
  //         element: <QuillEditor />,
  //     },
  //     {
  //         path: '/forms/markdown-editor',
  //         element: <MarkDownEditor />,
  //     },
  //     {
  //         path: '/forms/date-picker',
  //         element: <DateRangePicker />,
  //     },
  //     {
  //         path: '/forms/clipboard',
  //         element: <Clipboard />,
  //     },
  //     {
  //         path: '/about',
  //         element: <About />,
  //         layout: 'blank',
  //     },
  //     // {
  //     //     path: '*',
  //     //     element: <Error />,
  //     //     layout: 'blank',
  //     // },
  {
    path: "*",
    element: <Maintenence />,
    layout: "blank",
  },
  //     // new
  // {
  //     path: '/users/Customers',
  //     element: <Customers />,
  // },

  // {
  //     path: '/users/profile',
  //     element: <Profile />,
  // },
  // {
  //     path: '/users/user-account-settings',
  //     element: <AccountSetting />,
  // },
  // {
  //     path: '/users/RouteBorder',
  //     element: <RouteBorder />,
  // },
  // {
  //     path: '/users/UpdateDocuments',
  //     element: <UpdateDocuments />,
  // },
  // {
  //     path: '/users/Driver',
  //     element: <Driver />,
  // },
  // {
  //     path: '/users/Client',
  //     element: <Client />,
  // },
  // {
  //     path: '/users/booking',
  //     element: <Booking />,
  // },
  // {
  //     path: '/users/report',
  //     element: <Report />,
  // },
  // {
  //     path: '/users/tracking',
  //     element: <Tracking />,
  // },
  // {
  //     path: '/users/truck',
  //     element: <Truck />,
  // },
  // {
  //     path: '/users/transaction',
  //     element: <Transaction />,
  // },

  // setting
  {
    path: "/setting/componey",
    element: <Componey />,
  },
  {
    path: "/setting/user",
    element: <User />,
  },
  {
    path: "/setting/email",
    element: <EmailConfig />,
  },
  {
    path: "/setting/companyassign",
    element: <AssignCompany />,
  },
  {
    path: "/setting/role",
    element: <Role />,
  },

  //client
  {
    path: "/client/client",
    element: <Client />,
  },
  // location
  {
    path: "/location/city",
    element: <City />,
  },
  {
    path: "/location/country",
    element: <Country />,
  },
  {
    path: "/location/state",
    element: <State />,
  },
  {
    path: "/location/border",
    element: <Border />,
  },
  {
    path: "/location/route",
    element: <Route />,
  },
  //customer
  {
    path: "/customer/customer",
    element: <Customer />,
  },
  //vehicle
  {
    path: "/vehicle/driver",
    element: <Driver />,
  },
  {
    path: "/vehicle/truck",
    element: <Truck />,
  },
  //booking
  {
    path: "/booking/booking",
    element: <Booking />,
  },
  {
    path: "/booking/NewBooking",
    element: <NewBooking />,
  },
  {
    path: "/booking/invoice/:booking_id",
    element: <ViewBooking type="INVOICE" />,
  },
  {
    path: "/booking/edit/:booking_id",
    element: <NewBooking type="EDIT_BOOKING" />,
  },
  {
    path: "/booking/view/:booking_id",
    element: <ViewBooking />,
  },
  {
    path: "/booking/filterinvoice",
    element: <BookingInvoiceFilter />,
  },
  // transaction
  {
    path: "/transaction/transaction",
    element: <Transaction />,
  },
  {
    path: "/transaction/invoice",
    element: <TransactionInvoice />,
  },
  // tracking
  {
    path: "/tracking/stages",
    element: <TrackingStages />,
  },
  {
    path: "/tracking/tracking",
    element: <Tracking />,
  },
  // reportype
  {
    path: "/report/location",
    element: <Report />,
  },
  {
    path: "/report/routereport",
    element: <Routereport />,
  },
  {
    path: "/report/customerbooking",
    element: <CustomerReport />,
  },

  {
    path: "/report/customerreciept",
    element: <CustomerRecieptReport />,
  },

  {
    path: "/report/customerinvoice",
    element: <CustomerInvoiceReport />,
  },

  {
    path: "/report/driverbooking",
    element: <DriverReport />,
  },
];

export { routes };
