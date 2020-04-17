export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/InventoryStatus/Search";
export const LoadAPIPath = "api/InventoryStatus/Load";
export const AddAPIPath = "api/InventoryStatus/Add";
export const UpdateAPIPath = "api/InventoryStatus/Update";
export const DeleteAPIPath = "api/InventoryStatus/Delete";
export const UpdateOrderAPIPath = "api/InventoryStatus/UpdateOrder";
export const BackLink = "/InventoryStatus";
export const AddLink = "/InventoryStatus/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "InventoryStatusID";
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InventoryStatus", Title: "Trạng thái hàng hóa tồn kho" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InventoryStatus", Title: "Trạng thái hàng hóa tồn kho" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/InventoryStatus", Title: "Trạng thái hàng hóa tồn kho" },
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
        name: "txtInventoryStatusID",
        label: "Mã trạng thái tồn kho",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryStatusID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtInventoryStatusName",
        label: "Tên trạng thái tồn kho",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryStatusName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInventoryStatusShortName",
        label: "Tên rút gọn (để in trên hóa đơn) của trạng thái tồn kho",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryStatusShortName",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        rows: "6",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: true,
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
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: 0,
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        type: "text",
        name: "txtColorID",
        label: "Mã màu:",
        value: 0,
        placeholder: "",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: ["required", "number"]
    }
];

export const EditElementList = [
    // {
    //     type: "text",
    //     name: "txtInventoryStatusID",
    //     label: "Mã trạng thái tồn kho",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "InventoryStatusID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "text",
        name: "txtInventoryStatusName",
        label: "Tên trạng thái tồn kho",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryStatusName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtInventoryStatusShortName",
        label: "Tên rút gọn (để in trên hóa đơn) của trạng thái tồn kho",
        value: "",
        maxSize: "100",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "InventoryStatusShortName",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
        value: "",
        maxSize: "2000",
        placeholder: "Mô tả",
        rows: "6",
        icon: "",
        listoption: {},
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsActived",
        label: "Kích hoạt",
        value: "",
        placeholder: "",
        DataSourceMember: "IsActived",
        icon: "",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "checkbox",
        name: "chkIsSystem",
        label: "Hệ thống",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "IsSystem",
        listoption: {},
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["required","number"]
    },
    {
        type: "text",
        name: "txtColorID",
        label: "Mã màu:",
        value: 0,
        placeholder: "",
        icon: "",
        DataSourceMember: "ColorID",
        listoption: {},
        readonly: false,
        validatonList: ["required", "number"]
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
        Name: "InventoryStatusID",
        DefaultValue: "",
        BindControlName: "txtInventoryStatusID",
        DataSourceMember: "InventoryStatusID"
    },
    {
        Name: "InventoryStatusName",
        DefaultValue: "",
        BindControlName: "txtInventoryStatusName",
        DataSourceMember: "InventoryStatusName"
    },
    {
        Name: "InventoryStatusShortName",
        DefaultValue: "",
        BindControlName: "txtInventoryStatusShortName",
        DataSourceMember: "InventoryStatusShortName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
        BindControlName: "txtOrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "ColorID",
        DefaultValue: "0",
        BindControlName: "txtColorID",
        DataSourceMember: "ColorID"
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
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "InventoryStatusID",
        Width: 150
    },
    {
        Name: "InventoryStatusID",
        Type: "text",
        Caption: "Mã trạng thái",
        DataSourceMember: "InventoryStatusID",
        Width: 150
    },
    {
        Name: "InventoryStatusName",
        Type: "text",
        Caption: "Tên trạng thái tồn kho",
        DataSourceMember: "InventoryStatusName",
        Width: 400
    },
    {
        Name: "InventoryStatusShortName",
        Type: "text",
        Caption: "Tên rút gọn trạng thái tồn kho",
        DataSourceMember: "InventoryStatusShortName",
        Width: 400
    },
    {
        Name: "ColorID",
        Type: "text",
        Caption: "Mã màu",
        DataSourceMember: "ColorID",
        Width: 100
    },
    {
        Name: "OrderIndex",
        Type: "text",
        Caption: "Thứ tự hiển thị",
        DataSourceMember: "OrderIndex",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 200
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "InventoryStatusID",
        Width: 200,
        Link: "/InventoryStatus/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
