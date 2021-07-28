export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/ServicePriceTable/Search";
export const LoadAPIPath = "api/ServicePriceTable/LoadNew";
export const AddAPIPath = "api/ServicePriceTable/Add";
export const UpdateAPIPath = "api/ServicePriceTable/Update";
export const DeleteAPIPath = "api/ServicePriceTable/Delete";
export const BackLink = "/ServicePriceTable";
export const AddLink = "/ServicePriceTable/Add";

export const AddAPISPTDetailPath = "api/ServicePriceTableDetail/Add"; 
export const EditAPISPTDetailPath = "api/ServicePriceTableDetail/Update";
export const DeleteAPISPTDetailPath = "api/ServicePriceTableDetail/Delete";

export const AddAPISPTAreaPath = "api/ServicePriceTable_Area/Add";
export const EditAPISPTAreaPath = "api/ServicePriceTable_Area/Update";
export const DeleteAPISPTAreaPath = "api/ServicePriceTable_Area/Delete";



export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "ServicePriceTableID";

export const TitleFromSPTDetail = "Danh sách chi tiết bảng giá dịch vụ";
export const TitleFromSPTArea = "Danh sách khu vực áp dụng bảng giá dịch vụ";

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách bảng giá dịch vụ" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ServicePriceTable", Title: "Danh sách bảng giá dịch vụ" },
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

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];




export const MLObjectDefinition = [
    {
        Name: "ServicePriceTableID",
        DefaultValue: "",
        BindControlName: "txtServicePriceTableID",
        DataSourceMember: "ServicePriceTableID"
    },
    {
        Name: "ServicePriceTableName",
        DefaultValue: "",
        BindControlName: "txtServicePriceTableName",
        DataSourceMember: "ServicePriceTableName"
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
    }

];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ServicePriceTableID",
        Width: 100
    },
    {
        Name: "ServicePriceTableID",
        Type: "texttolink",
        Caption: "Mã bảng giá dịch vụ",
        DataSourceMember: "ServicePriceTableID",
        Link: "/ServicePriceTable/Detail/",
        Width: 150
    },
    {
        Name: "ServicePriceTableName",
        Type: "text",
        Caption: "Tên bảng giá dịch vụ",
        DataSourceMember: "ServicePriceTableName",
        Width: 300
    },
    {
        Name: "Description",
        Type: "text",
        Caption: "Mô tả",
        DataSourceMember: "Description",
    },
    {
        Name: "UpdatedDate",
        Type: "datetime",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 200
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ServicePriceTableID",
        Width: 150,
        Link: "/ServicePriceTable/Edit/",
        LinkText: "Chỉnh sửa"
    }
];


export const DataGridColumnSPTDetailItemList = [
    {
        Name: "ServiceGroupName",
        Type: "text",
        Caption: "Mã bảng giá dịch vụ",
        DataSourceMember: "ServiceGroupName",
        Width: 100
    },
    {
        Name: "MainGroupFullName",
        Type: "text",
        Caption: "Nghành hàng",
        DataSourceMember: "MainGroupFullName",
        Width: 100
    },
    {
        Name: "SubGroupFullName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupFullName",
        Width: 100
    },
    {
        Name: "TechspecsName",
        Type: "text",
        Caption: "Thông số kỹ thuật",
        DataSourceMember: "TechspecsName",
        Width: 100
    },
    {
        Name: "TechspecsValue",
        Type: "text",
        Caption: "Giá trị TSKT",
        DataSourceMember: "TechspecsValue",
        Width: 100
    },
    {
        Name: "IsPriceByTechspecsValueRange",
        Type: "checkbox",
        Caption: "Tính theo giá trị TSKT",
        DataSourceMember: "IsPriceByTechspecsValueRange",
        Width: 150
    },
    {
        Name: "FromTechspecsValue",
        Type: "textNumber",
        Caption: "Giá trị TSKT từ",
        DataSourceMember: "FromTechspecsValue",
        Width: 100
    },
    {
        Name: "ToTechspecsValue",
        Type: "textNumber",
        Caption: "Giá trị TSKT đến", //Giá trị thông số kỹ thuật đến
        DataSourceMember: "ToTechspecsValue",
        Width: 100
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Sản phẩm",
        DataSourceMember: "ProductName",
        Width: 100
    },
    {
        Name: "ServicePrice",
        Type: "textCurrency",
        Caption: "Giá dịch vụ",
        DataSourceMember: "ServicePrice",
        Width: 100
    },
    {

        Name: "Action",
        Type: "groupAction",
        Caption: "Tác vụ",
        DataSourceMember: "ServicePriceTableDetailID",
        Width: 50,
        Link: "/ServicePriceTable/ServicePriceTableDetail/Edit/",
        LinkText: "Chỉnh sửa"
    }

];

export const DataGridColumnSPTAreatemList = [


    {
        Name: "AreaID",
        Type: "text",
        Caption: "Mã khu vực",
        DataSourceMember: "AreaID",
        Width: 100
    },

    {
        Name: "AreaName",
        Type: "text",
        Caption: "Tên khu vực",
        DataSourceMember: "AreaName",
        Width: 300
    },

    {
        Name: "Action",
        Type: "buttonDeleteNew",
        Caption: "Tác vụ",
        DataSourceMember: "AreaID",
        Width: 50,
        LinkText: "Chỉnh sửa"
    }
];


export const MLObjectSPTDetailItem = [
    {
        Name: "ServicePriceTableID",
        DefaultValue: {},
        BindControlName: "txtServicePriceTableID",
        DataSourceMember: "ServicePriceTableID"
    },
    {
        Name: "ServiceGroupID",
        DefaultValue: {},
        BindControlName: "cbServiceGroup",
        DataSourceMember: "ServiceGroupID"
    },
    {
        Name: "MainGroupID",
        DefaultValue: {},
        BindControlName: "cbMainGroup",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: {},
        BindControlName: "cbSubGroup",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "TechspecsID",
        DefaultValue: {},
        BindControlName: "cbTechSpecs",
        DataSourceMember: "TechspecsID"
    },
    {
        Name: "TechSpecsValueID",
        DefaultValue: {},
        BindControlName: "cbTechSpecsValue",
        DataSourceMember: "TechSpecsValueID"
    },

    {
        Name: "IsPriceByTechspecsValueRange",
        DefaultValue: false,
        BindControlName: "ckIsPriceByTechspecsValueRange",
        DataSourceMember: "IsPriceByTechspecsValueRange"
    },

    {
        Name: "FromTechspecsValue",
        DefaultValue: {},
        BindControlName: "txtFromTechspecsValue",
        DataSourceMember: "FromTechspecsValue"
    },

    {
        Name: "ToTechspecsValue",
        DefaultValue: {},
        BindControlName: "txtToTechspecsValue",
        DataSourceMember: "ToTechspecsValue"
    },

    {

        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "cbProductID",
        DataSourceMember: "ProductID"
    },

    {
        Name: "ServicePrice",
        DefaultValue: {},
        BindControlName: "txtServicePrice",
        DataSourceMember: "ServicePrice"
    },

    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "ckIsSystem",
        DataSourceMember: "IsSystem"
    },
]

export const MLObjectSPTAreaItem = [
    {
        Name: "AreaID",
        DefaultValue: {},
        BindControlName: "cbAreaID",
        DataSourceMember: "AreaID"
    },
]