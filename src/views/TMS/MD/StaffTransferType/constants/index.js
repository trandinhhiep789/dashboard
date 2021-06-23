export const APIHostName = "TMSAPI";
export const APISearch = "api/StaffTransferType/Search";
export const APIAdd = "api/StaffTransferType/Add";
export const APILoad = "api/StaffTransferType/Load";

export const AddLink = "/StaffTransferType/Add";
export const IDSelectColumnName = "chkSelect";
export const BackLink = "/StaffTransferType";

export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Loại hình thuyên chuyển nhân viên" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/StaffTransferType", Title: "Loại hình thuyên chuyển nhân viên" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/StaffTransferType", Title: "Loại hình thuyên chuyển nhân viên" },
    { Link: "", Title: "Chi tiết loại hình thuyên chuyển nhân viên" }
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const AddMLObjectDefinition = [
    {
        Name: "StaffTransferTypeID",
        DefaultValue: "",
        BindControlName: "txtStaffTransferTypeID",
        DataSourceMember: "StaffTransferTypeID"
    },
    {
        Name: "StaffTransferTypeName",
        DefaultValue: "",
        BindControlName: "txtStaffTransferTypeName",
        DataSourceMember: "StaffTransferTypeName"
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsAutoReview",
        DefaultValue: "",
        BindControlName: "IsAutoReview",
        DataSourceMember: "IsAutoReview"
    },
    {
        Name: "IsAutoTransfer",
        DefaultValue: "",
        BindControlName: "IsAutoTransfer",
        DataSourceMember: "IsAutoTransfer"
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
    }
]

export const AddElementList = [
    {
        type: "text",
        name: "txtStaffTransferTypeID",
        label: "mã loại hình thuyên chuyển nhân viên",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "StaffTransferTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtStaffTransferTypeName",
        label: "tên loại hình thuyên chuyển nhân viên",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "StaffTransferTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    {
        type: "checkbox",
        name: "IsAutoReview",
        label: "Có tự động duyệt",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IsAutoTransfer",
        label: "Có tự động thuyên chuyển",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        label: "Thứ tự hiển thị",
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
        label: "Kích hoạt",
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
        label: "Hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
]

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "StaffTransferTypeID",
        Width: 60
    },
    {
        Name: "StaffTransferTypeID",
        Type: "text",
        Caption: "Mã Loại yêu cầu thuyên chuyển",
        DataSourceMember: "StaffTransferTypeID",
        Width: 200
    },
    {
        Name: "StaffTransferTypeName",
        Type: "texttolink",
        Link: "/StaffTransferType/Detail/",
        Caption: "Tên Loại yêu cầu thuyên chuyển",
        DataSourceMember: "StaffTransferTypeName",
        Width: 250
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
        DataSourceMember: "StaffTransferTypeID",
        Width: 100,
        Link: "/StaffTransferType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const lstColStaffTransferType_RVLevel = [
    {
        Name: "chkSelectReviewLevelID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ReviewLevelID",
        Width: 60
    },
    {
        Name: "ReviewLevelID",
        Type: "text",
        Caption: "Mã mức duyệt",
        DataSourceMember: "ReviewLevelID",
        Width: 150
    },
    {
        Name: "ReviewLevelName",
        Type: "texttolink",
        Link: "/InventoryRequestType/ReviewLevelDetail/",
        Caption: "Tên mức duyệt",
        DataSourceMember: "ReviewLevelName",
        Width: 300
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 300
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "EditReviewLevelID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ReviewLevelID",
        Width: 100
    }

];

export const modalElementListStaffTransferType_RVLevel = [
    {
        Name: "ReviewLevelID",
        type: "text",
        label: "mã mức duyệt",
        maxSize: "9",
        DataSourceMember: "ReviewLevelID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        Name: "ReviewLevelName",
        type: "text",
        label: "tên mức duyệt",
        maxSize: "200",
        DataSourceMember: "ReviewLevelName",
        readonly: false,
        validatonList: []
    },
    {
        Name: "ReviewOrderIndex",
        type: "text",
        label: "thứ tự hiển thị",
        maxSize: "9",
        value: 0,
        DataSourceMember: "ReviewOrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        DataSourceMember: "Description",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];


export const MLObjectDefinitionStaffTransferType_RVLevel = [
    {
        Name: "ReviewLevelID",
        DefaultValue: "",
        BindControlName: "ReviewLevelID",
        DataSourceMember: "ReviewLevelID"
    },
    {
        Name: "ReviewLevelName",
        DefaultValue: "",
        BindControlName: "ReviewLevelName",
        DataSourceMember: "ReviewLevelName"
    },
    {
        Name: "DestroyRequestTypeID",
        DefaultValue: "",
        BindControlName: "DestroyRequestTypeID",
        DataSourceMember: "DestroyRequestTypeID"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "ReviewOrderIndex",
        DefaultValue: "",
        BindControlName: "ReviewOrderIndex",
        DataSourceMember: "ReviewOrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];