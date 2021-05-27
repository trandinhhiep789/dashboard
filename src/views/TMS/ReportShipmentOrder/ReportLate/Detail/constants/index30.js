export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ShipmentOrder/ReportLateSRH";
// export const LoadAPIPath = "api/QualityAssessType/Load";
// export const AddAPIPath = "api/QualityAssessType/Add";
// export const UpdateAPIPath = "api/QualityAssessType/Update";
// export const DeleteAPIPath = "api/QualityAssessType/Delete";
// export const UpdateOrderAPIPath = "api/QualityAssessType/UpdateOrder";
export const BackLink = "/ReportLate";
// export const AddLink = "/QualityAssessType/Add";
// export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ShipmentOrderID";
export const InitSearchParams = [{ SearchKey: "@CoordinatorStoreID", SearchValue: 0 }, { SearchKey: "@IsLate30", SearchValue: 0 }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách vận đơn trễ dưới 30 phút của kho điều phối" }
];

// export const EditPagePath = [
//     { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
//     { Link: "/QualityAssessType", Title: "Danh sách loại tiêu chí đánh giá chất lượng" },
//     { Link: "", Title: "Sửa" }
// ];

// export const AddPagePath = [
//     { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
//     { Link: "/QualityAssessType", Title: "Danh sách loại tiêu chí đánh giá chất lượng" },
//     { Link: "", Title: "Thêm" }
// ];



export const AddElementList = [
    {
        type: "text",
        name: "txtQualityAssessTypeID",
        label: "mã loại",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtQualityAssessTypeName",
        label: "tên loại",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtQualityAssessGroupID",
        label: "nhóm tiêu chí",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "QualityAssessGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
        ValueMember: "QualityAssessGroupID",
        NameMember: "QualityAssessGroupName"

    },
    {
        type: "select",
        name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
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
        type: "text",
        name: "txtQualityAssessTypeID",
        label: "mã loại",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtQualityAssessTypeName",
        label: "tên loại",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "select",
        name: "txtQualityAssessGroupID",
        label: "nhóm tiêu chí",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "QualityAssessGroupID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
        ValueMember: "QualityAssessGroupID",
        NameMember: "QualityAssessGroupName"

    },
    {
        type: "select",
        name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false
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


export const SearchElementList = [
    // {
    //     type: "text",
    //     name: "txtKeyword",
    //     label: "Nhập mã kho điều phối",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {}
    // }
    {
        type: "text",
        name: "txtCoordinatorStoreID",
        label: "Nhập mã kho điều phối",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const SearchMLObjectDefinition = [
    // {
    //     Name: "Keyword",
    //     DefaultValue: "",
    //     BindControlName: "txtKeyword"
    // }
    {
        Name: "CoordinatorStoreID",
        DefaultValue: "",
        BindControlName: "txtCoordinatorStoreID"
    }
];

export const MLObjectDefinition = [
    {
        Name: "StoreID",
        DefaultValue: "",
        BindControlName: "txtStoreID",
        DataSourceMember: "StoreID"
    },
    {
        Name: "StoreName",
        DefaultValue: "",
        BindControlName: "txtStoreName",
        DataSourceMember: "StoreName"
    },
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "ShipmentOrderTypeName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ShipmentOrderTypeName"
    },
    {
        Name: "ExpectedDeliveryDate",
        DefaultValue: "",
        BindControlName: "txtExpectedDeliveryDate",
        DataSourceMember: "ExpectedDeliveryDate"
    },
    
];

export const DataGridColumnList = [
    // {
    //     Name: "chkSelect",
    //     Type: "checkbox",
    //     Caption: "Chọn",
    //     DataSourceMember: "QualityAssessTypeID",
    //     Width: 60
    // },
    {
        Name: "StoreID",
        Type: "text",
        Caption: "Mã kho điều phối",
        DataSourceMember: "StoreID",
        Width: 150
    },
    {
        Name: "StoreName",
        Type: "text",
        Caption: "Tên kho điều phối",
        DataSourceMember: "StoreName",
        Width: 250
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        Width: 150
    },
    {
        Name: "ShipmentOrderTypeName",
        Type: "text",
        Caption: "Loại yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderTypeName",
        Width: 200
    },
    {
        Name: "ExpectedDeliveryDate",
        Type: "datetime",
        Caption: "Thời gian giao dự kiến",
        DataSourceMember: "ExpectedDeliveryDate",
        Width: 150
    },
    
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 80
    // },
    // {
    //     Name: "UpdatedDate",
    //     Type: "date",
    //     Caption: "Ngày cập nhật",
    //     DataSourceMember: "UpdatedDate",
    //     Width: 140
    // },
    // {
    //     Name: "UpdatedUserFullName",
    //     Type: "text",
    //     Caption: "Người cập nhật",
    //     DataSourceMember: "UpdatedUserFullName",
    //     Width: 140
    // },
    // {
    //     Name: "Action",
    //     Type: "link",
    //     Caption: "Tác vụ",
    //     DataSourceMember: "QualityAssessTypeID",
    //     Width: 100,
    //     Link: "/QualityAssessType/Edit/",
    //     LinkText: "Chỉnh sửa"
    // }
];
