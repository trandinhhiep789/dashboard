export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DeliveryAbilityStore/Search";
export const LoadAPIPath = "api/DeliveryAbilityStore/Load";
export const AddAPIPath = "api/DeliveryAbilityStore/Add";
export const UpdateAPIPath = "api/DeliveryAbilityStore/Update";
export const DeleteAPIPath = "api/DeliveryAbilityStore/Delete";
export const UpdateOrderAPIPath = "api/DeliveryAbilityStore/UpdateOrder";
export const BackLink = "/DeliveryAbilityStore";
export const AddLink = "/DeliveryAbilityStore/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DeliveryAbilityStoreID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách kho lấy tải" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbilityStore", Title: "Danh sách kho lấy tải" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbilityStore", Title: "Danh sách kho lấy tải" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DeliveryAbilityStore", Title: "Danh sách kho lấy tải" },
    { Link: "", Title: "Chi tiết kho lấy tải" }
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
    // {
    //     type: "text",
    //     name: "txtDeliveryAbilityStoreID",
    //     label: "mã loại",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "DeliveryAbilityStoreID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "select",
        name: "txtStoreID",
        label: "Kho Tận Tâm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10

    },
    {
        type: "text",
        name: "txtDeliveryAbilityStoreName",
        label: "tên kho lấy tải",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbilityStoreName",
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
        type: "select",
        name: "txtStoreID",
        label: "Kho Tận Tâm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "StoreID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.STORE",
        ValueMember: "StoreID",
        NameMember: "StoreName",
        KeyFilter: "CompanyID",
        ValueFilter: 10
    },
    {
        type: "text",
        name: "txtDeliveryAbilityStoreID",
        label: "mã kho lấy tải",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbilityStoreID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        name: "txtDeliveryAbilityStoreName",
        label: "tên kho lấy tải",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DeliveryAbilityStoreName",
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
        Name: "DeliveryAbilityStoreID",
        DefaultValue: "",
        BindControlName: "txtDeliveryAbilityStoreID",
        DataSourceMember: "DeliveryAbilityStoreID"
    },
    {
        Name: "DeliveryAbilityStoreName",
        DefaultValue: "",
        BindControlName: "txtDeliveryAbilityStoreName",
        DataSourceMember: "DeliveryAbilityStoreName"
    },
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "txtStoreID",
        DataSourceMember: "StoreID"
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
        DataSourceMember: "DeliveryAbilityStoreID",
        Width: 60
    },
    {
        Name: "DeliveryAbilityStoreID",
        Type: "text",
        Caption: "Mã kho lấy tải",
        DataSourceMember: "DeliveryAbilityStoreID",
        Width: 150
    },
    {
        Name: "DeliveryAbilityStoreName",
        Type: "texttolink",
        Link: "/DeliveryAbilityStore/Detail/",
        Caption: "Tên kho lấy tải",
        DataSourceMember: "DeliveryAbilityStoreName",
        Width: 300
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Kho Tận Tâm",
        DataSourceMember: "StoreName",
        Width: 300
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
        DataSourceMember: "DeliveryAbilityStoreID",
        Width: 100,
        Link: "/DeliveryAbilityStore/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
