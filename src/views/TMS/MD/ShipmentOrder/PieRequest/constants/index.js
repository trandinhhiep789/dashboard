export const APIHostName = "PIMAPI";
export const SearchAPIPath = "api/PieRequest/Search";
export const LoadAPIPath = "api/PieRequest/Load";
export const AddAPIPath = "api/PieRequest/Add";
export const UpdateAPIPath = "api/PieRequest/Update";
export const DeleteAPIPath = "api/PieRequest/Delete";
export const UpdateOrderAPIPath = "api/PieRequest/UpdateOrder";
export const BackLink = "/PieRequest";
export const AddLink = "/PieRequest/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "PieRequestID";
export const AddProductLink = "/PierequestProduct/Generalinfo";
export const IDSelectColumnProductName = "chkSelect";
export const PKColumnProductName = "PieRequestID";
export const AddLogAPIPath = "api/UserActivity/Add";


export const PagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu chỉnh sủa thông tin sản phẩm" }
];

export const EditPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu chỉnh sủa thông tin sản phẩm" },
{ Link: "", Title: "Sửa Yêu cầu chỉnh sủa thông tin sản phẩm" }

];

export const AddPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/PieRequest", Title: "Yêu cầu chỉnh sủa thông tin sản phẩm" },
{ Link: "", Title: "Thêm Yêu cầu chỉnh sủa thông tin sản phẩm" }

];

export const AddProductPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/PieRequestProduct", Title: "Yêu cầu chỉnh sủa thông tin sản phẩm" },
{ Link: "", Title: "Thêm Yêu cầu chỉnh sủa thông tin sản phẩm" }

];
export const EditProductPagePath = [{ Link: "", Title: "Trang chủ" },
{ Link: "/PieRequestProduct", Title: "Yêu cầu chỉnh sủa thông tin sản phẩm" },
{ Link: "", Title: "Sửa Yêu cầu chỉnh sủa thông tin sản phẩm" }

];
const dtFromdate = new Date()
dtFromdate.setDate(new Date().getDate() - 30);
export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@SearchType",
        SearchValue: "-1"
    },
    {
        SearchKey: "@FromDate",
        SearchValue: dtFromdate
    },
    {
        SearchKey: "@ToDate",
        SearchValue: new Date()
    }
];

export const SearchElementList = [
    {
        type: "groupTextAndSelect",
        name: "txtKeyword",
        label: "",
        value: "",
        placeholder: "Từ khóa",
        icon: "",
        labelOption: "Tìm theo:",
        nameOption: "slSearchType",
        valueOption: -1,
        iconOption: "",
        listoption: [
            { value: -1, label: '--Vui lòng chọn--' },
            { value: 1, label: 'Mã yêu cầu' },
            { value: 2, label: 'Tên yêu cầu' },
        ],
        DataSourceMember: "SearchTypeID",
        ValueMember: "SearchTypeID",
        NameMember: "SearchTypeName",
        validatonList: []
    },
    // {
    //     type: "textType",
    //     name: "txtKeyword",
    //     label: "Từ khóa:",
    //     value: "",
    //     placeholder: "Từ khóa",
    //     icon: "",
    //     listoption: [],
    //     validatonList: []

    // },
    // {
    //     type: "select",
    //     name: "slSearchType",
    //     label: "Tìm theo:",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [
    //         { value: -1, label: '--Vui lòng chọn--' },
    //         { value: 1, label: 'Mã yêu cầu' },
    //         { value: 2, label: 'Tên yêu cầu' },
    //     ],
    //     DataSourceMember: "SearchTypeID",
    //     ValueMember: "SearchTypeID",
    //     NameMember: "SearchTypeName"
    // },
    {
        type: "date",
        name: "dtFromDate",
        label: "Từ ngày:",
        value: dtFromdate,
        placeholder: "",
        icon: "",
        DataSourceMember: "FromDate",
        ValueMember: "FromDate",
        NameMember: "FromDate"
    },
    {
        type: "date",
        name: "dtToDate",
        label: "Đến ngày:",
        value: new Date(),
        placeholder: "",
        icon: "",
        DataSourceMember: "ToDate",
        ValueMember: "ToDate",
        NameMember: "ToDate"
    }
];

export const AddElementList = [
    {
        type: "text",
        name: "txtPieRequestID",
        label: "Mã yêu cầu:",
        value: "",
        placeholder: "Mã tự động",
        icon: "",
        listoption: [],
        DataSourceMember: "PieRequestName",
        readonly: true
    },
    {
        type: "datetime",
        name: "txtRequestDate",
        label: "Ngày yêu cầu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RequestDate",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPieRequestName",
        label: "Tiêu đề:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PieRequestName",
        readonly: false,
        validatonList: ["required"]

    },
    {
        type: "select",
        name: "txtPieRequestTypeID",
        label: "Loại yêu cầu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PieRequestTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIEREQUESTTYPE",
        ValueMember: "PieRequestTypeID",
        NameMember: "PieRequestTypeName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    }
];

export const EditElementList = [
    {
        type: "text",
        name: "txtPieRequestID",
        label: "Mã Yêu cầu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: true,
        DataSourceMember: "PieRequestID",
        validatonList: []

    },
    {
        type: "datetime",
        name: "txtRequestDate",
        label: "Ngày yêu cầu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "RequestDate",
        validatonList: ["required"]
    },
    {
        type: "text",
        name: "txtPieRequestName",
        label: "Tiêu đề:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "PieRequestName",
        validatonList: ['required']

    },
    {
        type: "select",
        name: "txtPieRequestTypeID",
        label: "Loại yêu cầu:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "PieRequestTypeID",
        readonly: true,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "PIMCACHE.PIEREQUESTTYPE",
        ValueMember: "PieRequestTypeID",
        NameMember: "PieRequestTypeName",
        validatonList: ["required"]
    },
    {
        type: "textarea",
        name: "txtDescription",
        label: "Mô tả:",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        readonly: false,
        DataSourceMember: "Description",
        validatonList: []

    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "SearchType",
        DefaultValue: "",
        BindControlName: "slSearchType"
    },
    {
        Name: "FromDate",
        DefaultValue: "",
        BindControlName: "dtFromDate"
    },
    {
        Name: "ToDate",
        DefaultValue: "",
        BindControlName: "dtToDate"
    }
];

export const MLObjectDefinition = [
    {
        Name: "PieRequestID",
        DefaultValue: "",
        BindControlName: "txtPieRequestID",
        DataSourceMember: "PieRequestID"
    },
    {
        Name: "PieRequestTypeID",
        DefaultValue: "",
        BindControlName: "txtPieRequestTypeID",
        DataSourceMember: "PieRequestTypeID"
    },
    {
        Name: "PieRequestName",
        DefaultValue: "",
        BindControlName: "txtPieRequestName",
        DataSourceMember: "PieRequestName"
    },
    {
        Name: "RequestDate",
        DefaultValue: "",
        BindControlName: "txtRequestDate",
        DataSourceMember: "RequestDate"
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
        BindControlName: "",
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
        Name: "PieRequestLang",
        DefaultValue: {},
        BindControlName: "inputGridPieRequestLang",
        DataSourceMember: "inputGridPieRequestLang"
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PieRequestID",
        Width: 50
    },
    {
        Name: "PieRequestID",
        Type: "texttolink",
        Caption: "Mã Yêu cầu",
        DataSourceMember: "PieRequestID",
        Link: "/PieRequest/Edit/",
        Width: 150
    },
    {
        Name: "PieRequestName",
        Type: "texttolink",
        Caption: "Tiêu đề",
        DataSourceMember: "PieRequestName",
        Link: "/PieRequest/Edit/",
        Width: 400
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 70
    },
    {
        Name: "CreatedDate",
        Type: "date",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        Width: 100
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
        Type: "edit",
        Caption: "Tác vụ",
        DataSourceMember: "PieRequestID",
        Width: 80,
        Link: "/PieRequest/Edit/",
        LinkText: "Chỉnh sửa"
    }
];
export const PieRequestWFColumnList = [
    {
        Name: "PieRequestStepName",
        Type: "text",
        Caption: "Bước xử lý",
        DataSourceMember: "PieRequestStepName",
        Width: 150
    },
    {
        Name: "IsProcess",
        Type: "checkicon",
        Caption: "Đã xử lý",
        DataSourceMember: "IsProcess",
        Width: 150
    },
    {
        Name: "ProcessUser",
        Type: "text",
        Caption: "Người xử lý",
        DataSourceMember: "ProcessUser",
        Width: 150
    },
    {
        Name: "ProcessDate",
        Type: "date",
        Caption: "Ngày xử lý",
        DataSourceMember: "ProcessDate",
        Width: 150
    },
]
export const DataGridColumnProductList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "PieRequestListID",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 300
    },
    {
        Name: "CategoryName",
        Type: "text",
        Caption: "Danh mục",
        DataSourceMember: "CategoryName",
        Width: 500
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "PieRequestListID",
        Width: 200,
        Link: "/PierequestProduct/Edit/",
        LinkText: "Chỉnh sửa"
    }

];

///hoc
export const SearchElementListPro = [
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
export const SearchMLObjectDefinitionPro = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];