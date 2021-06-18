export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/SvTimeConvertDetail/Add";
export const UpdateAPIPath = "api/SvTimeConvertDetail/Update";
export const DeleteAPIPath = "api/SvTimeConvertDetail/Delete";
export const LoadAPIPath = "api/SvTimeConvertDetail/Load";
export const BackLink = "/SvTimeConvert";


export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvTimeConvert", Title: "Bảng chuyển đổi thời gian" },
    { Link: "", Title: "Chi tiết bảng chuyển đổi thời gian" }
];

export const ModalColumnList_Insert = [
    {
        type: "text",
        Name: "ServiceTimeLong",
        label: "thời gian thực hiện dịch vụ(tính bằng phút)",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServiceTimeLong",
        readonly: false,
        validatonList: ["required", "number"],
    },
    {
        Name: "MaterialGroupID",
        type: "multiselect",
        label: "nhóm sản phẩm dịch vụ",
        DataSourceMember: "MaterialGroupID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    {
        Name: "ProductID",
        type: "multiselect",
        label: "sản phẩm dịch vụ",
        DataSourceMember: "ProductID",
        readonly: false,
        value: -1,
        listoption: [],
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    // {
    //     Name: "ProductID",
    //     type: "productbox",
    //     label: "sản phẩm dịch vụ",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "ProductID",
    //     readonly: false,
    //     validatonList: []
    // },
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
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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
        type: "text",
        Name: "SvTimeConvertDetailID",
        label: "Mã chi tiết bảng chuyển đổi",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SvTimeConvertDetailID",
        readonly: true,
        validatonList: [],
    },
    {
        type: "text",
        Name: "ServiceTimeLong",
        label: "thời gian thực hiện dịch vụ(tính bằng phút)",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServiceTimeLong",
        readonly: false,
        validatonList: ["required", "number"],
    },
    {
        Name: "MaterialGroupID",
        type: "multiselect",
        label: "nhóm sản phẩm dịch vụ",
        DataSourceMember: "MaterialGroupID",
        readonly: false,
        value: -1,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    {
        Name: "ProductID",
        type: "multiselect",
        label: "sản phẩm dịch vụ",
        DataSourceMember: "ProductID",
        readonly: false,
        value: -1,
        listoption: [],
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MATERIALGROUP",
        ValueMember: "MaterialGroupID",
        NameMember: "MaterialGroupName",
        // KeyFilter: "FunctionCategoryID",
        // ValueFilter: "1,2"
    },
    // {
    //     Name: "ProductID",
    //     type: "productbox",
    //     label: "sản phẩm dịch vụ",
    //     colspan: 12,
    //     isMulti: false,
    //     DataSourceMember: "ProductID",
    //     readonly: false,
    //     validatonList: []
    // },
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
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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

export const DataGridColumnList = [
    {
        Name: "chkSelectSvTimeConvertDetailID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "SvTimeConvertDetailID",
        Width: 60
    },
    {
        Name: "ServiceTimeLong",
        Type: "text",
        Caption: "Thời gian thực hiện dịch vụ(tính bằng phút)",
        DataSourceMember: "ServiceTimeLong",
        Width: 150
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Nhóm sản phẩm dịch vụ",
        DataSourceMember: "MaterialGroupName",
        Width: 160
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm dịch vụ",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "EditSvTimeConvertDetailID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "SvTimeConvertDetailID",
        Width: 80
    }

];

export const MLObjectDefinition = [
    {
        Name: "SvTimeConvertDetailID",
        DefaultValue: "",
        BindControlName: "SvTimeConvertDetailID",
        DataSourceMember: "SvTimeConvertDetailID"
    },
    {
        Name: "SvTimeConvertID",
        DefaultValue: "",
        BindControlName: "SvTimeConvertID",
        DataSourceMember: "SvTimeConvertID"
    },
    {
        Name: "SvTimeConvertName",
        DefaultValue: "",
        BindControlName: "SvTimeConvertName",
        DataSourceMember: "SvTimeConvertName"
    },
    {
        Name: "ServiceTimeLong",
        DefaultValue: "",
        BindControlName: "ServiceTimeLong",
        DataSourceMember: "ServiceTimeLong"
    },
    {
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "MaterialGroupID",
        DataSourceMember: "MaterialGroupID"
    },
    {
        Name: "MaterialGroupName",
        DefaultValue: "",
        BindControlName: "MaterialGroupName",
        DataSourceMember: "MaterialGroupName"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "ProductName",
        DataSourceMember: "ProductName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
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
    }
];