export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrderStepGroup/Search";
export const LoadAPIPath = "api/ShipmentOrderStepGroup/Load";
export const AddAPIPath = "api/ShipmentOrderStepGroup/Add";
export const UpdateAPIPath = "api/ShipmentOrderStepGroup/Update";
export const DeleteAPIPath = "api/ShipmentOrderStepGroup/Delete";
export const UpdateOrderAPIPath = "api/ShipmentOrderStepGroup/UpdateOrder";
export const BackLink = "/ShipmentOrderStepGroup";
export const AddLink = "/ShipmentOrderStepGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderStepGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm nhóm bước xử lý yêu cầu vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderStepGroup", Title: "Danh sách nhóm nhóm bước xử lý yêu cầu vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentOrderStepGroup", Title: "Danh sách nhóm nhóm bước xử lý yêu cầu vận chuyển" },
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
        name: "txtShipmentOrderStepGroupID",
        label: "mã nhóm bước xử lý",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStepGroupID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderStepGroupName",
        label: "tên nhóm bước xử lý",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStepGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtIconUrl",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconUrl",
        readonly: false,
        validatonList: [],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1900",
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
        name: "txtShipmentOrderStepGroupID",
        label: "mã nhóm bước xử lý",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStepGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentOrderStepGroupName",
        label: "tên nhóm bước xử lý",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentOrderStepGroupName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtIconUrl",
        label: "đường dẫn hình Icon",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IconUrl",
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
        Name: "ShipmentOrderStepGroupID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderStepGroupID",
        DataSourceMember: "ShipmentOrderStepGroupID"
    },
    {
        Name: "ShipmentOrderStepGroupName",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderStepGroupName",
        DataSourceMember: "ShipmentOrderStepGroupName"
    },
    {
        Name: "IconUrl",
        DefaultValue: "",
        BindControlName: "txtIconUrl",
        DataSourceMember: "IconUrl"
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
        DataSourceMember: "ShipmentOrderStepGroupID",
        Width: 60
    },
    {
        Name: "ShipmentOrderStepGroupID",
        Type: "text",
        Caption: "Mã nhóm bước xử lý",
        DataSourceMember: "ShipmentOrderStepGroupID",
        Width: 150
    },
    {
        Name: "ShipmentOrderStepGroupName",
        Type: "text",
        Caption: "Tên nhóm bước xử lý",
        DataSourceMember: "ShipmentOrderStepGroupName",
        //Width: 350
    },
    {
        Name: "IconUrl",
        Type: "text",
        Caption: "Đường dẫn hình Icon",
        DataSourceMember: "IconUrl",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentOrderStepGroupID",
        Width: 100,
        Link: "/ShipmentOrderStepGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
