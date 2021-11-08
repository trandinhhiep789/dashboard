import { ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS } from '../../../../../constants/keyCache';

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Vehicle/Search";
export const LoadAPIPath = "api/Vehicle/Load";
export const LoadNewAPIPath = "api/Vehicle/LoadNew";
export const AddAPIPath = "api/Vehicle/Add";
export const UpdateAPIPath = "api/Vehicle/Update";
export const DeleteAPIPath = "api/Vehicle/Delete";
export const DeleteNewAPIPath = "api/Vehicle/DeleteNew";
export const BackLink = "/Vehicle";
export const AddLink = "/Vehicle/Add";
export const AddLogAPIPath = "api/Vehicle/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách phương tiện" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách phương tiện" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/Vehicle", Title: "Danh sách phương tiện" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@KEYWORD",
        SearchValue: ""
    },
    {
        SearchKey: "@SRHTYPE",
        SearchValue: ""
    },
    {
        SearchKey: "@PARTNERID",
        SearchValue: ""
    },
    {
        SearchKey: "@FROMWEIGHT",
        SearchValue: ""
    },
    {
        SearchKey: "@TOWEIGHT",
        SearchValue: ""
    },
    {
        SearchKey: "@FROMVOLUME",
        SearchValue: ""
    },
    {
        SearchKey: "@TOVOLUME",
        SearchValue: ""
    },
    {
        SearchKey: "@ACTIVITYSTATUSID",
        SearchValue: ""
    },
];

export const SearchElementList = [
    {
        type: "textdropdownNew",
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        colspan: 2,
        colspan: 3,
        dropdownName: "txtSrhType",
        icon: "",
        label: "Từ khóa",
        labelOption: "--Vui lòng chọn--",
        name: "txtKeyword",
        nameOption: "txtSrhType",
        placeholder: "Từ khóa",
        value: "",
        valueOption: 1,
        listoption: [
            { value: 1, label: 'Mã xe' },
            { value: 2, label: 'Tên xe' },
            { value: 3, label: 'Biển số xe' },
        ]
    },
    {
        type: "ComboBox",
        colspan: 2,
        DataSourceMember: "PartnerID",
        IsAutoLoadItemFromCache: true,
        isMultiSelect: false,
        label: "Đối tác",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        name: "cbPartnerID",
        NameMember: "PartnerName",
        placeholder: "---Đối tác---",
        value: -1,
        ValueMember: "PartnerID",
    },
    {
        type: "text",
        name: "txtFromWeight",
        label: `Tải trọng từ (kg)`,
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: ["numberDecimal"]
    },
    {
        type: "text",
        name: "txtToWeight",
        label: "Tải trọng đến (kg)",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: ["numberDecimal"]
    },
    {
        type: "text",
        name: "txtFromVolume",
        label: "Thể tích từ (m3)",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: ["numberDecimal"]
    },
    {
        type: "text",
        name: "txtToVolume",
        label: "Thể tích đến (m3)",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: ["numberDecimal"]
    },
    {
        type: "ComboBox",
        name: "cbActivityStatusID",
        DataSourceMember: "ActivityStatusID",
        label: "Trạng thái hoạt động",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Trạng thái hoạt động---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_VEHICLEACTIVITYSTATUS,
        ValueMember: "ActivityStatusID",
        NameMember: "ActivityStatusName"
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "srhType",
        DefaultValue: "",
        BindControlName: "txtSrhType"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
    {
        Name: "FromWeight",
        DefaultValue: "",
        BindControlName: "txtFromWeight"
    },
    {
        Name: "ToWeight",
        DefaultValue: "",
        BindControlName: "txtToWeight"
    },
    {
        Name: "FromVolume",
        DefaultValue: "",
        BindControlName: "txtFromVolume"
    },
    {
        Name: "ToVolume",
        DefaultValue: "",
        BindControlName: "txtToVolume"
    },
    {
        Name: "ActivityStatusID",
        DefaultValue: "",
        BindControlName: "cbActivityStatusID"
    },
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
        Name: "VehicleID",
        Type: "text",
        Caption: "Mã xe",
        DataSourceMember: "VehicleID",
    },
    {
        Name: "VehicleName",
        Type: "text",
        Caption: "Tên xe",
        DataSourceMember: "VehicleName",
    },
    {
        Name: "LicensePlateNumber",
        Type: "text",
        Caption: "Biển số xe",
        DataSourceMember: "LicensePlateNumber",
    },
    // {
    //     Name: "MainDriverUserIDName",
    //     Type: "text",
    //     Caption: "Tài xế",
    //     DataSourceMember: "MainDriverUserIDName",
    // },
    {
        Name: "PartnerIDName",
        Type: "text",
        Caption: "Tên đối tác",
        DataSourceMember: "PartnerIDName",
    },
    // {
    //     Name: "MainCoordinatorStoreIDName",
    //     Type: "text",
    //     Caption: "Kho điều phối chính",
    //     DataSourceMember: "MainCoordinatorStoreIDName",
    // },
    {
        Name: "Weight",
        Type: "text",
        Caption: "Tải trọng(kg)",
        DataSourceMember: "Weight",
    },
    {
        Name: "Length",
        Type: "text",
        Caption: "Chiều dài(m)",
        DataSourceMember: "Length",
    },
    {
        Name: "Width",
        Type: "text",
        Caption: "Chiều rộng(m)",
        DataSourceMember: "Width",
    },
    {
        Name: "Height",
        Type: "text",
        Caption: "Chiều cao(m)",
        DataSourceMember: "Height",
    },
    {
        Name: "Volume",
        Type: "text",
        Caption: "Thể tích(m3)",
        DataSourceMember: "Volume",
    },
    {
        Name: "ActivityStatusIDName",
        Type: "text",
        Caption: "Trạng thái hoạt động ",
        DataSourceMember: "ActivityStatusIDName",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleID",
        Width: 80,
        Link: "/Vehicle/Edit/",
        LinkText: "Chỉnh sửa"
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
        Name: "VehicleTypeID",
        DefaultValue: "",
        BindControlName: "cbVehicleTypeID",
        DataSourceMember: "VehicleTypeID"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID",
        DataSourceMember: "PartnerID"
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
        Name: "ActivityStatusID",
        DefaultValue: "",
        BindControlName: "cbActivityStatusID",
        DataSourceMember: "ActivityStatusID"
    },
    // {
    //     Name: "MainCoordinatorStoreID",
    //     DefaultValue: "",
    //     BindControlName: "cbMainCoordinatorStoreID",
    //     DataSourceMember: "MainCoordinatorStoreID"
    // },
    {
        Name: "MainDriverUser",
        DefaultValue: "",
        BindControlName: "cbMainDriverUser",
        DataSourceMember: "MainDriverUser"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    // {
    //     Name: "Description",
    //     DefaultValue: true,
    //     BindControlName: "txtDescription",
    //     DataSourceMember: "Description"
    // },
    {
        Name: "IsSystem",
        DefaultValue: true,
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "VehicleModelID",
        DefaultValue: "",
        BindControlName: "cbVehicleModelID",
        DataSourceMember: "VehicleModelID"
    },
    {
        Name: "Weight",
        DefaultValue: "",
        BindControlName: "txtWeight",
        DataSourceMember: "Weight"
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
        Name: "Volume",
        DefaultValue: "",
        BindControlName: "txtVolume",
        DataSourceMember: "Volume"
    },
]