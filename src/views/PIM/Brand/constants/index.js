export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Brand/Search";
export const LoadAPIPath = "api/Brand/Load";
export const AddAPIPath = "api/Brand/Add";
export const UpdateAPIPath = "api/Brand/Update";
export const DeleteAPIPath = "api/Brand/Delete";
export const UpdateOrderAPIPath = "api/Brand/UpdateOrder";
export const LoadAPIPathLanguage = "api/Brand_lang/Load";
export const BackLink = "/Brand";
export const AddLink = "/Brand/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "BrandID";
import { CDN_LOGO_IMAGE } from '../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Nhãn hiệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Brand", Title: "Nhãn hiệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Brand", Title: "Nhãn hiệu" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@ManufacturerID",
        SearchValue: -1
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
    },
    {
        type: "select",
        name: "slManufacturerID",
        label: "Nhà sản xuất:",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ManufacturerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MANUFACTURER",
        ValueMember: "ManufacturerID",
        NameMember: "ManufacturerName"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtBrandName",
        label: "Tên nhãn hiệu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "BrandName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtManufacturerID",
        label: "Nhà sản xuất:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ManufacturerID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MANUFACTURER",
        ValueMember: "ManufacturerID",
        NameMember: "ManufacturerName"
    },
    {
        type: "singleFileUpload",
        name: "txtLogoImageURL",
        NameMember: "LogoImageURL",
        label: "Logo nhãn hiệu:",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "LogoImageURL",
        readonly: false,
        validatonList: []
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
        name: "txtBrandID",
        label: "Nhãn hiệu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "BrandID",
        validatonList: ["required", "number"],
    },
    {
        type: "select",
        name: "txtManufacturerID",
        label: "Nhà sản xuất:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ManufacturerID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.MANUFACTURER",
        ValueMember: "ManufacturerID",
        NameMember: "ManufacturerName"
    },
    {
        type: "text",
        name: "txtBrandName",
        label: "Tên nhãn hiệu:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "BrandName",
        validatonList: ["required"],
    },
    {
        type: "singleFileUpload",
        name: "txtLogoImageURL",
        NameMember: "LogoImageURL",
        label: "Logo nhãn hiệu:",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "LogoImageURL",
        readonly: false,
        validatonList: []
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
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
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
        listoption: [],
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
        Name: "BrandID",
        DefaultValue: "",
        BindControlName: "txtBrandID",
        DataSourceMember: "BrandID"
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
        Name: "BrandName",
        DefaultValue: "",
        BindControlName: "txtBrandName",
        DataSourceMember: "BrandName"
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
        Name: "BrandLang",
        DefaultValue: {},
        BindControlName: "inputGridBrandLang",
        DataSourceMember: "inputGridBrandLang"
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
        Name: "BrandName",
        DefaultValue: "",
        BindControlName: "BrandName",
        DataSourceMember: "BrandName"
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
        Name: "BrandName",
        Type: "textbox",
        Caption: "Tên nhãn hiệu",
        DataSourceMember: "BrandName",
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
        DataSourceMember: "BrandID",
        Width: 80
    },
    {
        Name: "BrandID",
        Type: "text",
        Caption: "Nhãn hiệu",
        DataSourceMember: "BrandID",
        Width: 100
    },
    {
        Name: "BrandName",
        Type: "text",
        Caption: "Tên nhãn hiệu",
        DataSourceMember: "BrandName",
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
        DataSourceMember: "BrandID",
        Width: 200,
        Link: "/Brand/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
