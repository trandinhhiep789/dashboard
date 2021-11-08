export const APIHostName = "TMSMDMAPI";
export const AddAPIPath = "api/VehicleRentalStatus/Add";
export const DeleteAPIPath = "api/VehicleRentalStatus/Delete";
export const EditAPIPath = "api/VehicleRentalStatus/Update";
export const LoadAPIPath = "api/VehicleRentalStatus/Load";
export const SearchAPIPath = "api/VehicleRentalStatus/Search";

export const AddLink = "/VehicleRentalStatus/Add";
export const BackLink = "/VehicleRentalStatus";

export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleRentalStatusID";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Trạng thái thuê xe" },
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalStatus", Title: "Trạng thái thuê xe" },
    { Link: "", Title: "Thêm trạng thái thuê xe" },
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleRentalStatus", Title: "Trạng thái thuê xe" },
    { Link: "", Title: "Chỉnh sửa trạng thái thuê xe" },
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
    },
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword",
    },
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "VehicleRentalStatusID",
        Width: 60,
    },
    {
        Name: "VehicleRentalStatusID",
        Type: "text",
        Caption: "Mã trạng thái ",
        DataSourceMember: "VehicleRentalStatusID",
    },
    {
        Name: "VehicleRentalStatusName",
        Type: "text",
        Caption: "Tên trạng thái",
        DataSourceMember: "VehicleRentalStatusName",
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
        DataSourceMember: "VehicleRentalStatusID",
        Width: 80,
        Link: "/VehicleRentalStatus/Edit/",
        LinkText: "Chỉnh sửa",
    },
];

export const AddElementList = [
    {
        type: "text",
        name: "txtVehicleRentalStatusName",
        label: "Tên trạng thái thuê xe",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalStatusName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "330",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: [],
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
        validatonList: [],
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
        validatonList: [],
    },
];

export const EditElementList = [
    {
        type: "text",
        name: "txtVehicleRentalStatusID",
        label: "Mã trạng thái thuê xe",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalStatusID",
        readonly: true,
        validatonList: ["required", "number"],
    },
    {
        type: "text",
        name: "txtVehicleRentalStatusName",
        label: "Tên trạng thái thuê xe",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleRentalStatusName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "330",
        placeholder: "",
        icon: "",
        rows: "6",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: [],
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
    },
];

export const MLObjectDefinition = [
    {
        Name: "VehicleRentalStatusID",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalStatusID",
        DataSourceMember: "VehicleRentalStatusID",
    },
    {
        Name: "VehicleRentalStatusName",
        DefaultValue: "",
        BindControlName: "txtVehicleRentalStatusName",
        DataSourceMember: "VehicleRentalRequestStepName",
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description",
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "chkIsActived",
        DataSourceMember: "IsActived",
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "chkIsSystem",
        DataSourceMember: "IsSystem",
    },
];




