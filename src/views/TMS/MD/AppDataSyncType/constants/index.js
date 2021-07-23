export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppDataSyncType/Search";
export const LoadAPIPath = "api/AppDataSyncType/Load";
export const AddAPIPath = "api/AppDataSyncType/Add";
export const UpdateAPIPath = "api/AppDataSyncType/Update";
export const DeleteAPIPath = "api/AppDataSyncType/Delete";
export const UpdateOrderAPIPath = "api/AppDataSyncType/UpdateOrder";
export const BackLink = "/AppDataSyncType";
export const AddLink = "/AppDataSyncType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppDataSyncTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại đồng bộ dữ liệu giữa các ứng dụng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppDataSyncType", Title: "Danh sách loại đồng bộ dữ liệu giữa các ứng dụng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AppDataSyncType", Title: "Danh sách loại đồng bộ dữ liệu giữa các ứng dụng" },
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
    //     name: "txtAppDataSyncTypeID",
    //     label: "mã nhóm",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AppDataSyncTypeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtAppDataSyncTypeName",
        label: "tên loại đồng bộ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppDataSyncTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtFromApplicationID",
        label: "Đồng bộ từ ứng dụng",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FromApplicationID",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtToApplicationID",
        label: "Đồng bộ đến ứng dụng",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ToApplicationID",
        readonly: false,
        validatonList: [],
    },
    {
        type: "select",
        name: "slSyncFrequencyType",
        label: "Loại định kỳ đồng bộ",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Hàng ngày" }, { value: 2, label: "Hàng tháng" }],
        DataSourceMember: "SyncFrequencyType",
        readonly: false,
        disabled: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
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
        name: "txtAppDataSyncTypeID",
        label: "mã loại đồng bộ",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppDataSyncTypeID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtAppDataSyncTypeName",
        label: "tên loại đồng bộ",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AppDataSyncTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtFromApplicationID",
        label: "Đồng bộ từ ứng dụng",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FromApplicationID",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtToApplicationID",
        label: "Đồng bộ đến ứng dụng",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ToApplicationID",
        readonly: false,
        validatonList: [],
    },
    {
        type: "select",
        name: "slSyncFrequencyType",
        label: "Loại định kỳ đồng bộ",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Hàng ngày" }, { value: 2, label: "Hàng tháng" }],
        DataSourceMember: "SyncFrequencyType",
        readonly: false,
        disabled: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
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
        Name: "AppDataSyncTypeID",
        DefaultValue: "",
        BindControlName: "txtAppDataSyncTypeID",
        DataSourceMember: "AppDataSyncTypeID"
    },
    {
        Name: "AppDataSyncTypeName",
        DefaultValue: "",
        BindControlName: "txtAppDataSyncTypeName",
        DataSourceMember: "AppDataSyncTypeName"
    },
    {
        Name: "FromApplicationID",
        DefaultValue: "",
        BindControlName: "txtFromApplicationID",
        DataSourceMember: "FromApplicationID"
    },
    {
        Name: "ToApplicationID",
        DefaultValue: "",
        BindControlName: "txtToApplicationID",
        DataSourceMember: "ToApplicationID"
    },
    {
        Name: "SyncFrequencyType",
        DefaultValue: "",
        BindControlName: "slSyncFrequencyType",
        DataSourceMember: "SyncFrequencyType"
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
        DataSourceMember: "AppDataSyncTypeID",
        Width: 60
    },
    {
        Name: "AppDataSyncTypeID",
        Type: "text",
        Caption: "Mã loại đồng bộ",
        DataSourceMember: "AppDataSyncTypeID",
        Width: 150
    },
    {
        Name: "AppDataSyncTypeName",
        Type: "text",
        Caption: "Tên loại đồng bộ",
        DataSourceMember: "AppDataSyncTypeName",
        Width: 200
    },
    {
        Name: "FromApplicationID",
        Type: "text",
        Caption: "Đồng bộ từ ứng dụng",
        DataSourceMember: "FromApplicationID",
        Width: 200
    },
    {
        Name: "ToApplicationID",
        Type: "text",
        Caption: "Đồng bộ đến ứng dụng",
        DataSourceMember: "ToApplicationID",
        Width: 200
    },
    {
        Name: "SyncFrequencyTypeName",
        Type: "text",
        Caption: "Loại định kỳ đồng bộ",
        DataSourceMember: "SyncFrequencyTypeName",
        Width: 200
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
        DataSourceMember: "AppDataSyncTypeID",
        Width: 100,
        Link: "/AppDataSyncType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
