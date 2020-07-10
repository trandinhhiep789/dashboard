export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/WorkingPlan/Search";
export const AddAPIPath = "api/WorkingPlan/Add";
export const UpdateWorkingPlanByUserAPIPath = "api/WorkingPlan/UpdateWorkingPlanByUser";
export const UpdateDeleteAPIPath = "api/WorkingPlan/UpdateDelete";
export const DeleteAPIPath = "api/WorkingPlan/Delete";
export const UpdateOrderAPIPath = "api/WorkingPlan/UpdateOrder";
export const BackLink = "/WorkingPlan";
export const AddLink = "/WorkingPlan/Add";
export const AddLogAPIPath = "api/WorkingPlan/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách ca làm việc" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Sửa" }
];
export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Chi tiết" }
];


export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingPlan", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 365);

export const SearchElementList = [
    {
        type: "Datetime",
        name: "dtSignedDate",
        DataSourceMember: "SignedDate",
        label: "ngày làm việc",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbServiceTypeID",
        DataSourceMember: "ServiceTypeID",
        label: "kho làm việc",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        filterValue:10,
        filterobj:"CompanyID",

    },
 
]

export const InitSearchParams = [
    {
        SearchKey: "@WORKINGSHIFTID",
        SearchValue: -1
    },
    {
        SearchKey: "@WORKINGDATE",
        SearchValue: ""
    },
    {
        SearchKey: "@STOREID",
        SearchValue: -1
    },

  
]

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
]

export const MLObjectDefinition = [

]

export const DataGridColumnList = [
  
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName",
        Width: 130
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "FullName",
        Width: 130
    },

    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho làm việc",
        DataSourceMember: "StoreName",
        Width: 130
    },

    {
        Name: "WorkingShiftName",
        Type: "text",
        Caption: "Ca làm việc",
        DataSourceMember: "WorkingShiftName",
        Width: 130
    },
    {
        Name: "ShiftNumberOne",
        Type: "checkicon",
        Caption: "Ca một",
        DataSourceMember: "ShiftNumberOne",
        Width: 70
    },
    {
        Name: "ShiftNumberTwo",
        Type: "checkicon",
        Caption: "Ca hai",
        DataSourceMember: "ShiftNumberTwo",
        Width: 70
    },
    {
        Name: "ShiftNumberThree",
        Type: "checkicon",
        Caption: "Ca ba",
        DataSourceMember: "ShiftNumberThree",
        Width: 70
    },
]