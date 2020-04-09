export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/AttributeValue/Search";
export const LoadAPIPath = "api/AttributeValue/Load";
export const AddAPIPath = "api/AttributeValue/Add";
export const UpdateAPIPath = "api/AttributeValue/Update";
export const DeleteAPIPath = "api/AttributeValue/Delete";
export const UpdateOrderAPIPath = "api/AttributeValue/UpdateOrder";
export const BackLink = "/AttributeValue";
export const AddLink = "/AttributeValue/Add";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AttributeValueID";
const dtFromdate = new Date();
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];
export const PagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "", Title: "Giá trị thuộc tính sản phẩm" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeValue", Title: "Giá trị thuộc tính sản phẩm" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ" },
    { Link: "/AttributeValue", Title: "Giá trị thuộc tính sản phẩm" },
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
    //     name: "txtAttributeValueID",
    //     label: "Giá trị thuộc tính",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AttributeValueID",
    //     readonly: false,
    //     validatonList: ["required", "number"]
    // },
    {
        type: "select",
        name: "comboAttributeID",
        label: "Thuộc tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTE",
        ValueMember: "AttributeID",
        NameMember: "AttributeName"
    },
    {
        type: "select",
        name: "txtAttributeValueTypeID",
        label: "Loại giá trị thuộc tính",
        value: "",
        //placeholder: "1: Số; 2: Chuổi; 3: Ngày",
        icon: "",
        listoption: [{ "value": "1", "label": "số" }, { "value": "2", "label": "chuỗi" }, { "value": "3", "label": "ngày" }],
        DataSourceMember: "AttributeValueTypeID",
        IsAutoLoadItemFromCache: false,
        readonly: false,
        validatonList: []
    },

    {
        type: "text",
        name: "txtAttributeValueName",
        label: "Tên giá trị thuộc tính",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeValueName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "numeric",
        name: "txtAttributeNumberValue",
        label: "Giá trị kiểu số",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeNumberValue",
        readonly: false,
        validatonList: ["number"]
    },
    // {
    //     type: "text",
    //     name: "txtAttributeDateTimeValue",
    //     label: "Giá trị kiểu ngày",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AttributeDateTimeValue",
    //     readonly: false,
    //     validatonList: []

    // },
    {
        type: "datetime",
        name: "txtAttributeDateTimeValue",
        label: "Giá trị kiểu ngày",
        value: dtFromdate,
        placeholder: "",
        icon: "",
        DataSourceMember: "AttributeDateTimeValue",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        readonly: false,
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtAttributeValueID",
        label: "Mã giá trị thuộc tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeValueID",
        readonly: true,
        validatonList: ["required", "number"]
    },
    {
        type: "select",
        name: "comboAttributeID",
        label: "Thuộc tính",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "AttributeID",
        readonly: false,
        validatonList: ["required", "number"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIMATTRIBUTE",
        ValueMember: "AttributeID",
        NameMember: "AttributeName"
    },
    {
        type: "select",
        name: "txtAttributeValueTypeID",
        label: "Loại giá trị thuộc tính",
        value: "",
        //placeholder: "1: Số; 2: Chuổi; 3: Ngày",
        icon: "",
        listoption: [{ "value": "1", "label": "số" }, { "value": "2", "label": "chuỗi" }, { "value": "3", "label": "ngày" }],
        DataSourceMember: "AttributeValueTypeID",
        IsAutoLoadItemFromCache: false,
        readonly: false,
        validatonList: []
    },

    {
        type: "text",
        name: "txtAttributeValueName",
        label: "Tên giá trị thuộc tính",
        value: "",
        maxSize: "500",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeValueName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        type: "numeric",
        name: "txtAttributeNumberValue",
        label: "Giá trị kiểu số",
        value: "",
        maxSize: "20",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "AttributeNumberValue",
        readonly: false,
        validatonList: ["number"]
    },
    // {
    //     type: "text",
    //     name: "txtAttributeDateTimeValue",
    //     label: "Giá trị kiểu ngày",
    //     value: "",
    //     placeholder: "",
    //     icon: "",
    //     listoption: {},
    //     DataSourceMember: "AttributeDateTimeValue",
    //     readonly: false,
    //     validatonList: []

    // },
    {
        type: "datetime",
        name: "txtAttributeDateTimeValue",
        label: "Giá trị kiểu ngày",
        value: "",
        placeholder: "",
        icon: "",
        DataSourceMember: "AttributeDateTimeValue",
        readonly: false,
        validatonList: []
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả",
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
        type: "numeric",
        name: "txtOrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
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
        readonly: false,
        DataSourceMember: "IsActived",
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
        DataSourceMember: "IsSystem",
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
        Name: "AttributeValueID",
        DefaultValue: "",
        BindControlName: "txtAttributeValueID",
        DataSourceMember: "AttributeValueID"
    },
    {
        Name: "AttributeID",
        DefaultValue: "",
        BindControlName: "comboAttributeID",
        DataSourceMember: "AttributeID"
    },

    {
        Name: "AttributeValueTypeID",
        DefaultValue: "",
        BindControlName: "txtAttributeValueTypeID",
        DataSourceMember: "AttributeValueTypeID"
    },

    {
        Name: "AttributeValueName",
        DefaultValue: "",
        BindControlName: "txtAttributeValueName",
        DataSourceMember: "AttributeValueName"
    },
    {
        Name: "AttributeNumberValue",
        DefaultValue: "",
        BindControlName: "txtAttributeNumberValue",
        DataSourceMember: "AttributeNumberValue"
    },
    {
        Name: "AttributeDateTimeValue",
        DefaultValue: "",
        BindControlName: "txtAttributeDateTimeValue",
        DataSourceMember: "AttributeDateTimeValue"
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
        DataSourceMember: "AttributeValueID",
        Width: 60
    },
    {
        Name: "AttributeValueID",
        Type: "text",
        Caption: "Mã giá trị thuộc tính",
        DataSourceMember: "AttributeValueID",
        Width: 120
    },
    {
        Name: "AttributeName",
        Type: "text",
        Caption: "Thuộc tính",
        DataSourceMember: "AttributeName",
        Width: 100
    },
    {
        Name: "AttributeValueTypeID",
        Type: "text",
        Caption: "Loại giá trị thuộc tính",
        DataSourceMember: "AttributeValueTypeID",
        Width: 150
    },
    {
        Name: "AttributeValueName",
        Type: "text",
        Caption: "Tên giá trị thuộc tính",
        DataSourceMember: "AttributeValueName",
        Width: 150
    },
    {
        Name: "AttributeNumberValue",
        Type: "text",
        Caption: "Giá trị kiểu số",
        DataSourceMember: "AttributeNumberValue",
        Width: 110
    },
    {
        Name: "AttributeDateTimeValue",
        Type: "text",
        Caption: "Giá trị kiểu ngày",
        DataSourceMember: "AttributeDateTimeValue",
        Width: 110
    },

    // {
    //     Name: "Description",
    //     Type: "text",
    //     Caption: "Mô tả",
    //     DataSourceMember: "Description",
    //     Width: 200
    // },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 150
    },
    {
        Name: "CreatedFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedFullName",
        Width: 150
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "AttributeValueID",
        Width: 80,
        Link: "/AttributeValue/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
