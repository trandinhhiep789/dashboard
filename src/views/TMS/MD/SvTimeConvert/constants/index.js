export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/SvTimeConvert/Search";
export const LoadAPIPath = "api/SvTimeConvert/Load";
export const AddAPIPath = "api/SvTimeConvert/Add";
export const UpdateAPIPath = "api/SvTimeConvert/Update";
export const DeleteAPIPath = "api/SvTimeConvert/Delete";
export const UpdateOrderAPIPath = "api/SvTimeConvert/UpdateOrder";
export const BackLink = "/SvTimeConvert";
export const AddLink = "/SvTimeConvert/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SvTimeConvertID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng chuyển đổi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvTimeConvert", Title: "Danh sách bảng chuyển đổi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvTimeConvert", Title: "Danh sách bảng chuyển đổi" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SvTimeConvert", Title: "Danh sách bảng chuyển đổi" },
    { Link: "", Title: "Chi tiết bảng chuyển đổi" }
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
        name: "txtSvTimeConvertID",
        label: "mã bảng chuyển đổi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SvTimeConvertID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtSvTimeConvertName",
        label: "tên bảng chuyển đổi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SvTimeConvertName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtBaseServiceTimeLong",
        label: "thời gian cơ sở(tính bằng phút)",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BaseServiceTimeLong",
        readonly: false,
        validatonList: ["required", "number"]
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
        name: "txtSvTimeConvertID",
        label: "mã bảng chuyển đổi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SvTimeConvertID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtSvTimeConvertName",
        label: "tên bảng chuyển đổi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SvTimeConvertName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtBaseServiceTimeLong",
        label: "thời gian cơ sở(tính bằng phút)",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "BaseServiceTimeLong",
        readonly: false,
        validatonList: ["required", "number"]
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
        Name: "SvTimeConvertID",
        DefaultValue: "",
        BindControlName: "txtSvTimeConvertID",
        DataSourceMember: "SvTimeConvertID"
    },
    {
        Name: "SvTimeConvertName",
        DefaultValue: "",
        BindControlName: "txtSvTimeConvertName",
        DataSourceMember: "SvTimeConvertName"
    },
    {
        Name: "BaseServiceTimeLong",
        DefaultValue: "",
        BindControlName: "txtBaseServiceTimeLong",
        DataSourceMember: "BaseServiceTimeLong"
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
        DataSourceMember: "SvTimeConvertID",
        Width: 60
    },
    {
        Name: "SvTimeConvertID",
        Type: "text",
        Caption: "Mã bảng chuyển đổi",
        DataSourceMember: "SvTimeConvertID",
        Width: 150
    },
    {
        Name: "SvTimeConvertName",
        Type: "texttolink",
        Link: "/SvTimeConvert/Detail/",
        Caption: "Tên bảng chuyển đổi",
        DataSourceMember: "SvTimeConvertName",
        Width: 200
    },
    {
        Name: "BaseServiceTimeLong",
        Type: "text",
        Caption: "Thời gian cơ sở(tính bằng phút)",
        DataSourceMember: "BaseServiceTimeLong",
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
        DataSourceMember: "SvTimeConvertID",
        Width: 100,
        Link: "/SvTimeConvert/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
