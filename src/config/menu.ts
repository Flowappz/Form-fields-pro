export type MenuItem = {
  id: string;
  label: string;
  description: string;
  available: boolean;
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "dropdown",
    label: "Dropdown",
    description: "Custom dropdown input",
    available: true,
  },
  {
    id: "searchable_dropdown",
    label: "Searchable dropdown",
    description: "Dropdown input with search option",
    available: false,
  },
  {
    id: "date_picker",
    label: "Date picker",
    description: "An stylish date picker",
    available: false,
  },
  {
    id: "date_range_picker",
    label: "Date range picker",
    description: "",
    available: false,
  },
  {
    id: "number_picker_slider",
    label: "Number picker slider",
    description: "",
    available: false,
  },
  {
    id: "number_range_picker",
    label: "Number range picker",
    description: "",
    available: false,
  },
  {
    id: "time_zone_picker",
    label: "Time zone picker",
    description: "",
    available: false,
  },
  {
    id: "collect_user_ip",
    label: "Collect user IP",
    description: "",
    available: false,
  },
  {
    id: "color_picker",
    label: "Color Picker",
    description: "",
    available: false,
  },
  {
    id: "date_range_picker",
    label: "Date range picker",
    description: "",
    available: false,
  },
  {
    id: "url_picker",
    label: "URL picker",
    description: "",
    available: false,
  },
];
