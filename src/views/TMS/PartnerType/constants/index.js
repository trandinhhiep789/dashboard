export const APIHostName = "PIMAPI";
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
    { Link: "", Title: "Nhãn hiệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerType", Title: "Nhãn hiệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/PartnerType", Title: "Nhãn hiệu" },
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

export const MLObjectDefinition = [
    {
        Name: "PartnerTypeID",
        DefaultValue: "",
        BindControlName: "txtPartnerTypeID",
        DataSourceMember: "PartnerTypeID"
    },
    {
        Name: "ManufacturerID",
        DefaultValue: "",
        BindControlName: "txtManufacturerID",
        DataSourceMember: "ManufacturerID"
    },
    {
        Name: "LogoImageURL",
        DefaultValue: "",
        BindControlName: "txtLogoImageURL",
        DataSourceMember: "LogoImageURL"
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
    },
    {
        Name: "PartnerTypeLang",
        DefaultValue: {},
        BindControlName: "inputGridPartnerTypeLang",
        DataSourceMember: "inputGridPartnerTypeLang"
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
        Caption: "Tên nhãn hiệu",
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
        Caption: "Nhãn hiệu",
        DataSourceMember: "PartnerTypeID",
        Width: 100
    },
    {
        Name: "PartnerTypeName",
        Type: "text",
        Caption: "Tên nhãn hiệu",
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
