export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/QualityAssessGroup/Search";
export const LoadAPIPath = "api/QualityAssessGroup/Load";
export const AddAPIPath = "api/QualityAssessGroup/Add";
export const UpdateAPIPath = "api/QualityAssessGroup/Update";
export const DeleteAPIPath = "api/QualityAssessGroup/Delete";
export const UpdateOrderAPIPath = "api/QualityAssessGroup/UpdateOrder";
export const BackLink = "/QualityAssessGroup";
export const AddLink = "/QualityAssessGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "QualityAssessGroupID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/QualityAssessGroup", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/QualityAssessGroup", Title: "Danh sách nhóm tiêu chí đánh giá chất lượng" },
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
        name: "txtQualityAssessGroupID",
        label: "mã nhóm",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessGroupID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtQualityAssessGroupName",
        label: "tên nhóm",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessGroupName",
        readonly: false,
        validatonList: ["required"],
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
        name: "txtQualityAssessGroupID",
        label: "mã nhóm",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessGroupID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtQualityAssessGroupName",
        label: "tên nhóm",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "QualityAssessGroupName",
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
        Name: "QualityAssessGroupID",
        DefaultValue: "",
        BindControlName: "txtQualityAssessGroupID",
        DataSourceMember: "QualityAssessGroupID"
    },
    {
        Name: "QualityAssessGroupName",
        DefaultValue: "",
        BindControlName: "txtQualityAssessGroupName",
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
        DataSourceMember: "QualityAssessGroupID",
        Width: 60
    },
    {
        Name: "QualityAssessGroupID",
        Type: "text",
        Caption: "Mã nhóm tiêu chí",
        DataSourceMember: "QualityAssessGroupID",
        Width: 150
    },
    {
        Name: "QualityAssessGroupName",
        Type: "text",
        Caption: "Tên nhóm tiêu chí",
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
        DataSourceMember: "QualityAssessGroupID",
        Width: 100,
        Link: "/QualityAssessGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
