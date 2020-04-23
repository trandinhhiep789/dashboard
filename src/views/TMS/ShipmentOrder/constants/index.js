export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentOrder/Search";
export const LoadAPIPath = "api/ShipmentOrder/Load";
export const AddAPIPath = "api/ShipmentOrder/Add";
export const UpdateAPIPath = "api/ShipmentOrder/Update";
export const DeleteAPIPath = "api/ShipmentOrder/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrder/UpdateOrder";
export const BackLink = "/ShipmentOrder";
export const AddLink = "/ShipmentOrder/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách bước xử lý yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentOrder", Title: "Danh sách bước xử lý yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentOrder", Title: "Danh sách bước xử lý yêu cầu vận chuyển" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 30);

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan:2,
        placeholder: "Từ khóa",
        icon: "",
        validatonList: ["required"]
    },
    {
        type: "ComboBox",
        name: "cbRequestPartnerID",
        DataSourceMember: "RequestPartnerID",
        label: "Công ty",
        colspan:2,
        value: -1,
        isMultiSelect: true,
        validatonList: ["Comborequired"],
        placeholder:"---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
        
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeFo",
        DataSourceMember: "CreatedOrderTimeFo",
        label: "Từ ngày",
        value: "",
        timeFormat:false,
        dateFormat:"DD/MM/YYYY",
        colspan:2,
    },
    {
        type: "Datetime",
        name: "dtCreatedOrderTimeTo",
        DataSourceMember: "CreatedOrderTimeTo",
        label: "Đến ngày",
        value: "",
        timeFormat:false,
        dateFormat:"DD/MM/YYYY",
        colspan:2,
    },
    {
        type: "ComboBox",
        name: "cbReceiverProvinceID",
        DataSourceMember: "ReceiverProvinceID",
        label: "Tỉnh /thành phố",
        colspan:2,
        value: -1,
        isMultiSelect: false,
        placeholder:"---Vui lòng chọn---",
        listoption: [], 
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PROVINCE",
        ValueMember: "ProvinceID",
        NameMember: "ProvinceName"
    },
    {
        type: "ComboBox",
        name: "cbReceiverDistrictID",
        DataSourceMember: "ReceiverDistrictID",
        label: "Quận/huyện",
        colspan:2,
        value: -1,
        isMultiSelect: false,
        placeholder:"---Vui lòng chọn---",
        listoption: [], 
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.DISTRICT",
        ValueMember: "DistrictID",
        NameMember: "DistrictName"
    },
    {
        type: "ComboBox",
        name: "cbSenderStoreID",
        DataSourceMember: "SenderStoreID",
        label: "Kho giao",
        colspan:2,
        value: -1,
        isMultiSelect: false,
        placeholder:"---Vui lòng chọn---",
        listoption: [
            { value: -1, label: '---Vui lòng chọn---' },
            { value: 1, label: 'Việt Nam' },
            { value: 2, label: 'Hoa kỳ' },
            { value: 3, label: 'Trung Quốc' }],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName"
        
    },
    {
        type: "ComboBox",
        name: "cbShipmentOrderStatusID",
        DataSourceMember: "ShipmentOrderStatusID",
        label: "Trạng thái",
        colspan:2,
        value: -1,
        isMultiSelect: false,
        placeholder:"---Vui lòng chọn---",
        listoption: [
            { value: -1, label: '---Vui lòng chọn---' },
            { value: 1, label: 'Khởi tạo' },
            { value: 2, label: 'Giao hàng' },
            { value: 3, label: 'Hoàn thành' }
        ]
    }
];
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@REQUESTPARTNERID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FromDate",
        SearchValue: null
    },
    {
        SearchKey: "@ToDate",
        SearchValue: null
    }
    ,
    {
        SearchKey: "@RECEIVERPROVINCEID",
        SearchValue: -1
    },
    {
        SearchKey: "@RECEIVERDISTRICTID",
        SearchValue: -1
    },
    {
        SearchKey: "@SENDERSTOREID",
        SearchValue: -1
    },
    {
        SearchKey: "@SHIPMENTORDERSTATUSID",
        SearchValue: -1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 10
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 0
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "cbRequestPartnerID",
        DefaultValue: "",
        BindControlName: "RequestPartnerID"
    },
    {
        Name: "CreatedOrderTimeFo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeFo"
    },
    {
        Name: "CreatedOrderTimeTo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeTo"
    },
    {
        Name: "ReceiverProvinceID",
        DefaultValue: "",
        BindControlName: "cbReceiverProvinceID"
    },
    {
        Name: "ReceiverDistrictID",
        DefaultValue: "",
        BindControlName: "cbReceiverDistrictID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "cbSenderStoreID"
    },
    {
        Name: "ShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusID"
    }
];

export const AddElementList = [
    {
        type: "numeric",
        name: "txtShipmentOrderID",
        label: "Mã bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderName",
        label: "Tên bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "numeric",
        name: "txtShipmentOrderID",
        label: "Mã bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderName",
        label: "Tên bước xử lý yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
];


export const MLObjectDefinition = [
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "ShipmentOrderName",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderName",
        DataSourceMember: "ShipmentOrderName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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
    {
        Name: "CreatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "administrator",
        BindControlName: "",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "LoginLogID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentOrderID",
        Width: 60
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã bước xử lý yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderID",
        Width: 250
    },
    {
        Name: "ShipmentOrderName",
        Type: "text",
        Caption: "Tên bước xử lý yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 250
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentOrderID",
        Width: 200,
        Link: "/ShipmentOrder/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
