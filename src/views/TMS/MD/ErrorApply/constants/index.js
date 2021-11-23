export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/Error_Apply/Search";
export const LoadAPIPath = "api/Error_Apply/Load";
export const AddAPIPath = "api/Error_Apply/Add";
export const UpdateAPIPath = "api/Error_Apply/Update";
export const DeleteAPIPath = "api/Error_Apply/Delete";
export const UpdateOrderAPIPath = "api/Error_Apply/UpdateOrder";
export const BackLink = "/ErrorApply";
export const AddLink = "/ErrorApply/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ErrorApplyID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng Map lỗi thực tế" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ErrorApply", Title: "Danh sách bảng Map lỗi thực tế" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ErrorApply", Title: "Danh sách bảng Map lỗi thực tế" },
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
        name: "txtErrorID",
        label: "Nhóm lỗi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ErrorID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.ERROR",
        ValueMember: "ErrorID",
        NameMember: "ErrorName"
    },
    {
        type: "text",
        name: "txtSubGroupID",
        label: "mã nhóm hàng",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["required","number"]
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
    //     name: "txtErrorApplyID",
    //     label: "mã bảng Map lỗi thực tế",
    //     value: "",
    //     maxSize: "20",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "ErrorApplyID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "select",
        name: "txtErrorID",
        label: "Nhóm lỗi",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ErrorID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.ERROR",
        ValueMember: "ErrorID",
        NameMember: "ErrorName"
    },
    {
        type: "text",
        name: "txtSubGroupID",
        label: "mã nhóm hàng",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: ["required","number"]
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
        Name: "ErrorApplyID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ErrorApplyID"
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
        Name: "ErrorID",
        DefaultValue: "",
        BindControlName: "txtErrorID",
        DataSourceMember: "ErrorID"
    },
    {
        Name: "ErrorName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ErrorName"
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
        DataSourceMember: "ErrorApplyID",
        Width: 60
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 150
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
        Name: "ErrorName",
        Type: "text",
        Caption: "Tên lỗi",
        DataSourceMember: "ErrorName",
        Width: 150
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
        DataSourceMember: "ErrorApplyID",
        Width: 100,
        Link: "/ErrorApply/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
