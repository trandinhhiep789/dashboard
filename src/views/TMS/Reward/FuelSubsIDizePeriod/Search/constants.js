export const APIHostName = "TMSAPI";
export const APISearch = "api/FuelSubsIDizePeriod/Search";
export const APIDeleteList = "api/FuelSubsIDizePeriod/DeleteList";
export const APIExportFile = "api/FuelSubsIDizePeriod/ExportFile";
export const APIInsertList = "api/FuelSubsIDizePeriod/InsertList";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách khoảng thời gian nhân viên được phụ cấp xăng" }
];

export const DataTemplateExport = [
    {
        "Nhân viên": "Mã nhân viên được phụ cấp xăng",
        "Từ ngày": "MM/DD/YYYY",
        "Đến ngày": "MM/DD/YYYY",
        "Ghi chú": "Ghi chú"
    }
];

export const schema = {
    "Nhân viên": {
        prop: 'UserName',
        type: Number
    },
    "Từ ngày": {
        prop: 'FromDate',
        type: Date
    },
    "Đến ngày": {
        prop: 'ToDate',
        type: Date
    },
    "Ghi chú": {
        prop: 'Note',
        type: String,
    },
}

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 30);

export const initSearchArgument = [
    {
        SearchKey: "@USERNAME",
        SearchValue: -1
    },
    {
        SearchKey: "@FROMDATE",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@TODATE",
        SearchValue: new Date()
    },
    {
        SearchKey: "@PAGENUMBER",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    }
];

export const listelement = [
    {
        type: "MultiSelectUser",
        name: "cbUserName",
        DataSourceMember: "UserName",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 3,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        isClearable: true
    },
    {
        type: "Datetime",
        name: "dtFromDate",
        DataSourceMember: "FromDate",
        label: "Từ ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        utc: true
    },
    {
        type: "Datetime",
        name: "dtToDate",
        DataSourceMember: "ToDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
        utc: true
    }
];

export const MLObjectDefinition = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    }
];

export const listColumn = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "FuelSubsidizePeriodID",
        Width: 60
    },
    {
        Name: "UserIDName",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "UserIDName",
        Width: 200
    },
    {
        Name: "FromDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "FromDate",
        Width: 200
    },
    {
        Name: "ToDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "ToDate",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "FuelSubsidizePeriodID",
        Width: 100,
        Link: "/FuelSubsIDizePeriod/Edit/",
        LinkText: "Chỉnh sửa"
    }
]

export const lstColImportExcelModal = [
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên",
        DataSourceMember: "UserName"
    },
    {
        Name: "FromDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "FromDate"
    },
    {
        Name: "ToDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "ToDate"
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note"
    },
    {
        Name: "MessageError",
        Type: "text",
        Caption: "Nội dung lỗi",
        DataSourceMember: "MessageError"
    }
]