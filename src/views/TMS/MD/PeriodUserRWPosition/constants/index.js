export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PeriodUserRWPosition/Search";
export const LoadAPIPath = "api/PeriodUserRWPosition/Load";
export const AddAPIPath = "api/PeriodUserRWPosition/Add";
export const AutoAddAPIPath = "api/PeriodUserRWPosition/AutoAdd";
export const AddByFileAPIPath = "api/PeriodUserRWPosition/AddByFile";
export const UpdateAPIPath = "api/PeriodUserRWPosition/Update";
export const DeleteAPIPath = "api/PeriodUserRWPosition/Delete";
export const UpdateOrderAPIPath = "api/PeriodUserRWPosition/UpdateOrder";
export const BackLink = "/PeriodUserRWPosition";
export const AddLink = "/PeriodUserRWPosition/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PeriodUserRWPositionID";
export const InitSearchParams = 
[
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 100
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 0
    }
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách vị trí thưởng theo khoảng thời gian" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PeriodUserRWPosition", Title: "Danh sách vị trí thưởng theo khoảng thời gian" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PeriodUserRWPosition", Title: "Danh sách vị trí thưởng theo khoảng thời gian" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PeriodUserRWPosition", Title: "Danh sách vị trí thưởng theo khoảng thời gian" },
    { Link: "", Title: "Chi tiết" }
];

const dtdateto = new Date()
dtdateto.setDate(new Date().getDate() + 1);

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
        type: "date",
        name: "RewardDateFrom",
        label: "ngày tính thưởng (từ ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        readonly: true,
        DataSourceMember: "RewardDateFrom",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "RewardDateTo",
        label: "ngày tính thưởng (đến ngày)",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "RewardDateFrom",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "1000",
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
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: false,
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
        value: false,
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
        name: "txtPeriodUserRWPositionID",
        label: "mã vị trí thưởng theo khoảng thời gian",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PeriodUserRWPositionID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "RewardDate",
        label: "ngày tính thưởng",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "RewardDateString",
        validatonList: ["required"]
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
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
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
        Name: "PeriodUserRWPositionID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "PeriodUserRWPositionID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "RewardPositionID",
        DefaultValue: "",
        BindControlName: "RewardPositionID",
        DataSourceMember: "RewardPositionID"
    },
    {
        Name: "ApplyFromDate",
        DefaultValue: "",
        BindControlName: "ApplyFromDate",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "ApplyToDate",
        DefaultValue: "",
        BindControlName: "ApplyToDate",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "ApplyFromDateString",
        DefaultValue: "",
        BindControlName: "ApplyFromDateString",
        DataSourceMember: "ApplyFromDateString"
    },
    {
        Name: "ApplyToDateString",
        DefaultValue: "",
        BindControlName: "ApplyToDateString",
        DataSourceMember: "ApplyToDateString"
    },
    // {
    //     Name: "Description",
    //     DefaultValue: "",
    //     BindControlName: "txtDescription",
    //     DataSourceMember: "Description"
    // },
    // {
    //     Name: "PriorityIndex",
    //     DefaultValue: "",
    //     BindControlName: "txtPriorityIndex",
    //     DataSourceMember: "PriorityIndex"
    // },
    {
        Name: "IsActived",
        DefaultValue: false,
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
        DataSourceMember: "PeriodUserRWPositionID",
        Width: 60
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Người dùng",
        DataSourceMember: "UserName",
        Width: 160
    },
    {
        Name: "RewardPositionName",
        Type: "text",
        Caption: "Vị trí thưởng",
        DataSourceMember: "RewardPositionName",
        Width: 160
    },
    {
        Name: "ApplyFromDate",
        Type: "date",
        Caption: "Áp dụng từ ngày",
        DataSourceMember: "ApplyFromDate",
        Width: 160
    },
    {
        Name: "ApplyToDate",
        Type: "date",
        Caption: "Áp dụng đến ngày",
        DataSourceMember: "ApplyToDate",
        Width: 160
    },

    // {
    //     Name: "RewardDate",
    //     //Type: "date",
    //     Type: "texttolink",
    //     Link: "/PeriodUserRWPosition/Detail/",
    //     Caption: "Ngày tính thưởng",
    //     DataSourceMember: "RewardDateString",
    //     Width: 110
    // },
    // {
    //     Name: "PeriodUserRWPositionID",
    //     Type: "texttolink",
    //     Link: "/PeriodUserRWPosition/Detail/",
    //     Caption: "Mã vị trí thưởng theo khoảng thời gian",
    //     DataSourceMember: "PeriodUserRWPositionID",
    //     Width: 150
    // },
    // {
    //     Name: "RewardDate",
    //     //Type: "date",
    //     Type: "texttolink",
    //     Link: "/PeriodUserRWPosition/Detail/",
    //     Caption: "Ngày tính thưởng",
    //     DataSourceMember: "RewardDateString",
    //     Width: 110
    // },
    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 160
    // },
    // {
    //     Name: "IsAutoAdd",
    //     Type: "checkicon",
    //     Caption: "Lịch tự động thêm",
    //     DataSourceMember: "IsAutoAdd",
    //     Width: 120
    // },
    // {
    //     Name: "IsCompletedCompute",
    //     Type: "checkicon",
    //     Caption: "Kết thúc tính thưởng",
    //     DataSourceMember: "IsCompletedCompute",
    //     Width: 120
    // },
    // {
    //     Name: "ComputeInterval",
    //     Type: "text",
    //     Caption: "Thời gian tính(mili giây)",
    //     DataSourceMember: "ComputeInterval",
    //     Width: 150
    // },
    // {
    //     Name: "IsComputeError",
    //     Type: "checkicon",
    //     Caption: "Lỗi tính thưởng",
    //     DataSourceMember: "IsComputeError",
    //     Width: 100
    // },
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
        Type: "datetime",
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
        DataSourceMember: "PeriodUserRWPositionID",
        Width: 80,
        Link: "/PeriodUserRWPosition/Edit/",
        LinkText: "Chỉnh sửa"
    }
];



export const schema = {
    'Mã người dùng': {
        prop: 'UserName',
        type: String,
        required: true
    },
    'Mã vị trí thưởng': {
        prop: 'RewardPositionID',
        type: Number
    },
    'Áp dụng từ ngày': {
        prop: 'ApplyFromDate',
        type: Date,
        required: true
    },
    'Áp dụng đến ngày': {
        prop: 'ApplyToDate',
        type: Date,
        required: true
    },
    'Kích hoạt': {
        prop: 'IsActived',
        type: Number
    },
    'Hệ thống': {
        prop: 'IsSystem',
        type: Number
    },
}

export const DataTemplateExport = [
    {
        "Mã người dùng": '98138',
        "Mã vị trí thưởng": 1,
        "Áp dụng từ ngày": new Date(2021, 7, 20),
        "Áp dụng đến ngày": new Date(2021, 7, 25),
        "Kích hoạt": 1,
        "Hệ thống": 0
    }
];
