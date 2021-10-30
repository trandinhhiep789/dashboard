export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/VehicleRentalRequestStep/Search";
export const AddAPIPath = "api/VehicleRentalRequestStep/Add";
export const EditAPIPath = "api/VehicleRentalRequestStep/Edit";
export const LoadAPIPath = "api/VehicleRentalRequestStep/Load";
export const DeleteAPIPath = "api/VehicleRentalRequestStep/Delete";

export const AddLink = "/VehicleRentalRequestStep/Add";
export const BackLink = "/VehicleRentalRequestStep";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleRentalRequestStepID"

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Bước xử lý của yêu cầu thuê xe" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestStep", Title: "Bước xử lý của yêu cầu thuê xe" },
    { Link: "", Title: "Thêm bước xử lý của yêu cầu thuê xe" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalRequestStep", Title: "Bước xử lý của yêu cầu thuê xe" },
    { Link: "", Title: "Chỉnh sửa bước xử lý của yêu cầu thuê xe" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {}
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleRentalRequestStepID",
        Width: 60
    },
    {
        Name: "VehicleRentalRequestStepID",
        Type: "text",
        Caption: "Mã bước xử lý",
        DataSourceMember: "VehicleRentalRequestStepID",
    },
    {
        Name: "VehicleRentalRequestStepName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "VehicleRentalRequestStepName",
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "UpdatedUserIDName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserIDName",
    },
    {
        Name: "UpdatedDate",
        Type: "datetime",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "VehicleRentalRequestStepID",
        Width: 80,
        Link: "/VehicleRentalRequestStep/Edit/",
        LinkText: "Chỉnh sửa"
    },
]

export const AddElementList = [
    {
        type: "text",
        name: "txtVehicleRentalRequestStepName",
        label: "Tên loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestStepName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
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
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "300",
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
        label: "Kích hoạt",
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
        label: "Hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
]

export const EditElementList = [
    {
        type: "text",
        name: "txtVehicleRentalRequestStepID",
        label: "Mã loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestStepID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtVehicleRentalRequestStepName",
        label: "Tên loại bước xử lý của yêu cầu thuê xe",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalRequestStepName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị",
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
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "300",
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
        label: "Kích hoạt",
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
        label: "Hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    }
];

export const MLObjectDefinition = [
    {
        Name: "VehicleRentalRequestStepName",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalRequestStepName",
        DataSourceMember: "VehicleRentalRequestStepName"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem"
    }
]