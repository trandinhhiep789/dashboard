export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/PartnerPayable/Search";
export const AddAPIPath = "api/PartnerPayable/Add";
export const UpdateDeleteAPIPath = "api/PartnerPayable/UpdateDelete";
export const DeleteAPIPath = "api/PartnerPayable/Delete";
export const UpdateOrderAPIPath = "api/PartnerPayable/UpdateOrder";
export const BackLink = "/PartnerPayable";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerID";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày" }
];

export const InitSearchParams = [
    {
        SearchKey: "@MONTH",
        SearchValue: new Date()
    },
    {
        SearchKey: "@PARTNERID",
        SearchValue: -1
    },

  
]

export const SearchElementList = [
    {
        type: "MonthPicker",
        name: "dtPayableDate",
        DataSourceMember: "PayableDate",
        label: "Tháng",
        value: "",
        format: "MM-YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbPartnerID",
        DataSourceMember: "PartnerID",
        label: "Đối tác",
        colspan: 3,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName",
        filterValue: 1,
        filterobj: "PartnerTypeID",

    },

]
export const SearchMLObjectDefinition = [

    {
        Name: "PayableDate",
        DefaultValue: "",
        BindControlName: "dtPayableDate"
    },

    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "cbPartnerID"
    },
]

export const DataGridColumnList = [

    // {
    //     Name: "PartnerName",
    //     Type: "texttolink",
    //     Caption: "Đối tác",
    //     DataSourceMember: "PartnerName",
    //     Link: "/PartnerPayable/Detail/",
    //     Width: 300
    // },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        Width: 300
    },
    {
        Name: "PayableAmount",
        Type: "text",
        Caption: "Số tiền trả",
        DataSourceMember: "PayableAmount",
        Width: 300
    },
   
];