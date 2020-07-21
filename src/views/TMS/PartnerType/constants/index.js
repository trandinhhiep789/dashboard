export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerType/Search";
export const LoadAPIPath = "api/PartnerType/Load";
export const AddAPIPath = "api/PartnerType/Add";
export const UpdateAPIPath = "api/PartnerType/Update";
export const DeleteAPIPath = "api/PartnerType/Delete";
export const UpdateOrderAPIPath = "api/PartnerType/UpdateOrder";
export const LoadAPIPathLanguage = "api/PartnerType_lang/Load";
export const BackLink = "/PartnerType";
export const AddLink = "/PartnerType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerTypeID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerType", Title: "Loại đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerType", Title: "Loại đối tác" },
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
        listoption: [],
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


export const AddElementList = [
    {
        type: "text",
        name: "txtPartnerTypeID",
        label: "Mã loại nhà cung cấp",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPartnerTypeName",
        label: "tên loại nhà cung cấp",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTypeName",
        readonly: false,
        validatonList: ["required"]
    },

    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        rows: "6",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "0",
        maxSize: "9",
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
        value: true,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtPartnerTypeID",
        label: "mã loại nhà cung cấp",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "PartnerTypeID",
        validatonList: ["required", "number"],
    },
    {
        type: "text",
        name: "txtPartnerTypeName",
        label: "tên loại nhà cung cấp",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerTypeName",
        readonly: false,
        validatonList: ["required"]
    },

    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        rows: "6",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
        value: "",
        maxSize: "9",
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
        value: true,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];


export const MLObjectDefinition = [
    {
        Name: "PartnerTypeID",
        DefaultValue: "",
        BindControlName: "txtPartnerTypeID",
        DataSourceMember: "PartnerTypeID"
    },
    {
        Name: "PartnerTypeName",
        DefaultValue: "",
        BindControlName: "txtPartnerTypeName",
        DataSourceMember: "PartnerTypeName"
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
        Name: "PartnerTypeName",
        DefaultValue: "",
        BindControlName: "PartnerTypeName",
        DataSourceMember: "PartnerTypeName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];


export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerTypeID",
        Width: 70
    },
    {
        Name: "PartnerTypeID",
        Type: "text",
        Caption: "Mã loại đối tác",
        DataSourceMember: "PartnerTypeID",
        Width: 150
    },
    {
        Name: "PartnerTypeName",
        Type: "text",
        Caption: "Tên loại đối tác",
        DataSourceMember: "PartnerTypeName",
        Width: 400
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
        Width: 100
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
        DataSourceMember: "PartnerTypeID",
        Width: 70,
        Link: "/PartnerType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
