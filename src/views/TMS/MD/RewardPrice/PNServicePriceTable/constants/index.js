export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/pnServicePriceTable/Search";
export const LoadAPIPath = "api/pnServicePriceTable/Load";
export const LoadNewAPIPath = "api/pnServicePriceTable/LoadNew";
export const AddAPIPath = "api/pnServicePriceTable/Add";
export const UpdateAPIPath = "api/pnServicePriceTable/Update";
export const DeleteAPIPath = "api/pnServicePriceTable/DeleteList";
export const BackLink = "/PNServicePriceTable";
export const AddLink = "/PNServicePriceTable/Add";
export const AddLogAPIPath = "api/RewardPriceTable/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "pnServicePriceTableID";

export const EditAPIRPTDetailPath = "api/PNServicePriceTableDetail/Update";
export const AddAPIRPTDetailPath = "api/PNServicePriceTableDetail/Add";
export const DeleteAPIRPTDetailPath = "api/PNServicePriceTableDetail/Delete";

export const TitleFormDetail = "Thông tin đơn giá giao hàng và lắp đặt đối tác";
export const TitleFromRPTDetail = "Chi tiết bảng giá dịch vụ của đối tác";

export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đơn giá giao hàng và lắp đặt đối tác" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNServicePriceTable", Title: "Danh sách đơn giá giao hàng và lắp đặt đối tác" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNServicePriceTable", Title: "Danh sách đơn giá giao hàng và lắp đặt đối tác" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/PNServicePriceTable", Title: "Danh sách đơn giá giao hàng và lắp đặt đối tác" },
    { Link: "", Title: "Chi tiết" }
];


export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
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

export const InitSearchParams = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    }
];

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "pnServicePriceTableID",
        Width: 60
    },
    {
        Name: "pnServicePriceTableID",
        Type: "text",
        Caption: "Mã đơn giá",
        DataSourceMember: "pnServicePriceTableID",
        Width: 80
    },
    {
        Name: "pnServicePriceTableID",
        Type: "texttolink",
        Caption: "Tên đơn giá",
        DataSourceMember: "pnServicePriceTableName",
        Link: "/PNServicePriceTable/Detail/",
        Width: 250
    },
    {
        Name: "FullServiceSeasonType",
        Type: "text",
        Caption: "Mùa vụ",
        DataSourceMember: "FullServiceSeasonType",
        Width: 250
    },
    // {
    //     Name: "FullServiceArea",
    //     Type: "text",
    //     Caption: "Khu vực áp dụng",
    //     DataSourceMember: "FullServiceArea",
    //     Width: 200
    // },

    {
        Name: "CreateFullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreateFullName",
        Width: 120
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "pnServicePriceTableID",
        Width: 100,
        Link: "/PNServicePriceTable/Edit/",
        LinkText: "Chỉnh sửa"
    },
]


export const MLObjectDefinition = [
    {
        Name: "pnServicePriceTableID",
        DefaultValue: {},
        BindControlName: "txtpnServicePriceTableID",
        DataSourceMember: "pnServicePriceTableID"
    },
    {
        Name: "pnServicePriceTableName",
        DefaultValue: {},
        BindControlName: "txtpnServicePriceTableName",
        DataSourceMember: "pnServicePriceTableName"
    },
    {
        Name: "ServiceSeasonTypeID",
        DefaultValue: {},
        BindControlName: "cbServiceSeasonTypeID",
        DataSourceMember: "ServiceSeasonTypeID"
    },
    {
        Name: "ServiceAreaID",
        DefaultValue: {},
        BindControlName: "cbServiceAreaID",
        DataSourceMember: "ServiceAreaID"
    },
    {
        Name: "Description",
        DefaultValue: {},
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


]

export const DataGridColumnItemListRPTDetail = [
    {
        Name: "MainGroupName",
        Type: "text",
        Caption: "Nghành hàng",
        DataSourceMember: "MainGroupName",
        Width: 100
    },
    {
        Name: "SubGroupName",
        Type: "text",
        Caption: "Nhóm hàng",
        DataSourceMember: "SubGroupName",
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
        Caption: "Giá trị TSKT đến",
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
        Type: "editnew",
        Caption: "Tác vụ",
        DataSourceMember: "",
        Width: 70,
    }

]

export const MLObjectRPTDetailItem = [
    {
        Name: "pnServicePriceTableDetailID",
        DefaultValue: {},
        BindControlName: "txtpnServicePriceTableDetailID",
        DataSourceMember: "pnServicePriceTableDetailID"
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
        Name: "TechspecsValueID",
        DefaultValue: {},
        BindControlName: "cbTechSpecsValue",
        DataSourceMember: "TechspecsValueID"
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
