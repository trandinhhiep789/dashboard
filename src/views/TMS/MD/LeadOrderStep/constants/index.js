export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/LeadOrderStep/Search";
export const LoadAPIPath = "api/LeadOrderStep/Load";
export const AddAPIPath = "api/LeadOrderStep/Add";
export const UpdateAPIPath = "api/LeadOrderStep/Update";
export const DeleteAPIPath = "api/LeadOrderStep/Delete";
export const BackLink = "/LeadOrderStep";
export const AddLink = "/LeadOrderStep/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "LeadOrderStepID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bước xử lý của mối bán hàng" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderStep", Title: "Danh sách bước xử lý của mối bán hàng" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/LeadOrderStep", Title: "Danh sách bước xử lý của mối bán hàng" },
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
        type: "text",
        name: "txtLeadOrderStepID",
        label: "Mã bước xử lý của mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã bước xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStepID",
        disabled: false,
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderStepName",
        label: "Tên bước xử lý của mối bán hàng",
        value: "",
        maxSize: "150",
        placeholder: "Tên bước xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStepName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtLeadOrderStepID",
        label: "Mã bước xử lý của mối bán hàng",
        value: "",
        maxSize: "9",
        placeholder: "Mã bước xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStepID",
        disabled: true,
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtLeadOrderStepName",
        label: "Tên bước xử lý của mối bán hàng",
        value: "",
        maxSize: "150",
        placeholder: "Tên bước xử lý của mối bán hàng",
        icon: "",
        listoption: {},
        DataSourceMember: "LeadOrderStepName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "450",
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
        validatonList: [],
        DataSourceMember: "IsActived",
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
        validatonList: [],
        DataSourceMember: "IsSystem",
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
        Name: "LeadOrderStepID",
        DefaultValue: "",
        BindControlName: "txtLeadOrderStepID",
        DataSourceMember: "LeadOrderStepID"
    },
    {
        Name: "LeadOrderStepName",
        DefaultValue: "",
        BindControlName: "txtLeadOrderStepName",
        DataSourceMember: "LeadOrderStepName"
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
        DataSourceMember: "LeadOrderStepID",
        Width: 50
    },
    {
        Name: "LeadOrderStepID",
        Type: "text",
        Caption: "Mã bước xử lý của mối bán hàng",
        DataSourceMember: "LeadOrderStepID",
        Width: 170,
    },
    {
        Name: "LeadOrderStepName",
        Type: "text",
        Caption: "Tên bước xử lý của mối bán hàng",
        DataSourceMember: "LeadOrderStepName",
        Width: 170
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 130
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 80
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 60
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 60
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "LeadOrderStepID",
        Width: 80,
        Link: "/LeadOrderStep/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
