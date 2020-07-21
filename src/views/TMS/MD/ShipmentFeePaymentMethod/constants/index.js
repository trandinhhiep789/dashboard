export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentFeePaymentMethod/Search";
export const LoadAPIPath = "api/ShipmentFeePaymentMethod/Load";
export const AddAPIPath = "api/ShipmentFeePaymentMethod/Add";
export const UpdateAPIPath = "api/ShipmentFeePaymentMethod/Update";
export const DeleteAPIPath = "api/ShipmentFeePaymentMethod/Delete";
export const UpdateOrderAPIPath = "api/ShipmentFeePaymentMethod/UpdateOrder";
export const BackLink = "/ShipmentFeePaymentMethod";
export const AddLink = "/ShipmentFeePaymentMethod/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentFeePaymentMethodID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách phương thức thanh toán chi phí vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentFeePaymentMethod", Title: "Danh sách phương thức thanh toán chi phí vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentFeePaymentMethod", Title: "Danh sách phương thức thanh toán chi phí vận chuyển" },
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
        type: "text",
        name: "txtShipmentFeePaymentMethodID",
        label: "mã phương thức thanh toán chi phí",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeePaymentMethodID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentFeePaymentMethodName",
        label: "tên phương thức thanh toán chi phí",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeePaymentMethodName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
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
        type: "text",
        name: "txtShipmentFeePaymentMethodID",
        label: "mã phương thức thanh toán chi phí vận chuyển",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeePaymentMethodID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentFeePaymentMethodName",
        label: "tên phương thức thanh toán chi phí vận chuyển",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeePaymentMethodName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
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
        Name: "ShipmentFeePaymentMethodID",
        DefaultValue: "",
        BindControlName: "txtShipmentFeePaymentMethodID",
        DataSourceMember: "ShipmentFeePaymentMethodID"
    },
    {
        Name: "ShipmentFeePaymentMethodName",
        DefaultValue: "",
        BindControlName: "txtShipmentFeePaymentMethodName",
        DataSourceMember: "ShipmentFeePaymentMethodName"
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
        DataSourceMember: "ShipmentFeePaymentMethodID",
        Width: 60
    },
    {
        Name: "ShipmentFeePaymentMethodID",
        Type: "text",
        Caption: "Mã phương thức thanh toán chi phí",
        DataSourceMember: "ShipmentFeePaymentMethodID",
        Width: 200
    },
    {
        Name: "ShipmentFeePaymentMethodName",
        Type: "text",
        Caption: "Tên phương thức thanh toán chi phí",
        DataSourceMember: "ShipmentFeePaymentMethodName",
        Width: 350
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentFeePaymentMethodID",
        Width: 70,
        Link: "/ShipmentFeePaymentMethod/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
