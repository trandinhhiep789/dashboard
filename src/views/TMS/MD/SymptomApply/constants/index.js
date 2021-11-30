export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/SymptomApply/Search";
export const LoadAPIPath = "api/SymptomApply/Load";
export const AddAPIPath = "api/SymptomApply/Add";
export const UpdateAPIPath = "api/SymptomApply/Update";
export const DeleteAPIPath = "api/SymptomApply/Delete";
export const UpdateOrderAPIPath = "api/SymptomApply/UpdateOrder";
export const BackLink = "/SymptomApply";
export const AddLink = "/SymptomApply/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SymptomApplyID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng Map lỗi thực tế" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SymptomApply", Title: "Danh sách bảng Map lỗi thực tế" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SymptomApply", Title: "Danh sách bảng Map lỗi thực tế" },
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
        type: "select",
        name: "txtSymptomID",
        label: "Lỗi thực tế",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SymptomID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SYMPTOM",
        ValueMember: "SymptomID",
        NameMember: "SymptomName"
    },
    {
        type: "multiselect",
        name: "txtSubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "text",
        name: "txtProductID",
        label: "mã sản phẩm",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
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
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }
    
];

export const EditElementList = [
    // {
    //     type: "text",
    //     name: "txtSymptomApplyID",
    //     label: "mã bảng Map lỗi thực tế",
    //     value: "",
    //     maxSize: "20",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "SymptomApplyID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "select",
        name: "txtSymptomID",
        label: "Lỗi thực tế",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SymptomID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SYMPTOM",
        ValueMember: "SymptomID",
        NameMember: "SymptomName"
    },
    {
        type: "multiselect",
        name: "txtSubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "text",
        name: "txtProductID",
        label: "mã sản phẩm",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
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
        Name: "SymptomApplyID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SymptomApplyID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "txtProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "ProductName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ProductName"
    },
    {
        Name: "SymptomID",
        DefaultValue: "",
        BindControlName: "txtSymptomID",
        DataSourceMember: "SymptomID"
    },
    {
        Name: "SymptomName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SymptomName"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "txtSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "SubGroupName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "SubGroupName"
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
        DataSourceMember: "SymptomApplyID",
        Width: 60
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 150
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
        Width: 150
    },
    {
        Name: "SymptomName",
        Type: "text",
        Caption: "Tên lỗi",
        DataSourceMember: "SymptomName",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "SymptomApplyID",
        Width: 100,
        Link: "/SymptomApply/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
