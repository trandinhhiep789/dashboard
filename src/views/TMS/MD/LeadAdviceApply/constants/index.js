export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadAdviceApply/Search";
export const LoadAPIPath = "api/LeadAdviceApply/Load";
export const LoadInfoByLeadAdviceIDAPIPath = "api/LeadAdviceApply/LoadInfoByLeadAdviceID";
export const AddAPIPath = "api/LeadAdviceApply/Add";
export const UpdateAPIPath = "api/LeadAdviceApply/Update";
export const DeleteAPIPath = "api/LeadAdviceApply/Delete";
export const BackLink = "/LeadAdviceApply";
export const AddLink = "/LeadAdviceApply/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadAdviceApplyID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (khác loại )" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadAdviceApply", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (khác loại )" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadAdviceApply", Title: "Danh mục sản phẩm tư vấn ứng với loại yêu cầu vận chuyển (khác loại )" },
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
    {
        type: "multiselect",
        DataSourceMember: "MainGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Ngành hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        name: "cbMainGroupID",
        NameMember: "MainGroupName",
        placeholder: "Ngành hàng",
        value: -1,
        ValueMember: "MainGroupID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "SubGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Nhóm hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        name: "cbSubGroupID",
        NameMember: "SubGroupName",
        placeholder: "Nhóm hàng",
        value: -1,
        ValueMember: "SubGroupID",
        validatonList: ["Comborequired"],
    },
    {
        name: "cbProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtLeadAdviceApplyID",
        label: "Khóa chính",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadAdviceApplyID",
        disabled: true,
        readonly: true,
        validatonList:[]
    },
    {
        type: "multiselect",
        DataSourceMember: "MainGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Ngành hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        name: "cbMainGroupID",
        NameMember: "MainGroupName",
        placeholder: "Ngành hàng",
        value: -1,
        ValueMember: "MainGroupID",
        validatonList: ["Comborequired"],
    },
    {
        type: "multiselect",
        DataSourceMember: "SubGroupID",
        IsAutoLoadItemFromCache: true,
        isMulti: false,
        label: "Nhóm hàng",
        listoption: [],
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        name: "cbSubGroupID",
        NameMember: "SubGroupName",
        placeholder: "Nhóm hàng",
        value: -1,
        ValueMember: "SubGroupID",
        validatonList: ["Comborequired"],
    },
    {
        name: "cbProductID",
        type: "productbox",
        label: "Mã sản phẩm",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["Comborequired"]
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
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
        Name: "LeadAdviceID",
        DefaultValue: "",
        BindControlName: "txtLeadAdviceID",
        DataSourceMember: "LeadAdviceID"
    },  
    {
        Name: "LeadAdviceApplyID",
        DefaultValue: "",
        BindControlName: "txtLeadAdviceApplyID",
        DataSourceMember: "LeadAdviceApplyID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "cbMainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "cbSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID",
        DataSourceMember: "ProductID"
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "LeadAdviceApplyID",
        Width: 50
    },
    {
        Name: "LeadAdviceApplyID",
        Type: "text",
        Caption: "Mã khoá",
        DataSourceMember: "LeadAdviceApplyID",
        Width: 70,
    },
    // {
    //     Name: "MainGroupName",
    //     Type: "text",
    //     Caption: "Ngành hàng",
    //     DataSourceMember: "MainGroupName",
    //     Width: 140
    // },
    // {
    //     Name: "SubGroupName",
    //     Type: "text",
    //     Caption: "Nhóm hàng",
    //     DataSourceMember: "SubGroupName",
    //     Width: 100
    // },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "ProductName",
        Width: 250
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 60
    },
    {
        Name: "LeadAdviceApplyID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "LeadAdviceApplyID",
        Width: 60
    }
];
