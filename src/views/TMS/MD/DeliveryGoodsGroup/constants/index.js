export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DeliveryGoodsGroup/Search";
export const LoadAPIPath = "api/DeliveryGoodsGroup/Load";
export const AddAPIPath = "api/DeliveryGoodsGroup/Add";
export const UpdateAPIPath = "api/DeliveryGoodsGroup/Update";
export const DeleteAPIPath = "api/DeliveryGoodsGroup/Delete";
export const UpdateOrderAPIPath = "api/DeliveryGoodsGroup/UpdateOrder";
export const BackLink = "/DeliveryGoodsGroup";
export const AddLink = "/DeliveryGoodsGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DeliveryGoodsGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm hàng hóa vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryGoodsGroup", Title: "Danh sách nhóm hàng hóa vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryGoodsGroup", Title: "Danh sách nhóm hàng hóa vận chuyển" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryGoodsGroup", Title: "Danh sách nhóm hàng hóa vận chuyển" },
    { Link: "", Title: "Chi tiết" }
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
        name: "txtDeliveryGoodsGroupID",
        label: "mã nhóm hàng hóa vận chuyển",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryGoodsGroupID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtDeliveryGoodsGroupName",
        label: "tên nhóm hàng hóa vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryGoodsGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtDeliveryAbilityFactor",
        label: "khả năng giao hàng",
        value: "",
        maxSize: "14",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbilityFactor",
        readonly: false,
        validatonList: ["required", "digit"],
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsOtherGroup",
        label: "Thuộc nhóm khác:",
        value: false,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsOtherGroup",
        listoption: {},
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
        name: "txtDeliveryGoodsGroupID",
        label: "mã nhóm hàng hóa vận chuyển",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryGoodsGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtDeliveryGoodsGroupName",
        label: "tên nhóm hàng hóa vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryGoodsGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtDeliveryAbilityFactor",
        label: "khả năng giao hàng",
        value: "",
        maxSize: "14",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbilityFactor",
        readonly: false,
        validatonList: ["required", "digit"],
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsOtherGroup",
        label: "Thuộc nhóm khác:",
        value: false,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsOtherGroup",
        listoption: {},
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
        Name: "DeliveryGoodsGroupID",
        DefaultValue: "",
        BindControlName: "txtDeliveryGoodsGroupID",
        DataSourceMember: "DeliveryGoodsGroupID"
    },
    {
        Name: "DeliveryGoodsGroupName",
        DefaultValue: "",
        BindControlName: "txtDeliveryGoodsGroupName",
        DataSourceMember: "DeliveryGoodsGroupName"
    },
    {
        Name: "DeliveryAbilityFactor",
        DefaultValue: "",
        BindControlName: "txtDeliveryAbilityFactor",
        DataSourceMember: "DeliveryAbilityFactor"
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
        Name: "IsOtherGroup",
        DefaultValue: false,
        BindControlName: "chkIsOtherGroup",
        DataSourceMember: "IsOtherGroup"
    },
    {
        Name: "IsActived",
        DefaultValue: false,
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
        DataSourceMember: "DeliveryGoodsGroupID",
        Width: 60
    },
    {
        Name: "DeliveryGoodsGroupID",
        Type: "text",
        Caption: "Mã nhóm hàng hóa vận chuyển",
        DataSourceMember: "DeliveryGoodsGroupID",
        Width: 160
    },
    {
        Name: "DeliveryGoodsGroupName",
        Type: "texttolink",
        Link: "/DeliveryGoodsGroup/Detail/",
        Caption: "Tên nhóm hàng hóa vận chuyển",
        DataSourceMember: "DeliveryGoodsGroupName",
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
        DataSourceMember: "DeliveryGoodsGroupID",
        Width: 80,
        Link: "/DeliveryGoodsGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
