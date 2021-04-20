export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrderStatusGroup/Search";
export const LoadAPIPath = "api/ShipmentOrderStatusGroup/Load";
export const AddAPIPath = "api/ShipmentOrderStatusGroup/Add";
export const UpdateAPIPath = "api/ShipmentOrderStatusGroup/Update";
export const DeleteAPIPath = "api/ShipmentOrderStatusGroup/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrderStatusGroup/UpdateOrder";
export const BackLink = "/ShipmentOrderStatusGroup";
export const AddLink = "/ShipmentOrderStatusGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderStatusGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm trạng thái yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderStatusGroup", Title: "Danh sách nhóm trạng thái yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderStatusGroup", Title: "Danh sách nhóm trạng thái yêu cầu vận chuyển" },
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
        name: "txtShipmentOrderStatusGroupID",
        label: "mã nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStatusGroupID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderStatusGroupName",
        label: "tên nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStatusGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "Mã màu nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        value: 0,
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
        value: "",
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
        name: "txtShipmentOrderStatusGroupID",
        label: "mã nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStatusGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderStatusGroupName",
        label: "tên nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStatusGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtColorCode",
        label: "Mã màu nhóm trạng thái yêu cầu vận chuyển",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColorCode",
        readonly: false,
        validatonList: [],
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
        Name: "ShipmentOrderStatusGroupID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderStatusGroupID",
        DataSourceMember: "ShipmentOrderStatusGroupID"
    },
    {
        Name: "ShipmentOrderStatusGroupName",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderStatusGroupName",
        DataSourceMember: "ShipmentOrderStatusGroupName"
    },
    {
        Name: "ColorCode",
        DefaultValue: "",
        BindControlName: "txtColorCode",
        DataSourceMember: "ColorCode"
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
        DataSourceMember: "ShipmentOrderStatusGroupID",
        Width: 60
    },
    {
        Name: "ShipmentOrderStatusGroupID",
        Type: "text",
        Caption: "Mã nhóm trạng thái yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderStatusGroupID",
        Width: 300
    },
    {
        Name: "ShipmentOrderStatusGroupName",
        Type: "text",
        Caption: "Tên nhóm trạng thái yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderStatusGroupName",
        Width: 300
    },
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
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "ShipmentOrderStatusGroupID",
        Width: 80,
        Link: "/ShipmentOrderStatusGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
