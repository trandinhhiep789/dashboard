export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Vehicle/Search";
export const LoadAPIPath = "api/Vehicle/Load";
export const LoadNewAPIPath = "api/Vehicle/LoadNew";
export const AddAPIPath = "api/Vehicle/Add";
export const AddNewAPIPath = "api/Vehicle/AddNew";
export const UpdateAPIPath = "api/Vehicle/Update";
export const UpdateNewAPIPath = "api/Vehicle/UpdateNew";
export const DeleteAPIPath = "api/Vehicle/Delete";
export const DeleteNewAPIPath = "api/Vehicle/DeleteNew";
export const UpdateOrderAPIPath = "api/Vehicle/UpdateOrder";
export const BackLink = "/Vehicle";
export const AddLink = "/Vehicle/Add";
export const AddLogAPIPath = "api/Vehicle/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đăng kí xe" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách đăng kí xe" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách đăng kí xe" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleID",
        Width: 60
    },
    {
        Name: "VehicleName",
        Type: "text",
        Caption: "Tên xe",
        DataSourceMember: "VehicleName",
        Width: 100
    },
    {
        Name: "LicensePlateNumber",
        Type: "text",
        Caption: "Biển số xe",
        DataSourceMember: "LicensePlateNumber",
        Width: 150
    },
    {
        Name: "MainDriverUser",
        Type: "text",
        Caption: "Tài xế",
        DataSourceMember: "MainDriverUser",
        Width: 150
    },
    {
        Name: "MainCoordinatorStoreID",
        Type: "text",
        Caption: "kho điều phối chính",
        DataSourceMember: "MainCoordinatorStoreID",
        Width: 150
    },
    
    {
        Name: "Weight",
        Type: "text",
        Caption: "Tải trọng(kg)",
        DataSourceMember: "Weight",
        Width: 70
    },
    {
        Name: "Length",
        Type: "text",
        Caption: "Chiều dài(m)",
        DataSourceMember: "Length",
        Width: 70
    },
    {
        Name: "Width",
        Type: "text",
        Caption: "Chiều rộng(m)",
        DataSourceMember: "Width",
        Width: 70
    },
    {
        Name: "Height",
        Type: "text",
        Caption: "Chiều cao(m)",
        DataSourceMember: "Height",
        Width: 70
    },
    {
        Name: "Volume",
        Type: "text",
        Caption: "Thể tích(m3)",
        DataSourceMember: "Volume",
        Width: 70
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleID",
        Width: 100,
        Link: "/Vehicle/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const MLObjectDefinitionNew = [
    {
        Name: "VehicleID",
        DefaultValue: "",
        BindControlName: "txtVehicleID",
        DataSourceMember: "VehicleID"
    },
    {
        Name: "VehicleName",
        DefaultValue: "",
        BindControlName: "txtVehicleName",
        DataSourceMember: "VehicleName"
    },
    {
        Name: "LicensePlateNumber",
        DefaultValue: "",
        BindControlName: "txtLicensePlateNumber",
        DataSourceMember: "LicensePlateNumber"
    },
    {
        Name: "MainDriverUser",
        DefaultValue: {},
        BindControlName: "cbMainDriverUser",
        DataSourceMember: "MainDriverUser"
    },
    
    {
        Name: "MainCoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbMainCoordinatorStoreID",
        DataSourceMember: "MainCoordinatorStoreID"
    },
    {
        Name: "Weight",
        DefaultValue: "",
        BindControlName: "txtWeight",
        DataSourceMember: "Weight"
    },
    {
        Name: "Volume",
        DefaultValue: "",
        BindControlName: "txtVolume",
        DataSourceMember: "Volume"
    },
    {
        Name: "Length",
        DefaultValue: "",
        BindControlName: "txtLength",
        DataSourceMember: "Length"
    },
    {
        Name: "Width",
        DefaultValue: "",
        BindControlName: "txtWidth",
        DataSourceMember: "Width"
    },
    
    {
        Name: "Height",
        DefaultValue: "",
        BindControlName: "txtHeight",
        DataSourceMember: "Height"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },

    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
]

export const MLObjectDefinition = [
    {
        Name: "VehicleID",
        DefaultValue: "",
        BindControlName: "txtVehicleID",
        DataSourceMember: "VehicleID"
    },
    {
        Name: "VehicleName",
        DefaultValue: "",
        BindControlName: "txtVehicleName",
        DataSourceMember: "VehicleName"
    },
    {
        Name: "LicensePlateNumber",
        DefaultValue: "",
        BindControlName: "txtLicensePlateNumber",
        DataSourceMember: "LicensePlateNumber"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "ShipmentOrder_DeliverUserList",
        DefaultValue: {},
        BindControlName: "ShipmentOrder_DeliverUserList",
        DataSourceMember: "ShipmentOrder_DeliverUserList"
    },
    {
        Name: "MainDriverUser",
        DefaultValue: {},
        BindControlName: "MainDriverUser",
        DataSourceMember: "MainDriverUser"
    },
    
    {
        Name: "MainCoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "cbMainCoordinatorStoreID",
        DataSourceMember: "MainCoordinatorStoreID"
    },
    {
        Name: "Weight",
        DefaultValue: "",
        BindControlName: "txtWeight",
        DataSourceMember: "Weight"
    },
    {
        Name: "Volume",
        DefaultValue: "",
        BindControlName: "txtVolume",
        DataSourceMember: "Volume"
    },
    {
        Name: "Length",
        DefaultValue: "",
        BindControlName: "txtLength",
        DataSourceMember: "Length"
    },
    {
        Name: "Width",
        DefaultValue: "",
        BindControlName: "txtWidth",
        DataSourceMember: "Width"
    },
    
    {
        Name: "Height",
        DefaultValue: "",
        BindControlName: "txtHeight",
        DataSourceMember: "Height"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },

    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
]

export const AddElementList = [
  

];

export const InputCoordinatorStoreWardColumnList = [

];

export const GridMLCoordinatorStoreWardDefinition = []

export const EditElementList = [

];
