export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/WorkingShift_TimeFrame/Search";
export const LoadAPIPath = "api/WorkingShift_TimeFrame/Load";
export const AddAPIPath = "api/WorkingShift_TimeFrame/Add";
export const UpdateAPIPath = "api/WorkingShift_TimeFrame/Update";
export const DeleteAPIPath = "api/WorkingShift_TimeFrame/Delete";
export const BackLink = "/WorkingShiftTimeFrame";
export const AddLink = "/WorkingShiftTimeFrame/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "WorkingShiftTimeFrameID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách các khung giờ của một ca làm việc" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingShiftTimeFrame", Title: "Danh sách các khung giờ của một ca làm việc" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/WorkingShiftTimeFrame", Title: "Danh sách các khung giờ của một ca làm việc" },
    { Link: "", Title: "Thêm" }
];

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
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

export const MLObjectDefinition = [
    {
        Name: "WorkingShiftID",
        DefaultValue: {},
        BindControlName: "cbWorkingShift",
        DataSourceMember: "WorkingShiftID"
    },
    {
        Name: "DeliveryTimeFrameID",
        DefaultValue: {},
        BindControlName: "cbDeliveryTimeFrame",
        DataSourceMember: "DeliveryTimeFrameID"
    },
    {
        Name: "Note",
        DefaultValue: {},
        BindControlName: "txtNote",
        DataSourceMember: "Note"
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

]



export const DataGridColumnList=[
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "WorkingShiftTimeFrameID",
        Width: 60
    },
    {
        Name: "WorkingShiftName",
        Type: "text",
        Caption: "Ca làm việc",
        DataSourceMember: "WorkingShiftName",
        Width: 250
    },
    {
        Name: "DeliveryTimeFrameName",
        Type: "text",
        Caption: "khung giờ",
        DataSourceMember: "DeliveryTimeFrameName",
        Width: 250
    },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 250
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhập",
        DataSourceMember: "UpdatedUserFullName",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "WorkingShiftTimeFrameID",
        Width: 100,
        Link: "/WorkingShiftTimeFrame/Edit/",
        LinkText: "Chỉnh sửa"
    },
]