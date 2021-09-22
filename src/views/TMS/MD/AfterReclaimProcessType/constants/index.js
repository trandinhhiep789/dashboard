export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AfterReclaimProcessType/Search";
export const LoadAPIPath = "api/AfterReclaimProcessType/Load";
export const AddAPIPath = "api/AfterReclaimProcessType/Add";
export const UpdateAPIPath = "api/AfterReclaimProcessType/Update";
export const DeleteAPIPath = "api/AfterReclaimProcessType/Delete";
export const UpdateOrderAPIPath = "api/AfterReclaimProcessType/UpdateOrder";
export const BackLink = "/AfterReclaimProcessType";
export const AddLink = "/AfterReclaimProcessType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AfterReclaimProcessTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách phương thức xử lý sau thu hồi" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AfterReclaimProcessType", Title: "Danh sách phương thức xử lý sau thu hồi" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/AfterReclaimProcessType", Title: "Danh sách phương thức xử lý sau thu hồi" },
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
    //     name: "txtAfterReclaimProcessTypeID",
    //     label: "mã phương thức xử lý sau thu hồi",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AfterReclaimProcessTypeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtAfterReclaimProcessTypeName",
        label: "tên phương thức xử lý sau thu hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AfterReclaimProcessTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "0",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
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
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống:",
    //     value: 0,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtAfterReclaimProcessTypeID",
        label: "mã phương thức xử lý sau thu hồi",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AfterReclaimProcessTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtAfterReclaimProcessTypeName",
        label: "tên phương thức xử lý sau thu hồi",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AfterReclaimProcessTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    // {
    //     type: "text",
    //     name: "txtOrderIndex",
    //     label: "Thứ tự hiển thị:",
    //     value: "",
    //     maxSize: "9",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "OrderIndex",
    //     readonly: false,
    //     validatonList: ["number"]
    // },
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
    // {
    //     type: "checkbox",
    //     name: "chkIsSystem",
    //     label: "Hệ thống:",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "IsSystem",
    //     readonly: false,
    //     validatonList: []
    // }
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
        Name: "AfterReclaimProcessTypeID",
        DefaultValue: "",
        BindControlName: "txtAfterReclaimProcessTypeID",
        DataSourceMember: "AfterReclaimProcessTypeID"
    },
    {
        Name: "AfterReclaimProcessTypeName",
        DefaultValue: "",
        BindControlName: "txtAfterReclaimProcessTypeName",
        DataSourceMember: "AfterReclaimProcessTypeName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    // {
    //     Name: "OrderIndex",
    //     DefaultValue: "",
    //     BindControlName: "txtOrderIndex",
    //     DataSourceMember: "OrderIndex"
    // },
    {
        Name: "IsActived",
        DefaultValue: true,
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    // {
    //     Name: "IsSystem",
    //     DefaultValue: false,
    //     BindControlName: "chkIsSystem",
    //     DataSourceMember: "IsSystem"
    // },
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
        DataSourceMember: "AfterReclaimProcessTypeID",
        Width: 60
    },
    {
        Name: "AfterReclaimProcessTypeID",
        Type: "text",
        Caption: "Mã phương thức xử lý sau thu hồi",
        DataSourceMember: "AfterReclaimProcessTypeID",
        Width: 220
    },
    {
        Name: "AfterReclaimProcessTypeName",
        Type: "text",
        Caption: "Tên phương thức xử lý sau thu hồi",
        DataSourceMember: "AfterReclaimProcessTypeName",
        Width: 500
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        //Width: 200
    },
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
        DataSourceMember: "AfterReclaimProcessTypeID",
        Width: 100,
        Link: "/AfterReclaimProcessType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
