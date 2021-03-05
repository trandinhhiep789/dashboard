export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/CurrentAdvanceDebt/GetListByUser";
export const SearchExportAPIPath = "api/CurrentAdvanceDebt/ExportByUser";
export const SearchHistoryAPIPath = "api/AdvanceDebtFlow/GetListHistory";



export const TitleFormSearch = ""

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông kê hạn mức tạm ứng" }
];

export const SearchMLObjectDefinition = [
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "cbUserName"
    }
]

export const SearchElementList = [

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
        isMultiSelect: false
    },

];


export const DataGridColumnList = [

    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 150
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Tên nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "DetailtNew",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 180
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 180
    },
    {
        Name: "TotalQuantity",
        Type: "text",
        Caption: "Tổng số lượng",
        DataSourceMember: "TotalQuantity",
        Width: 100
    }
];

export const DataGridHistoryColumnList = [

    {
        Name: "AdvanceDebtFlowTypeName",
        Type: "text",
        Caption: "Loại tạm ứng",
        DataSourceMember: "AdvanceDebtFlowTypeName",
        Width: 100
    },

    {
        Name: "FlowContent",
        Type: "hyperlink",
        Caption: "Nội dung",
        DataSourceMember: "FlowContent",
        Width: 250,
        Hyperlinks: {
            AREdit: "AdvanceRequest/Edit",
            SODetail: "ShipmentOrder/Detail"
        }
    },

    {
        Name: "OldTotalQuantity",
        Type: "text",
        Caption: "Tổng cũ",
        DataSourceMember: "OldTotalQuantity",
        Width: 100
    },
    {
        Name: "NewTotalQuantity",
        Type: "text",
        Caption: "Tổng mới",
        DataSourceMember: "NewTotalQuantity",
        Width: 100
    },
    // {
    //     Name: "OldUsAbleQuantity",
    //     Type: "text",
    //     Caption: "Sô lượng sử dụng cũ",
    //     DataSourceMember: "OldUsAbleQuantity",
    //     Width: 150
    // },
    // {
    //     Name: "NewUsAbleQuantity",
    //     Type: "text",
    //     Caption: "Sô lượng sử dụng mới",
    //     DataSourceMember: "NewUsAbleQuantity",
    //     Width: 150
    // },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày thay đổi",
        DataSourceMember: "CreatedDate",
        Width: 150
    },

];
