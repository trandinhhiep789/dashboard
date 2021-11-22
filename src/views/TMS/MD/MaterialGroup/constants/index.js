export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/MaterialGroup/Search";
export const LoadAPIPath = "api/MaterialGroup/Load";
export const AddAPIPath = "api/MaterialGroup/Add";
export const UpdateAPIPath = "api/MaterialGroup/Update";
export const DeleteAPIPath = "api/MaterialGroup/Delete";
export const UpdateOrderAPIPath = "api/MaterialGroup/UpdateOrder";
export const BackLink = "/MaterialGroup";
export const AddLink = "/MaterialGroup/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "MaterialGroupID";

export const AddMaterialGroupByFileAPIPath = "api/MaterialGroup/AddByFile";
export const AddMaterialGroupProductByFileAPIPath = "api/MaterialGroup_Product/AddByFile";
export const AddMaterialGroupInstallCondByFileAPIPath = "api/MaterialGroup_InstallCond/AddByFile";

export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách nhóm vật tư lắp đặt" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialGroup", Title: "Danh sách nhóm vật tư lắp đặt" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialGroup", Title: "Danh sách nhóm vật tư lắp đặt" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/MaterialGroup", Title: "Danh sách nhóm vật tư lắp đặt" },
    { Link: "", Title: "Chi tiết" }
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
        name: "txtMaterialGroupID",
        label: "mã nhóm vật tư",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupID",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtMaterialGroupName",
        label: "tên nhóm vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupName",
        readonly: false,
        validatonList: ["required"],
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
        type: "checkbox",
        name: "chkIsMustReturnNotUseMaterial",
        label: "bắt buộc phải nhập trả nếu không sử dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsMustReturnNotUseMaterial",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtMustReturnNumHour",
        label: "thời gian phải nhập trả",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MustReturnNumHour",
        readonly: false,
        validatonList: ["number"],
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
    // {
    //     type: "checkbox",
    //     name: "chkIsActived",
    //     label: "Kích hoạt:",
    //     value: true,
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     readonly: false,
    //     validatonList: []
    // },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống:",
        value: false,
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
        name: "txtMaterialGroupID",
        label: "mã nhóm vật tư",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtMaterialGroupName",
        label: "tên nhóm vật tư",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MaterialGroupName",
        readonly: false,
        validatonList: ["required"],
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
        type: "checkbox",
        name: "chkIsMustReturnNotUseMaterial",
        label: "bắt buộc phải nhập trả nếu không sử dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "IsMustReturnNotUseMaterial",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtMustReturnNumHour",
        label: "thời gian phải nhập trả",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "MustReturnNumHour",
        readonly: false,
        validatonList: ["number"],
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
        Name: "MaterialGroupID",
        DefaultValue: "",
        BindControlName: "txtMaterialGroupID",
        DataSourceMember: "MaterialGroupID"
    },
    {
        Name: "MaterialGroupName",
        DefaultValue: "",
        BindControlName: "txtMaterialGroupName",
        DataSourceMember: "MaterialGroupName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "IsMustReturnNotUseMaterial",
        DefaultValue: "",
        BindControlName: "chkIsMustReturnNotUseMaterial",
        DataSourceMember: "IsMustReturnNotUseMaterial"
    },
    {
        Name: "MustReturnNumHour",
        DefaultValue: "",
        BindControlName: "txtMustReturnNumHour",
        DataSourceMember: "MustReturnNumHour"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: false,
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
        DataSourceMember: "MaterialGroupID",
        Width: 60
    },
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 160
    },
    {
        Name: "MaterialGroupName",
        Type: "texttolink",
        Link: "/MaterialGroup/Detail/",
        Caption: "Tên nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 250
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
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 200
    // },
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
        DataSourceMember: "MaterialGroupID",
        Width: 80,
        Link: "/MaterialGroup/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const TemplateExportMaterialGroup = [
    {
        "Mã nhóm vật tư": "VT01",
        "Tên nhóm vật tư": "nhóm vật tư A",
        "Mô tả": "mô tả vật tư",
        "Bắt Buộc Phải Nhập Trả Nếu Không Sử Dụng": 0,
        "Thời Gian Phải Nhập Trả": 10,
        "Kích hoạt": 1,
        "Hệ Thống": 0

    }
]

export const TemplateExportMaterialGroupProduct = [
    {
        "Mã nhóm vật tư": "VT01",
        "Mã sản phẩm vật tư": "abcd",
        "Tỷ lệ quy đổi": 0,
        "Mã đơn vị tính sản phẩm tạm ứng": 1,
        "Mã sản phẩm tạm ứng": "abcd",
        "Tỷ lệ quy đổi tạm ứng": 1,
        "Ghi chú": "ghi chu",
        "Kích hoạt": 1,
        "Hệ Thống": 0
    }
]


export const TemplateExportMaterialGroupInstallCond = [
    {
        "Mã nhóm vật tư": "VT01",
        "Nhóm sản phẩm áp dụng": 123,
        "Nhà sản xuất áp dụng": 123,
        "Thông số kỹ thuật áp dụng": 123,
        "Giá trị thông số kỹ thuật áp dụng": 123,
        "Mã sản phẩm áp dụng": "abc",
        "Mã sản phẩm vật tư": "abc",
        "Mã sản phẩm vật tư": "abc",
        "Mô tả": "abc",
        "Kích hoạt": 1,
        "Hệ Thống": 0
    }
]


export const SchemaMaterialGroup = {
    "Mã nhóm vật tư": {
        prop: 'MaterialGroupID',
        type: String,
        required: true
    },
    "Tên nhóm vật tư": {
        prop: 'MaterialGroupName',
        type: String,
        required: true
    },
    "Mô tả": {
        prop: 'Description',
        type: String
    },
    "Bắt buộc phải nhập trả nếu không sử dụng": {
        prop: 'IsMustReturnNotUseMaterial',
        type: Number,
    },
    "Thời gian phải nhập trả": {
        prop: 'MustReturnNumHour',
        type: Number
    },
    "Kích hoạt": {
        prop: 'IsActived',
        type: Number
    },
    "Hệ thống": {
        prop: 'IsSystem',
        type: Number
    }
}

export const SchemaMaterialGroupProduct = {
    "Mã nhóm vật tư": {
        prop: 'MaterialGroupID',
        type: String,
        required: true
    },
    "Mã sản phẩm vật tư": {
        prop: 'ProductID',
        type: String,
        required: true
    },
    "Tỷ lệ quy đổi": {
        prop: 'ConvertRatio',
        type: Number,
        required: true
    },
    "Mã đơn vị tính sản phẩm tạm ứng": {
        prop: 'AdvanceQuantityUnitID',
        type: Number,
        required: true
    },
    "Mã sản phẩm tạm ứng": {
        prop: 'AdvanceProductID',
        type: String,
        required: true
    },
    "Tỷ lệ quy đổi tạm ứng": {
        prop: 'AdvanceConveratio',
        type: Number,
        required: true
    },
    "Ghi chú": {
        prop: 'Note',
        type: String
    },
    "Kích hoạt": {
        prop: 'IsActived',
        type: Number
    },
    "Hệ Thống": {
        prop: 'IsSystem',
        type: Number
    }
}


export const SchemaMaterialGroupInstallCond = {
    "Mã nhóm vật tư": {
        prop: 'MaterialGroupID',
        type: String,
        required: true
    },
    "Nhóm sản phẩm áp dụng": {
        prop: 'ApplySubGroupID',
        type: Number
    },
    "Nhà sản xuất áp dụng": {
        prop: 'ApplyBrandID',
        type: Number
    },
    "Thông số kỹ thuật áp dụng": {
        prop: 'ApplyTechspecsID',
        type: Number
    },
    "Giá trị thông số kỹ thuật áp dụng": {
        prop: 'ApplyTechspecsValueID',
        type: Number
    },
    "Mã sản phẩm áp dụng": {
        prop: 'ApplyProductID',
        type: String
    },
    "Mã sản phẩm vật tư": {
        prop: 'MaterialProductID',
        type: String,
        required: true
    },
    "Mô tả": {
        prop: 'Description',
        type: String
    },
    "Kích hoạt": {
        prop: 'IsActived',
        type: Number
    },
    "Hệ Thống": {
        prop: 'IsSystem',
        type: Number
    }
}

export const lstColMaterialGroupImportExcelModal = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 60
    },
    {
        Name: "MaterialGroupName",
        Type: "text",
        Caption: "Tên nhóm vật tư",
        DataSourceMember: "MaterialGroupName",
        Width: 120
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 100
    },
    {
        Name: "IsMustReturnNotUseMaterial",
        Type: "checkicon",
        Caption: "Bắt buộc phải nhập trả nếu không sử dụng",
        DataSourceMember: "IsMustReturnNotUseMaterial",
        Width: 150
    },
    {
        Name: "MustReturnNumHour",
        Type: "text",
        Caption: "Thời gian phải nhập trả",
        DataSourceMember: "MustReturnNumHour",
        Width: 100
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 80
    },
    {
        Name: "errorContent",
        Type: "text",
        Caption: "Lỗi",
        DataSourceMember: "errorContent",
        Width: 100
    },
]


export const lstColMaterialGroupProductImportExcelModal = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 100
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm vật tư",
        DataSourceMember: "ProductID",
        Width: 100
    },
    {
        Name: "ConvertRatio",
        Type: "text",
        Caption: "Tỷ lệ quy đổi",
        DataSourceMember: "ConvertRatio",
        Width: 100
    },
    {
        Name: "AdvanceQuantityUnitID",
        Type: "text",
        Caption: "Đơn vị tính sản phẩm tạm ứng",
        DataSourceMember: "AdvanceQuantityUnitID",
        Width: 100
    },
    {
        Name: "AdvanceProductID",
        Type: "text",
        Caption: "Mã sản phẩm tạm ứng",
        DataSourceMember: "AdvanceProductID",
        Width: 100
    },
    {
        Name: "AdvanceConveratio",
        Type: "text",
        Caption: "Tỷ lệ quy đổi tạm ứng",
        DataSourceMember: "AdvanceConveratio",
        Width: 100
    },
    {
        Name: "Note",
        Type: "text",
        Caption: "Ghi chú",
        DataSourceMember: "Note",
        Width: 100
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 80
    },
    {
        Name: "errorContent",
        Type: "text",
        Caption: "Lỗi",
        DataSourceMember: "errorContent",
        Width: 100
    },
]


export const lstColMaterialGroupInstallCondImportExcelModal = [
    {
        Name: "MaterialGroupID",
        Type: "text",
        Caption: "Mã nhóm vật tư",
        DataSourceMember: "MaterialGroupID",
        Width: 60
    },
    {
        Name: "ApplySubGroupID",
        Type: "text",
        Caption: "Nhóm sản phẩm áp dụng",
        DataSourceMember: "ApplySubGroupID",
        Width: 120
    },
    {
        Name: "ApplyBrandID",
        Type: "text",
        Caption: "Nhà sản xuất áp dụng",
        DataSourceMember: "ApplyBrandID",
        Width: 120
    },
    {
        Name: "ApplyTechspecsID",
        Type: "text",
        Caption: "Thông số kỹ thuật áp dụng",
        DataSourceMember: "ApplyTechspecsID",
        Width: 120
    },
    {
        Name: "ApplyTechspecsValueID",
        Type: "text",
        Caption: "Giá trị thông số kỹ thuật áp dụng",
        DataSourceMember: "ApplyTechspecsValueID",
        Width: 120
    },
    {
        Name: "ApplyProductID",
        Type: "text",
        Caption: "Mã sản phẩm áp dụng",
        DataSourceMember: "ApplyProductID",
        Width: 120
    },
    {
        Name: "MaterialProductID",
        Type: "text",
        Caption: "Mã sản phẩm vật tư",
        DataSourceMember: "MaterialProductID",
        Width: 120
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
        Width: 100
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "IsSystem",
        Type: "checkicon",
        Caption: "Hệ thống",
        DataSourceMember: "IsSystem",
        Width: 80
    },
    {
        Name: "errorContent",
        Type: "text",
        Caption: "Lỗi",
        DataSourceMember: "errorContent",
        Width: 100
    }
]


export const lstColErrorMessageModal = [
    {
        Name: "row",
        Type: "text",
        Caption: "Dòng",
        DataSourceMember: "row",
    },
    {
        Name: "column",
        Type: "text",
        Caption: "Cột",
        DataSourceMember: "column",
    },
    {
        Name: "errorContent",
        Type: "text",
        Caption: "Thông tin lỗi",
        DataSourceMember: "errorContent",
    }
]