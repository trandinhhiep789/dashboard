export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/QuantityUnit/Search";
export const LoadAPIPath = "api/QuantityUnit/Load";
export const LoadAPIPathLanguage = "api/QuantityUnit_lang/Load";
export const AddAPIPath = "api/QuantityUnit/Add";
export const UpdateAPIPath = "api/QuantityUnit/Update";
export const DeleteAPIPath = "api/QuantityUnit/Delete";
export const UpdateOrderAPIPath = "api/QuantityUnit/UpdateOrder";
export const BackLink = "/QuantityUnit";
export const AddLink = "/QuantityUnit/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "QuantityUnitID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/QuantityUnit", Title: "Đơn vị tính" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/QuantityUnit", Title: "Đơn vị tính" },
    { Link: "", Title: "Sửa đơn vị tính" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/QuantityUnit", Title: "Đơn vị tính" },
    { Link: "", Title: "Thêm đơn vị tính" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        validatonList: []
    }
];

export const AddElementList = [
    // {
    //     type: "text",
    //     name: "txtQuantityUnitID",
    //     label: "Mã đơn vị tính",
    //     value: "",
    //     placeholder: "(ID tạo tự động)",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "QuantityUnitID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "text",
        name: "txtQuantityUnitName",
        label: "Tên đơn vị",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QuantityUnitName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: [],
        rows: "6"
    },
    {
        type: "checkbox",
        name: "chkIsAllowDecimal",
        label: "Cho phép nhập số lẻ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: [],
        value: "true"
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
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
        name: "txtQuantityUnitID",
        label: "Mã đơn vị tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "QuantityUnitID",
        validatonList: []
    },
    {
        type: "text",
        name: "txtQuantityUnitName",
        label: "Tên đơn vị tính",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "QuantityUnitName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "Description",
        validatonList: [],
        rows: "6"
    },
    {
        type: "checkbox",
        name: "chkIsAllowDecimal",
        label: "Cho phép nhập số lẻ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsAllowDecimal",
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
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
        Name: "QuantityUnitID",
        DefaultValue: "",
        BindControlName: "txtQuantityUnitID",
        DataSourceMember: "QuantityUnitID"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "txtQuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "IsAllowDecimal",
        DefaultValue: true,
        BindControlName: "chkIsAllowDecimal",
        DataSourceMember: "IsAllowDecimal"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
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
        Name: "lstQuantityUnit_Lang",
        DefaultValue: {},
        BindControlName: "inputGridQuantityUnitName_lang",
        DataSourceMember: "inputGridQuantityUnitName_lang"
    }
];

export const InputLanguageColumnList = [
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 150
    },

    {
        Name: "QuantityUnitName",
        Type: "textbox",
        Caption: "Tên đơn vị",
        DataSourceMember: "QuantityUnitName",
        maxSize: "400",
        Width: 200
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        maxSize: "2000",
        Width: 250
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "QuantityUnitID",
        Width: 50
    },
    {
        Name: "QuantityUnitID",
        Type: "text",
        Caption: "Mã đơn vị tính",
        DataSourceMember: "QuantityUnitID",
        Width: 150
    },
    {
        Name: "QuantityUnitName",
        Type: "text",
        Caption: "Tên đơn vị tính",
        DataSourceMember: "QuantityUnitName",
        Width: 400
    },
    {
        Name: "IsAllowDecimal",
        Type: "checkicon",
        Caption: "Cho phép nhập số lẻ",
        DataSourceMember: "IsAllowDecimal",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "QuantityUnitID",
        Width: 150,
        Link: "/QuantityUnit/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const GridMLObjectDefinition = [
    {
        Name: "LanguageID",
        DefaultValue: "",
        BindControlName: "LanguageID",
        DataSourceMember: "LanguageID"
    },
    {
        Name: "LanguageName",
        DefaultValue: "",
        BindControlName: "LanguageName",
        DataSourceMember: "LanguageName"
    },
    {
        Name: "QuantityUnitName",
        DefaultValue: "",
        BindControlName: "QuantityUnitName",
        DataSourceMember: "QuantityUnitName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];
