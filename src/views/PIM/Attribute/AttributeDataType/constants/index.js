export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/AttributeDataType/Search";
export const LoadAPIPath = "api/AttributeDataType/Load";
export const AddAPIPath = "api/AttributeDataType/Add";
export const UpdateAPIPath = "api/AttributeDataType/Update";
export const DeleteAPIPath = "api/AttributeDataType/Delete";
export const UpdateOrderAPIPath = "api/AttributeDataType/UpdateOrder";
export const BackLink = "/AttributeDataType";
export const AddLink = "/AttributeDataType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AttributeDataTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Loại dữ liệu thuộc tính" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeDataType", Title: "Loại dữ liệu thuộc tính" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeDataType", Title: "Loại dữ liệu thuộc tính" },
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
        name: "txtAttributeDataTypeID",
        label: "Mã loại dữ liệu thuộc tính",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeDataTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAttributeDataTypeName",
        label: "Tên loại dữ liệu thuộc tính",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeDataTypeName",
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
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtAttributeDataTypeID",
        label: "Mã loại dữ liệu thuộc tính",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeDataTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAttributeDataTypeName",
        label: "Tên loại dữ liệu thuộc tính",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeDataTypeName",
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
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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
        Name: "AttributeDataTypeID",
        DefaultValue: "",
        BindControlName: "txtAttributeDataTypeID",
        DataSourceMember: "AttributeDataTypeID"
    },
    {
        Name: "AttributeDataTypeName",
        DefaultValue: "",
        BindControlName: "txtAttributeDataTypeName",
        DataSourceMember: "AttributeDataTypeName"
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
        DataSourceMember: "AttributeDataTypeID",
        Width: 80
    },
    {
        Name: "AttributeDataTypeID",
        Type: "text",
        Caption: "Mã loại dữ liệu thuộc tính",
        DataSourceMember: "AttributeDataTypeID",
        Width: 250
    },
    {
        Name: "AttributeDataTypeName",
        Type: "text",
        Caption: "Tên loại dữ liệu thuộc tính",
        DataSourceMember: "AttributeDataTypeName",
        Width: 350
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
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
        DataSourceMember: "AttributeDataTypeID",
        Width: 150,
        Link: "/AttributeDataType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
