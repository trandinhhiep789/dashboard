export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Manufacturer/Search";
export const LoadAPIPath = "api/Manufacturer/Load";
export const AddAPIPath = "api/Manufacturer/Add";
export const UpdateAPIPath = "api/Manufacturer/Update";
export const DeleteAPIPath = "api/Manufacturer/Delete";
export const UpdateOrderAPIPath = "api/Manufacturer/UpdateOrder";
export const LoadAPIPathLanguage = "api/Manufacturer_lang/Load";
export const BackLink = "/Manufacturer";
export const AddLink = "/Manufacturer/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ManufacturerID";
import { CDN_LOGO_IMAGE } from '../../../../../constants/systemVars';

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Manufacturer", Title: "Nhà sản xuất" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Manufacturer", Title: "Nhà sản xuất" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Manufacturer", Title: "Nhà sản xuất" },
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
        listoption: []
    }
];

export const AddElementList = [
    // {
    //     type: "text",
    //     name: "txtManufacturerID",
    //     label: "Mã nhà sản xuất:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "ManufacturerID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtManufacturerName",
        label: "Tên nhà sản xuất:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ManufacturerName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "singleFileUpload",
        name: "txtLogoImageURL",
        NameMember: "LogoImageURL",
        label: "Hình ảnh logo:",
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
        label: "Kích hoạt:",
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
        label: "Hệ thống:",
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
        name: "txtManufacturerID",
        label: "Mã nhà sản xuất:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "ManufacturerID",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtManufacturerName",
        label: "Tên nhà sản xuất:",
        value: "",
        maxSize: "400",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "ManufacturerName",
        validatonList: ["required"]
    },
    {
        type: "singleFileUpload",
        name: "txtLogoImageURL",
        NameMember: "LogoImageURL",
        label: "Hình ảnh logo:",
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
        placeholder: "Mô tả",
        icon: "",
        rows: "6",
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
        Name: "ManufacturerID",
        DefaultValue: "0",
        BindControlName: "txtManufacturerID",
        DataSourceMember: "ManufacturerID"
    },
    {
        Name: "ManufacturerName",
        DefaultValue: "",
        BindControlName: "txtManufacturerName",
        DataSourceMember: "ManufacturerName"
    },
    {
        Name: "LogoImageURL",
        DefaultValue: "",
        BindControlName: "txtLogoImageURL",
        DataSourceMember: "LogoImageURL"
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
        Name: "ManufacturerLangs",
        DefaultValue: {},
        BindControlName: "inputGridManufacturerLang",
        DataSourceMember: "inputGridManufacturerLang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ManufacturerID",
        Width: 150
    },
    {
        Name: "ManufacturerID",
        Type: "text",
        Caption: "Mã nhà sản xuất",
        DataSourceMember: "ManufacturerID",
        Width: 150
    },
    {
        Name: "ManufacturerName",
        Type: "text",
        Caption: "Tên nhà sản xuất",
        DataSourceMember: "ManufacturerName",
        Width: 600
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
        DataSourceMember: "ManufacturerID",
        Width: 200,
        Link: "/Manufacturer/Edit/",
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
        Name: "ManufacturerName",
        DefaultValue: "",
        BindControlName: "ManufacturerName",
        DataSourceMember: "ManufacturerName"
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
        Name: "ManufacturerName",
        Type: "textbox",
        Caption: "Tên nhà sản xuất theo ngôn ngữ",
        DataSourceMember: "ManufacturerName",
        maxSize: "400",
        Width: 200
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        maxSize: "2000",
        Width: 200
    }
];
