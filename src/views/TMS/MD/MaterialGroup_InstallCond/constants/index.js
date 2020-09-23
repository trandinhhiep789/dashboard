export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/MaterialGroup_InstallCond/Add";
export const UpdateAPIPath = "api/MaterialGroup_InstallCond/Update";
export const DeleteAPIPath = "api/MaterialGroup_InstallCond/Delete";

export const ModalColumnList_Insert = [
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "ApplySubGroupID",
        label: "Nhóm sản phẩm áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ApplySubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "ApplyBrandID",
        label: "Nhà sản xuất áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ApplyBrandID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BRAND_MAINGROUP",
        ValueMember: "BrandID",
        NameMember: "BrandName"
    },
    {
        type: "multiselect",
        Name: "ApplyTechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "ApplyTechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "ApplyTechspecsValueID",
        label: "Giá trị thông số KT áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "ApplyTechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        Name: "ApplyProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ApplyProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     Name: "MaterialProductID",
    //     type: "productbox",
    //     label: "Mã sản phẩm vật tư",
    //     //maxSize: "20",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "MaterialProductID",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        Name: "MaterialProductID",
        type: "select",
        label: "sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        listoption: [],
        IsAutoLoadItemFromCache: false,
        DataSourceMember: "MaterialProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const ModalColumnList_Edit = [
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "ApplySubGroupID",
        label: "Nhóm sản phẩm áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ApplySubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "ApplyBrandID",
        label: "Nhà sản xuất áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ApplyBrandID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.BRAND_SUBGROUP",
        ValueMember: "BrandID",
        NameMember: "BrandName"
    },
    {
        type: "multiselect",
        Name: "ApplyTechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "ApplyTechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "ApplyTechspecsValueID",
        label: "Giá trị thông số KT áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "ApplyTechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        Name: "ApplyProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ApplyProductID",
        readonly: false,
        validatonList: []
    },
    // {
    //     Name: "MaterialProductID",
    //     type: "productbox",
    //     label: "Mã sản phẩm vật tư",
    //     //maxSize: "20",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "MaterialProductID",
    //     readonly: false,
    //     validatonList: []
    // },
    {
        Name: "MaterialProductID",
        type: "select",
        label: "sản phẩm vật tư",
        //maxSize: "20",
        colspan: 12,
        listoption: [],
        IsAutoLoadItemFromCache: false,
        DataSourceMember: "MaterialProductID",
        readonly: false,
        validatonList: ["Comborequired"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: ""
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectInstallCondID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "InstallCondID",
        Width: 60
    },
    {
        Name: "MaterialProductID",
        Type: "text",
        Caption: "Mã sản phẩm vật tư",
        DataSourceMember: "MaterialProductID",
        Width: 200
    },
    {
        Name: "MaterialProductName",
        Type: "text",
        Caption: "Tên sản phẩm vật tư",
        DataSourceMember: "MaterialProductName",
        Width: 200
    },
    {
        Name: "ApplyBrandName",
        Type: "text",
        Caption: "Nhà sản xuất áp dụng",
        DataSourceMember: "ApplyBrandName",
        Width: 200
    },
    {
        Name: "ApplySubGroupName",
        Type: "text",
        Caption: "Nhóm sản phẩm áp dụng",
        DataSourceMember: "ApplySubGroupName",
        Width: 200
    },
    {
        Name: "ApplyTechspecsName",
        Type: "text",
        Caption: "Thông số kỹ thuật áp dụng",
        DataSourceMember: "ApplyTechspecsName",
        Width: 200
    },
    {
        Name: "ApplyTechspecsValueName",
        Type: "text",
        Caption: "Giá trị thông số KT áp dụng",
        DataSourceMember: "ApplyTechspecsValueName",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 120
    },
    {
        Name: "InstallCondID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "InstallCondID",
        Width: 80
    }

];

export const MLObjectDefinition = [
    // {
    //     Name: "InstallCondID",
    //     DefaultValue: "",
    //     BindControlName: "",
    //     DataSourceMember: "InstallCondID"
    // },
    {
        Name: "InstallCondID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "InstallCondID"
    },
    {
        Name: "MaterialGroup",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "MaterialGroup"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "MainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "ApplySubGroupID",
        DefaultValue: "",
        BindControlName: "ApplySubGroupID",
        DataSourceMember: "ApplySubGroupID"
    },
    {
        Name: "ApplySubGroupName",
        DefaultValue: "",
        BindControlName: "ApplySubGroupName",
        DataSourceMember: "ApplySubGroupName"
    },
    {
        Name: "ApplyBrandID",
        DefaultValue: "",
        BindControlName: "ApplyBrandID",
        DataSourceMember: "ApplyBrandID"
    },
    {
        Name: "ApplyBrandName",
        DefaultValue: "",
        BindControlName: "ApplyBrandName",
        DataSourceMember: "ApplyBrandName"
    },
    {
        Name: "ApplyBrandName",
        DefaultValue: "",
        BindControlName: "ApplyBrandName",
        DataSourceMember: "ApplyBrandName"
    },
    {
        Name: "ApplyTechspecsID",
        DefaultValue: "",
        BindControlName: "ApplyTechspecsID",
        DataSourceMember: "ApplyTechspecsID"
    },
    {
        Name: "ApplyTechspecsName",
        DefaultValue: "",
        BindControlName: "ApplyTechspecsName",
        DataSourceMember: "ApplyTechspecsName"
    },
    {
        Name: "ApplyTechspecsValueID",
        DefaultValue: "",
        BindControlName: "ApplyTechspecsValueID",
        DataSourceMember: "ApplyTechspecsValueID"
    },
    {
        Name: "ApplyTechspecsValueName",
        DefaultValue: "",
        BindControlName: "ApplyTechspecsValueName",
        DataSourceMember: "ApplyTechspecsValueName"
    },
    {
        Name: "ApplyProductID",
        DefaultValue: "",
        BindControlName: "ApplyProductID",
        DataSourceMember: "ApplyProductID"
    },
    {
        Name: "MaterialProductID",
        DefaultValue: "",
        BindControlName: "MaterialProductID",
        DataSourceMember: "MaterialProductID"
    },
    {
        Name: "MaterialProductName",
        DefaultValue: "",
        BindControlName: "MaterialProductName",
        DataSourceMember: "MaterialProductName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];