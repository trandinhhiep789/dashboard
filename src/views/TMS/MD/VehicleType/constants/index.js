import { ERPCOMMONCACHE_VEHICLEGROUP } from "../../../../../constants/keyCache";

export const APIHostName = "TMSMDMAPI";
export const SearchAPIPath = "api/VehicleType/Search";
export const LoadAPIPath = "api/VehicleType/Load";
export const AddAPIPath = "api/VehicleType/Add";
export const UpdateAPIPath = "api/VehicleType/Update";
export const DeleteAPIPath = "api/VehicleType/Delete";
export const UpdateOrderAPIPath = "api/VehicleType/UpdateOrder";
export const BackLink = "/VehicleType";
export const AddLink = "/VehicleType/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "VehicleTypeID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách loại phương tiện" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleType", Title: "Danh sách loại phương tiện" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/VehicleType", Title: "Danh sách loại phương tiện" },
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
    //     name: "txtVehicleTypeID",
    //     label: "mã loại phương tiện",
    //     value: "",
    //     maxSize: "5",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "VehicleTypeID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "select",
        name: "txtVehicleGroupID",
        label: "nhóm phương tiện",
        value: 1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "VehicleGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_VEHICLEGROUP,
        ValueMember: "VehicleGroupID",
        NameMember: "VehicleGroupName"

    },
    {
        type: "text",
        name: "txtVehicleTypeName",
        label: "tên loại phương tiện",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "330",
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
        name: "txtLength",
        label: "chiều dài của loại xe (m)",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Length",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtWidth",
        label: "chiều rộng của loại xe (m)",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Width",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtHeight",
        label: "chiều cao của loại xe (m)",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Height",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtWeight",
        label: "tải trọng tối đa của loại xe (kg)",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Weight",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtVolume",
        label: "thể tích tối đa của loại xe (m3)",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Volume",
        readonly: true,
        validatonList: ["digit"],
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
        name: "txtVehicleTypeID",
        label: "mã loại phương tiện",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleTypeID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "txtVehicleGroupID",
        label: "nhóm phương tiện",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "VehicleGroupID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_VEHICLEGROUP,
        ValueMember: "VehicleGroupID",
        NameMember: "VehicleGroupName"

    },
    {
        type: "text",
        name: "txtVehicleTypeName",
        label: "tên loại phương tiện",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "VehicleTypeName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        maxSize: "330",
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
        name: "txtLength",
        label: "chiều dài của loại xe",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Length",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtWidth",
        label: "chiều rộng của loại xe",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Width",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtHeight",
        label: "chiều cao của loại xe",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Height",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtWeight",
        label: "tải trọng tối đa của loại xe",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Weight",
        readonly: false,
        validatonList: ["required", "digit"],
    },
    {
        type: "text",
        name: "txtVolume",
        label: "thể tích tối đa của loại xe",
        value: "",
        maxSize: "6",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Volume",
        readonly: true,
        validatonList: ["digit"],
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
        Name: "VehicleTypeID",
        DefaultValue: "",
        BindControlName: "txtVehicleTypeID",
        DataSourceMember: "VehicleTypeID"
    },
    {
        Name: "VehicleTypeName",
        DefaultValue: "",
        BindControlName: "txtVehicleTypeName",
        DataSourceMember: "VehicleTypeName"
    },
    {
        Name: "VehicleGroupID",
        DefaultValue: "",
        BindControlName: "txtVehicleGroupID",
        DataSourceMember: "VehicleGroupID"
    },
    {
        Name: "VehicleGroupName",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "VehicleGroupName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "Length",
        DefaultValue: "",
        BindControlName: "txtLength",
        DataSourceMember: "Length"
    },
    {
        Name: "Width",
        DefaultValue: "",
        BindControlName: "txtWidth",
        DataSourceMember: "Width"
    },
    {
        Name: "Height",
        DefaultValue: "",
        BindControlName: "txtHeight",
        DataSourceMember: "Height"
    },
    {
        Name: "Weight",
        DefaultValue: "",
        BindControlName: "txtWeight",
        DataSourceMember: "Weight"
    },
    {
        Name: "Volume",
        DefaultValue: "",
        BindControlName: "txtVolume",
        DataSourceMember: "Volume"
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
        DataSourceMember: "VehicleTypeID",
        Width: 60
    },
    {
        Name: "VehicleTypeID",
        Type: "text",
        Caption: "Mã loại phương tiện",
        DataSourceMember: "VehicleTypeID",
        Width: 100
    },
    {
        Name: "VehicleTypeName",
        Type: "text",
        Caption: "Tên loại phương tiện",
        DataSourceMember: "VehicleTypeName",
        Width: 150
    },
    {
        Name: "VehicleGroupName",
        Type: "text",
        Caption: "Nhóm phương tiện",
        DataSourceMember: "VehicleGroupName",
        Width: 150
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
        DataSourceMember: "VehicleTypeID",
        Width: 100,
        Link: "/VehicleType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
