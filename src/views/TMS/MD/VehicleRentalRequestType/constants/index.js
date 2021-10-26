import { ERPCOMMONCACHE_FUNCTION } from '../../../../../constants/keyCache';

export const APIHostName = "TMSMDMAPI";
export const AddAPIPath = "api/VehicleRentalRequestType/Add";
export const DeleteAPIPath = "api/VehicleRentalRequestType/Delete";
export const EditAPIPath = "api/VehicleRentalRequestType/Edit";
export const LoadAPIPath = "api/VehicleRentalRequestType/Load";
export const SearchAPIPath = "api/VehicleRentalRequestType/Search";

export const AddLink = "/VehicleRentalRequestType/Add";
export const BackLink = "/VehicleRentalRequestType";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleRentalRequestTypeID"

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại xử lý của yêu cầu thuê xe" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestType", Title: "Loại xử lý của yêu cầu thuê xe" },
    { Link: "", Title: "Thêm loại xử lý của yêu cầu thuê xe" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestType", Title: "Loại xử lý của yêu cầu thuê xe" },
    { Link: "", Title: "Chỉnh sửa loại xử lý của yêu cầu thuê xe" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
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
        DataSourceMember: "VehicleRentalRequestTypeID",
        Width: 60
    },
    {
        Name: "VehicleRentalRequestTypeID",
        Type: "text",
        Caption: "Mã bước xử lý",
        DataSourceMember: "VehicleRentalRequestTypeID",
    },
    {
        Name: "VehicleRentalRequestTypeName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "VehicleRentalRequestTypeName",
    },
    {
        Name: "AddFunctionID",
        Type: "text",
        Caption: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "UpdatedUserIDName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserIDName",
    },
    {
        Name: "UpdatedDate",
        Type: "datetime",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleRentalRequestTypeID",
        Width: 80,
        Link: "/VehicleRentalRequestType/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const AddElementList = [
    {
        type: "text",
        name: "txtVehicleRentalRequestTypeName",
        label: "Tên loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeName",
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
        validatonList: ["required"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_FUNCTION,
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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
]

export const EditElementList = [
    {
        type: "text",
        name: "txtVehicleRentalRequestTypeID",
        label: "Mã loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtVehicleRentalRequestTypeName",
        label: "Tên loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestTypeName",
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
        validatonList: ["required"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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

export const MLObjectDefinition = [
    {
        Name: "VehicleRentalRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalRequestTypeID",
        DataSourceMember: "VehicleRentalRequestTypeID"
    },
    {
        Name: "VehicleRentalRequestTypeName",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalRequestTypeName",
        DataSourceMember: "VehicleRentalRequestTypeName"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    }
];