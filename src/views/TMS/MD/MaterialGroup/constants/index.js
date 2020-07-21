export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/MaterialGroup/Search";
export const LoadAPIPath = "api/MaterialGroup/Load";
export const AddAPIPath = "api/MaterialGroup/Add";
export const UpdateAPIPath = "api/MaterialGroup/Update";
export const DeleteAPIPath = "api/MaterialGroup/Delete";
export const UpdateOrderAPIPath = "api/MaterialGroup/UpdateOrder";
export const BackLink = "/MaterialGroup";
export const AddLink = "/MaterialGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MaterialGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm vật tư lắp đặt" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialGroup", Title: "Danh sách nhóm vật tư lắp đặt" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialGroup", Title: "Danh sách nhóm vật tư lắp đặt" },
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
        name: "txtMaterialGroupID",
        label: "mã nhóm vật tư",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtMaterialGroupName",
        label: "tên nhóm vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupName",
        readonly: false,
        validatonList: ["required"],
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
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
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
        value: false,
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
        name: "txtMaterialGroupID",
        label: "mã nhóm vật tư",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtMaterialGroupName",
        label: "tên nhóm vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupName",
        readonly: false,
        validatonList: ["required"],
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
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
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
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "txtMaterialGroupID",
        DataSourceMember: "MaterialGroupID"
    },
    {
        Name: "MaterialGroupName",
        DefaultValue: "",
        BindControlName: "txtMaterialGroupName",
        DataSourceMember: "MaterialGroupName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
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
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "MaterialGroupID",
        Width: 60
    },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 160
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Tên nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 250
    },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     //Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
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
        Width: 140
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "MaterialGroupID",
        Width: 80,
        Link: "/MaterialGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
