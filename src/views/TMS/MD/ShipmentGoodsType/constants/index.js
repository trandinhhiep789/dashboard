export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ShipmentGoodsType/Search";
export const LoadAPIPath = "api/ShipmentGoodsType/Load";
export const AddAPIPath = "api/ShipmentGoodsType/Add";
export const UpdateAPIPath = "api/ShipmentGoodsType/Update";
export const DeleteAPIPath = "api/ShipmentGoodsType/Delete";
export const UpdateOrderAPIPath = "api/ShipmentGoodsType/UpdateOrder";
export const BackLink = "/ShipmentGoodsType";
export const AddLink = "/ShipmentGoodsType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentGoodsTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách loại hàng hóa vận chuyển" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentGoodsType", Title: "Danh sách loại hàng hóa vận chuyển" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ShipmentGoodsType", Title: "Danh sách loại hàng hóa vận chuyển" },
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
        type: "numeric",
        name: "txtShipmentGoodsTypeID",
        label: "mã loại hàng hóa",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentGoodsTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentGoodsTypeName",
        label: "tên loại hàng hóa",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentGoodsTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "Danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "ShipmentGoodsTypeID",
        NameMember: "ShipmentGoodsTypeName",
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        type: "numeric",
        name: "txtShipmentGoodsTypeID",
        label: "mã loại hàng hóa",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentGoodsTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtShipmentGoodsTypeName",
        label: "tên loại hàng hóa",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ShipmentGoodsTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "treeSelect",
        name: "comboParentID",
        label: "Danh mục cha",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        treeData: [],
        rootID: -1,
        rootKey: "ParentID",
        DataSourceMember: "ParentID",
        validatonList: [],
        LoadItemCacheKeyID: "",
        IsAutoLoadItemFromCache: false,
        ValueMember: "ShipmentGoodsTypeID",
        NameMember: "ShipmentGoodsTypeName",
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        Name: "ShipmentGoodsTypeID",
        DefaultValue: "",
        BindControlName: "txtShipmentGoodsTypeID",
        DataSourceMember: "ShipmentGoodsTypeID"
    },
    {
        Name: "ShipmentGoodsTypeName",
        DefaultValue: "",
        BindControlName: "txtShipmentGoodsTypeName",
        DataSourceMember: "ShipmentGoodsTypeName"
    },
    ,
    {
        Name: "ParentID",
        DefaultValue: "",
        BindControlName: "comboParentID",
        DataSourceMember: "ParentID"
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
        DataSourceMember: "ShipmentGoodsTypeID",
        Width: 60
    },
    {
        Name: "ShipmentGoodsTypeID",
        Type: "text",
        Caption: "Mã loại hàng hóa",
        DataSourceMember: "ShipmentGoodsTypeID",
        Width: 100
    },
    {
        Name: "ShipmentGoodsTypeName",
        Type: "text",
        Caption: "Tên loại hàng hóa vận chuyển",
        DataSourceMember: "ShipmentGoodsTypeName",
        Width: 250
    },
    {
        Name: "ParentName",
        Type: "text",
        Caption: "Danh mục cha",
        DataSourceMember: "ParentName",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 100
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentGoodsTypeID",
        Width: 70,
        Link: "/ShipmentGoodsType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
