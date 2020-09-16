export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/InventoryRequestType/Search";
export const LoadAPIPath = "api/InventoryRequestType/Load";
export const AddAPIPath = "api/InventoryRequestType/Add";
export const UpdateAPIPath = "api/InventoryRequestType/Update";
export const DeleteAPIPath = "api/InventoryRequestType/Delete";
export const UpdateOrderAPIPath = "api/InventoryRequestType/UpdateOrder";
export const BackLink = "/InventoryRequestType";
export const AddLink = "/InventoryRequestType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InventoryRequestTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại yêu cầu kiểm kê" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequestType", Title: "Loại yêu cầu kiểm kê" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequestType", Title: "Loại yêu cầu kiểm kê" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/InventoryRequestType", Title: "Loại yêu cầu kiểm kê" },
    { Link: "", Title: "Chi tiết yêu cầu kiểm kê" }
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

export const AddElementList = [
    {
        type: "text",
        name: "txtInventoryRequestTypeID",
        label: "mã loại yêu cầu kiểm kê",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryRequestTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtInventoryRequestTypeName",
        label: "tên loại yêu cầu kiểm kê",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoOutput",
        label: "Có tự động xuất",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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
        validatonList: []
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
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtInventoryRequestTypeID",
        label: "mã loại yêu cầu kiểm kê",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryRequestTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtInventoryRequestTypeName",
        label: "tên loại yêu cầu kiểm kê",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryRequestTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAutoReview",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoOutput",
        label: "Có tự động xuất",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAutoOutput",
        readonly: false,
        validatonList: []
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "InventoryRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtInventoryRequestTypeID",
        DataSourceMember: "InventoryRequestTypeID"
    },
    {
        Name: "InventoryRequestTypeName",
        DefaultValue: "",
        BindControlName: "txtInventoryRequestTypeName",
        DataSourceMember: "InventoryRequestTypeName"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsAutoReview",
        DefaultValue: "",
        BindControlName: "IsAutoReview",
        DataSourceMember: "IsAutoReview"
    },
    {
        Name: "IsAutoOutput",
        DefaultValue: "",
        BindControlName: "IsAutoOutput",
        DataSourceMember: "IsAutoOutput"
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
        DataSourceMember: "InventoryRequestTypeID",
        Width: 60
    },
    {
        Name: "InventoryRequestTypeID",
        Type: "text",
        Caption: "Mã Loại yêu cầu kiểm kê",
        DataSourceMember: "InventoryRequestTypeID",
        Width: 200
    },
    {
        Name: "InventoryRequestTypeName",
        Type: "texttolink",
        Link: "/InventoryRequestType/Detail/",
        Caption: "Tên Loại yêu cầu kiểm kê",
        DataSourceMember: "InventoryRequestTypeName",
        Width: 250
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "InventoryRequestTypeID",
        Width: 100,
        Link: "/InventoryRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
