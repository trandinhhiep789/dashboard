export const PagePath = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "", Title: "Đánh giá chất lượng giao hàng" }
];

export const PagePathEdit = [
    { Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
    { Link: "/ShipmentQualityAssess", Title: "Đánh giá chất lượng giao hàng" },
    { Link: "/ShipmentQualityAssess/Edit", Title: "Chỉnh sửa" }
];

export const APIHostName = "TMSAPI";
export const APISearch = "api/ShipmentQualityAssess/Search";
export const APILoad = "api/ShipmentQualityAssess/Load";
export const APIAdd = "api/ShipmentQualityAssess/Add";
export const APICommentSRH = "api/ShipmentQualityAssess_cmt/Search";
export const APICommentAdd = "api/ShipmentQualityAssess_cmt/Add";
export const APIQualityAssessTypeSRH = "api/QualityAssessType/Search";
export const APIQualityAssessTypeLoad = "api/QualityAssessType/Load";
export const APIShipmentQualityAssess_RVK_SRH = "api/ShipmentQualityAssess_rvk/Search";
export const APIShipmentQualityAssessRvkLoadNew = "api/ShipmentQualityAssess_rvk/LoadNew";
export const APIShipmentQualityAssessRvkAdd = "api/ShipmentQualityAssess_rvk/Add";
export const APIAddQualityAssessAndRVK = "api/ShipmentQualityAssess/AddQualityAssessAndRVK";
export const APIQualityAssessType_RVLevelLoad = "api/ShipmentQualityAssess_rvk/LoadByQualityAssessTypeID";

export const arrOptReviewStatus = [
    { value: 0, label: "Chưa duyệt" },
    { value: 1, label: "Đồng ý" },
    { value: 2, label: "Từ chối" }
]

export const dataSearch = [
    {
        SearchKey: "@Keyword",
        SearchValue: ""
    },
    {
        SearchKey: "@TYPENAME",
        SearchValue: ""
    },
    {
        SearchKey: "@CREATEDUSER",
        SearchValue: ""
    },
    {
        SearchKey: "@PAGEINDEX",
        SearchValue: 1
    },
    {
        SearchKey: "@PAGESIZE",
        SearchValue: 50
    }
]

export const listColumn = [
    {
        Name: "ShipmentOrderID",
        Type: "text",
        Caption: "Mã vận đơn",
        DataSourceMember: "ShipmentOrderID",
        // Width: 150
    },
    {
        Name: "PartnerSaleOrderID",
        Type: "text",
        Caption: "Mã đơn hàng đối tác",
        DataSourceMember: "PartnerSaleOrderID",
        // Width: 100
    },
    {
        Name: "CreatedDate",
        Type: "datetime",
        Caption: "Ngày tạo",
        DataSourceMember: "CreatedDate",
        // Width: 130
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "FullName",
        // Width: 250
    },
    {
        Name: "QualityAssessNote",
        Type: "text",
        Caption: "Ghi chú đánh giá",
        DataSourceMember: "QualityAssessNote",
        // Width: 250
    },
    {
        Name: "IsRevokeAssessReviewStatus",
        Type: "popupNew",
        Caption: "Đã duyệt gỡ đánh giá",
        DataSourceMember: "IsRevokeAssessReviewStatus",
        // Width: 250
    }
];

export const listElementSearch = [
    {
        type: "textdropdownNew",
        label: "Đơn hàng/ Vận đơn",
        dropdownName: "txtTypename",
        name: "txtKeyword",
        colspan: 4,
        value: "",
        placeholder: "Từ khóa",
        icon: "",
        nameOption: "txtTypename",
        labelOption: "--Vui lòng chọn--",
        valueOption: -1,
        classNameCol: "col-custom",
        classNameDropdown: "dropdown-custom",
        listoption: [
            { value: -1, label: "--Vui lòng chọn--" },
            { value: 1, label: "Mã vận đơn" },
            { value: 2, label: "Mã đơn hàng" }
        ]
    },
    {
        type: "MultiSelectUser",
        name: "cbCreatedUser",
        DataSourceMember: "CreatedUser",
        label: "Nhân viên",
        colspan: 12,
        rowspan: 2,
        labelcolspan: 12,
        IsLabelDiv: true,
        value: -1,
        placeholder: "---Vui lòng chọn---",
        listoption: [],
        IsAutoLoadItemFromCache: false,
        isMultiSelect: false,
        isClearable: true
    },
]

export const MLObjectDefinitionSearch = [
    {
        Name: "Typename",
        DefaultValue: "",
        BindControlName: "txtTypename"
    },
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "cbCreatedUser",
    }
]

export const MLObjectDefinitionEdit = [
    {
        Name: "ShipmentQualityAssessID",
        DefaultValue: "",
        BindControlName: "txtShipmentQualityAssessID",
        DataSourceMember: "ShipmentQualityAssessID"
    },
    {
        Name: "ShipmentOrderID",
        DefaultValue: "",
        BindControlName: "txtShipmentOrderID",
        DataSourceMember: "ShipmentOrderID"
    },
    {
        Name: "PartnerSaleOrderID",
        DefaultValue: "",
        BindControlName: "txtPartnerSaleOrderID",
        DataSourceMember: "PartnerSaleOrderID"
    },
    {
        Name: "AssessDate",
        DefaultValue: "",
        BindControlName: "txtAssessDate",
        DataSourceMember: "AssessDate"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "",
        BindControlName: "txtUpdatedUser",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "UpdatedDate",
        DefaultValue: "",
        BindControlName: "txtUpdatedDate",
        DataSourceMember: "UpdatedDate"
    }
];