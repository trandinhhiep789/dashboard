export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AdvanceRequest/Search";
export const LoadAPIPath = "api/AdvanceRequest/Load";
export const AddAPIPath = "api/AdvanceRequest/InsertAdvanceRequest";
export const UpdateAPIPath = "api/AdvanceRequest/Update";
export const DeleteAPIPath = "api/AdvanceRequest/Delete";
export const GetAdvanceRequestAPIPath = "api/AdvanceRequest/GetAdvanceRequest";
export const BackLink = "/AdvanceRequest";

export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AdvanceRequestID";
export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách yêu cầu tạm ứng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AdvanceRequest", Title: "Danh sách Yêu cầu tạm ứng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AdvanceRequest", Title: "Danh sách Yêu cầu tạm ứng" },
    { Link: "", Title: "Thêm tạm ứng" }
];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 1);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@AdvanceRequestTypeID",
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
        type: "select",
        name: "slAdvanceRequestTypeID",
        label: "Loại yêu cầu tạm ứng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AdvanceRequestTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.ADVANCEREQUESTTYPE",
        ValueMember: "AdvanceRequestTypeID",
        NameMember: "AdvanceRequestTypeName"
    },
    // {
    //     type: "select",
    //     name: "slPartnerID",
    //     label: "Đối tác",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
    //     ValueMember: "PartnerID",
    //     NameMember: "PartnerName"
    // },
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
];


export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "AdvanceRequestTypeID",
        DefaultValue: -1,
        BindControlName: "slAdvanceRequestTypeID"
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



export const DataGridColumnList = [
    {
        Name: "AdvanceRequestID",
        Type: "texttolink",
        Caption: "Mã yêu cầu tạm ứng",
        Link: "/AdvanceRequest/Edit/",
        DataSourceMember: "AdvanceRequestID",
        Width: 150
    },
    {
        Name: "AdvanceRequestTypeName",
        Type: "text",
        Caption: "Loại yêu cầu tạm ứng",
        DataSourceMember: "AdvanceRequestTypeName",
        Width: 150
    },
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã yêu cầu vận chuyển",
        DataSourceMember: "ShipmentOrderID",
        Width: 150
    },
    {
        Name: "RequestUserName",
        Type: "text",
        Caption: "Người yêu cầu",
        DataSourceMember: "RequestUserName",
        Width: 150
    },
    {
        Name: "RequestDate",
        Type: "date",
        Caption: "Ngày yêu cầu",
        DataSourceMember: "RequestDate",
        Width: 150
    },
    // {
    //     Name: "IsResponse",
    //     Type: "checkicon",
    //     Caption: "Đã phản hồi",
    //     DataSourceMember: "IsResponse",
    //     Width: 120
    // },
];


export const MLObjectDefinition = [
    {
        Name: "ReceiverStoreID",
        DefaultValue: -1,
        BindControlName: "txtReceiverStoreID"
    },
    {
        Name: "AdvanceRequestTypeID",
        DefaultValue: -1,
        BindControlName: "txtAdvanceRequestTypeID"
    },
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID"
    },
    {
        Name: "AdvanceRequestTitle",
        DefaultValue: "",
        BindControlName: "txtAdvanceRequestTitle"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "chkIsSystem"
    },
    {
        Name: "AdvanceRequestDetailList",
        DefaultValue: {},
        BindControlName: "AdvanceRequestDetailList",
        DataSourceMember: "AdvanceRequestDetailList"
    }

];
