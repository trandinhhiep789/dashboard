import { ERPCOMMONCACHE_AREATT } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MonthlyCoordGroup/Search";
export const LoadAPIPath = "api/MonthlyCoordGroup/Load";
export const AddAPIPath = "api/MonthlyCoordGroup/Add";
export const UpdateAPIPath = "api/MonthlyCoordGroup/Update";
export const DeleteAPIPath = "api/MonthlyCoordGroup/Delete";
export const UpdateOrderAPIPath = "api/MonthlyCoordGroup/UpdateOrder";
export const ExelDataAPIPath = "api/MonthlyCoordGroup/ExelData";
export const BackLink = "/MonthlyCoordGroup";
export const AddLink = "/MonthlyCoordGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MonthlyCoordGroupID";
export const InitSearchParams = [
    { SearchKey: "@Keyword", SearchValue: "" },
    { SearchKey: "@AreaID", SearchValue: -1 }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhóm chi nhánh quản lý theo tháng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MonthlyCoordGroup", Title: "Nhóm chi nhánh quản lý theo tháng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MonthlyCoordGroup", Title: "Nhóm chi nhánh quản lý theo tháng" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MonthlyCoordGroup", Title: "Nhóm chi nhánh quản lý theo tháng" },
    { Link: "", Title: "Chi tiết nhóm chi nhánh quản lý theo tháng" }
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
    //     name: "txtMonthlyCoordGroupID",
    //     label: "mã nhóm điều phối",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "MonthlyCoordGroupID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtMonthlyCoordGroupName",
        label: "tên nhóm điều phối",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MonthlyCoordGroupName",
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
        name: "txtMonthlyCoordGroupID",
        label: "mã nhóm điều phối",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MonthlyCoordGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtMonthlyCoordGroupName",
        label: "tên nhóm điều phối",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MonthlyCoordGroupName",
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
        Name: "MonthlyCoordGroupID",
        DefaultValue: "",
        BindControlName: "txtMonthlyCoordGroupID",
        DataSourceMember: "MonthlyCoordGroupID"
    },
    {
        Name: "MonthlyCoordGroupName",
        DefaultValue: "",
        BindControlName: "txtMonthlyCoordGroupName",
        DataSourceMember: "MonthlyCoordGroupName"
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
        Name: "CoordinatorMonth",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CoordinatorMonth"
    },
    {
        Name: "CoordinatorMonthString",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CoordinatorMonthString"
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
        DataSourceMember: "MonthlyCoordGroupID",
        Width: 60
    },
    {
        Name: "MonthlyCoordGroupID",
        Type: "texttolink",
        Link: "/MonthlyCoordGroup/Detail/",
        Caption: "Mã nhóm chi nhánh quản lý theo tháng",
        DataSourceMember: "MonthlyCoordGroupID",
        Width: 180
    },
    {
        Name: "CoordinatorGroupID",
        Type: "text",
        Caption: "Mã nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupID",
        Width: 180
    },
    {
        Name: "CoordinatorGroupName",
        Type: "text",
        Caption: "Tên nhóm chi nhánh quản lý",
        DataSourceMember: "CoordinatorGroupName",
        Width: 250
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "AreaName",
        Width: 150
    },
    {
        Name: "CoordinatorMonthString",
        Type: "text",
        Caption: "Tháng điều phối",
        DataSourceMember: "CoordinatorMonthString",
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
    // {
    //     Name: "Action",
    //     Type: "link",
    //     Caption: "Tác vụ",
    //     DataSourceMember: "MonthlyCoordGroupID",
    //     Width: 100,
    //     Link: "/MonthlyCoordGroup/Edit/",
    //     LinkText: "Chỉnh sửa"
    // }
];
