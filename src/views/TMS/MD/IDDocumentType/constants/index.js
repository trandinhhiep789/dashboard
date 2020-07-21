export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/IDDocumentType/Search";
export const LoadAPIPath = "api/IDDocumentType/Load";
export const AddAPIPath = "api/IDDocumentType/Add";
export const UpdateAPIPath = "api/IDDocumentType/Update";
export const DeleteAPIPath = "api/IDDocumentType/Delete";
export const UpdateOrderAPIPath = "api/IDDocumentType/UpdateOrder";
export const BackLink = "/IDDocumentType";
export const AddLink = "/IDDocumentType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "IDDocumentTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại giấy tờ tùy thân" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/IDDocumentType", Title: "Danh sách loại giấy tờ tùy thân" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/IDDocumentType", Title: "Danh sách loại giấy tờ tùy thân" },
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
        name: "txtIDDocumentTypeID",
        label: "mã loại giấy tờ tùy thân",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IDDocumentTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtIDDocumentTypeName",
        label: "tên loại giấy tờ tùy thân",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IDDocumentTypeName",
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
        name: "txtIDDocumentTypeID",
        label: "mã loại giấy tờ tùy thân",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IDDocumentTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtIDDocumentTypeName",
        label: "tên loại giấy tờ tùy thân",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IDDocumentTypeName",
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
        Name: "IDDocumentTypeID",
        DefaultValue: "",
        BindControlName: "txtIDDocumentTypeID",
        DataSourceMember: "IDDocumentTypeID"
    },
    {
        Name: "IDDocumentTypeName",
        DefaultValue: "",
        BindControlName: "txtIDDocumentTypeName",
        DataSourceMember: "IDDocumentTypeName"
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
        DataSourceMember: "IDDocumentTypeID",
        Width: 60
    },
    {
        Name: "IDDocumentTypeID",
        Type: "text",
        Caption: "Mã loại giấy tờ tùy thân",
        DataSourceMember: "IDDocumentTypeID",
        Width: 160
    },
    {
        Name: "IDDocumentTypeName",
        Type: "text",
        Caption: "Tên loại giấy tờ tùy thân",
        DataSourceMember: "IDDocumentTypeName",
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
        DataSourceMember: "IDDocumentTypeID",
        Width: 100,
        Link: "/IDDocumentType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
