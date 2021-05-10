export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/SMSTemplate/Search";
export const LoadAPIPath = "api/SMSTemplate/Load";
export const AddAPIPath = "api/SMSTemplate/Add";
export const UpdateAPIPath = "api/SMSTemplate/Update";
export const DeleteAPIPath = "api/SMSTemplate/Delete";
export const UpdateOrderAPIPath = "api/SMSTemplate/UpdateOrder";
export const BackLink = "/SMSTemplate";
export const AddLink = "/SMSTemplate/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "SMSTemplateID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách template tin nhắn SMS" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SMSTemplate", Title: "Danh sách template tin nhắn SMS" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/SMSTemplate", Title: "Danh sách template tin nhắn SMS" },
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
    // {
    //     type: "text",
    //     name: "txtSMSTemplateID",
    //     label: "mã loại",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "SMSTemplateID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtSMSTemplateName",
        label: "tên template tin nhắn SMS",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSTemplateName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtSMSTemplateContent",
        label: "nội dung template tin nhắn SMS",
        value: "",
        rows: "6",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSTemplateContent",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtSMSServerAuthenKey",
        label: "khóa xác thực của server SMS",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSServerAuthenKey",
        readonly: false,
        validatonList: [],
    },
    // {
    //     type: "select",
    //     name: "txtQualityAssessGroupID",
    //     label: "nhóm tiêu chí",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "QualityAssessGroupID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
    //     ValueMember: "QualityAssessGroupID",
    //     NameMember: "QualityAssessGroupName"

    // },
    // {
    //     type: "select",
    //     name: "GetFeeType",
    //     label: "Kiểu lấy chi phí",
    //     value: 1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
    //     DataSourceMember: "GetFeeType",
    //     readonly: false,
    //     disabled: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
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
        name: "txtSMSTemplateID",
        label: "mã template tin nhắn SMS",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSTemplateID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtSMSTemplateName",
        label: "tên template tin nhắn SMS",
        value: "",
        maxSize: "2000",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSTemplateName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtSMSTemplateContent",
        label: "nội dung template tin nhắn SMS",
        value: "",
        rows: "6",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSTemplateContent",
        readonly: false,
        validatonList: [],
    },
    {
        type: "text",
        name: "txtSMSServerAuthenKey",
        label: "khóa xác thực của server SMS",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "SMSServerAuthenKey",
        readonly: false,
        validatonList: [],
    },
    // {
    //     type: "select",
    //     name: "txtQualityAssessGroupID",
    //     label: "nhóm tiêu chí",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "QualityAssessGroupID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.QUALITYASSESSGROUP",
    //     ValueMember: "QualityAssessGroupID",
    //     NameMember: "QualityAssessGroupName"

    // },
    // {
    //     type: "select",
    //     name: "GetFeeType",
    //     label: "Kiểu lấy chi phí",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
    //     DataSourceMember: "GetFeeType",
    //     readonly: false,
    //     disabled: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    // },
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
        Name: "SMSTemplateID",
        DefaultValue: "",
        BindControlName: "txtSMSTemplateID",
        DataSourceMember: "SMSTemplateID"
    },
    {
        Name: "SMSTemplateName",
        DefaultValue: "",
        BindControlName: "txtSMSTemplateName",
        DataSourceMember: "SMSTemplateName"
    },
    {
        Name: "SMSTemplateContent",
        DefaultValue: "",
        BindControlName: "txtSMSTemplateContent",
        DataSourceMember: "SMSTemplateContent"
    },
    {
        Name: "SMSServerAuthenKey",
        DefaultValue: "",
        BindControlName: "txtSMSServerAuthenKey",
        DataSourceMember: "SMSServerAuthenKey"
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
        DataSourceMember: "SMSTemplateID",
        Width: 60
    },
    {
        Name: "SMSTemplateID",
        Type: "text",
        Caption: "Mã template tin nhắn SMS",
        DataSourceMember: "SMSTemplateID",
        Width: 150
    },
    {
        Name: "SMSTemplateName",
        Type: "text",
        Caption: "Tên template tin nhắn SMS",
        DataSourceMember: "SMSTemplateName",
        Width: 200
    },
    {
        Name: "SMSTemplateContent",
        Type: "text",
        Caption: "Nội dung template tin nhắn SMS",
        DataSourceMember: "SMSTemplateContent",
        Width: 200
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
        DataSourceMember: "SMSTemplateID",
        Width: 100,
        Link: "/SMSTemplate/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
