export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/CarrierType/Search";
export const LoadAPIPath = "api/CarrierType/Load";
export const AddAPIPath = "api/CarrierType/Add";
export const UpdateAPIPath = "api/CarrierType/Update";
export const DeleteAPIPath = "api/CarrierType/Delete";
export const UpdateOrderAPIPath = "api/CarrierType/UpdateOrder";
export const BackLink = "/CarrierType";
export const AddLink = "/CarrierType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "CarrierTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách loại phương tiện vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/CarrierType", Title: "Danh sách loại phương tiện vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/CarrierType", Title: "Danh sách loại phương tiện vận chuyển" },
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
    {
        type: "numeric",
        name: "txtCarrierTypeID",
        label: "Mã loại phương tiện vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CarrierTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCarrierTypeName",
        label: "Tên loại phương tiện vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CarrierTypeName",
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
        name: "txtCarrierTypeID",
        label: "Mã loại phương tiện vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CarrierTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtCarrierTypeName",
        label: "Tên loại phương tiện vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "CarrierTypeName",
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "CarrierTypeID",
        DefaultValue: "",
        BindControlName: "txtCarrierTypeID",
        DataSourceMember: "CarrierTypeID"
    },
    {
        Name: "CarrierTypeName",
        DefaultValue: "",
        BindControlName: "txtCarrierTypeName",
        DataSourceMember: "CarrierTypeName"
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
        DataSourceMember: "CarrierTypeID",
        Width: 60
    },
    {
        Name: "CarrierTypeID",
        Type: "text",
        Caption: "Mã loại phương tiện vận chuyển",
        DataSourceMember: "CarrierTypeID",
        Width: 250
    },
    {
        Name: "CarrierTypeName",
        Type: "text",
        Caption: "Tên loại phương tiện vận chuyển",
        DataSourceMember: "CarrierTypeName",
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
        DataSourceMember: "CarrierTypeID",
        Width: 200,
        Link: "/CarrierType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
