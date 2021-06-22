export const APIHostName = "TMSAPI";
export const AddAPIPath = "api/DataExportTemplate_Width/Add";
export const UpdateAPIPath = "api/DataExportTemplate_Width/Update";
export const DeleteAPIPath = "api/DataExportTemplate_Width/Delete";
export const LoadAPIPath = "api/DataExportTemplate_Width/Load";
export const BackLink = "/DataExportTemplate";


export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DataExportTemplate", Title: "Template xuất dữ liệu" },
    { Link: "", Title: "Kích thước các cột dữ liệu xuất" }
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
        Name: "ColumnWidth",
        label: "kích thước cột",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColumnWidth",
        readonly: false,
        validatonList: ["required", "number"],
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
        Name: "ColumnWidthID",
        label: "mã kích thước các cột dữ liệu xuất",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColumnWidthID",
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
        Name: "ColumnWidth",
        label: "kích thước cột",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColumnWidth",
        readonly: false,
        validatonList: ["required", "number"],
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
        Name: "chkSelectColumnWidthID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ColumnWidthID",
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
        Name: "ColumnWidth",
        Type: "text",
        Caption: "Kích thước cột",
        DataSourceMember: "ColumnWidth",
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
        Name: "EditColumnWidthID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ColumnWidthID",
        Width: 100
    }

];

export const MLObjectDefinition = [
    {
        Name: "ColumnWidthID",
        DefaultValue: "",
        BindControlName: "ColumnWidthID",
        DataSourceMember: "ColumnWidthID"
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
        Name: "ColumnWidth",
        DefaultValue: "",
        BindControlName: "ColumnWidth",
        DataSourceMember: "ColumnWidth"
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