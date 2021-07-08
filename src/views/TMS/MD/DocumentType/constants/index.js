export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DocumentType/Search";
export const LoadAPIPath = "api/DocumentType/Load";
export const AddAPIPath = "api/DocumentType/Add";
export const UpdateAPIPath = "api/DocumentType/Update";
export const DeleteAPIPath = "api/DocumentType/Delete";
export const UpdateOrderAPIPath = "api/DocumentType/UpdateOrder";
export const BackLink = "/DocumentsType";
export const AddLink = "/DocumentsType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DocumentTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại tài liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DocumentsType", Title: "Danh sách loại tài liệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DocumentsType", Title: "Danh sách loại tài liệu" },
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
    //     name: "txtDocumentTypeID",
    //     label: "mã loại tài liệu",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "DocumentTypeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtDocumentTypeName",
        label: "tên loại tài liệu",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtFileExt",
        label: "đuôi file (ví dụ: Doc;DocX)",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FileExt",
        readonly: false,
        validatonList: [],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsActived",
    //     label: "Kích hoạt:",
    //     value: true,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống:",
    //     value: false,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtDocumentTypeID",
        label: "mã loại tài liệu",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtDocumentTypeName",
        label: "tên loại tài liệu",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DocumentTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtFileExt",
        label: "đuôi file (ví dụ: Doc;DocX)",
        value: "",
        maxSize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FileExt",
        readonly: false,
        validatonList: [],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsActived",
    //     label: "Kích hoạt:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsActived",
    //     readonly: false,
    //     validatonList: []
    // },
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: []
    // }
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
        Name: "DocumentTypeID",
        DefaultValue: "",
        BindControlName: "txtDocumentTypeID",
        DataSourceMember: "DocumentTypeID"
    },
    {
        Name: "DocumentTypeName",
        DefaultValue: "",
        BindControlName: "txtDocumentTypeName",
        DataSourceMember: "DocumentTypeName"
    },
    {
        Name: "FileExt",
        DefaultValue: "",
        BindControlName: "txtFileExt",
        DataSourceMember: "FileExt"
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
        DataSourceMember: "DocumentTypeID",
        Width: 60
    },
    {
        Name: "DocumentTypeID",
        Type: "text",
        Caption: "Mã loại tài liệu",
        DataSourceMember: "DocumentTypeID",
        Width: 160
    },
    {
        Name: "DocumentTypeName",
        Type: "text",
        Caption: "Tên loại tài liệu",
        DataSourceMember: "DocumentTypeName",
        Width: 250
    },
    {
        Name: "FileExt",
        Type: "text",
        Caption: "Đuôi file (ví dụ: Doc;DocX)",
        DataSourceMember: "FileExt",
        Width: 250
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     //Width: 200
    // },
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 80
    // },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "DocumentTypeID",
        Width: 80,
        Link: "/DocumentsType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
