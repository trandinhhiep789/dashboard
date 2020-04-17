export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ProductType/Search";
export const LoadAPIPath = "api/ProductType/Load";
export const AddAPIPath = "api/ProductType/Add";
export const UpdateAPIPath = "api/ProductType/Update";
export const DeleteAPIPath = "api/ProductType/Delete";
export const UpdateOrderAPIPath = "api/ProductType/UpdateOrder";
export const LoadAPIPathLanguage = "api/ProductType_lang/Load";
export const BackLink = "/ProductType";
export const AddLink = "/ProductType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ProductTypeID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductType", Title: "Loại sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductType", Title: "Loại sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ProductType", Title: "Loại sản phẩm" },
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
        name: "txtProductTypeID",
        label: "Mã Loại sản phẩm",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductTypeID",
        readonly: false,
        validatonList: ["required", "number"],
    },
    {
        type: "select",
        name: "txtParentID",
        label: "Loại sản phẩm cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTTYPE",
        ValueMember: "ProductTypeID",
        NameMember: "ProductTypeName"
    },
    {
        type: "text",
        name: "txtProductTypeName",
        label: "Tên Loại sản phẩm",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductTypeName",
        readonly: false,
        validatonList: ["required"],
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
        name: "chkIsphysical",
        label: "Sản phẩm vật lý",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsdigital",
        label: "Sản phẩm kỹ thuật số",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsservice",
        label: "Sản phẩm dịch vụ",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsisgiftvoucher",
        label: "Sản phẩm phiếu quà tặng",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
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
        name: "txtProductTypeID",
        label: "Mã Loại sản phẩm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "txtParentID",
        label: "Loại sản phẩm cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ParentID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PRODUCTTYPE",
        ValueMember: "ProductTypeID",
        NameMember: "ProductTypeName"
    },
    {
        type: "text",
        name: "txtProductTypeName",
        label: "Tên Loại sản phẩm",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ProductTypeName",
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
        name: "chkIsphysical",
        label: "Sản phẩm vật lý",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Isphysical",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsdigital",
        label: "Sản phẩm kỹ thuật số",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Isdigital",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsservice",
        label: "Sản phẩm dịch vụ",
        value: false,
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Isservice",
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsisgiftvoucher",
        label: "Sản phẩm phiếu quà tặng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Isisgiftvoucher",
        readonly: false,
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
        Name: "ProductTypeID",
        DefaultValue: "",
        BindControlName: "txtProductTypeID",
        DataSourceMember: "ProductTypeID"
    },

    {
        Name: "ParentID",
        DefaultValue: "0",
        BindControlName: "txtParentID",
        DataSourceMember: "ParentID"
    },
    {
        Name: "ProductTypeName",
        DefaultValue: "",
        BindControlName: "txtProductTypeName",
        DataSourceMember: "ProductTypeName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },

    {
        Name: "Isphysical",
        DefaultValue: true,
        BindControlName: "chkIsphysical",
        DataSourceMember: "Isphysical"
    },
    {
        Name: "Isdigital",
        DefaultValue: true,
        BindControlName: "chkIsdigital",
        DataSourceMember: "Isdigital"
    },
    {

        Name: "Isservice",
        DefaultValue: true,
        BindControlName: "chkIsservice",
        DataSourceMember: "Isservice"
    },
    {
        Name: "Isisgiftvoucher",
        DefaultValue: true,
        BindControlName: "chkIsisgiftvoucher",
        DataSourceMember: "Isisgiftvoucher"
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
        Name: "LstProductType_Lang",
        DefaultValue: "administrator",
        BindControlName: "inputGridProductType_Lang",
        DataSourceMember: "inputGridProductType_Lang"
    },
    {
        Name: "TabProductTypeAttribute",
        DefaultValue: {},
        BindControlName: "TabProductTypeAttribute",
        DataSourceMember: "TabProductTypeAttribute"
    },
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductTypeID",
        Width: 150
    },
    {
        Name: "ProductTypeID",
        Type: "text",
        Caption: "Mã Loại",
        DataSourceMember: "ProductTypeID",
        Width: 150
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Loại cha",
        DataSourceMember: "ParentName",
        Width: 150
    },
    {
        Name: "ProductTypeName",
        Type: "text",
        Caption: "Tên Loại",
        DataSourceMember: "ProductTypeName",
        Width: 450
    },
    {
        Name: "Isphysical",
        Type: "checkicon",
        Caption: "Sản phẩm vật lý",
        DataSourceMember: "Isphysical",
        Width: 200
    },
    {
        Name: "Isdigital",
        Type: "checkicon",
        Caption: "Sản phẩm kỹ thuật số",
        DataSourceMember: "Isdigital",
        Width: 200
    },
    {
        Name: "Isservice",
        Type: "checkicon",
        Caption: "Sản phẩm dịch vụ",
        DataSourceMember: "Isservice",
        Width: 200
    },
    {
        Name: "Isisgiftvoucher",
        Type: "checkicon",
        Caption: "Sản phẩm phiếu quà tặng",
        DataSourceMember: "Isisgiftvoucher",
        Width: 200
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
        DataSourceMember: "ProductTypeID",
        Width: 200,
        Link: "/ProductType/Edit/",
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
        Name: "ProductTypeName",
        DefaultValue: "",
        BindControlName: "ProductTypeName",
        DataSourceMember: "ProductTypeName"
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
        Caption: "Tên ngôn ngữ",
        DataSourceMember: "LanguageName",
        Width: 200
    },
    {
        Name: "ProductTypeName",
        Type: "textbox",
        Caption: "Tên loại sản phẩm",
        maxSize: "400",
        DataSourceMember: "ProductTypeName",
        Width: 300
    },
    {
        Name: "Description",
        Type: "textbox",
        Caption: "Mô tả loại sản phẩm",
        maxSize: "2000",
        DataSourceMember: "Description",
        Width: 200
    }
];


