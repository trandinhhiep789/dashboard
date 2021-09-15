export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/User_DeliveryGoodsGroup/Search";
export const LoadAPIPath = "api/User_DeliveryGoodsGroup/Load";
export const AddAPIPath = "api/User_DeliveryGoodsGroup/Add";
export const UpdateAPIPath = "api/User_DeliveryGoodsGroup/Update";
export const DeleteAPIPath = "api/User_DeliveryGoodsGroup/Delete";
export const UpdateOrderAPIPath = "api/User_DeliveryGoodsGroup/UpdateOrder";
export const BackLink = "/User_DeliveryGoodsGroup";
export const AddLink = "/User_DeliveryGoodsGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "UserName,DeliveryGoodsGroupID";
export const AddByFileAPIPath ="api/User_DeliveryGoodsGroup/AddByFile";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khả năng giao hàng-lắp đặt và tỷ lệ phân bổ tải trên nhóm hàng hóa vận chuyển của một nhân viên" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/User_DeliveryGoodsGroup", Title: "Danh sách khả năng giao hàng-lắp đặt và tỷ lệ phân bổ tải trên nhóm hàng hóa vận chuyển của một nhân viên" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/User_DeliveryGoodsGroup", Title: "Danh sách khả năng giao hàng-lắp đặt và tỷ lệ phân bổ tải trên nhóm hàng hóa vận chuyển của một nhân viên" },
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
        name: "txtUserName",
        label: "mã nhân viên",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "UserName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtDeliveryGoodsGroupID",
        label: "mã nhóm hàng hóa vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryGoodsGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "MDMCOMMONCACHE.DELIVERYGOODSGROUP",
        ValueMember: "DeliveryGoodsGroupID",
        NameMember: "DeliveryGoodsGroupName"
    },
    {
        type: "text",
        name: "txtDeliveryAbility",
        label: "khả năng giao hàng và lắp đặt 1 ngày làm việc của NV",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbility",
        readonly: false,
        validatonList: ["digit"],
    },
    {
        type: "text",
        name: "txtApportionFactor",
        label: "Tỷ lệ phân bổ",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ApportionFactor",
        readonly: false,
        validatonList: ["digit"],
    },
    {
        type: "textarea",
        name: "txtNote",
        label: "Ghi chú:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Note",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "0",
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
        name: "txtUserName",
        label: "mã nhân viên",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "UserName",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtDeliveryGoodsGroupID",
        label: "mã nhóm hàng hóa vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "DeliveryGoodsGroupID",
        readonly: true,
        disabled: true,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "MDMCOMMONCACHE.DELIVERYGOODSGROUP",
        ValueMember: "DeliveryGoodsGroupID",
        NameMember: "DeliveryGoodsGroupName"
    },
    {
        type: "text",
        name: "txtDeliveryAbility",
        label: "khả năng giao hàng và lắp đặt 1 ngày làm việc của NV",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbility",
        readonly: false,
        validatonList: ["digit"],
    },
    {
        type: "text",
        name: "txtApportionFactor",
        label: "Tỷ lệ phân bổ",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ApportionFactor",
        readonly: false,
        validatonList: ["digit"],
    },
    {
        type: "textarea",
        name: "txtNote",
        label: "Ghi chú:",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Note",
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
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "txtUserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "FullName",
        DefaultValue: "",
        BindControlName: "txtFullName",
        DataSourceMember: "FullName"
    },
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
        Name: "ApportionFactor",
        DefaultValue: "",
        BindControlName: "txtApportionFactor",
        DataSourceMember: "ApportionFactor"
    },
    {
        Name: "DeliveryAbility",
        DefaultValue: "",
        BindControlName: "txtDeliveryAbility",
        DataSourceMember: "DeliveryAbility"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "txtNote",
        DataSourceMember: "Note"
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
        DataSourceMember: "UserName,DeliveryGoodsGroupID",
        Width: 60
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName",
        Width: 100
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên",
        DataSourceMember: "FullName",
        Width: 200
    },
    {
        Name: "DeliveryGoodsGroupName",
        Type: "text",
        Caption: "Nhóm hàng hóa vận chuyển",
        DataSourceMember: "DeliveryGoodsGroupName",
        Width: 200
    },
    {
        Name: "DeliveryAbility",
        Type: "text",
        Caption: "Khả năng giao hàng và lắp đặt",
        DataSourceMember: "DeliveryAbility",
        Width: 200
    },
    {
        Name: "ApportionFactor",
        Type: "text",
        Caption: "Tỷ lệ phân bổ",
        DataSourceMember: "ApportionFactor",
        Width: 200
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
        DataSourceMember: "UserName,DeliveryGoodsGroupID",
        Width: 100,
        Link: "/User_DeliveryGoodsGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];


export const schema = {
    'Mã nhân viên': {
        prop: 'UserName',
        type: String,
        required: true
    },
    'Mã nhóm hàng hóa vận chuyển': {
        prop: 'DeliveryGoodsGroupID',
        type: Number,
        required: true
    },
    'Khả năng giao hàng và lắp đặt 1 ngày làm việc của nhân viên': {
        prop: 'DeliveryAbility',
        type: Number,
        required: true
    },
    'Tỷ lệ phân bổ': {
        prop: 'ApportionFactor',
        type: Number,
        required: true
    },
    'Ghi chú': {
        prop: 'Note',
        type: String,
        required: true
    }
}

export const DataTemplateExport = [
    {
        "Mã nhân viên": '98138',
        "Mã nhóm hàng hóa vận chuyển": '1',
        "Khả năng giao hàng và lắp đặt 1 ngày làm việc của nhân viên": '10',
        "Tỷ lệ phân bổ": '12',
        "Ghi chú": 'note'
    }
];