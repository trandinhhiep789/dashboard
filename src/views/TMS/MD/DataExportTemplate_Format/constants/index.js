export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/DataExportTemplate_Format/Add";
export const UpdateAPIPath = "api/DataExportTemplate_Format/Update";
export const DeleteAPIPath = "api/DataExportTemplate_Format/Delete";
export const LoadAPIPath = "api/DataExportTemplate_Format/Load";
export const BackLink = "/DataExportTemplate";


export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DataExportTemplate", Title: "Template xuất dữ liệu" },
    { Link: "", Title: "Định dạng các cột dữ liệu xuất" }
];

export const ModalColumnList_Insert = [
    {
        type: "text",
        Name: "DataColumnName",
        label: "tên cột",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataColumnName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        Name: "FormatString",
        label: "Chuổi định dạng",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FormatString",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const ModalColumnList_Edit = [
    {
        type: "text",
        Name: "FormatID",
        label: "mã định dạng các cột dữ liệu xuất",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FormatID",
        readonly: true,
        validatonList: []
    },
    {
        type: "text",
        Name: "DataColumnName",
        label: "tên cột",
        value: "",
        maxSize: "50",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataColumnName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        Name: "FormatString",
        label: "Chuổi định dạng",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FormatString",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: "0",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelectFormatID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "FormatID",
        Width: 60
    },
    {
        Name: "DataColumnName",
        Type: "text",
        Caption: "Tên cột",
        DataSourceMember: "DataColumnName",
        Width: 150
    },
    {
        Name: "FormatString",
        Type: "text",
        Caption: "Chuỗi định dạng",
        DataSourceMember: "FormatString",
        Width: 150
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 150
    },
    {
        Name: "EditFormatID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "FormatID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "FormatID",
        DefaultValue: "",
        BindControlName: "FormatID",
        DataSourceMember: "FormatID"
    },
    {
        Name: "DataExportTemplateID",
        DefaultValue: "",
        BindControlName: "DataExportTemplateID",
        DataSourceMember: "DataExportTemplateID"
    },
    {
        Name: "DataExportTemplateName",
        DefaultValue: "",
        BindControlName: "DataExportTemplateName",
        DataSourceMember: "DataExportTemplateName"
    },
    {
        Name: "DataColumnName",
        DefaultValue: "",
        BindControlName: "DataColumnName",
        DataSourceMember: "DataColumnName"
    },
    {
        Name: "FormatString",
        DefaultValue: "",
        BindControlName: "FormatString",
        DataSourceMember: "FormatString"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "IsSystem",
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