import { ERPCOMMONCACHE_AREATT } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/CoordinatorGroup/Search";
export const LoadAPIPath = "api/CoordinatorGroup/Load";
export const AddAPIPath = "api/CoordinatorGroup/Add";
export const UpdateAPIPath = "api/CoordinatorGroup/Update";
export const DeleteAPIPath = "api/CoordinatorGroup/Delete";
export const UpdateOrderAPIPath = "api/CoordinatorGroup/UpdateOrder";
export const BackLink = "/CoordinatorGroup";
export const AddLink = "/CoordinatorGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CoordinatorGroupID";
export const InitSearchParams = [
    { SearchKey: "@Keyword", SearchValue: "" },
    { SearchKey: "@AreaID", SearchValue: -1 }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhóm chi nhánh quản lý" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm chi nhánh quản lý" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm chi nhánh quản lý" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm chi nhánh quản lý" },
    { Link: "", Title: "Chi tiết nhóm chi nhánh quản lý" }
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
    },
    {
        type: "select",
        name: "slAreaID",
        label: "Khu vực",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_AREATT,
        ValueMember: "AreaID",
        NameMember: "AreaName"
    }

];

export const AddElementList = [
    // {
    //     type: "text",
    //     name: "txtCoordinatorGroupID",
    //     label: "mã nhóm chi nhánh quản lý",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "CoordinatorGroupID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtCoordinatorGroupName",
        label: "tên nhóm chi nhánh quản lý",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CoordinatorGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtAreaID",
        label: "khu vực",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName"
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
        name: "txtCoordinatorGroupID",
        label: "mã nhóm chi nhánh quản lý",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CoordinatorGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCoordinatorGroupName",
        label: "tên nhóm chi nhánh quản lý",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CoordinatorGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtAreaID",
        label: "khu vực",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AreaID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
        ValueMember: "AreaID",
        NameMember: "AreaName"
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
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "slAreaID"
    }

];

export const MLObjectDefinition = [
    {
        Name: "CoordinatorGroupID",
        DefaultValue: "",
        BindControlName: "txtCoordinatorGroupID",
        DataSourceMember: "CoordinatorGroupID"
    },
    {
        Name: "CoordinatorGroupName",
        DefaultValue: "",
        BindControlName: "txtCoordinatorGroupName",
        DataSourceMember: "CoordinatorGroupName"
    },
    {
        Name: "AreaID",
        DefaultValue: "",
        BindControlName: "txtAreaID",
        DataSourceMember: "AreaID"
    },
    {
        Name: "AreaName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "AreaName"
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
        DataSourceMember: "CoordinatorGroupID",
        Width: 60
    },
    {
        Name: "CoordinatorGroupID",
        Type: "text",
        Caption: "Mã nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupID",
        Width: 200
    },
    {
        Name: "CoordinatorGroupName",
        Type: "texttolink",
        Link: "/CoordinatorGroup/Detail/",
        Caption: "Tên nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupName",
        Width: 300
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "AreaName",
        Width: 150
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     //Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "CoordinatorGroupID",
        Width: 100,
        Link: "/CoordinatorGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const SchemaData = {
    "Mã nhóm chi nhánh quản lý": {
        prop: 'CoordinatorGroupID',
        type: String,
        required: true
    },
    "Mã nhân viên": {
        prop: 'UserName',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã nhóm chi nhánh quản lý": ""
    },
    {
        "Mã nhân viên": ""
    }
];

export const lstColImportExcelModal = [
    {
        Name: "CoordinatorGroupID",
        Type: "text",
        Caption: "Mã nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupID"
    },
    {
        Name: "CoordinatorGroupName",
        Type: "text",
        Caption: "Tên nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupName"
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName"
    },
    {
        Name: "ErrorContent",
        Type: "text",
        Caption: "Nội dung lỗi",
        DataSourceMember: "ErrorContent"
    },
]