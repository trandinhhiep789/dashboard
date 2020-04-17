export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ContentType/Search";
export const LoadAPIPath = "api/ContentType/Load";
export const AddAPIPath = "api/ContentType/Add";
export const UpdateAPIPath = "api/ContentType/Update";
export const DeleteAPIPath = "api/ContentType/Delete";
export const UpdateOrderAPIPath = "api/ContentType/UpdateOrder";
export const BackLink = "/ContentType";
export const AddLink = "/ContentType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ContentTypeID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ContentType", Title: "Loại nội dung sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ContentType", Title: "Loại nội dung sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ContentType", Title: "Loại nội dung sản phẩm" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: []
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtContentTypeID",
        label: "Mã Loại nội dung",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtContentTypeKey",
        label: "Key loại nội dung",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeKey",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtContentTypeName",
        label: "Tên loại nội dung",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeName",
        readonly: false,
        validatonList: ["required"]
    },

    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: true,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtContentTypeID",
        label: "Mã Loại nội dung",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtContentTypeKey",
        label: "Key loại nội dung",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeKey",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtContentTypeName",
        label: "Tên loại nội dung",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ContentTypeName",
        readonly: false,
        validatonList: ["required"]
    },

    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        rows: "6",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
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
        Name: "ContentTypeID",
        DefaultValue: "",
        BindControlName: "txtContentTypeID",
        DataSourceMember: "ContentTypeID"
    },

    {
        Name: "ContentTypeKey",
        DefaultValue: "0",
        BindControlName: "txtContentTypeKey",
        DataSourceMember: "ContentTypeKey"
    },
    {
        Name: "ContentTypeName",
        DefaultValue: "",
        BindControlName: "txtContentTypeName",
        DataSourceMember: "ContentTypeName"
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
        BindControlName: "",
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ContentTypeID",
        Width: 150
    },
    {
        Name: "ContentTypeID",
        Type: "text",
        Caption: "Mã Loại ",
        DataSourceMember: "ContentTypeID",
        Width: 150
    },
    {
        Name: "ContentTypeKey",
        Type: "text",
        Caption: "Key",
        DataSourceMember: "ContentTypeKey",
        Width: 150
    },
    {
        Name: "ContentTypeName",
        Type: "text",
        Caption: "Tên loại",
        DataSourceMember: "ContentTypeName",
        Width: 500
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
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
        DataSourceMember: "ContentTypeID",
        Width: 200,
        Link: "/ContentType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
