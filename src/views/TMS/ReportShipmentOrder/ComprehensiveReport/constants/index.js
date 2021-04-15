export const APIHostName = "TMSAPI";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Báo cáo tổng hợp" }
];

export const ListColumnGrid = [
    {
        Name: "User",
        Type: "text",
        Caption: "User",
        DataSourceMember: "User",
        Width: 100
    },
    {
        Name: "Quantity",
        Type: "text",
        Caption: "Số lượng tồn ống đồng (m)",
        DataSourceMember: "Quantity",
        Width: 100
    },
    {
        Name: "Costs",
        Type: "text",
        Caption: "Vật tư (tổng VND)",
        DataSourceMember: "Costs",
        Width: 100
    },
]

export const SearchMLObjectDefinition = [
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "bcFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "bcToDate"
    },
    {
        Name: "Area",
        DefaultValue: "",
        BindControlName: "bcArea"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "bcUserName"
    }
]

export const SearchElementList = [
    {
        type: "Datetime",
        name: "bcFromDate",
        DataSourceMember: "FromDate",
        label: "Từ Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "bcToDate",
        DataSourceMember: "ToDate",
        label: "Đến Ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "bcArea",
        DataSourceMember: "Area",
        label: "Khu vực",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Chọn khu vực---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        // LoadItemCacheKeyID: "",
        // ValueMember: "",
        // NameMember: "",
        classNameCol: "col-custom"
    },
    {
        type: "ComboBox",
        name: "bcUserName",
        DataSourceMember: "UserName",
        label: "Trưởng nhóm",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Chọn trưởng nhóm---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        // LoadItemCacheKeyID: "",
        // ValueMember: "",
        // NameMember: "",
        classNameCol: "col-custom"
    },
]