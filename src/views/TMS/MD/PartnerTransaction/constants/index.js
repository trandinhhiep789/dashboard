export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PartnerTransaction/Search";
export const LoadAPIPath = "api/PartnerTransaction/Load";
export const AddAPIPath = "api/PartnerTransaction/Add";
export const UpdateAPIPath = "api/PartnerTransaction/Update";
export const DeleteAPIPath = "api/PartnerTransaction/Delete";
export const UpdateOrderAPIPath = "api/PartnerTransaction/UpdateOrder";
export const BackLink = "/PartnerTransaction";
export const AddLink = "/PartnerTransaction/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PartnerTransactionID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Thông tin giao dịch với đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerTransaction", Title: "Thông tin giao dịch với đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PartnerTransaction", Title: "Thông tin giao dịch với đối tác" },
    { Link: "", Title: "Thêm" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@FromDate",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@ToDate",
        SearchValue: new Date()
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
    },
    {
        type: "date",
        name: "dtFromDate",
        label: "Từ ngày",
        value: dtFromdate,
        placeholder: "",
        icon: "",
        DataSourceMember: "FromDate",
        ValueMember: "FromDate",
        NameMember: "FromDate"
    },
    {
        type: "date",
        name: "dtToDate",
        label: "Đến ngày",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "ToDate",
        ValueMember: "ToDate",
        NameMember: "ToDate"
    }
    // {
    //     type: "select",
    //     name: "slAttributeCategoryTypeID",
    //     label: "Loại danh mục",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "AttributeCategoryTypeID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: PIMCACHE_PIMATTRIBUTECATEGORYTYPE,
    //     ValueMember: "AttributeCategoryTypeID",
    //     NameMember: "AttributeCategoryTypeName"
    // }

];


export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    // {
    //     Name: "AttributeCategoryTypeID",
    //     DefaultValue: -1,
    //     BindControlName: "slAttributeCategoryTypeID"
    // }
];



export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PartnerTransactionID",
        Width: 60
    },
    {
        Name: "PartnerTransactionTypeID",
        Type: "text",
        Caption: "Loại giao dịch",
        DataSourceMember: "PartnerTransactionTypeID",
        Width: 160
    },
    {
        Name: "PartnerTransactionDate",
        Type: "text",
        Caption: "Ngày giao dịch",
        DataSourceMember: "PartnerTransactionDate",
        Width: 250
    },
    {
        Name: "PartnerID",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerID",
        Width: 200
    },
    {
        Name: "RequestTime",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestTime",
        Width: 200
    },
    {
        Name: "RequestURL",
        Type: "text",
        Caption: "Địa chỉ URL yêu cầu",
        DataSourceMember: "RequestURL",
        Width: 200
    },
    {
        Name: "IsResponse",
        Type: "checkicon",
        Caption: "Đã phản hồi",
        DataSourceMember: "IsResponse",
        Width: 80
    },
    {
        Name: "ResponseTime",
        Type: "date",
        Caption: "Thời gian phản hồi",
        DataSourceMember: "ResponseTime",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PartnerTransactionID",
        Width: 80,
        Link: "/PartnerTransaction/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
