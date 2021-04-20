export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardPosition/Search";
export const LoadAPIPath = "api/RewardPosition/Load";
export const AddAPIPath = "api/RewardPosition/Add";
export const UpdateAPIPath = "api/RewardPosition/Update";
export const DeleteAPIPath = "api/RewardPosition/Delete";
export const UpdateOrderAPIPath = "api/RewardPosition/UpdateOrder";
export const BackLink = "/RewardPosition";
export const AddLink = "/RewardPosition/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RewardPositionID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Vị trí thưởng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosition", Title: "Vị trí thưởng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosition", Title: "Vị trí thưởng" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPosition", Title: "Vị trí thưởng" },
    { Link: "", Title: "Chi tiết vị trí thưởng" }
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
    //     name: "txtRewardPositionID",
    //     label: "mã vị trí thưởng",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "RewardPositionID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtRewardPositionName",
        label: "tên vị trí thưởng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RewardPositionName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "StaffType",
        label: "loại nhân viên",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [{ value: -1, label: "------ Vui lòng chọn ------" }, { value: 1, label: "Nhân viên giao hàng" }, { value: 2, label: "Tài xế" }, { value: 3, label: "Nhân viên được cấp quyền điều phối" }, { value: 4, label: "Loại khác" }],
        DataSourceMember: "StaffType",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.INSTALLBUNDLE",
        // ValueMember: "InstallBundleID",
        // NameMember: "InstallBundleName"
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
        name: "txtRewardPositionID",
        label: "mã vị trí thưởng",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RewardPositionID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtRewardPositionName",
        label: "tên vị trí thưởng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RewardPositionName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "StaffType",
        label: "loại nhân viên",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [{ value: -1, label: "------ Vui lòng chọn ------" }, { value: 1, label: "Nhân viên giao hàng" }, { value: 2, label: "Tài xế" }, { value: 3, label: "Nhân viên được cấp quyền điều phối" }, { value: 4, label: "Loại khác" }],
        DataSourceMember: "StaffType",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        // LoadItemCacheKeyID: "ERPCOMMONCACHE.INSTALLBUNDLE",
        // ValueMember: "InstallBundleID",
        // NameMember: "InstallBundleName"
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
        Name: "StaffType",
        DefaultValue: "",
        BindControlName: "StaffType",
        DataSourceMember: "StaffType"
    },
    {
        Name: "StaffTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "StaffTypeName"
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
        DataSourceMember: "RewardPositionID",
        Width: 60
    },
    {
        Name: "RewardPositionID",
        Type: "text",
        Caption: "Mã Vị trí thưởng",
        DataSourceMember: "RewardPositionID",
        Width: 160
    },
    {
        Name: "RewardPositionName",
        Type: "texttolink",
        Link: "/RewardPosition/Detail/",
        Caption: "Tên Vị trí thưởng",
        DataSourceMember: "RewardPositionName",
        Width: 250
    },
    {
        Name: "StaffTypeName",
        Type: "text",
        Caption: "Loại nhân viên",
        DataSourceMember: "StaffTypeName",
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
        DataSourceMember: "RewardPositionID",
        Width: 100,
        Link: "/RewardPosition/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
