export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/Attribute/Search";
export const LoadAPIPath = "api/Attribute/Load";
export const LoadAPIPathLanguage = "api/Attribute_Lang/Load";
export const AddAPIPath = "api/Attribute/Add";
export const UpdateAPIPath = "api/Attribute/Update";
export const DeleteAPIPath = "api/Attribute/Delete";
export const UpdateOrderAPIPath = "api/Attribute/UpdateOrder";
export const BackLink = "/Attribute";
export const AddLink = "/Attribute/Add";
export const ComboDataLink = "api/Attribute/GetAllComboData";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AttributeID";
import { CDN_LOGO_IMAGE } from '../../../../../constants/systemVars';
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Thuộc tính" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Attribute", Title: "Thuộc tính" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/Attribute", Title: "Thuộc tính" },
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
    //     name: "txtAttributeID",
    //     label: "Mã thuộc tính sản phẩm:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AttributeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]

    // },
    {
        type: "select",
        name: "comboAttributeCategoryID",
        label: "Danh mục thuộc tính",
        value: "-1",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeCategoryID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTECATEGORY",
        ValueMember: "AttributeCategoryID",
        NameMember: "AttributeCategoryName"
    },
    {
        type: "text",
        name: "txtAttributeName",
        label: "Tên thuộc tính",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "comboAttributeDataTypeID",
        label: "Loại dữ liệu thuộc tính",
        value: "-1",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeDataTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTEDATATYPE",
        ValueMember: "AttributeDataTypeID",
        NameMember: "AttributeDataTypeName"
    },
    {
        type: "singleFileUpload",
        name: "txtAttributeImageURL",
        NameMember: "AttributeImageURL",
        label: "Hình ảnh thuộc tính",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "AttributeImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsMultiSelect",
        label: "Cho phép chọn nhiều giá trị",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsMultiSelect",
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
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        listoption: {},
        readonly: false,
        DataSourceMember: "IsActived",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
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
        type: "select",
        name: "comboAttributeCategoryID",
        label: "Danh mục thuộc tính:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeCategoryID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.ATTRIBUTECATEGORY",
        ValueMember: "AttributeCategoryID",
        NameMember: "AttributeCategoryName"
    },
    {
        type: "text",
        name: "txtAttributeName",
        label: "Tên thuộc tính:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "comboAttributeDataTypeID",
        label: "Loại dữ liệu thuộc tính:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeDataTypeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTEDATATYPE",
        ValueMember: "AttributeDataTypeID",
        NameMember: "AttributeDataTypeName"
    },
    // {
    //     type: "singleFileUpload",
    //     name: "txtAttributeImageURL",
    //     NameMember: "AttributeImageURL",
    //     label: "Hình ảnh thuộc tính:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     AcceptType: "image/*",
    //     listoption: {},
    //     DataSourceMember: "AttributeImageURL",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "singleFileUpload",
        name: "txtAttributeImageURL",
        NameMember: "AttributeImageURL",
        label: "Hình ảnh thuộc tính:",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "AttributeImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsMultiSelect",
        label: "Cho phép chọn nhiều giá trị:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsMultiSelect",
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
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: []
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
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "AttributeName",
        DataSourceMember: "AttributeName"
    },

    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    }
];

export const InputLanguageColumnList = [
    // {
    //     Name: "LanguageID",
    //     Type: "text",
    //     Caption: "Mã ngôn ngữ",
    //     DataSourceMember: "LanguageID",
    //     Width: 150
    // },
    {
        Name: "LanguageName",
        Type: "text",
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 150
    },

    {
        Name: "AttributeName",
        Type: "textbox",
        Caption: "Tên thuộc tính sản phẩm",
        DataSourceMember: "AttributeName",
        maxSize: "400",
        Width: 200
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        maxSize: "2000",
        Width: 250
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
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "txtAttributeID",
        DataSourceMember: "AttributeID"
    },
    {
        Name: "AttributeCategoryID",
        DefaultValue: "",
        BindControlName: "comboAttributeCategoryID",
        DataSourceMember: "AttributeCategoryID"
    },
    {
        Name: "AttributeName",
        DefaultValue: "",
        BindControlName: "txtAttributeName",
        DataSourceMember: "AttributeName"
    },
    {
        Name: "AttributeDataTypeID",
        DefaultValue: "",
        BindControlName: "comboAttributeDataTypeID",
        DataSourceMember: "AttributeDataTypeID"
    },

    {
        Name: "AttributeImageURL",
        DefaultValue: "",
        BindControlName: "txtAttributeImageURL",
        DataSourceMember: "AttributeImageURL"
    },
    {
        Name: "IsMultiSelect",
        DefaultValue: "",
        BindControlName: "chkIsMultiSelect",
        DataSourceMember: "IsMultiSelect"
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
    },
    {
        Name: "LstAttribute_Lang",
        DefaultValue: {},
        BindControlName: "inputGridAttribute_Lang",
        DataSourceMember: "inputGridAttribute_Lang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AttributeID",
        Width: 80
    },
    {
        Name: "AttributeCategoryName",
        Type: "text",
        Caption: "Danh mục thuộc tính",
        DataSourceMember: "AttributeCategoryName",
        Width: 180
    },
    {
        Name: "AttributeName",
        Type: "text",
        Caption: "Tên thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 300
    },
    {
        Name: "AttributeDataTypeName",
        Type: "text",
        Caption: "Loại dữ liệu thuộc tính",
        DataSourceMember: "AttributeDataTypeName",
        Width: 180
    },
    // {
    //     Name: "AttributeImageURL",
    //     Type: "text",
    //     Caption: "Hình ảnh thuộc tính",
    //     DataSourceMember: "AttributeImageURL",
    //     Width: 200
    // },
    // {
    //     Name: "IsMultiSelect",
    //     Type: "checkicon",
    //     Caption: "Cho phép chọn nhiều giá trị",
    //     DataSourceMember: "IsMultiSelect",
    //     Width: 200
    // },
    // {
    //     Name: "Description",
    //     Type: "textarea",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 200
    // },
    // {
    //     Name: "OrderIndex",
    //     Type: "text",
    //     Caption: "Thứ tự hiển thị",
    //     DataSourceMember: "OrderIndex",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUser",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeID",
        Width: 150,
        Link: "/Attribute/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const InputLanguageDataSource = [
    {
        LanguageID: 1,
        LanguageName: "English",
        Description: ""
    },
    {
        LanguageID: 2,
        LanguageName: "Vietnamese",
        Description: ""
    }
];
