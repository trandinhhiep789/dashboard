export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/DataExportTemplate/Search";
export const LoadAPIPath = "api/DataExportTemplate/Load";
export const AddAPIPath = "api/DataExportTemplate/Add";
export const UpdateAPIPath = "api/DataExportTemplate/Update";
export const DeleteAPIPath = "api/DataExportTemplate/Delete";
export const UpdateOrderAPIPath = "api/DataExportTemplate/UpdateOrder";
export const BackLink = "/DataExportTemplate";
export const AddLink = "/DataExportTemplate/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "DataExportTemplateID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách template xuất dữ liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DataExportTemplate", Title: "Danh sách template xuất dữ liệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DataExportTemplate", Title: "Danh sách template xuất dữ liệu" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/DataExportTemplate", Title: "Danh sách template xuất dữ liệu" },
    { Link: "", Title: "Chi tiết template xuất dữ liệu" }
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
    // {
    //     type: "text",
    //     name: "txtDataExportTemplateID",
    //     label: "mã template xuất dữ liệu",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "DataExportTemplateID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtDataExportTemplateName",
        label: "tên template xuất dữ liệu",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataExportTemplateName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtLoadDataStoreName",
        label: "Tên store load dữ liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "LoadDataStoreName",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtExportFileNameTemplate",
        label: "Template tên file xuất dữ liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ExportFileNameTemplate",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtHeaderTitle",
        label: "tiêu đề file xuất dữ liệu",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "HeaderTitle",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtHeaderColumnNameList",
        label: "Danh sách giá trị các cột tiêu đề",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "HeaderColumnNameList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtDataColumnNameList",
        label: "Danh sách các cột dữ liệu cần xuất",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataColumnNameList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtColumnWidthList",
        label: "Danh sách kích thước các cột",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColumnWidthList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "checkbox",
        name: "IscomPressExportFile",
        label: "Có nén tập tin xuất:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IscomPressExportFile",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IscomPressExportFileWithPass",
        label: "Có nén tập tin xuất với mật khẩu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IscomPressExportFileWithPass",
        readonly: false,
        validatonList: []
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
        type: "text",
        name: "txtOrderIndex",
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
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt:",
        value: 1,
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
        value: 0,
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
        name: "txtDataExportTemplateID",
        label: "mã template xuất dữ liệu",
        value: "",
        //maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataExportTemplateID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtDataExportTemplateName",
        label: "tên template xuất dữ liệu",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataExportTemplateName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtLoadDataStoreName",
        label: "Tên store load dữ liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "LoadDataStoreName",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtExportFileNameTemplate",
        label: "Template tên file xuất dữ liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ExportFileNameTemplate",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtHeaderTitle",
        label: "tiêu đề file xuất dữ liệu",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "HeaderTitle",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtHeaderColumnNameList",
        label: "Danh sách giá trị các cột tiêu đề",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "HeaderColumnNameList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtDataColumnNameList",
        label: "Danh sách các cột dữ liệu cần xuất",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "DataColumnNameList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtColumnWidthList",
        label: "Danh sách kích thước các cột",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ColumnWidthList",
        readonly: false,
        validatonList: [],
    },
    {
        type: "checkbox",
        name: "IscomPressExportFile",
        label: "Có nén tập tin xuất:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IscomPressExportFile",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "IscomPressExportFileWithPass",
        label: "Có nén tập tin xuất với mật khẩu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IscomPressExportFileWithPass",
        readonly: false,
        validatonList: []
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
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "9",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
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
        Name: "DataExportTemplateID",
        DefaultValue: "",
        BindControlName: "txtDataExportTemplateID",
        DataSourceMember: "DataExportTemplateID"
    },
    {
        Name: "DataExportTemplateName",
        DefaultValue: "",
        BindControlName: "txtDataExportTemplateName",
        DataSourceMember: "DataExportTemplateName"
    },
    {
        Name: "LoadDataStoreName",
        DefaultValue: "",
        BindControlName: "txtLoadDataStoreName",
        DataSourceMember: "LoadDataStoreName"
    },
    {
        Name: "ExportFileNameTemplate",
        DefaultValue: "",
        BindControlName: "txtExportFileNameTemplate",
        DataSourceMember: "ExportFileNameTemplate"
    },
    {
        Name: "HeaderTitle",
        DefaultValue: "",
        BindControlName: "txtHeaderTitle",
        DataSourceMember: "HeaderTitle"
    },
    {
        Name: "HeaderColumnNameList",
        DefaultValue: "",
        BindControlName: "txtHeaderColumnNameList",
        DataSourceMember: "HeaderColumnNameList"
    },
    {
        Name: "DataColumnNameList",
        DefaultValue: "",
        BindControlName: "txtDataColumnNameList",
        DataSourceMember: "DataColumnNameList"
    },
    {
        Name: "ColumnWidthList",
        DefaultValue: "",
        BindControlName: "txtColumnWidthList",
        DataSourceMember: "ColumnWidthList"
    },
    {
        Name: "IscomPressExportFile",
        DefaultValue: "",
        BindControlName: "IscomPressExportFile",
        DataSourceMember: "IscomPressExportFile"
    },
    {
        Name: "IscomPressExportFileWithPass",
        DefaultValue: "",
        BindControlName: "IscomPressExportFileWithPass",
        DataSourceMember: "IscomPressExportFileWithPass"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
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
        DataSourceMember: "DataExportTemplateID",
        Width: 60
    },
    {
        Name: "DataExportTemplateID",
        Type: "text",
        Caption: "Mã template xuất dữ liệu",
        DataSourceMember: "DataExportTemplateID",
        Width: 150
    },
    {
        Name: "DataExportTemplateName",
        Type: "texttolink",
        Link: "/DataExportTemplate/Detail/",
        Caption: "Tên template xuất dữ liệu",
        DataSourceMember: "DataExportTemplateName",
        Width: 200
    },
    // {
    //     Name: "DataExportTemplateContent",
    //     Type: "text",
    //     Caption: "Nội dung template xuất dữ liệu",
    //     DataSourceMember: "DataExportTemplateContent",
    //     Width: 200
    // },
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
        DataSourceMember: "DataExportTemplateID",
        Width: 100,
        Link: "/DataExportTemplate/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
