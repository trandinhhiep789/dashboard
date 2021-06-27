import { ERPCOMMONCACHE_PARTNER } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerSaleChannel/Search";
export const LoadAPIPath = "api/PartnerSaleChannel/Load";
export const AddAPIPath = "api/PartnerSaleChannel/Add";
export const UpdateAPIPath = "api/PartnerSaleChannel/Update";
export const DeleteAPIPath = "api/PartnerSaleChannel/Delete";
export const UpdateOrderAPIPath = "api/PartnerSaleChannel/UpdateOrder";
export const BackLink = "/PartnerSaleChannel";
export const AddLink = "/PartnerSaleChannel/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerSaleChannelID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách kênh bán hàng của đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerSaleChannel", Title: "Danh sách kênh bán hàng của đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerSaleChannel", Title: "Danh sách kênh bán hàng của đối tác" },
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
        name: "txtPartnerSaleChannelID",
        label: "mã kênh bán hàng",
        value: "",
        //maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerSaleChannelID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPartnerSaleChannelName",
        label: "tên kênh bán hàng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerSaleChannelName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtPartnerID",
        label: "đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

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
        name: "txtIconURL",
        label: "Đường dẫn Icon:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "Màu sắc:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
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
        name: "txtPartnerSaleChannelID",
        label: "mã kênh bán hàng",
        value: "",
        //maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerSaleChannelID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtPartnerSaleChannelName",
        label: "tên kênh bán hàng",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PartnerSaleChannelName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtPartnerID",
        label: "đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

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
        name: "txtIconURL",
        label: "Đường dẫn Icon:",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "Màu sắc:",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
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
        Name: "PartnerSaleChannelID",
        DefaultValue: "",
        BindControlName: "txtPartnerSaleChannelID",
        DataSourceMember: "PartnerSaleChannelID"
    },
    {
        Name: "PartnerSaleChannelName",
        DefaultValue: "",
        BindControlName: "txtPartnerSaleChannelName",
        DataSourceMember: "PartnerSaleChannelName"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "PartnerName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "PartnerName"
    },
    {
        Name: "IconURL",
        DefaultValue: "",
        BindControlName: "txtIconURL",
        DataSourceMember: "IconURL"
    },
    {
        Name: "ColorCode",
        DefaultValue: "",
        BindControlName: "txtIconURL",
        DataSourceMember: "ColorCode"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType"
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
        DataSourceMember: "PartnerSaleChannelID",
        Width: 60
    },
    {
        Name: "PartnerSaleChannelID",
        Type: "text",
        Caption: "Mã kênh bán hàng",
        DataSourceMember: "PartnerSaleChannelID",
        Width: 150
    },
    {
        Name: "PartnerSaleChannelName",
        Type: "text",
        Caption: "Tên kênh bán hàng",
        DataSourceMember: "PartnerSaleChannelName",
        Width: 200
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 200
    },
    {
        Name: "IconURL",
        Type: "text",
        Caption: "Đường dẫn Icon",
        DataSourceMember: "IconURL",
        Width: 120
    },
    {
        Name: "ColorCode",
        Type: "text",
        Caption: "Màu sắc",
        DataSourceMember: "ColorCode",
        Width: 120
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
        DataSourceMember: "PartnerSaleChannelID",
        Width: 100,
        Link: "/PartnerSaleChannel/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
