export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/RentalType/Search";
export const AddAPIPath = "api/RentalType/Add";
export const EditAPIPath = "api/RentalType/Update";
export const LoadAPIPath = "api/RentalType/Load";
export const DeleteAPIPath = "api/RentalType/Delete";

export const AddLink = "/VehicleRentalType/Add";
export const BackLink = "/VehicleRentalType";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RentalTypeId"

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Hình thức thuê xe" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalType", Title: "Hình thức thuê xe" },
    { Link: "", Title: "Thêm sửa hình thức thuê xe" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalType", Title: "Hình thức thuê xe" },
    { Link: "", Title: "Chỉnh sửa hình thức thuê xe" }
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
        DataSourceMember: "RentalTypeId",
        Width: 60
    },
    {
        Name: "RentalTypeId",
        Type: "text",
        Caption: "Mã hình thức thuê",
        DataSourceMember: "RentalTypeId",
    },
    {
        Name: "RentalTypeName",
        Type: "text",
        Caption: "Tên hình thức thuê",
        DataSourceMember: "RentalTypeName",
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
    },
    {
        Name: "UpdatedDate",
        Type: "text",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "RentalTypeId",
        Width: 80,
        Link: "/VehicleRentalType/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const AddElementList = [
    {
        type: "text",
        name: "txtRentalTypeName",
        label: "Tên hình thức thuê",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RentalTypeName",
        readonly: false,
        validatonList: ["required"],
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
        name: "txtRentalTypeId",
        label: "Mã hình thức thuê xe",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RentalTypeId",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtRentalTypeName",
        label: " Tên hình thức thuê xe",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "RentalTypeName",
        readonly: false,
        validatonList: ["required"],
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
    }
];

export const MLObjectDefinition = [
    {
        Name: "RentalTypeId",
        DefaultValue: "",
        BindControlName: "txtRentalTypeId",
        DataSourceMember: "RentalTypeId"
    },
    {
        Name: "RentalTypeName",
        DefaultValue: "",
        BindControlName: "txtRentalTypeName",
        DataSourceMember: "RentalTypeName"
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