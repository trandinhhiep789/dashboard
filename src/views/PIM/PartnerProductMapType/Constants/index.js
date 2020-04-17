export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerProductMapType/Search";
export const LoadAPIPath = "api/PartnerProductMapType/Load";
export const AddAPIPath = "api/PartnerProductMapType/Add";
export const UpdateAPIPath = "api/PartnerProductMapType/Update";
export const DeleteAPIPath = "api/PartnerProductMapType/Delete";
export const UpdateOrderAPIPath = "api/PartnerProductMapType/UpdateOrder";
export const BackLink = "/PartnerProductMapType";
export const AddLink = "/PartnerProductMapType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerProductMapTypeID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    {
        Link: "/PartnerProductMapType",
        Title: "Loại bảng mã sản phẩm của đối tác"
    }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    {
        Link: "/PartnerProductMapType",
        Title: "Loại bảng mã sản phẩm của đối tác"
    },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    {
        Link: "/PartnerProductMapType",
        Title: "Loại bảng mã sản phẩm của đối tác"
    },
    { Link: "", Title: "Thêm" }
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

export const AddElementList = [
    {
        type: "text",
        name: "txtPartnerProductMapTypeID",
        label: "Mã loại bảng mã của đối tác",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerProductMapTypeID",
        readonly: false,
        validatonList: ["number", "required"]
    },
    {
        type: "text",
        name: "txtPartnerProductMapTypeName",
        label: "Tên loại bảng mã của đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerProductMapTypeName",
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
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        rows: "6",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: true,
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
        value: false,
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
        name: "txtPartnerProductMapTypeID",
        label: "Mã loại bảng mã của đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: true,
        DataSourceMember: "PartnerProductMapTypeID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPartnerProductMapTypeName",
        label: "Tên loại bảng mã của đối tác",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        DataSourceMember: "PartnerProductMapTypeName",
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
        rows: "6",
        DataSourceMember: "Description",
        validatonList: []
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
        Name: "PartnerProductMapTypeID",
        DefaultValue: "",
        BindControlName: "txtPartnerProductMapTypeID",
        DataSourceMember: "PartnerProductMapTypeID"
    },
    {
        Name: "PartnerProductMapTypeName",
        DefaultValue: "",
        BindControlName: "txtPartnerProductMapTypeName",
        DataSourceMember: "PartnerProductMapTypeName"
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
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 150
    },
    {
        Name: "PartnerProductMapTypeID",
        Type: "text",
        Caption: "Mã loại bảng mã của đối tác",
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 200
    },
    {
        Name: "PartnerProductMapTypeName",
        Type: "text",
        Caption: "Tên loại bảng mã của đối tác",
        DataSourceMember: "PartnerProductMapTypeName",
        Width: 550
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
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 200,
        Link: "/PartnerProductMapType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const DataGridColumnListMobile = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 150
    },
    {
        Name: "PartnerProductMapTypeID",
        Type: "text",
        Caption: "Mã ",
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 200
    },
    {
        Name: "PartnerProductMapTypeName",
        Type: "text",
        Caption: "Tên ",
        DataSourceMember: "PartnerProductMapTypeName",
        Width: 550
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PartnerProductMapTypeID",
        Width: 200,
        Link: "/PartnerProductMapType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
