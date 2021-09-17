export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/WorkingShift/Search";
export const LoadAPIPath = "api/WorkingShift/Load";
export const LoadNewAPIPath = "api/WorkingShift/LoadNew";
export const AddAPIPath = "api/WorkingShift/Add";
export const AddNewAPIPath = "api/WorkingShift/AddNew";
export const UpdateAPIPath = "api/WorkingShift/Update";
export const UpdateNewAPIPath = "api/WorkingShift/UpdateNew";
export const DeleteAPIPath = "api/WorkingShift/Delete";
export const DeleteNewAPIPath = "api/WorkingShift/DeleteNew";
export const UpdateOrderAPIPath = "api/WorkingShift/UpdateOrder";
export const BackLink = "/WorkingShift";
export const AddLink = "/WorkingShift/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "WorkingShiftID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách ca làm việc" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingShift", Title: "Danh sách ca làm việc" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingShift", Title: "Danh sách ca làm việc" },
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

export const MLObjectDefinition = [
    {
        Name: "WorkingShiftID",
        DefaultValue: {},
        BindControlName: "txtWorkingShiftID",
        DataSourceMember: "WorkingShiftID"
    },
    {
        Name: "WorkingShiftName",
        DefaultValue: {},
        BindControlName: "txtWorkingShiftName",
        DataSourceMember: "WorkingShiftName"
    },
    {
        Name: "TimeStart",
        DefaultValue: {},
        BindControlName: "txtTimeStart",
        DataSourceMember: "TimeStart"
    },
    {
        Name: "TimeEnd",
        DefaultValue: {},
        BindControlName: "txtTimeEnd",
        DataSourceMember: "TimeEnd"
    },
    {
        Name: "ShiftNumber",
        DefaultValue: {},
        BindControlName: "txtShiftNumber",
        DataSourceMember: "ShiftNumber"
    },
    {
        Name: "Description",
        DefaultValue: {},
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
    {
        type: "select",
        name: "cbShipmentOrderTypeID",
        label: "loại yêu cầu xuất",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "ShipmentOrderTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.SHIPMENTORDERTYPE",
        valuemember: "ShipmentOrderTypeID",
        nameMember: "ShipmentOrderTypeName",
        OrderIndex: 1
    },
    {
        type: "select",
        name: "cbPartnerID",
        label: "đối tác",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.PARTNER",
        valuemember: "PartnerID",
        nameMember: "PartnerName",
        OrderIndex: 2
    },
    {
        type: "select",
        name: "cbStoreID",
        label: "kho điều phối",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.STORE",
        valuemember: "StoreID",
        nameMember: "StoreName",
        filterValue: 10,
        filterobj: "CompanyID",
        OrderIndex: 3
    },
    {
        type: "select",
        name: "cbSenderStoreID",
        label: "kho gửi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        datasourcemember: "SenderStoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        isautoloaditemfromcache: true,
        loaditemcachekeyid: "ERPCOMMONCACHE.STORE",
        valuemember: "StoreID",
        nameMember: "StoreName",
        filterValue: 1,
        filterobj: "CompanyID",
        OrderIndex: 4
    },
    {
        type: "checkbox",
        name: "chkIsCheckCustomerAddress",
        datasourcemember: "IsCheckCustomerAddress",
        label: "kiểm tra địa chỉ khách hàng",
        value: false,
        readonly: false,
        OrderIndex: 5
    }

];


export const EditElementList = [

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "WorkingShiftID",
        Width: 60
    },
    {
        Name: "WorkingShiftIDName",
        Type: "text",
        Caption: "Ca làm việc",
        DataSourceMember: "WorkingShiftIDName",
        Width: 250
    },
    {
        Name: "FromTime",
        Type: "text",
        Caption: "Giờ bắt đầu",
        DataSourceMember: "FromTime",
        Width: 250
    },
    {
        Name: "ToTime",
        Type: "text",
        Caption: "Giờ kết thúc",
        DataSourceMember: "ToTime",
        Width: 250
    },
    {
        Name: "ShiftNumber",
        Type: "text",
        Caption: "Ca làm việc",
        DataSourceMember: "ShiftNumber",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "WorkingShiftID",
        Width: 100,
        Link: "/WorkingShift/Edit/",
        LinkText: "Chỉnh sửa"
    },
]