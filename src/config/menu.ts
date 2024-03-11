export const MENU_ITEMS = [
  {
    id: "select",
    label: "Select",
    description: "Custom select input",
    available: true,
  },
  {
    id: "searchable_select",
    label: "Searchable select",
    description: "Select input with search option",
    available: true,
  },
  {
    id: "date_picker",
    label: "Date picker",
    description: "An stylish date picker",
    available: true,
  },
  // {
  //   id: "date_range_picker",
  //   label: "Date range picker",
  //   description: "Select a range of dates",
  //   available: true,
  // },
  {
    id: "number_picker_slider",
    label: "Number picker slider",
    description: "Slider to select a value between a range",
    available: true,
  },
  {
    id: "phone_number_input",
    label: "Phone Number Input",
    description: "Phone number input field with country code",
    available: true,
  },
  {
    id: "color_picker_input",
    label: "Color Picker Input",
    description: "An stylish color picker input",
    available: true,
  },
  {
    id: "file_uploader_input",
    label: "File Uploader Field",
    description: "An stylish file uploader field",
    available: true,
  },
  // {
  //   id: "advanced_email_input",
  //   label: "Email - Advanced",
  //   description: "Email field with custom error message",
  //   available: false,
  // },
  {
    id: "net_promoter_score",
    label: "Net Promoter Score",
    description: "Collect feedback from visitors",
    available: true,
  },
  {
    id: "url_input",
    label: "URL",
    description: "Website url with validation",
    available: true,
  },
  // {
  //   id: "number_range_picker",
  //   label: "Number range picker",
  //   description: "Select between two ranges",
  //   available: true,
  // },
  // {
  //   id: "time_zone_picker",
  //   label: "Time zone picker",
  //   description: "",
  //   available: false,
  // },
  {
    id: "collect_user_ip",
    label: "Collect user IP",
    description: "Submit the user IP with data",
    available: true,
  },
  // {
  //   id: "color_picker",
  //   label: "Color Picker",
  //   description: "",
  //   available: false,
  // },
  // {
  //   id: "url_picker",
  //   label: "URL picker",
  //   description: "",
  //   available: false,
  // },
] as const;

export type MenuId = (typeof MENU_ITEMS)[number]["id"];
export type MenuItem = (typeof MENU_ITEMS)[number];
