export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/ServiceAgreement/Search";
export const LoadAPIPath = "api/ServiceAgreement/Load";
export const AddAPIPath = "api/ServiceAgreement/Add";
export const UpdateAPIPath = "api/ServiceAgreement/Update";
export const DeleteAPIPath = "api/ServiceAgreement/Delete";
export const UpdateOrderAPIPath = "api/ServiceAgreement/UpdateOrder";
export const BackLink = "/ServiceAgreement";
export const AddLink = "/ServiceAgreement/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServiceAgreementID";

export const TitleFormSearch = "Tìm kiếm danh sách hợp đồng";
export const TitleFormAdd = "Thêm hợp đồng";

export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 30);

export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Danh sách hợp đồng dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "", Title: "Sửa" }
];
export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "", Title: "Chi tiết" }
];


export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ServiceAgreementID",
        Width: 60
    },
    {
        Name: "ServiceAgreementID",
        Type: "texttolink",
        Caption: "Mã hợp đồng",
        DataSourceMember: "ServiceAgreementID",
        Link: "/ServiceAgreement/Detail/",
        Width: 140
    },
    {
        Name: "PartnerID",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerID",
        Width: 230
    },
    {
        Name: "ServiceTypeID",
        Type: "text",
        Caption: "Loại dịch vụ",
        DataSourceMember: "ServiceTypeID",
        Width: 140
    },
    {
        Name: "ServiceAreaID",
        Type: "text",
        Caption: "Khu vực",
        DataSourceMember: "ServiceAreaID",
        Width: 100
    },
    {
        Name: "SignedDate",
        Type: "date",
        Caption: "Ngày ký hợp đồng",
        DataSourceMember: "SignedDate",
        Width: 150
    },
    {
        Name: "ExpiredDate",
        Type: "date",
        Caption: "Ngày hết hạn hợp đồng",
        DataSourceMember: "ExpiredDate",
        Width: 170
    },
    {
        Name: "IsExtended",
        Type: "text",
        Caption: "Đã gia hạn hợp đồng",
        DataSourceMember: "IsExtended",
        Width: 150
    },
    // {
    //     Name: "ShipmentOrderStatusName",
    //     Type: "text",
    //     Caption: "Trạng thái",
    //     DataSourceMember: "ShipmentOrderStatusName",
    //     Width: 150
    // },
    {
        Name: "Action",
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceAgreementID",
        Width: 70,
        Link: "/ServiceAgreement/Edit/",
        LinkText: "Chỉnh sửa"
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "RequestPartnerID",
        DefaultValue: "",
        BindControlName: "cbRequestPartnerID"
    },
    {
        Name: "CreatedOrderTimeFo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeFo"
    },
    {
        Name: "CreatedOrderTimeTo",
        DefaultValue: "",
        BindControlName: "dtCreatedOrderTimeTo"
    },
    {
        Name: "ReceiverProvinceID",
        DefaultValue: "",
        BindControlName: "cbReceiverProvinceID"
    },
    {
        Name: "ReceiverDistrictID",
        DefaultValue: "",
        BindControlName: "cbReceiverDistrictID"
    },
    {
        Name: "SenderStoreID",
        DefaultValue: "",
        BindControlName: "cbSenderStoreID"
    },
    {
        Name: "ShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "cbShipmentOrderStatusID"
    }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Mã hợp đồng",
        value: "",
        colspan: 2,
        placeholder: "Mã hợp đồng",
        icon: ""
    },
    {
        type: "ComboBox",
        name: "cbServiceTypeID",
        DataSourceMember: "ServiceTypeID",
        label: "Loại dịch vụ",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

    },
    {
        type: "ComboBox",
        name: "cbServiceAreaID",
        DataSourceMember: "ServiceAreaID",
        label: "Khu vực",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

    },
    {
        type: "Datetime",
        name: "dtSignedDate",
        DataSourceMember: "SignedDate",
        label: "Từ ngày",
        value: dtFromdate,
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "Datetime",
        name: "dtExpiredDate",
        DataSourceMember: "ExpiredDate",
        label: "Đến ngày",
        value: new Date(),
        timeFormat: false,
        dateFormat: "DD/MM/YYYY",
        colspan: 2,
    },
    {
        type: "ComboBox",
        name: "cbServiceAreaID",
        DataSourceMember: "ServiceAreaID",
        label: "Trạng thái",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "PartnerID",
        NameMember: "PartnerName"

    },
];

export const AddElementList = [
    {
        type: "text",
        name: "txtServiceAgreementID",
        label: "mã hợp đồng",
        value: "",
        maxSize: "180",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ServiceAgreementID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "select",
        name: "txtServiceTypeID",
        label: "loại hợp đồng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ServiceTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: false,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.PARTNER",
        ValueMember: "ServiceTypeID",
        NameMember: "ServiceTypeName"
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "mô tả",
        value: "",
        maxSize: "1900",
        placeholder: "",
        rows: "6",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "kích hoạt",
        value: true,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsActived",
        listoption: [],
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "hệ thống",
        value: false,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsSystem",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const MLObjectDefinition = [
    {
        Name: "ServiceAgreementID",
        DefaultValue: "",
        BindControlName: "txtServiceAgreementID",
        DataSourceMember: "ServiceAgreementID"
    },
    
    {
        Name: "ServiceAgreementTypeID",
        DefaultValue: "",
        BindControlName: "txtServiceAgreementTypeID",
        DataSourceMember: "ServiceAgreementTypeID"
    },
    
    {
        Name: "ServiceTypeID",
        DefaultValue: "",
        BindControlName: "txtServiceTypeID",
        DataSourceMember: "ServiceTypeID"
    },
   
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    
    {
        Name: "ServiceAreaID",
        DefaultValue: "",
        BindControlName: "txtServiceAreaID",
        DataSourceMember: "ServiceAreaID"
    },
    
    {
        Name: "DeputyUserName",
        DefaultValue: "",
        BindControlName: "txtDeputyUserName",
        DataSourceMember: "DeputyUserName"
    },
    
    {
        Name: "SignedDate",
        DefaultValue: "",
        BindControlName: "dtSignedDate",
        DataSourceMember: "SignedDate"
    },
   
    {
        Name: "ExpiredDate",
        DefaultValue: "",
        BindControlName: "dtExpiredDate",
        DataSourceMember: "ExpiredDate"
    },
    
    {
        Name: "IsExtended",
        DefaultValue: "",
        BindControlName: "chkIsExtended",
        DataSourceMember: "IsExtended"
    },
   
    {
        Name: "ExtendedDate",
        DefaultValue: "",
        BindControlName: "dtExtendedDate",
        DataSourceMember: "ExtendedDate"
    },
   
    {
        Name: "IsLiquidated",
        DefaultValue: "",
        BindControlName: "chkIsLiquidated",
        DataSourceMember: "IsLiquidated"
    },
    
    {
        Name: "Liquidateddate",
        DefaultValue: "",
        BindControlName: "dtLiquidateddate",
        DataSourceMember: "Liquidateddate"
    },
   
    {
        Name: "IsDeposited",
        DefaultValue: "",
        BindControlName: "chkIsDeposited",
        DataSourceMember: "IsDeposited"
    },
   
    {
        Name: "DepositMoney",
        DefaultValue: "",
        BindControlName: "txtDepositMoney",
        DataSourceMember: "DepositMoney"
    },
   
    {
        Name: "DepositedDate",
        DefaultValue: "",
        BindControlName: "dtDepositedDate",
        DataSourceMember: "DepositedDate"
    },
   
    {
        Name: "DepositNote",
        DefaultValue: "",
        BindControlName: "txtDepositNote",
        DataSourceMember: "DepositNote"
    },
    
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
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
 
];