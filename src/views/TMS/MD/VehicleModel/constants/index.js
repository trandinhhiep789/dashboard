export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/VehicleModel/Search";
export const LoadAPIPath = "api/VehicleModel/Load";
export const AddAPIPath = "api/VehicleModel/Add";
export const UpdateAPIPath = "api/VehicleModel/Update";
export const DeleteAPIPath = "api/VehicleModel/Delete";
export const BackLink = "/VehicleModel";
export const AddLink = "/VehicleModel/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleModelID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const TitleFormAdd = "Thêm model xe";

export const TitleFormEdit = "Cập nhật model xe";

export const PagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "", Title: "Danh sách model xe" },
];

export const EditPagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "/VehicleModel", Title: "Danh sách model xe" },
  { Link: "", Title: "Sửa" },
];

export const AddPagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "/VehicleModel", Title: "Danh sách model xe" },
  { Link: "", Title: "Thêm" },
];

export const SearchElementList = [
  {
    type: "text",
    name: "txtKeyword",
    label: "Từ khóa:",
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

export const MLObjectDefinition = [
  {
    Name: "VehicleTypeID",
    DefaultValue: "",
    BindControlName: "cbVehicleTypeID",
    DataSourceMember: "VehicleTypeID",
  },
  {
    Name: "VehicleModelName",
    DefaultValue: "",
    BindControlName: "txtVehicleModelName",
    DataSourceMember: "VehicleModelName",
  },
  {
    Name: "IsActived",
    DefaultValue: true,
    BindControlName: "chkIsActived",
    DataSourceMember: "IsActived",
  },
  {
    Name: "IsSystem",
    DefaultValue: false,
    BindControlName: "chkIsSystem",
    DataSourceMember: "IsSystem",
  },
  {
    Name: "CreatedUser",
    DefaultValue: "administrator",
    BindControlName: "",
    DataSourceMember: "CreatedUser",
  },
  {
    Name: "UpdatedUser",
    DefaultValue: "administrator",
    BindControlName: "",
    DataSourceMember: "UpdatedUser",
  },
  {
    Name: "LoginLogID",
    DefaultValue: "",
    BindControlName: "",
    DataSourceMember: "",
  },
];

export const DataGridColumnList = [
  {
    Name: "chkSelect",
    Type: "checkbox",
    Caption: "Chọn",
    DataSourceMember: "VehicleModelID",
    Width: 60,
  },
  {
    Name: "VehicleModelID",
    Type: "text",
    Caption: "Mã model xe",
    DataSourceMember: "VehicleModelID",
    Width: 150,
  },
  {
    Name: "VehicleModelName",
    Type: "text",
    Caption: "Tên model xe",
    DataSourceMember: "VehicleModelName",
    Width: 200,
  },
  {
    Name: "VehicleTypeName",
    Type: "text",
    Caption: "Tên loại xe",
    DataSourceMember: "VehicleTypeName",
    Width: 200,
  },
  {
    Name: "IsActived",
    Type: "checkicon",
    Caption: "Kích hoạt",
    DataSourceMember: "IsActived",
    Width: 80,
  },
  {
    Name: "UpdatedDate",
    Type: "date",
    Caption: "Ngày cập nhật",
    DataSourceMember: "UpdatedDate",
    Width: 140,
  },
  {
    Name: "UpdatedUserFullName",
    Type: "text",
    Caption: "Người cập nhật",
    DataSourceMember: "UpdatedUserFullName",
    Width: 140,
  },
  {
    Name: "Action",
    Type: "link",
    Caption: "Tác vụ",
    DataSourceMember: "VehicleGroupID",
    Width: 100,
    Link: "/VehicleModel/Edit/",
    LinkText: "Chỉnh sửa",
  },
];

export const AddElementList = [
  {
    type: "select",
    name: "cbVehicleTypeID",
    label: "Loại xe",
    value: -1,
    placeholder: "",
    icon: "",
    listoption: [],
    DataSourceMember: "VehicleTypeID",
    readonly: false,
    IsAutoLoadItemFromCache: true,
    LoadItemCacheKeyID: "ERPCOMMONCACHE.VEHICLETYPE",
    ValueMember: "VehicleGroupID",
    NameMember: "VehicleTypeName",
    validatonList: ["required"],
  },
  {
    type: "text",
    name: "txtVehicleModelName",
    label: "Tên model xe",
    maxSize: "500",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleModelName",
    readonly: false,
    validatonList: ["required"],
  },
  {
    type: "checkbox",
    name: "chkIsActived",
    label: "Kích hoạt",
    value: true,
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
    value: false,
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
    name: "txtVehicleModelID",
    label: "Mã model xe",
    maxSize: 10,
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleModelID",
    readonly: true,
    validatonList: ["required", "number"],
  },
  {
    type: "text",
    name: "txtVehicleModelName",
    label: "Tên model xe",
    maxSize: "500",
    value: "",
    placeholder: "",
    icon: "",
    listoption: {},
    DataSourceMember: "VehicleModelName",
    readonly: false,
    validatonList: ["required"],
  },
  {
    type: "checkbox",
    name: "chkIsActived",
    label: "Kích hoạt",
    value: true,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
    DataSourceMember: "IsActived",
  },
  {
    type: "checkbox",
    name: "chkIsSystem",
    label: "Hệ thống",
    value: false,
    placeholder: "",
    icon: "",
    listoption: {},
    readonly: false,
    validatonList: [],
    DataSourceMember: "IsSystem",
  },
];
