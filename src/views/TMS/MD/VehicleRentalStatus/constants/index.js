export const APIHostName = "TMSMDMAPI";
export const AddAPIPath = "api/VehicleRentalStatus/Add";
export const EditAPIPath = "api/VehicleRentalStatus/Edit";
export const LoadAPIPath = "api/VehicleRentalStatus/Load";

export const AddLink = "/VehicleRentalStatus/Add";
export const BackLink = "/VehicleRentalStatus";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleRentalStatusID";

export const PagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "", Title: "Trạng thái cho thuê xe" },
];

export const AddPagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "/VehicleRentalStatus", Title: "Trạng thái cho thuê xe" },
  { Link: "", Title: "Thêm trạng thái cho thuê xe" },
];

export const EditPagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "/VehicleRentalStatus", Title: "Trạng thái cho thuê xe" },
  { Link: "", Title: "Chỉnh sửa trạng thái cho thuê xe" },
];

export const SearchElementList = [
  {
    type: "text",
    name: "txtKeyword",
    label: "Từ khóa",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
  },
];

export const SearchMLObjectDefinition = [
  {
    Name: "Keyword",
    DefaultValue: "",
    BindControlName: "txtKeyword",
  },
];

export const DataGridColumnList = [
  {
    Name: "chkSelect",
    Type: "checkbox",
    Caption: "Chọn",
    DataSourceMember: "VehicleRentalStatusID",
    Width: 60,
  },
  {
    Name: "VehicleRetalStatusID",
    Type: "text",
    Caption: "Mã trạng thái ",
    DataSourceMember: "VehicleRetalStatusID",
  },
  {
    Name: "VehicleRetalStatusName",
    Type: "text",
    Caption: "Tên trạng thái",
    DataSourceMember: "VehicleRetalStatusName",
  },
  {
    Name: "Description",
    Type: "text",
    Caption: "Mô tả",
    DataSourceMember: "Description",
  },
  {
    Name: "UpdateUser",
    Type: "text",
    Caption: "Người cập nhật",
    DataSourceMember: "UpdateUser",
  },
  {
    Name: "UpdateDate",
    Type: "text",
    Caption: "Ngày cập nhật",
    DataSourceMember: "UpdateDate",
  },
  {
    Name: "Action",
    Type: "link",
    Caption: "Tác vụ",
    DataSourceMember: "VehicleRentalStatusID",
    Width: 80,
    Link: "/VehicleRentalStatus/Edit/",
    LinkText: "Chỉnh sửa",
  },
];

export const AddElementList = [
  {
    type: "text",
    name: "txtVehicleRentalStatusID",
    label: "Mã trạng thái cho thuê xe",
    value: "",
    maxSize: "10",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleRentalStatusID",
    readonly: false,
    validatonList: ["required", "number"],
  },
  {
    type: "text",
    name: "txtVehicleRentalStatusName",
    label: "Tên trạng thái cho thuê xe",
    value: "",
    maxSize: "300",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleRentalStatusName",
    readonly: false,
    validatonList: ["required"],
  },
  {
    type: "text",
    name: "txtOrderIndex",
    label: "Thứ tự hiển thị",
    value: "",
    maxSize: "10",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "OrderIndex",
    readonly: false,
    validatonList: ["number"],
  },
  {
    type: "textarea",
    name: "txtDescription",
    label: "Mô tả",
    value: "",
    maxSize: "1000",
    placeholder: "",
    icon: "",
    rows: "6",
    listoption: {},
    DataSourceMember: "Description",
    readonly: false,
    validatonList: [],
  },
  {
    type: "checkbox",
    name: "chkIsActived",
    label: "Kích hoạt",
    value: 1,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
  },
  {
    type: "checkbox",
    name: "chkIsSystem",
    label: "Hệ thống",
    value: 0,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
  },
];

export const EditElementList = [
  {
    type: "text",
    name: "txtVehicleRentalStatusID",
    label: "Mã trạng thái cho thuê xe",
    value: "",
    maxSize: "10",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleRentalStatusID",
    readonly: true,
    validatonList: ["required", "number"],
  },
  {
    type: "text",
    name: "txtVehicleRentalStatusName",
    label: "Tên trạng thái cho thuê xe",
    value: "",
    maxSize: "300",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleRentalStatusName",
    readonly: false,
    validatonList: ["required"],
  },
  {
    type: "text",
    name: "txtOrderIndex",
    label: "Thứ tự hiển thị",
    value: "",
    maxSize: "10",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "OrderIndex",
    readonly: false,
    validatonList: ["number"],
  },
  {
    type: "textarea",
    name: "txtDescription",
    label: "Mô tả",
    value: "",
    maxSize: "1000",
    placeholder: "",
    icon: "",
    rows: "6",
    listoption: {},
    DataSourceMember: "Description",
    readonly: false,
    validatonList: [],
  },
  {
    type: "checkbox",
    name: "chkIsActived",
    label: "Kích hoạt",
    value: 1,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
  },
  {
    type: "checkbox",
    name: "chkIsSystem",
    label: "Hệ thống",
    value: 0,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
  },
];

export const MLObjectDefinition = [
  {
    Name: "VehicleRentalStatusID",
    DefaultValue: "",
    BindControlName: "txtVehicleRentalStatusID",
    DataSourceMember: "VehicleRentalStatusID",
  },
  {
    Name: "VehicleRentalStatusName",
    DefaultValue: "",
    BindControlName: "txtVehicleRentalStatusName",
    DataSourceMember: "VehicleRentalRequestStepName",
  },
  {
    Name: "OrderIndex",
    DefaultValue: "",
    BindControlName: "txtOrderIndex",
    DataSourceMember: "OrderIndex",
  },
  {
    Name: "Description",
    DefaultValue: "",
    BindControlName: "txtDescription",
    DataSourceMember: "Description",
  },
  {
    Name: "IsActived",
    DefaultValue: "",
    BindControlName: "chkIsActived",
    DataSourceMember: "IsActived",
  },
  {
    Name: "IsSystem",
    DefaultValue: "",
    BindControlName: "chkIsSystem",
    DataSourceMember: "IsSystem",
  },
];




