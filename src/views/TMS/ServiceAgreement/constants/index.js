export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServiceAgreement/Search";
export const LoadAPIPath = "api/ServiceAgreement/Load";
export const LoadNewAPIPath = "api/ServiceAgreement/LoadInfoNew";
export const AddAPIPath = "api/ServiceAgreement/Add";
export const AddAutoAPIPath = "api/ServiceAgreement/AddAuto";
export const UpdateAPIPath = "api/ServiceAgreement/Update";
export const DeleteNewAPIPath = "api/ServiceAgreement/DeleteNew";
export const DeleteAPIPath = "api/ServiceAgreement_FeeAppendix/Delete";
export const DeleteAbilityAPIPath = "api/ServiceAgreement_Ability/Delete";
export const UpdateOrderAPIPath = "api/ServiceAgreement/UpdateOrder";
export const BackLink = "/ServiceAgreement";
export const AddLink = "/ServiceAgreement/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServiceAgreementID";

export const TitleFormSearch = "Tìm kiếm danh sách hợp đồng";
export const TitleFormAdd = "Thêm hợp đồng";
export const TitleFormEdit = "Cập nhật hợp đồng";
export const TitleFormDetail = "Thông tin hợp đồng";

export const PKColumnNameFeeAppendix = "FeeAppendixID";
export const TitleFromFeeAppendix = "Phụ lục biểu phí";

export const PKColumnNameAbiliti = "AbilityID";
export const TitleFromAbiliti = "Năng lực";

export const IDSelectColumnNameFeeAppendix = "chkSelect";
export const AddLinkFeeAppendix = "/ServiceAgreement/FeeAppendix/Add";

export const ElementServiceAgreementList = [
    {
        type: "text",
        name: "txtDepositNote",
        colspan: "8",
        labelcolspan: "4",
        readOnly: false,
        label: "ghi chú ký quỹ",
        placeholder: "Ghi chú ký quỹ",
        value: "",
        DataSourceMember: "DepositNote",

    },
    {
        type: "checkbox",
        name: "chkIsLiquidated",
        label: "đã thanh lý hợp đồng",
        colspan: "8",
        labelcolspan: "4",
        value: false,
        placeholder: "",
        icon: "",
        DataSourceMember: "IsLiquidated",
        listoption: [],
        readonly: false,
        validatonList: []
    }
];

export const GridMLObjectServiceAgreement = [
    {
        Name: "DepositNote",
        DefaultValue: "",
        BindControlName: "txtDepositNote",
        DataSourceMember: "DepositNote"
    },
]

export const DataGridColumnItemListFeeAppendix = [
    // {
    //     Name: "FeeAppendixID",
    //     Type: "checkbox",
    //     Caption: "Mã",
    //     DataSourceMember: "FeeAppendixID",
    //     Width: 150,
    // },
    {
        Name: "FeeAppendixName",
        Type: "text",
        Caption: "Tên Phụ lục",
        DataSourceMember: "FeeAppendixName",
        // Link: "/ServiceAgreement/FeeAppendix/Detail/",
        Width: 150,
    },
    {
        Name: "ServiceSeasonTypeName",
        Type: "text",
        Caption: "Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeName",
        Width: 250,
    },
    {
        Name: "PNServicePriceTableName",
        Type: "text",
        Caption: "Bảng giá",
        DataSourceMember: "PNServicePriceTableName",
        Width: 250,
    },
    {
        Name: "ApplyFromDate",
        Type: "dateNew",
        Caption: "Từ ngày",
        DataSourceMember: "ApplyFromDate",
        Width: 250,
    },
    {
        Name: "ApplyToDate",
        Type: "dateNew",
        Caption: "Đến ngày",
        DataSourceMember: "ApplyToDate",
        Width: 250,
    },
    {

        Name: "Action",
        Type: "groupAction",
        Caption: "Tác vụ",
        DataSourceMember: "FeeAppendixID",
        Width: 70,
        Link: "/ServiceAgreement/FeeAppendix/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const DataTemplateExportFeeAppendix = [
    {
        "Loại mùa dịch vụ": "1",
        "Tên Phụ Lục": "Phụ lục 1",
        "Từ ngày": new Date(),
        "Đến ngày": new Date(),
        "Bảng giá": "1",
        "Mô tả": "Mô tả"
    }
];

export const DataTemplateExportFeeAppendix2 = [
    {
        "Mã hợp đồng": "1",
        "Ngày ký HĐ": new Date(),
        "Loại mùa dịch vụ": "1",
        "Tên Phụ Lục": "Phụ lục 1",
        "Từ ngày": new Date(),
        "Đến ngày": new Date(),
        "Bảng giá": "1",
        "Mô tả": "Mô tả"
    }
];

export const listColumnImportFile_FeeAppendix = [
    {
        Name: "ServiceSeasonTypeID",
        Type: "text",
        Caption: "Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeID"
    },
    {
        Name: "FeeAppendixName",
        Type: "text",
        Caption: "Tên phụ lục",
        DataSourceMember: "FeeAppendixName"
    },
    {
        Name: "ApplyFromDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "ApplyToDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "PNServicePriceTableID",
        Type: "text",
        Caption: "Bảng giá",
        DataSourceMember: "PNServicePriceTableID"
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description"
    },
    {
        Name: "Errors",
        Type: "text",
        Caption: "Cột lỗi",
        DataSourceMember: "Errors"
    }
];

export const DataTemplateExportAbility = [
    {
        "Loại mùa dịch vụ": "1",
        "Từ ngày": new Date(),
        "Đến ngày": new Date(),
        "Theo tháng": "1",
        "Theo ngày": "1",
        "Ghi chú": "Ghi chú"
    }
];

export const DataTemplateExportAbility2 = [
    {
        "Mã hợp đồng": "1",
        "Ngày ký HĐ": new Date(),
        "Loại mùa dịch vụ": "1",
        "Từ ngày": new Date(),
        "Đến ngày": new Date(),
        "Theo tháng": "1",
        "Theo ngày": "1",
        "Ghi chú": "Ghi chú"
    }
];

export const DataGridColumnItemListAbiliti = [
    {
        Name: "ServiceSeasonTypeName",
        // Type: "texttolink",
        Type: "text",
        Caption: " Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeName",
        // Link: "/ServiceAgreement/Abiliti/Detail/",
        Width: 150,
    },
    {
        Name: "FromDate",
        // Type: "date",
        Type: "dateNew",
        Caption: "Từ ngày",
        DataSourceMember: "FromDate",
        Width: 250,
    },
    {
        Name: "ToDate",
        // Type: "date",
        Type: "dateNew",
        Caption: "Đến ngày",
        DataSourceMember: "ToDate",
        Width: 250,
    },
    {
        Name: "MonthlyAbilityValue",
        Type: "text",
        Caption: "Theo tháng",
        DataSourceMember: "MonthlyAbilityValue",
        Width: 250,
    },
    {
        Name: "DailyAbilityValue",
        Type: "text",
        Caption: "Theo ngày",
        DataSourceMember: "DailyAbilityValue",
        Width: 250,
    },
    {
        Name: "Action",
        Type: "groupAction",
        Caption: "Tác vụ",
        DataSourceMember: "AbilityID",
        Width: 70,
    }
];

const dtFromdate = new Date();
dtFromdate.setDate(new Date().getDate() - 365);

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@SERVICETYPEID",
        SearchValue: "-1"
    },
    {
        SearchKey: "@AREAID",
        SearchValue: "-1"
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
        SearchKey: "@STATUS",
        SearchValue: "-1"
    },
];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách hợp đồng dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "", Title: "Cập nhật" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServiceAgreement", Title: "Danh sách hợp đồng dịch vụ" },
    { Link: "", Title: "Thêm" }
];

export const DetailAPIPath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
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
        Caption: "Mã HĐ",
        DataSourceMember: "ServiceAgreementID",
        Link: "/ServiceAgreement/Detail/",
        // Width: 70
    },
    {
        Name: "ServiceAgreementNumber",
        Type: "text",
        Caption: "Số HĐ",
        DataSourceMember: "ServiceAgreementNumber",
        // Width: 200
    },
    {
        Name: "PartnerName",
        Type: "text",
        Caption: "Đối tác",
        DataSourceMember: "PartnerName",
        // Width: 340
    },
    {
        Name: "ServiceTypeName",
        Type: "text",
        Caption: "Loại dịch vụ",
        DataSourceMember: "ServiceTypeName",
        // Width: 200
    },
    // {
    //     Name: "AreaName",
    //     Type: "text",
    //     Caption: "Khu vực",
    //     DataSourceMember: "AreaName",
    //     // Width: 100
    // },
    {
        Name: "SignedDate",
        Type: "date",
        Caption: "Ngày ký HĐ",
        DataSourceMember: "SignedDate",
        // Width: 130
    },
    {
        Name: "ExpiredDate",
        Type: "date",
        Caption: "Ngày hết hạn HĐ",
        DataSourceMember: "ExpiredDate",
        // Width: 130
    },
    {
        Name: "ExtendLable",
        Type: "text",
        Caption: "Gia hạn đến",
        DataSourceMember: "ExtendLable",
        // Width: 150
    },
    {
        Name: "DepositedLable",
        Type: "text",
        Caption: "Đã ký quỹ",
        DataSourceMember: "DepositedLable",
        // Width: 100
    },
    {
        Caption: "Đã thanh lý",
        DataSourceMember: "IsLiquidated",
        Name: "IsLiquidated",
        Type: "checkicon",
        // Width: 100
    },
    {
        Name: "StatusLable",
        Type: "text",
        Caption: "Trạng thái",
        DataSourceMember: "StatusLable",
        // Width: 100
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServiceAgreementID",
        // Width: 100,
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
        Name: "ServiceTypeID",
        DefaultValue: "",
        BindControlName: "cbServiceTypeID"
    },
    // {
    //     Name: "AreaID",
    //     DefaultValue: "",
    //     BindControlName: "cbAreaID"
    // },
    {
        Name: "SignedDate",
        DefaultValue: "",
        BindControlName: "dtSignedDate"
    },
    {
        Name: "ExpiredDate",
        DefaultValue: "",
        BindControlName: "dtExpiredDate"
    },
    {
        Name: "ServiceStatusID",
        DefaultValue: "",
        BindControlName: "cbServiceStatusID"
    },
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        DataSourceMember: "Keyword",
        label: "Từ khóa",
        value: "",
        colspan: 2,
        placeholder: "Từ khóa",
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
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TMS_SERVICETYPE",
        ValueMember: "ServiceTypeID",
        NameMember: "ServiceTypeName",

    },
    // {
    //     type: "ComboBox",
    //     name: "cbAreaID",
    //     DataSourceMember: "AreaID",
    //     label: "Khu vực",
    //     colspan: 2,
    //     value: -1,
    //     isMultiSelect: false,
    //     placeholder: "---Vui lòng chọn---",
    //     listoption: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.AREATT",
    //     ValueMember: "AreaID",
    //     NameMember: "AreaName"

    // },
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
        name: "cbServiceStatusID",
        DataSourceMember: "ServiceStatusID",
        label: "Trạng thái",
        colspan: 2,
        value: -1,
        isMultiSelect: false,
        placeholder: "--Tất cả--",
        listoption: [
            { value: -1, label: '--Tất cả--' },
            { value: 1, label: 'Hết hạn' },
            { value: 2, label: 'Còn hạn' },
        ],
        ValueMember: "ServiceStatusID",
        NameMember: "ServiceStatusName"

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
        Name: "ServiceAgreementNumber",
        DefaultValue: "",
        BindControlName: "txtServiceAgreementNumber",
        DataSourceMember: "ServiceAgreementNumber"
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
        Name: "ShipmentOrder_DeliverUserList",
        DefaultValue: {},
        BindControlName: "ShipmentOrder_DeliverUserList",
        DataSourceMember: "ShipmentOrder_DeliverUserList"
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

export const schema = {
    'Số hợp đồng': {
        prop: 'ServiceAgreementNumber',
        type: String,
        required: true
    },
    'Loại hợp đồng': {
        prop: 'ServiceAgreementTypeID',
        type: String,
        //type: Number,
        required: true
    },
    'Loại dịch vụ': {
        prop: 'ServiceTypeID',
        type: String,
        // type: Number,
        required: true
    },
    // 'Khu vực': {
    //     prop: 'ServiceAreaID',
    //     type: String,
    //     // type: Number,
    //     required: true
    // },
    'Đơn vị vận chuyển': {
        prop: 'PartnerID',
        type: String,
        // type: Number,
        required: true
    },
    'Người đại diện': {
        prop: 'DeputyUserName',
        type: String,
        required: true
    },
    'Ngày ký hợp đồng': {
        prop: 'SignedDate',
        type: Date,
        required: true
    },
    'Ngày hết hạn hợp đồng': {
        prop: 'ExpiredDate',
        type: Date,
        required: true
    },
    'Đã gia hạn hợp đồng': {
        prop: 'IsExtended',
        type: Number,
        required: true
    },
    'Gia hạn đến ngày': {
        prop: 'ExtendedDate',
        type: Date
    },

    'Đã thanh lý hợp đồng': {
        prop: 'IsLiquidated',
        type: Number,
        required: true
    },
    'Ngày thanh lý hợp đồng': {
        prop: 'Liquidateddate',
        type: Date
    },
    'Đã ký quỹ': {
        prop: 'IsDeposited',
        type: Number,
        required: true
    },
    'Số tiền ký quỹ': {
        prop: 'DepositMoney',
        type: Number
    },
    'Ngày ký quỹ': {
        prop: 'DepositedDate',
        type: Date
    },
    'Ghi chú ký quỹ': {
        prop: 'DepositNote',
        type: String
    },
    'Mô tả': {
        prop: 'Description',
        type: String
    },
    'Kích hoạt': {
        prop: 'IsActived',
        type: Number,
        value: 1
    },
    'Hệ thống': {
        prop: 'IsSystem',
        type: Number,
        value: 0
    },
}

let DataGridColumnList_ImportFile = [];

for (const key in schema) {
    if (Object.hasOwnProperty.call(schema, key)) {
        const element = schema[key];

        if (element.required) {
            DataGridColumnList_ImportFile.push({
                Name: element.prop,
                Type: element.type == Date ? "date" : "text",
                Caption: key,
                DataSourceMember: element.prop
            })
        }
    }
}

DataGridColumnList_ImportFile.push({
    Name: "Errors",
    Type: "text",
    Caption: "Cột lỗi",
    DataSourceMember: "Errors"
})

export { DataGridColumnList_ImportFile };

const SignedDate = new Date();
SignedDate.setDate(1);

const ExpiredDate = new Date();
ExpiredDate.setDate(20);

export const DataMasterTemplateExport = [
    {
        "Số hợp đồng": "0201/2020/HĐĐL/TT-DS",
        "Loại hợp đồng": "1",
        "Loại dịch vụ": "1",
        // "Khu vực": "5",
        "Đơn vị vận chuyển": "101",
        "Người đại diện": "0041014",
        "Ngày ký hợp đồng": SignedDate,
        "Ngày hết hạn hợp đồng": ExpiredDate,
        "Đã gia hạn hợp đồng": "0",
        "Gia hạn đến ngày": "",
        "Đã thanh lý hợp đồng": "0",
        "Ngày thanh lý hợp đồng": "",
        "Đã ký quỹ": "0",
        "Số tiền ký quỹ": "",
        "Ngày ký quỹ": "",
        "Ghi chú ký quỹ": "",
        "Mô tả": "test",
    }
];

export const listColumnArea = [
    {
        Caption: "Chọn",
        DataSourceMember: "",
        Name: "chkSelect",
        Type: "checkbox",
        Width: 60
    },
    {
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Name: "AreaID",
        Type: "text",
    },
    {
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Name: "AreaName",
        Type: "text",
    },
    {
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Name: "IsActived",
        Type: "checkicon",
    },
    {
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Name: "IsSystem",
        Type: "checkicon",
    },
    {
        Caption: "Chỉnh sửa",
        DataSourceMember: "",
        Name: "",
        Type: "edit",
        Width: 90
    },
];

export const listColumnImportFileArea = [
    {
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Name: "AreaID",
        Type: "text",
    },
    {
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Name: "AreaName",
        Type: "text",
    },
    {
        Caption: "Lỗi",
        DataSourceMember: "Errors",
        Name: "Errors",
        Type: "text",
    }
];

export const listColumnImportFileStore = [
    {
        Caption: "Mã kho",
        DataSourceMember: "StoreID",
        Name: "StoreID",
        Type: "text",
    },
    {
        Caption: "Tên kho",
        DataSourceMember: "StoreName",
        Name: "StoreName",
        Type: "text",
    },
    {
        Caption: "Lỗi",
        DataSourceMember: "Errors",
        Name: "Errors",
        Type: "text",
    }
];

export const AreaSchema = {
    'Mã khu vực': {
        prop: 'AreaID',
        type: Number,
        required: true
    }
};

export const StoreSchema = {
    'Mã kho': {
        prop: 'StoreID',
        type: Number,
        required: true
    }
};

export const DataTemplateExportArea = [
    {
        "Mã khu vực": 1
    }
];

export const DataTemplateExportStore = [
    {
        "Mã kho": 1
    }
];

export const listColumnArea2 = [
    {
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Name: "AreaID",
        Type: "text",
    },
    {
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Name: "AreaName",
        Type: "text",
    },
    {
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Name: "IsActived",
        Type: "checkicon",
    },
    {
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Name: "IsSystem",
        Type: "checkicon",
    }
];

export const listColumnStore = [
    {
        Caption: "Chọn",
        DataSourceMember: "",
        Name: "chkSelect",
        Type: "checkbox",
        Width: 60
    },
    {
        Caption: "Mã kho",
        DataSourceMember: "StoreID",
        Name: "StoreID",
        Type: "text",
    },
    {
        Caption: "Tên kho",
        DataSourceMember: "StoreName",
        Name: "StoreName",
        Type: "text",
    },
    {
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Name: "IsActived",
        Type: "checkicon",
    },
    {
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Name: "IsSystem",
        Type: "checkicon",
    },
    {
        Caption: "Chỉnh sửa",
        DataSourceMember: "",
        Name: "",
        Type: "edit",
        Width: 90
    },
];

export const listColumnStore2 = [
    {
        Caption: "Mã kho",
        DataSourceMember: "StoreID",
        Name: "StoreID",
        Type: "text",
    },
    {
        Caption: "Tên kho",
        DataSourceMember: "StoreName",
        Name: "StoreName",
        Type: "text",
    },
    {
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Name: "IsActived",
        Type: "checkicon",
    },
    {
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Name: "IsSystem",
        Type: "checkicon",
    }
];

export const FeeAppendixSchema = {
    'Loại mùa dịch vụ': {
        prop: 'ServiceSeasonTypeID',
        type: Number,
        required: true
    },
    'Tên Phụ Lục': {
        prop: 'FeeAppendixName',
        type: String,
        required: true
    },
    'Từ ngày': {
        prop: 'ApplyFromDate',
        type: Date,
        required: true
    },
    'Đến ngày': {
        prop: 'ApplyToDate',
        type: Date,
        required: true
    },
    'Bảng giá': {
        prop: 'PNServicePriceTableID',
        type: Number,
        required: true
    },
    'Mô tả': {
        prop: 'Description',
        type: String
    }
};

export const FeeAppendixSchema2 = {
    'Mã hợp đồng': {
        prop: 'ServiceAgreementID',
        type: String,
        required: true
    },
    'Ngày ký HĐ': {
        prop: 'SignedDate',
        type: Date,
        required: true
    },
    'Loại mùa dịch vụ': {
        prop: 'ServiceSeasonTypeID',
        type: Number,
        required: true
    },
    'Tên Phụ Lục': {
        prop: 'FeeAppendixName',
        type: String,
        required: true
    },
    'Từ ngày': {
        prop: 'ApplyFromDate',
        type: Date,
        required: true
    },
    'Đến ngày': {
        prop: 'ApplyToDate',
        type: Date,
        required: true
    },
    'Bảng giá': {
        prop: 'PNServicePriceTableID',
        type: Number,
        required: true
    },
    'Mô tả': {
        prop: 'Description',
        type: String
    }
};

export const listColumnImportFile_FeeAppendix2 = [
    {
        Name: "ServiceAgreementID",
        Type: "text",
        Caption: "Mã hợp đồng",
        DataSourceMember: "ServiceAgreementID"
    },
    {
        Name: "SignedDate",
        Type: "date",
        Caption: "Ngày ký HĐ",
        DataSourceMember: "SignedDate"
    },
    {
        Name: "ServiceSeasonTypeID",
        Type: "text",
        Caption: "Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeID"
    },
    {
        Name: "FeeAppendixName",
        Type: "text",
        Caption: "Tên Phụ Lục",
        DataSourceMember: "FeeAppendixName"
    },
    {
        Name: "ApplyFromDate",
        Type: "date",
        Caption: "Từ ngày",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "ApplyToDate",
        Type: "date",
        Caption: "Đến ngày",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "PNServicePriceTableID",
        Type: "text",
        Caption: "Bảng giá",
        DataSourceMember: "PNServicePriceTableID"
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description"
    },
    {
        Name: "Errors",
        Type: "text",
        Caption: "Cột lỗi",
        DataSourceMember: "Errors"
    }
]

export const AbilitySchema = {
    'Loại mùa dịch vụ': {
        prop: 'ServiceSeasonTypeID',
        type: Number,
        required: true
    },
    'Từ ngày': {
        prop: 'FromDate',
        type: Date,
        required: true
    },
    'Đến ngày': {
        prop: 'ToDate',
        type: Date,
        required: true
    },
    'Theo tháng': {
        prop: 'MonthlyAbilityValue',
        type: Number
    },
    'Theo ngày': {
        prop: 'DailyAbilityValue',
        type: Number
    },
    'Ghi chú': {
        prop: 'Note',
        type: String
    }
};

export const AbilitySchema2 = {
    'Mã hợp đồng': {
        prop: 'ServiceAgreementID',
        type: String,
        required: true
    },
    'Ngày ký HĐ': {
        prop: 'SignedDate',
        type: Date,
        required: true
    },
    'Loại mùa dịch vụ': {
        prop: 'ServiceSeasonTypeID',
        type: Number,
        required: true
    },
    'Từ ngày': {
        prop: 'FromDate',
        type: Date,
        required: true
    },
    'Đến ngày': {
        prop: 'ToDate',
        type: Date,
        required: true
    },
    'Theo tháng': {
        prop: 'MonthlyAbilityValue',
        type: Number
    },
    'Theo ngày': {
        prop: 'DailyAbilityValue',
        type: Number
    },
    'Ghi chú': {
        prop: 'Note',
        type: String
    }
};

export const listColumnImportFile_Ability2 = [
    {
        Name: "ServiceAgreementID",
        Type: "text",
        Caption: "Mã hợp đồng",
        DataSourceMember: "ServiceAgreementID"
    },
    {
        Name: "SignedDate",
        Type: "date",
        Caption: "Ngày ký HĐ",
        DataSourceMember: "SignedDate"
    },
    {
        Name: "ServiceSeasonTypeID",
        Type: "text",
        Caption: "Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeID"
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
        Name: "MonthlyAbilityValue",
        Type: "text",
        Caption: "Theo tháng",
        DataSourceMember: "MonthlyAbilityValue"
    },
    {
        Name: "DailyAbilityValue",
        Type: "text",
        Caption: "Theo ngày",
        DataSourceMember: "DailyAbilityValue"
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note"
    },
    {
        Name: "Errors",
        Type: "text",
        Caption: "Cột lỗi",
        DataSourceMember: "Errors"
    }
];

export const listColumnImportFile_Ability = [
    {
        Name: "ServiceSeasonTypeID",
        Type: "text",
        Caption: "Loại mùa dịch vụ",
        DataSourceMember: "ServiceSeasonTypeID"
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
        Name: "MonthlyAbilityValue",
        Type: "text",
        Caption: "Theo tháng",
        DataSourceMember: "MonthlyAbilityValue"
    },
    {
        Name: "DailyAbilityValue",
        Type: "text",
        Caption: "Theo ngày",
        DataSourceMember: "DailyAbilityValue"
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note"
    },
    {
        Name: "Errors",
        Type: "text",
        Caption: "Cột lỗi",
        DataSourceMember: "Errors"
    }
];