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
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Nhóm điều phối" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm điều phối" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm điều phối" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/CoordinatorGroup", Title: "Nhóm điều phối" },
    { Link: "", Title: "Chi tiết yêu cầu hủy vật tư" }
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
    //     name: "txtCoordinatorGroupID",
    //     label: "mã nhóm điều phối",
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
        label: "tên nhóm điều phối",
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
        label: "mã nhóm điều phối",
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
        label: "tên nhóm điều phối",
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
        Caption: "Mã Nhóm điều phối",
        DataSourceMember: "CoordinatorGroupID",
        Width: 200
    },
    {
        Name: "CoordinatorGroupName",
        Type: "texttolink",
        Link: "/CoordinatorGroup/Detail/",
        Caption: "Tên Nhóm điều phối",
        DataSourceMember: "CoordinatorGroupName",
        Width: 250
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "AreaName",
        //Width: 200
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
        DataSourceMember: "CoordinatorGroupID",
        Width: 100,
        Link: "/CoordinatorGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
