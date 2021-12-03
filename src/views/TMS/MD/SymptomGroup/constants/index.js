export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/SymptomGroup/Search";
export const LoadAPIPath = "api/SymptomGroup/Load";
export const AddAPIPath = "api/SymptomGroup/Add";
export const UpdateAPIPath = "api/SymptomGroup/Update";
export const DeleteAPIPath = "api/SymptomGroup/Delete";
export const UpdateOrderAPIPath = "api/SymptomGroup/UpdateOrder";
export const BackLink = "/SymptomGroup";
export const AddLink = "/SymptomGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SymptomGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm lỗi thực tế" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SymptomGroup", Title: "Danh sách nhóm lỗi thực tế" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SymptomGroup", Title: "Danh sách nhóm lỗi thực tế" },
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
        type: "text",
        name: "txtSymptomGroupID",
        label: "mã nhóm lỗi thực tế",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SymptomGroupID",
        readonly: false,
        validatonList: ["required","number"],
    },
    {
        type: "text",
        name: "txtSymptomGroupName",
        label: "tên nhóm lỗi thực tế",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SymptomGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    // {
    //     type: "multiselect",
    //     name: "txtSubGroupID",
    //     label: "Nhóm hàng áp dụng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SubGroupID",
    //     readonly: false,
    //     validatonList: ["Comborequired"],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
    //     ValueMember: "SubGroupID",
    //     NameMember: "SubGroupName"
    // },
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
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtSymptomGroupID",
        label: "mã nhóm lỗi thực tế",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SymptomGroupID",
        readonly: true,
        validatonList: ["required","number"],
    },
    {
        type: "text",
        name: "txtSymptomGroupName",
        label: "tên nhóm lỗi thực tế",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SymptomGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    // {
    //     type: "multiselect",
    //     name: "txtSubGroupID",
    //     label: "Nhóm hàng áp dụng",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "SubGroupID",
    //     readonly: false,
    //     validatonList: ["Comborequired"],
    //     isMulti: false,
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
    //     ValueMember: "SubGroupID",
    //     NameMember: "SubGroupName"
    // },
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
        Name: "SymptomGroupID",
        DefaultValue: "",
        BindControlName: "txtSymptomGroupID",
        DataSourceMember: "SymptomGroupID"
    },
    {
        Name: "SymptomGroupName",
        DefaultValue: "",
        BindControlName: "txtSymptomGroupName",
        DataSourceMember: "SymptomGroupName"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "txtSubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
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
        DataSourceMember: "SymptomGroupID",
        Width: 60
    },
    {
        Name: "SymptomGroupID",
        Type: "text",
        Caption: "Mã nhóm lỗi thực tế",
        DataSourceMember: "SymptomGroupID",
        Width: 150
    },
    {
        Name: "SymptomGroupName",
        Type: "text",
        Caption: "Tên nhóm lỗi thực tế",
        DataSourceMember: "SymptomGroupName",
        Width: 250
    },
    // {
    //     Name: "SubGroupName",
    //     Type: "text",
    //     Caption: "Nhóm hàng áp dụng",
    //     DataSourceMember: "SubGroupName",
    //     Width: 250
    // },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
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
        DataSourceMember: "SymptomGroupID",
        Width: 100,
        Link: "/SymptomGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
