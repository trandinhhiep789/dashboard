import { ERPCOMMONCACHE_PARTNER, ERPCOMMONCACHE_SERVICEPRICETABLE } from "../../../../../constants/keyCache";

export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServicePriceApply/Search";
export const LoadAPIPath = "api/ServicePriceApply/Load";
export const AddAPIPath = "api/ServicePriceApply/Add";
export const UpdateAPIPath = "api/ServicePriceApply/Update";
export const DeleteAPIPath = "api/ServicePriceApply/Delete";
export const UpdateOrderAPIPath = "api/ServicePriceApply/UpdateOrder";
export const BackLink = "/ServicePriceApply";
export const AddLink = "/ServicePriceApply/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServicePriceApplyID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng giá dịch vụ áp dụng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceApply", Title: "Danh sách bảng giá dịch vụ áp dụng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceApply", Title: "Danh sách bảng giá dịch vụ áp dụng" },
    { Link: "", Title: "Thêm" }
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
        type: "select",
        name: "txtPartnerID",
        label: "đối tác",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PartnerID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_PARTNER,
        ValueMember: "PartnerID",
        NameMember: "PartnerName"
    },
    {
        type: "select",
        name: "txtServicePriceTableID",
        label: "giá dịch vụ Tận Tâm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ServicePriceTableID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SERVICEPRICETABLE,
        ValueMember: "ServicePriceTableID",
        NameMember: "ServicePriceTableName"

    },
    {
        type: "checkbox",
        name: "chkIsAnnualApply",
        label: "Áp dụng hằng năm:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAnnualApply",
        readonly: false,
        validatonList: []
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDate",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDate",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
        readonly: false,
        validatonList: ["number"]
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
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: true,
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
        name: "txtServicePriceApplyID",
        label: "mã bảng giá dịch vụ áp dụng",
        value: "",
        //maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ServicePriceApplyID",
        readonly: true,
        validatonList: []
    },
    {
        type: "select",
        name: "txtServicePriceTableID",
        label: "giá dịch vụ Tận Tâm",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ServicePriceTableID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_SERVICEPRICETABLE,
        ValueMember: "ServicePriceTableID",
        NameMember: "ServicePriceTableName"

    },
    {
        type: "checkbox",
        name: "chkIsAnnualApply",
        label: "Áp dụng hằng năm:",
        value: false,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsAnnualApply",
        readonly: false,
        validatonList: []
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDateString",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDateString",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPriorityIndex",
        label: "Thứ tự ưu tiên:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "PriorityIndex",
        readonly: false,
        validatonList: ["number"]
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
        Name: "ServicePriceApplyID",
        DefaultValue: "",
        BindControlName: "txtServicePriceApplyID",
        DataSourceMember: "ServicePriceApplyID"
    },
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "txtPartnerID",
        DataSourceMember: "PartnerID"
    },
    {
        Name: "PartnerName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "PartnerName"
    },
    {
        Name: "ServicePriceTableID",
        DefaultValue: "",
        BindControlName: "txtServicePriceTableID",
        DataSourceMember: "ServicePriceTableID"
    },
    {
        Name: "ServicePriceTableName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "ServicePriceTableName"
    },
    {
        Name: "IsAnnualApply",
        DefaultValue: "",
        BindControlName: "chkIsAnnualApply",
        DataSourceMember: "IsAnnualApply"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "PriorityIndex",
        DefaultValue: "",
        BindControlName: "txtPriorityIndex",
        DataSourceMember: "PriorityIndex"
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
        DataSourceMember: "ServicePriceApplyID",
        Width: 60
    },
    // {
    //     Name: "ServicePriceApplyID",
    //     Type: "text",
    //     Caption: "Mã bảng giá dịch vụ áp dụng",
    //     DataSourceMember: "ServicePriceApplyID",
    //     Width: 160
    // },
    {
        Name: "PartneName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartneName",
        Width: 250
    },
    {
        Name: "ServicePriceTableName",
        Type: "text",
        Caption: "Bảng giá dịch vụ Tận Tâm",
        DataSourceMember: "ServicePriceTableName",
        Width: 200
    },
    {
        Name: "ApplyFromDateString",
        Type: "text",
        Caption: "Ngày áp dụng từ",
        DataSourceMember: "ApplyFromDateString",
        Width: 150
    },
    {
        Name: "ApplyToDateString",
        Type: "text",
        Caption: "Ngày áp dụng đến",
        DataSourceMember: "ApplyToDateString",
        Width: 150
    },
    {
        Name: "IsAnnualApply",
        Type: "checkicon",
        Caption: "Áp dụng hằng năm",
        DataSourceMember: "IsAnnualApply",
        Width: 150
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
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "ServicePriceApplyID",
        Width: 80,
        Link: "/ServicePriceApply/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
