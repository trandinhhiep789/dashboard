export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/CoordinatorGroup/SearchTeamLeaderBonusFundReport";
export const PagePath = [
  { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
  { Link: "", Title: "Báo cáo quỹ thưởng trưởng nhóm" },
];

export const SearchMLObjectDefinition = [
  {
    Name: "Month",
    DefaultValue: "",
    BindControlName: "dtMonth",
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
];

export const GridColumnList = [
  {
    Name: "CoordinatorGroupID",
    Type: "text",
    Caption: "Mã nhóm",
    DataSourceMember: "CoordinatorGroupID",
    Width: 100,
  },
  {
    Name: "CoordinatorGroupName",
    Type: "text",
    Caption: "Tên nhóm",
    DataSourceMember: "CoordinatorGroupName",
    Width: 200,
  },
  {
    Name: "UserName",
    Type: "text",
    Caption: "Mã nhân viên",
    DataSourceMember: "UserName",
    Width: 200,
  },
  {
    Name: "FullName",
    Type: "text",
    Caption: "Tên nhân viên",
    DataSourceMember: "FullName",
    Width: 200,
  },
  {
    Name: "TotalDeliveryReward",
    Type: "text",
    Caption: "Thưởng giao hàng",
    DataSourceMember: "TotalDeliveryReward",
    Width: 200,
  },
  {
    Name: "TotalWarrantyReward",
    Type: "text",
    Caption: "Thưởng bảo hành",
    DataSourceMember: "TotalWarrantyReward",
    Width: 200,
  },

];
