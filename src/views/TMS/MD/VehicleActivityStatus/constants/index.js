export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/VehicleActivityStatus/Search";
export const LoadAPIPath = "api/VehicleActivityStatus/Load";
export const AddAPIPath = "api/VehicleActivityStatus/Add";
export const UpdateAPIPath = "api/VehicleActivityStatus/Update";
export const DeleteAPIPath = "api/VehicleActivityStatus/Delete";
export const UpdateOrderAPIPath = "api/VehicleActivityStatus/UpdateOrder";
export const BackLink = "/VehicleActivityStatus";
export const AddLink = "/VehicleActivityStatus/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AcitivityStatusId";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách trạng thái hoạt động của phương tiện" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleActivityStatus", Title: "Danh sách trạng thái hoạt động của phương tiện" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleActivityStatus", Title: "Danh sách trạng thái hoạt động của phương tiện" },
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
    //     name: "txtAcitivityStatusId",
    //     label: "Mã trạng thái hoạt động của phương tiện",
    //     value: "",
    //     maxsize: "10",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     datasourcemember: "AcitivityStatusId",
    //     readonly: false,
    //     Colmd : "12",
    //     labelcolspan : "2",
    //     colspan : "4",
    //     OrderIndex : "1",
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtActivityStatusName",
        label: "Tên trạng thái hoạt động của phương tiện",
        value: "",
        maxsize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ActivityStatusName",
        readonly: false,
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        OrderIndex : "2",
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxsize: "1000",
        placeholder: "",
        icon: "",
        rows: "6",
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        OrderIndex : "3",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        DataSourceMember: "IsActived",
        OrderIndex : "5",
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
        readonly: false,
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        DataSourceMember: "IsSystem",
        OrderIndex : "6",
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtAcitivityStatusId",
        label: "Mã trạng thái hoạt động của phương tiện",
        value: "",
        maxsize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AcitivityStatusId",
        readonly: true,
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        OrderIndex : "1",
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtActivityStatusName",
        label: "Tên trạng thái hoạt động của phương tiện",
        value: "",
        maxsize: "300",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "ActivityStatusName",
        readonly: false,
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        OrderIndex : "2",
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxsize: "1000",
        placeholder: "",
        icon: "",
        rows: "6",
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        OrderIndex : "3",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
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
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        DataSourceMember: "IsActived",
        OrderIndex : "5",
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
        readonly: false,
        Colmd : "12",
        labelcolspan : "2",
        colspan : "4",
        DataSourceMember: "IsSystem",
        OrderIndex : "6",
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
        Name: "AcitivityStatusId",
        DefaultValue: "",
        BindControlName: "txtAcitivityStatusId",
        DataSourceMember: "AcitivityStatusId"
    },
    {
        Name: "ActivityStatusName",
        DefaultValue: "",
        BindControlName: "txtActivityStatusName",
        DataSourceMember: "ActivityStatusName"
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
        DataSourceMember: "AcitivityStatusId",
        Width: 60
    },
    {
        Name: "AcitivityStatusId",
        Type: "text",
        Caption: "Mã trạng thái hoạt động của phương tiện",
        DataSourceMember: "AcitivityStatusId",
        Width: 160
    },
    {
        Name: "ActivityStatusName",
        Type: "text",
        Caption: "Tên trạng thái hoạt động của phương tiện",
        DataSourceMember: "ActivityStatusName",
        Width: 350
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
        DataSourceMember: "AcitivityStatusId",
        Width: 80,
        Link: "/VehicleActivityStatus/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
