export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/SearchListNoteRewardReport";
export const PagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "", Title: "Xuất danh sách vận đơn không được tính thưởng" },
];

export const SearchMLObjectDefinition = [
  {
    Name: "Month",
    DefaultValue: "",
    BindControlName: "dtMonth",
  },
  {
    Name: "ShipmentOrderTypeID",
    DefaultValue: "",
    BindControlName: "cbShipmentOrderTypeID",
  },
];

export const SearchElementList = [
  {
    type: "MonthPicker",
    name: "dtMonth",
    DataSourceMember: "Month",
    label: "Tháng",
    value: new Date(),
    format: "MM-YYYY",
    colspan: 2,
    placeholder: "MM-YYYY",
    isDisableNext:true,
    isAllowClear:false
  },
  {
    type: "ComboBoxNewChange",
    name: "cbShipmentOrderTypeID",
    DataSourceMember: "ShipmentOrderTypeID",
    label: "Loại yêu cầu vận chuyển",
    colspan: 5,
    value: "-1",
    isMultiSelect: true,
    placeholder: "Loại yêu cầu vận chuyển",
    listoption: [],
    IsAutoLoadItemFromCache: true,
    LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
    ValueMember: "ShipmentOrderTypeID",
    NameMember: "ShipmentOrderTypeName",
    classNameCol: "col-custom",
  },
];

export const GridColumnList = [
  {
    Name: "ShipmentOrderID",
    Type: "text",
    Caption: "Mã vận đơn",
    DataSourceMember: "ShipmentOrderID",
    Width: 100,
  },
  {
    Name: "StoreName",
    Type: "text",
    Caption: "Kho xuất",
    DataSourceMember: "StoreName",
    Width: 200,
  },
  {
    Name: "Area",
    Type: "text",
    Caption: "Khu vực",
    DataSourceMember: "Area",
    Width: 200,
  },
  {
    Name: "DeliverUser",
    Type: "text",
    Caption: "Nhân viên giao",
    DataSourceMember: "DeliverUser",
    Width: 200,
  },
];
