export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/VehicleRentalRequest/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const DeleteAPIPath = "api/VehicleRentalRequest/Delete";
export const LoadAPIPath = "api/VehicleRentalRequest/Load";
export const SearchAPIPath = "api/VehicleRentalRequest/Search";
export const UpdateAPIPath = "api/VehicleRentalRequest/Update";
export const UpdateAbilityAPIPath = "api/VehicleRentalRequest/UpdateAbilyti";
export const UpdateProcessAPIPath= "api/VehicleRentalRequest/UpdateProcess";

export const AddLink = "/VehicleRentalRequest/Add";
export const BackLink = "/VehicleRentalRequest";


export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleRentalRequestID";
export const PKColumnNameWF = "VehicleRentalreqWorkFlowID";



export const TitleFormSearch = "Tìm kiếm danh sách yêu cầu thuê xe";
export const TitleFormAdd = "Thêm yêu cầu thuê xe";
export const TitleFormEdit = "Cập nhật yêu cầu thuê xe";
export const TitleFormDetail = "Thông tin yêu cầu thuê xe";

export const TitleFromWF = "Lịch sử xử lý";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu thuê xe" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequest", Title: "Danh sách yêu cầu thuê xe" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequest", Title: "Danh sách yêu cầu thuê xe" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequest", Title: "Danh sách yêu cầu thuê xe" },
    { Link: "", Title: "Chi tiết" }
];


export const SearchElementList = [
    {
        type: "textdropdownNew",
        dropdownName: "txtTypename",
        name: "txtKeywordNew",
        colspan: 2,
        label: "từ khóa",
        value: "",
        colspan: 4,
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption:  1,
        // validatonList:["Comborequired"],
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: 1, label: 'Mã yêu cầu thuê xe' },
            { value: 2, label: 'Biển số  xe' },

        ]
    },
    {
        type: "ComboBox",
        name: "cbRentalType",
        DataSourceMember: "RentalTypeID",
        label: "Hình thức thuê xe ",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.RENTALTYPE",
        ValueMember: "RentalTypeID",
        NameMember: "RentalTypeName",

    },
    {
        type: "Datetime",
        name: "dtStartTime",
        DataSourceMember: "StartTime",
        label: "Từ ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtEndDate",
        DataSourceMember: "EndTime",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbStore",
        DataSourceMember: "StoreID",
        label: "Kho thuê",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.USER_COOSTORE_BYUSER",
        ValueMember: "StoreID",
        NameMember: "StoreName",
     

    },
    {
        type: "ComboBox",
        name: "cbVehicleRentalStatus",
        DataSourceMember: "VehicleRentalStatusID",
        label: "Trạng thái yêu cầu thuê xe",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.VEHICLERENTALSTATUS",
        ValueMember: "VehicleRentalStatusID",
        NameMember: "VehicleRentalStatusName",

    },
]

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeywordNew"
    },
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    },
    {
        Name: "RentalTypeID",
        DefaultValue: "",
        BindControlName: "cbRentalType"
    },
    {
        Name: "StartTime",
        DefaultValue: "",
        BindControlName: "dtStartTime"
    },
    {
        Name: "EndTime",
        DefaultValue: "",
        BindControlName: "dtEndDate"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cbStore"
    },
    {
        Name: "VehicleRentalStatusID",
        DefaultValue: "",
        BindControlName: "cbVehicleRentalStatus"
    },

]

export const InitSearchParams = [
    {
        SearchKey: "@KEYWORD",
        SearchValue: ""
    },
    {
        SearchKey: "@SRHTYPE",
        SearchValue:-1
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@RENTALYPEID",
        SearchValue: -1
    },
    {
        SearchKey: "@STOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@VEHICLERENTALSTATUS",
        SearchValue: -1
    },
];


export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleRentalRequestID",
        Width: 50
    },
    {
        Name: "VehicleRentalRequestID",
        Type: "texttolink",
        Caption: "Mã yc thuê xe",
        Link: "/VehicleRentalRequest/Detail/",
        DataSourceMember: "VehicleRentalRequestID",
        Width: 100
    },
    {
        Name: "LicensePlateNumber",
        Type: "text",
        Caption: "Biển số xe",
        DataSourceMember: "LicensePlateNumber",
    },
    {
        Name: "RentalTypeName",
        Type: "text",
        Caption: "Hình thức thuê xe",
        DataSourceMember: "RentalTypeName",
    },
    {
        Name: "StartTime",
        Type: "date",
        Caption: "Thời gian bắt đầu",
        DataSourceMember: "StartTime",
        Width: 130
    },
    {
        Name: "EndTime",
        Type: "date",
        Caption: "Thời gian kết thúc",
        DataSourceMember: "EndTime",
        Width: 130
    },
    {
        Name: "Cost",
        Type: "text",
        Caption: "Chí phí thuê",
        DataSourceMember: "Cost",
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho thuê",
        DataSourceMember: "StoreName",
    },
    {
        Name: "RequestFullName",
        Type: "text",
        Caption: "Người thuê",
        DataSourceMember: "RequestFullName",
    },
    {
        Name: "VehicleRentalStatusName",
        Type: "text",
        Caption: "Trạng thái",
        DataSourceMember: "VehicleRentalStatusName",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleRentalRequestID",
        // Width: 100,
        Link: "/VehicleRentalRequest/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const MLObjectDefinition = [
    {
        Name: "VehicleRentalRequestID",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalRequestID",
        DataSourceMember: "VehicleRentalRequestID"
    },
    {
        Name: "VehicleRentalRequestTypeID",
        DefaultValue: "",
        BindControlName: "cboVehicleRentalRequestType",
        DataSourceMember: "VehicleRentalRequestTypeID"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "cboRequestStore",
        DataSourceMember: "StoreID"
    },
    {
        Name: "VehicleID",
        DefaultValue: "",
        BindControlName: "cboVehicle",
        DataSourceMember: "VehicleID"
    },
    {
        Name: "RequestUser",
        DefaultValue: "",
        BindControlName: "cboRequestUser",
        DataSourceMember: "RequestUser"
    },
    {
        Name: "RentalTypeID",
        DefaultValue: "",
        BindControlName: "cboRentalType",
        DataSourceMember: "RentalTypeID"
    },
    {
        Name: "ContractID",
        DefaultValue: "",
        BindControlName: "txtContractID",
        DataSourceMember: "ContractID"
    },
    {
        Name: "StartTime",
        DefaultValue: "",
        BindControlName: "dtStartTime",
        DataSourceMember: "StartTime"
    },
    {
        Name: "EndTime",
        DefaultValue: "",
        BindControlName: "dtEndTime",
        DataSourceMember: "EndTime"
    },
    // {
    //     Name: "IsActived",
    //     DefaultValue: true,
    //     BindControlName: "chkIsActived",
    //     DataSourceMember: "IsActived"
    // },

    // {
    //     Name: "IsSystem",
    //     DefaultValue: false,
    //     BindControlName: "chkIsSystem",
    //     DataSourceMember: "IsSystem"
    // },
   
]

export const DataGridColumnItemListWF=[
    {
        Name: "ProcessDate",
        Type: "date",
        Caption: "Thời gian xử lý",
        DataSourceMember: "ProcessDate",
        Width: 130
    },
    {
        Name: "VehicleRentalRequestStepName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "VehicleRentalRequestStepName",
    },
    {
        Name: "ProcessFullName",
        Type: "text",
        Caption: "Người xử lý",
        DataSourceMember: "ProcessFullName",
    },
]