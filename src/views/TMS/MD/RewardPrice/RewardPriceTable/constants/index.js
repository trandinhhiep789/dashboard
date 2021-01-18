export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/RewardPriceTable/Search";
export const LoadAPIPath = "api/RewardPriceTable/Load";
export const LoadNewAPIPath = "api/RewardPriceTable/LoadNew";
export const AddAPIPath = "api/RewardPriceTable/Add";
export const UpdateAPIPath = "api/RewardPriceTable/Update";
export const DeleteAPIPath = "api/RewardPriceTable/DeleteList";
export const BackLink = "/RewardPriceTable";
export const AddLink = "/RewardPriceTable/Add";
export const AddLogAPIPath = "api/RewardPriceTable/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "RewardPriceTableID";

export const EditAPIRPTDetailPath = "api/RewardPriceTableDetail/Update";
export const AddAPIRPTDetailPath = "api/RewardPriceTableDetail/Add";
export const DeleteAPIRPTDetailPath = "api/RewardPriceTableDetail/Delete";

export const EditAPIRPTExceptionPath = "api/RewardPriceTable_Exception/Update";
export const AddAPIRPTExceptionPath = "api/RewardPriceTable_Exception/Add";
export const DeleteAPIRPTExceptionPath = "api/RewardPriceTable_Exception/Delete";

export const TitleFormDetail = "Thông tin đơn giá thưởng giao hàng và lắp đặt";
export const TitleFromRPTDetail = "Chi tiết thông tin đơn giá thưởng giao hàng và lắp đặt";
export const TitleFromRPTException = "Chi tiết thông tin đơn giá thưởng ngoại lệ";


export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" }
];

export const EditPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
    { Link: "", Title: "Sửa" }
];

export const AddPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
    { Link: "", Title: "Thêm" }
];

export const DetailPagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/RewardPriceTable", Title: "Danh sách đơn giá thưởng giao hàng và lắp đặt" },
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

export const DataGridColumnList=[
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "RewardPriceTableID",
        Width: 60
    },
    {
        Name: "RewardPriceTableID",
        Type: "texttolink",
        Caption: "Tên đơn giá",
        DataSourceMember: "RewardPriceTableName",
        Link: "/RewardPriceTable/Detail/",
        Width: 250
    },
    {
        Name: "RewardPriceTypeName",
        Type: "text",
        Caption: "Loại đơn giá",
        DataSourceMember: "RewardPriceTypeName",
        Width: 250
    },
    {
        Name: "AreaName",
        Type: "text",
        Caption: "Khu vực áp dụng",
        DataSourceMember: "AreaName",
        Width: 200
    },
    {
        Name: "CarrierTypeName",
        Type: "text",
        Caption: "Loại phương tiện",
        DataSourceMember: "CarrierTypeName",
        Width: 120
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "FullName",
        Width: 120
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "RewardPriceTableID",
        Width: 100,
        Link: "/RewardPriceTable/Edit/",
        LinkText: "Chỉnh sửa"
    },
]


export const MLObjectDefinition = [
    {
        Name: "RewardPriceTableID",
        DefaultValue: {},
        BindControlName: "txtRewardPriceTableID",
        DataSourceMember: "RewardPriceTableID"
    },
    {
        Name: "RewardPriceTableName",
        DefaultValue: {},
        BindControlName: "txtRewardPriceTableName",
        DataSourceMember: "RewardPriceTableName"
    },
    {
        Name: "RewardPriceTypeID",
        DefaultValue: {},
        BindControlName: "cbRewardPriceTypeID",
        DataSourceMember: "RewardPriceTypeID"
    },
    {
        Name: "CarrierTypeID",
        DefaultValue: {},
        BindControlName: "cbCarrierTypeID",
        DataSourceMember: "CarrierTypeID"
    },
    {
        Name: "AreaID",
        DefaultValue: {},
        BindControlName: "cbAreaID",
        DataSourceMember: "AreaID"
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
    },
    {
        Name: "IsDefault",
        DefaultValue: false,
        BindControlName: "chkIsDefault",
        DataSourceMember: "IsDefault"
    },

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
        Name: "RewardPrice",
        Type: "textCurrency",
        Caption: "Giá",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "RewardPriceWithoutInstall",
        Type: "textCurrency",
        Caption: "Giá không lắp đặt",
        DataSourceMember: "RewardPriceWithoutInstall",
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

export const MLObjectRPTDetailItem= [
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
        Name: "RewardPrice",
        DefaultValue: {},
        BindControlName: "txtRewardPrice",
        DataSourceMember: "RewardPrice"
    },
    {
        Name: "RewardPriceWithoutInstall",
        DefaultValue: {},
        BindControlName: "txtRewardPriceWithoutInstall",
        DataSourceMember: "RewardPriceWithoutInstall"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "ckIsSystem",
        DataSourceMember: "IsSystem"
    },
]


export const DataGridColumnItemListRPTException = [
    {
        Name: "MainGroupName",
        Type: "text",
        Caption: "Ngành hàng",
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
        Name: "FromQuantity",
        Type: "textNumber",
        Caption: "Số lượng từ",
        DataSourceMember: "FromQuantity",
        Width: 100
    },
    {
        Name: "ToQuantity",
        Type: "textNumber",
        Caption: "Số lượng đến",
        DataSourceMember: "ToQuantity",
        Width: 100
    },
    {
        Name: "RewardPrice",
        Type: "textCurrency",
        Caption: "Giá",
        DataSourceMember: "RewardPrice",
        Width: 100
    },
    {
        Name: "RewardPriceWithoutInstall",
        Type: "textCurrency",
        Caption: "Giá không lắp đặt",
        DataSourceMember: "RewardPriceWithoutInstall",
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

export const MLObjectRPTExceptionItem= [
    {
        Name: "RewardPriceTableExceptionID",
        DefaultValue: {},
        BindControlName: "txtRewardPriceTableExceptionID",
        DataSourceMember: "RewardPriceTableExceptionID"
    },
    
    {
        Name: "MainGroupID",
        DefaultValue: {},
        BindControlName: "cbMainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: {},
        BindControlName: "cbSubGroup",
        DataSourceMember: "SubGroupID"
    },
   
    {
        Name: "FromQuantity",
        DefaultValue: {},
        BindControlName: "txtFromQuantity",
        DataSourceMember: "FromQuantity"
    },
    
    {
        Name: "ToQuantity",
        DefaultValue: {},
        BindControlName: "txtToQuantity",
        DataSourceMember: "ToQuantity"
    },

    {
        Name: "RewardPrice",
        DefaultValue: {},
        BindControlName: "txtRewardPrice",
        DataSourceMember: "RewardPrice"
    },
    {
        Name: "RewardPriceWithoutInstall",
        DefaultValue: {},
        BindControlName: "txtRewardPriceWithoutInstall",
        DataSourceMember: "RewardPriceWithoutInstall"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        BindControlName: "ckIsSystem",
        DataSourceMember: "IsSystem"
    },
]