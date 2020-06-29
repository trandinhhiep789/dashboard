export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentFeeType/Search";
export const LoadAPIPath = "api/ShipmentFeeType/Load";
export const AddAPIPath = "api/ShipmentFeeType/Add";
export const UpdateAPIPath = "api/ShipmentFeeType/Update";
export const DeleteAPIPath = "api/ShipmentFeeType/Delete";
export const UpdateOrderAPIPath = "api/ShipmentFeeType/UpdateOrder";
export const BackLink = "/ShipmentFeeType";
export const AddLink = "/ShipmentFeeType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentFeeTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại phí vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentFeeType", Title: "Danh sách loại phí vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentFeeType", Title: "Danh sách loại phí vận chuyển" },
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
        name: "txtShipmentFeeTypeID",
        label: "mã loại phí vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentFeeTypeName",
        label: "tên loại phí vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeeTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
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
    // {
    //     type: "checkbox",
    //     name: "chkIsOther",
    //     label: "Khác:",
    //     value: 0,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // },
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
        name: "txtShipmentFeeTypeID",
        label: "mã loại phí vận chuyển",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentFeeTypeName",
        label: "tên loại phí vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentFeeTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
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
    // {
    //     type: "checkbox",
    //     name: "chkIsOther",
    //     label: "Khác:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsOther",
    //     readonly: false,
    //     validatonList: []
    // },
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
        Name: "ShipmentFeeTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentFeeTypeID",
        DataSourceMember: "ShipmentFeeTypeID"
    },
    {
        Name: "ShipmentFeeTypeName",
        DefaultValue: "",
        BindControlName: "txtShipmentFeeTypeName",
        DataSourceMember: "ShipmentFeeTypeName"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType"
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
        Name: "IsOther",
        DefaultValue: false,
        BindControlName: "",
        DataSourceMember: "IsOther"
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
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 60
    },
    {
        Name: "ShipmentFeeTypeID",
        Type: "text",
        Caption: "Mã loại phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 160
    },
    {
        Name: "ShipmentFeeTypeName",
        Type: "text",
        Caption: "Tên loại phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeName",
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
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 100,
        Link: "/ShipmentFeeType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
