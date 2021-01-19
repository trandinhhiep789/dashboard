export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/FuelPrice/Search";
export const LoadAPIPath = "api/FuelPrice/Load";
export const AddAPIPath = "api/FuelPrice/Add";
export const UpdateAPIPath = "api/FuelPrice/Update";
export const DeleteAPIPath = "api/FuelPrice/Delete";
export const UpdateOrderAPIPath = "api/FuelPrice/UpdateOrder";
export const BackLink = "/FuelPrice";
export const AddLink = "/FuelPrice/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "FuelPriceID";
export const InitSearchParams = [{ SearchKey: "@Keyword", SearchValue: "" }];

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng giá nhiên liệu" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/FuelPrice", Title: "Danh sách bảng giá nhiên liệu" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/FuelPrice", Title: "Danh sách bảng giá nhiên liệu" },
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
        name: "txtFuelPriceName",
        label: "tên bảng giá nhiên liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FuelPriceName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDate",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDate",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "Price",
        label: "giá",
        value: 0,
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Price",
        readonly: false,
        validatonList: ["digit"],
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
        name: "chkIsActived",
        label: "Kích hoạt:",
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
        name: "txtFuelPriceID",
        label: "mã bảng giá nhiên liệu",
        value: "",
        maxSize: "5",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FuelPriceID",
        readonly: true,
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtFuelPriceName",
        label: "tên bảng giá nhiên liệu",
        value: "",
        maxSize: "200",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "FuelPriceName",
        readonly: false,
        validatonList: ["required"],
    },
    {
        type: "date",
        name: "ApplyFromDate",
        label: "ngày áp dụng từ",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyFromDateString",
        validatonList: ["required"]
    },
    {
        type: "date",
        name: "ApplyToDate",
        label: "ngày áp dụng đến",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "ApplyToDateString",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "Price",
        label: "giá",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "Price",
        readonly: false,
        validatonList: ["digit"],
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
        Name: "FuelPriceID",
        DefaultValue: "",
        BindControlName: "txtFuelPriceID",
        DataSourceMember: "FuelPriceID"
    },
    {
        Name: "FuelPriceName",
        DefaultValue: "",
        BindControlName: "txtFuelPriceName",
        DataSourceMember: "FuelPriceName"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "txtDescription",
        DataSourceMember: "Description"
    },
    {
        Name: "Price",
        DefaultValue: "",
        BindControlName: "Price",
        DataSourceMember: "Price"
    },
    {
        Name: "ApplyFromDate",
        DefaultValue: "",
        BindControlName: "ApplyFromDate",
        DataSourceMember: "ApplyFromDate"
    },
    {
        Name: "ApplyToDate",
        DefaultValue: "",
        BindControlName: "ApplyToDate",
        DataSourceMember: "ApplyToDate"
    },
    {
        Name: "ApplyFromDateString",
        DefaultValue: "",
        BindControlName: "ApplyFromDateString",
        DataSourceMember: "ApplyFromDateString"
    },
    {
        Name: "ApplyToDateString",
        DefaultValue: "",
        BindControlName: "ApplyToDateString",
        DataSourceMember: "ApplyToDateString"
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
        DataSourceMember: "FuelPriceID",
        Width: 60
    },
    // {
    //     Name: "FuelPriceID",
    //     Type: "text",
    //     Caption: "Mã bảng giá nhiên liệu",
    //     DataSourceMember: "FuelPriceID",
    //     Width: 160
    // },
    {
        Name: "FuelPriceName",
        Type: "text",
        Caption: "Tên bảng giá nhiên liệu",
        DataSourceMember: "FuelPriceName",
        Width: 250
    },
    {
        Name: "ApplyFromDateString",
        Type: "text",
        Caption: "Ngày áp dụng từ",
        DataSourceMember: "ApplyFromDateString",
        Width: 150
    },
    {
        Name: "ApplyToDateString",
        Type: "text",
        Caption: "Ngày áp dụng đến",
        DataSourceMember: "ApplyToDateString",
        Width: 150
    },
    {
        Name: "Price",
        Type: "textCurrency",
        Caption: "Giá",
        DataSourceMember: "Price",
        Width: 150
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
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedUserFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUserFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "FuelPriceID",
        Width: 80,
        Link: "/FuelPrice/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
