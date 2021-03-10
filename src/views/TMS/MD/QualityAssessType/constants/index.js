export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/QualityAssessType/Search";
export const LoadAPIPath = "api/QualityAssessType/Load";
export const AddAPIPath = "api/QualityAssessType/Add";
export const UpdateAPIPath = "api/QualityAssessType/Update";
export const DeleteAPIPath = "api/QualityAssessType/Delete";
export const UpdateOrderAPIPath = "api/QualityAssessType/UpdateOrder";
export const BackLink = "/QualityAssessType";
export const AddLink = "/QualityAssessType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "QualityAssessTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại tiêu chí đánh giá chất lượng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/QualityAssessType", Title: "Danh sách loại tiêu chí đánh giá chất lượng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/QualityAssessType", Title: "Danh sách loại tiêu chí đánh giá chất lượng" },
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
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "PIMCACHE.CATEGORYTYPE",
        ValueMember: "CategoryTypeID",
        NameMember: "CategoryTypeName"

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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const MLObjectDefinition = [
    {
        Name: "QualityAssessTypeID",
        DefaultValue: "",
        BindControlName: "txtQualityAssessTypeID",
        DataSourceMember: "QualityAssessTypeID"
    },
    {
        Name: "QualityAssessTypeName",
        DefaultValue: "",
        BindControlName: "txtQualityAssessTypeName",
        DataSourceMember: "QualityAssessTypeName"
    },
    {
        Name: "QualityAssessGroupID",
        DefaultValue: "",
        BindControlName: "txtQualityAssessGroupID",
        DataSourceMember: "QualityAssessGroupID"
    },
    {
        Name: "QualityAssessGroupName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "QualityAssessGroupName"
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
        DataSourceMember: "QualityAssessTypeID",
        Width: 60
    },
    {
        Name: "QualityAssessTypeID",
        Type: "text",
        Caption: "Mã loại tiêu chí",
        DataSourceMember: "QualityAssessTypeID",
        Width: 150
    },
    {
        Name: "QualityAssessTypeName",
        Type: "text",
        Caption: "Tên loại tiêu chí",
        DataSourceMember: "QualityAssessTypeName",
        Width: 200
    },
    {
        Name: "QualityAssessGroupName",
        Type: "text",
        Caption: "Nhóm tiêu chí",
        DataSourceMember: "QualityAssessGroupName",
        Width: 200
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
        DataSourceMember: "QualityAssessTypeID",
        Width: 100,
        Link: "/QualityAssessType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
