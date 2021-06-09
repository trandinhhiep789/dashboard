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
export const SearchAPIPath = "api/ShipmentQualityAssess/Search";
export const LoadAPIPath = "api/ShipmentQualityAssess/Load";
export const AddAPIPath = "api/ShipmentQualityAssess/Add";
export const CommentAPIPath = "api/ShipmentQualityAssess_cmt/Search";
export const AddCommentAPIPath = "api/ShipmentQualityAssess_cmt/Add";
export const QualityAssessType = "api/QualityAssessType/Search";
export const LoadInfoRvkSQAssess = "api/ShipmentQualityAssess_rvk/LoadNew";

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
        Name: "CreatedUser",
        Type: "text",
        Caption: "Người tạo",
        DataSourceMember: "CreatedUser",
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
        Name: "IsRevokeAssessReview",
        Type: "text",
        Caption: "Đã duyệt gỡ đánh giá",
        DataSourceMember: "IsRevokeAssessReview",
        // Width: 250
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "ShipmentQualityAssessID",
        Link: "/ShipmentQualityAssess/Edit/",
        LinkText: "Chỉnh sửa",
        // Width: 150
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
            { value: 1, label: "Mã đơn hàng" },
            { value: 2, label: "Mã vận đơn" }
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

export const MLObjectDefinitionAdd = [
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
        Name: "QualityAssessValue",
        DefaultValue: "",
        BindControlName: "txtQualityAssessValue",
        DataSourceMember: "QualityAssessValue"
    },
    {
        Name: "QualityAssessTypeID",
        DefaultValue: "",
        BindControlName: "txtQualityAssessTypeID",
        DataSourceMember: "QualityAssessTypeID"
    },
    {
        Name: "QualityAssessNote",
        DefaultValue: "",
        BindControlName: "txtQualityAssessNote",
        DataSourceMember: "QualityAssessNote"
    },

];

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
        Name: "AssessDate",
        DefaultValue: "",
        BindControlName: "txtAssessDate",
        DataSourceMember: "AssessDate"
    },
    {
        Name: "PartnerSaleOrderID",
        DefaultValue: "",
        BindControlName: "txtPartnerSaleOrderID",
        DataSourceMember: "PartnerSaleOrderID"
    },
    {
        Name: "QualityAssessTypeID",
        DefaultValue: "",
        BindControlName: "txtQualityAssessTypeID",
        DataSourceMember: "QualityAssessTypeID"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "txtCreatedUser",
        DataSourceMember: "CreatedUser"
    },
    {
        Name: "QualityAssessValue",
        DefaultValue: "",
        BindControlName: "txtQualityAssessValue",
        DataSourceMember: "QualityAssessValue"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "txtCreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "QualityAssessNote",
        DefaultValue: "",
        BindControlName: "txtQualityAssessNote",
        DataSourceMember: "QualityAssessNote"
    },
    {
        Name: "UpdatedUser",
        DefaultValue: "",
        BindControlName: "txtUpdatedUser",
        DataSourceMember: "UpdatedUser"
    },
    {
        Name: "IsRevokeAssessReview",
        DefaultValue: "",
        BindControlName: "txtIsRevokeAssessReview",
        DataSourceMember: "IsRevokeAssessReview"
    },
    {
        Name: "UpdatedDate",
        DefaultValue: "",
        BindControlName: "txtUpdatedDate",
        DataSourceMember: "UpdatedDate"
    },
    {
        Name: "RevokeAssessReviewUser",
        DefaultValue: "",
        BindControlName: "txtRevokeAssessReviewUser",
        DataSourceMember: "RevokeAssessReviewUser"
    },
    {
        Name: "DeletedUser",
        DefaultValue: "",
        BindControlName: "txtDeletedUser",
        DataSourceMember: "DeletedUser"
    }
];