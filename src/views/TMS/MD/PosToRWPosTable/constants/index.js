import { ERPCOMMONCACHE_TMSREWARDPOSITION } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PosToRWPosTable/Search";
export const LoadAPIPath = "api/PosToRWPosTable/Load";
export const AddAPIPath = "api/PosToRWPosTable/Add";
export const UpdateAPIPath = "api/PosToRWPosTable/Update";
export const DeleteAPIPath = "api/PosToRWPosTable/Delete";
export const UpdateOrderAPIPath = "api/PosToRWPosTable/UpdateOrder";
export const BackLink = "/PosToRWPosTable";
export const AddLink = "/PosToRWPosTable/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PosToRWPosTableID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng chuyển đổi chức vụ nhân viên và vị trí thưởng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PosToRWPosTable", Title: "Danh sách bảng chuyển đổi chức vụ nhân viên và vị trí thưởng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PosToRWPosTable", Title: "Danh sách bảng chuyển đổi chức vụ nhân viên và vị trí thưởng" },
    { Link: "", Title: "Thêm" }
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
    // {
    //     type: "text",
    //     name: "txtPosToRWPosTableID",
    //     label: "mã loại thưởng",
    //     value: "",
    //     maxSize: "10",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "PosToRWPosTableID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtPosToRWPosTableName",
        label: "Tên bảng chuyển đổi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PosToRWPosTableName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "txtDepartmentID",
        type: "multiselect",
        label: "phòng ban",
        DataSourceMember: "DepartmentID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BCNBSYSTEM_DEPARTMENT",
        ValueMember: "DepartmentID",
        NameMember: "DepartmentName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        name: "txtPositionID",
        type: "multiselect",
        label: "chức vụ",
        DataSourceMember: "PositionID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.POSITION",
        ValueMember: "PositionID",
        NameMember: "PositionName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        name: "txtRewardPositionID",
        type: "multiselect",
        label: "vị trí thưởng",
        DataSourceMember: "RewardPositionID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDPOSITION",
        ValueMember: "RewardPositionID",
        NameMember: "RewardPositionName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "txtDelayDays",
        label: "ngày set vị trí thưởng",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DelayDays",
        readonly: false,
        validatonList: ["required", "number"],
    },
    {
        type: "text",
        name: "txtBaseServiceTime",
        label: "Thời gian dịch vụ cơ sở",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BaseServiceTime",
        readonly: false,
        validatonList: ["number"],
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
        name: "txtPosToRWPosTableID",
        label: "mã bảng chuyển đổi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PosToRWPosTableID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPosToRWPosTableName",
        label: "Tên bảng chuyển đổi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PosToRWPosTableName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "txtDepartmentID",
        type: "multiselect",
        label: "phòng ban",
        DataSourceMember: "DepartmentID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BCNBSYSTEM_DEPARTMENT",
        ValueMember: "DepartmentID",
        NameMember: "DepartmentName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        name: "txtPositionID",
        type: "multiselect",
        label: "chức vụ",
        DataSourceMember: "PositionID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.POSITION",
        ValueMember: "PositionID",
        NameMember: "PositionName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        name: "txtRewardPositionID",
        type: "multiselect",
        label: "vị trí thưởng",
        DataSourceMember: "RewardPositionID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMSREWARDPOSITION",
        ValueMember: "RewardPositionID",
        NameMember: "RewardPositionName",
        //KeyFilter: "DepartmentName",
        //ValueFilter: "1,2"
    },
    {
        type: "text",
        name: "txtDelayDays",
        label: "ngày set vị trí thưởng",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DelayDays",
        readonly: false,
        validatonList: ["required", "number"],
    },
    {
        type: "text",
        name: "txtBaseServiceTime",
        label: "thời gian dịch vụ cơ sở",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BaseServiceTime",
        readonly: false,
        validatonList: ["number"],
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
        Name: "PosToRWPosTableID",
        DefaultValue: "",
        BindControlName: "txtPosToRWPosTableID",
        DataSourceMember: "PosToRWPosTableID"
    },
    {
        Name: "PosToRWPosTableName",
        DefaultValue: "",
        BindControlName: "txtPosToRWPosTableName",
        DataSourceMember: "PosToRWPosTableName"
    },


    {
        Name: "PosToRWPosTableName",
        DefaultValue: "",
        BindControlName: "txtPosToRWPosTableName",
        DataSourceMember: "PosToRWPosTableName"
    },
    {
        Name: "DepartmentID",
        DefaultValue: "",
        BindControlName: "txtDepartmentID",
        DataSourceMember: "DepartmentID"
    },
    {
        Name: "DepartmentName",
        DefaultValue: "",
        BindControlName: "txtDepartmentName",
        DataSourceMember: "DepartmentName"
    },
    {
        Name: "PositionID",
        DefaultValue: "",
        BindControlName: "txtPositionID",
        DataSourceMember: "PositionID"
    },
    {
        Name: "PositionName",
        DefaultValue: "",
        BindControlName: "txtPositionName",
        DataSourceMember: "PositionName"
    },
    {
        Name: "RewardPositionID",
        DefaultValue: "",
        BindControlName: "txtRewardPositionID",
        DataSourceMember: "RewardPositionID"
    },
    {
        Name: "RewardPositionName",
        DefaultValue: "",
        BindControlName: "txtRewardPositionName",
        DataSourceMember: "RewardPositionName"
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
        DataSourceMember: "PosToRWPosTableID",
        Width: 60
    },
    {
        Name: "PosToRWPosTableID",
        Type: "text",
        Caption: "Mã bảng chuyển đổi",
        DataSourceMember: "PosToRWPosTableID",
        Width: 160
    },
    {
        Name: "PosToRWPosTableName",
        Type: "text",
        Caption: "Tên bảng chuyển đổi",
        DataSourceMember: "PosToRWPosTableName",
        Width: 250
    },
    {
        Name: "RewardPositionName",
        Type: "text",
        Caption: "Tên vị trí thưởng",
        DataSourceMember: "RewardPositionName",
        Width: 250
    },
    {
        Name: "DelayDays",
        Type: "text",
        Caption: "Ngày set VTT kể từ ngày thuyên chuyển",
        DataSourceMember: "DelayDays",
        Width: 250
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
        DataSourceMember: "PosToRWPosTableID",
        Width: 100,
        Link: "/PosToRWPosTable/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
