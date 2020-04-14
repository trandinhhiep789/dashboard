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
import { CDN_LOGO_IMAGE } from '../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Loại đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerType", Title: "Loại đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
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
        label: "Từ khóa:",
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
        name: "txtPartnerTypeName",
        label: "Tên đối tác:",
        value: "",
        maxSize: "400",
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
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        rows: "6",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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
        label: "Mã đối tác:",
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
        label: "Tên đối tác:",
        value: "",
        maxSize: "400",
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
        label: "Mô tả:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        rows: "6",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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

export const InputLanguageColumnList = [
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 200
    },
    {
        Name: "PartnerTypeName",
        Type: "textbox",
        Caption: "Tên đối tác",
        DataSourceMember: "PartnerTypeName",
        Width: 200,
        maxSize: "400",
        validatonList: ["required"]
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        Width: 200,
        validatonList: ["required"]
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerTypeID",
        Width: 80
    },
    {
        Name: "PartnerTypeID",
        Type: "text",
        Caption: "đối tác",
        DataSourceMember: "PartnerTypeID",
        Width: 100
    },
    {
        Name: "PartnerTypeName",
        Type: "text",
        Caption: "Tên đối tác",
        DataSourceMember: "PartnerTypeName",
        Width: 300
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
        DataSourceMember: "PartnerTypeID",
        Width: 200,
        Link: "/PartnerType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
