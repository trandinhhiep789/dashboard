export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/AppFeedBackType/Search";
export const LoadAPIPath = "api/AppFeedBackType/Load";
export const AddAPIPath = "api/AppFeedBackType/Add";
export const UpdateAPIPath = "api/AppFeedBackType/Update";
export const DeleteAPIPath = "api/AppFeedBackType/Delete";
export const BackLink = "/AppFeedBackType";
export const AddLogAPIPath = "api/UserActivity/Add";
export const IDSelectColumnName = "chkSelect";
export const PKColumnName = "AppFeedBackTypeID";
export const CheckValidStepAPIPath = "api/AppFeedBackType/CheckValidStep";

export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}];

export const PagePath = [{ Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
{ Link: "/AppFeedBackType", Title: "Loại phản hồi ứng dụng" }
];

export const EditPagePath = [{ Link: "/", Title: "Trang chủ", icon: "fa fa-home" },
{ Link: "/AppFeedBackType", Title: "Loại phản hồi ứng dụng" },
{ Link: "", Title: "Chỉnh sửa loại phản hồi ứng dụng" }
];

export const SearchElementList = [
    {
        type: "text",
        name: "txtKeyword",
        label: "Từ khóa ",
        value: "",
        placeholder: "",
        icon: "",
        listoption: []
    }
];

export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

// thêm mới Loại phản hồi ứng dụng
export const AddModalColumnList = [
    {
        Name: "AppFeedBackTypeID",
        type: "text",
        label: "mã loại phản hồi ứng dụng",
        maxSize: "10",
        DataSourceMember: "AppFeedBackTypeID",
        readonly: false,
        validatonList: ["required", "number"]
    },
    {
        Name: "AppFeedBackTypeName",
        type: "text",
        label: "tên loại phản hồi ứng dụng",
        maxSize: "200",
        DataSourceMember: "AppFeedBackTypeName",
        readonly: false,
        validatonList: ["required"]
    },
    {
        Name: "AddFunctionID",
        type: "multiselect",
        label: "Quyền thêm loại phản hồi này",
        DataSourceMember: "AddFunctionID",
        readonly: false,
        value: -1,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.FUNCTION",
        ValueMember: "FunctionID",
        NameMember: "FunctionName",
        KeyFilter: "FunctionCategoryID",
        ValueFilter: "1,2"
    },
    // {
    //     Name: "IsSelectSenderPartner",
    //     type: "checkbox",
    //     label: "Cho phép chọn đối tác gửi",
    //     DataSourceMember: "IsSelectSenderPartner",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // },
    // {
    //     Name: "IsSelectSenderStore",
    //     type: "checkbox",
    //     label: "Cho phép chọn kho gửi",
    //     DataSourceMember: "IsSelectSenderStore",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // },
    // {
    //     Name: "IsSelectReceiverPartner",
    //     type: "checkbox",
    //     label: "Cho phép chọn đối tác nhận",
    //     DataSourceMember: "IsSelectReceiverPartner",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // },
    // {
    //     Name: "IsSelectReceiverStore",
    //     type: "checkbox",
    //     label: "Cho phép chọn kho nhận",
    //     DataSourceMember: "IsSelectReceiverStore",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // },
    // {
    //     Name: "IsIncludeInstall",
    //     type: "checkbox",
    //     label: "Có bao gồm lắp đặt",
    //     DataSourceMember: "IsIncludeInstall",
    //     readonly: false,
    //     validatonList: [],
    //     value: false
    // },
    //  {
    //     Name: "PartnerID",
    //     type: "select",
    //     label: "Mã đối tác",
    //     DataSourceMember: "PartnerID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    //     // LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
    //     // ValueMember: "PieTypeID",
    //     // NameMember: "PieTypeName",
    // },
    // {
    //     Name: "StatusID",
    //     type: "select",
    //     label: "Trạng thái vận chuyển",
    //     DataSourceMember: "StatusID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: false
    //     // LoadItemCacheKeyID: "PIMCACHE.PIETYPE",
    //     // ValueMember: "PieTypeID",
    //     // NameMember: "PieTypeName",
    // },
    {
        Name: "Description",
        type: "textarea",
        label: "Mô tả",
        maxSize: "2000",
        rows: "6",
        DataSourceMember: "Description",
        readonly: false,
        validatonList: []
    },
    {
        type: "text",
        Name: "OrderIndex",
        label: "Thứ tự hiển thị:",
        value: "",
        maxSize: "10",
        placeholder: "",
        icon: "",
        listoption: {},
        DataSourceMember: "OrderIndex",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: []
    }

];

export const MTabList = [
    {
        Name: "PieRequestType",
        DefaultValue: "",
        BindControlName: "PieRequestType",
        DataSourceMember: "PieRequestType"
    },
    {
        Name: "PieRequestTypeWorkflow",
        DefaultValue: "",
        BindControlName: "PieRequestTypeWorkflow",
        DataSourceMember: "PieRequestTypeWorkflow"
    }
];

//Loại phản hồi ứng dụng object
export const MLObjectDefinition = [
    {
        Name: "AppFeedBackTypeID",
        DefaultValue: "",
        Label: "mã loại phản hồi ứng dụng",
        BindControlName: "AppFeedBackTypeID",
        DataSourceMember: "AppFeedBackTypeID",
        ValidationList: ["required"]
    },
    {
        Name: "AppFeedBackTypeName",
        DefaultValue: "",
        Label: "tên loại phản hồi ứng dụng",
        BindControlName: "AppFeedBackTypeName",
        DataSourceMember: "AppFeedBackTypeName",
        ValidationList: ["required"]
    },
    {
        Name: "AddFunctionID",
        DefaultValue: "",
        Label: "Quyền thêm yêu cầu này",
        BindControlName: "AddFunctionID",
        DataSourceMember: "AddFunctionID"
    },
    {
        Name: "IsSelectSenderPartner",
        DefaultValue: "",
        BindControlName: "IsSelectSenderPartner",
        DataSourceMember: "IsSelectSenderPartner"
    },
    {
        Name: "IsSelectSenderStore",
        DefaultValue: "",
        BindControlName: "IsSelectSenderStore",
        DataSourceMember: "IsSelectSenderStore"
    },
    {
        Name: "IsSelectReceiverPartner",
        DefaultValue: "",
        BindControlName: "IsSelectReceiverPartner",
        DataSourceMember: "IsSelectReceiverPartner"
    },
    {
        Name: "IsSelectReceiverStore",
        DefaultValue: "",
        BindControlName: "IsSelectReceiverStore",
        DataSourceMember: "IsSelectReceiverStore"
    },
    {
        Name: "IsIncludeInstall",
        DefaultValue: "",
        BindControlName: "IsIncludeInstall",
        DataSourceMember: "IsIncludeInstall"
    },
    {
        Name: "Description",
        DefaultValue: "",
        Label: "Mô tả",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "0",
        Label: "Thứ tự hiển thị",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: true,
        Label: "kích hoạt",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: false,
        Label: "Hệ thống",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "CreatedUser"
    },
    //mã đối tác 
    {
        Name: "PartnerID",
        DefaultValue: "",
        BindControlName: "PartnerID",
        DataSourceMember: "PartnerID"
    },
    //trạng thái vận chuyển
    {
        Name: "StatusID",
        DefaultValue: "",
        BindControlName: "StatusID",
        DataSourceMember: "StatusID"
    }

];

// lưới hiển thị danh sách Loại phản hồi ứng dụng
export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "AppFeedBackTypeID",
        Width: 60
    },
    {
        Name: "AppFeedBackTypeID",
        Type: "text",
        Caption: "Mã loại phản hồi ứng dụng",
        DataSourceMember: "AppFeedBackTypeID",
        Width: 200
    },
    {
        Name: "AppFeedBackTypeName",
        Type: "text",
        Caption: "Tên loại phản hồi ứng dụng",
        DataSourceMember: "AppFeedBackTypeName",
        //Width: 300
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
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
        DataSourceMember: "PieRequestTypeID",
        Width: 100,
        Link: "/AppFeedBackType/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const WFColumnList = [
    {
        Name: "chkSelectShipmentOrderStepID",
        Type: "checkbox",
        Caption: "",
        DataSourceMember: "ShipmentOrderStepID",
        Width: 60
    },
    {
        Name: "ShipmentOrderStepID",
        Type: "text",
        Caption: "Mã bước xử lý",
        DataSourceMember: "ShipmentOrderStepID",
        Width: 120
    },
    {
        Name: "ShipmentOrderStepName",
        Type: "text",
        Caption: "Tên bước xử lý",
        DataSourceMember: "ShipmentOrderStepName",
        Width: 160
    },
    {
        Name: "StepCompletePercent",
        Type: "text",
        Caption: "% hoàn thành",
        DataSourceMember: "StepCompletePercent",
        Width: 100
    },
    {
        Name: "MaxProcessTime",
        Type: "text",
        Caption: "Thời gian XL tối đa",
        DataSourceMember: "DisplayProcessTime",
        Width: 150
    },
    {
        Name: "IsInitStep",
        Type: "checkicon",
        Caption: "Là bước khởi tạo",
        DataSourceMember: "IsInitStep",
    },
    {
        Name: "IsFinishStep",
        Type: "checkicon",
        Caption: "Là bước hoàn thành",
        DataSourceMember: "IsFinishStep",
    },
    {
        Name: "IsBeginDeliveryStep",
        Type: "checkicon",
        Caption: "Là bước bắt đầu đi giao hàng",
        DataSourceMember: "IsBeginDeliveryStep",
    },
    {
        Name: "IsCompletedDeliveryStep",
        Type: "checkicon",
        Caption: "Là bước hoàn thành giao hàng",
        DataSourceMember: "IsCompletedDeliveryStep",
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 80
    },
    {
        Name: "EditShipmentOrderStepID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ShipmentOrderStepID",
    }
];

export const MLObjectAppFeedBackTypeWorkFlow = [
    {
        Name: "AppFeedBackTypeID",
        DefaultValue: "",
        BindControlName: "AppFeedBackTypeID",
        DataSourceMember: "AppFeedBackTypeID"
    },
    {
        Name: "ShipmentOrderStepID",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepID",
        DataSourceMember: "ShipmentOrderStepID"
    },
    {
        Name: "ShipmentOrderStepName",
        DefaultValue: "",
        BindControlName: "ShipmentOrderStepName",
        DataSourceMember: "ShipmentOrderStepName"
    },
    {
        Name: "AutoChangeToShipmentOrderStatusID",
        DefaultValue: "",
        BindControlName: "AutoChangeToShipmentOrderStatusID",
        DataSourceMember: "AutoChangeToShipmentOrderStatusID"
    },
    {
        Name: "StepColorCode",
        DefaultValue: "",
        BindControlName: "StepColorCode",
        DataSourceMember: "StepColorCode"
    },
    {
        Name: "StepCompletePercent",
        DefaultValue: "",
        BindControlName: "StepCompletePercent",
        DataSourceMember: "StepCompletePercent"
    },
    {
        Name: "MaxProcessTime",
        DefaultValue: "",
        BindControlName: "MaxProcessTime",
        DataSourceMember: "MaxProcessTime"
    },
    {
        Name: "IsInitStep",
        DefaultValue: "",
        BindControlName: "IsInitStep",
        DataSourceMember: "IsInitStep"
    },
    {
        Name: "IsFinishStep",
        DefaultValue: "",
        BindControlName: "IsFinishStep",
        DataSourceMember: "IsFinishStep"
    },
    {
        Name: "IsMustChooseProcessUser",
        DefaultValue: "",
        BindControlName: "IsMustChooseProcessUser",
        DataSourceMember: "IsMustChooseProcessUser"
    },
    {
        Name: "IsSentEmail",
        DefaultValue: "",
        BindControlName: "IsSentEmail",
        DataSourceMember: "IsSentEmail"
    },
    {
        Name: "IsSentSMS",
        DefaultValue: "",
        BindControlName: "IsSentSMS",
        DataSourceMember: "IsSentSMS"
    },
    {
        Name: "IsBeginDeliveryStep",
        DefaultValue: "",
        BindControlName: "IsBeginDeliveryStep",
        DataSourceMember: "IsBeginDeliveryStep"
    },
    {
        Name: "IsCompletedDeliveryStep",
        DefaultValue: "",
        BindControlName: "IsCompletedDeliveryStep",
        DataSourceMember: "IsCompletedDeliveryStep"
    },
    {
        Name: "SMSTemplate",
        DefaultValue: "",
        BindControlName: "SMSTemplate",
        DataSourceMember: "SMSTemplate"
    },
    {
        Name: "EmailTitle",
        DefaultValue: "",
        BindControlName: "EmailTitle",
        DataSourceMember: "EmailTitle"
    },
    {
        Name: "EmailTemplate",
        DefaultValue: "",
        BindControlName: "EmailTemplate",
        DataSourceMember: "EmailTemplate"
    },
    {
        Name: "Description",
        DefaultValue: "",
        BindControlName: "Description",
        DataSourceMember: "Description"
    },
    {
        Name: "OrderIndex",
        DefaultValue: "",
        BindControlName: "OrderIndex",
        DataSourceMember: "OrderIndex"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "PieRequestType_WF_Next",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Next",
        DataSourceMember: "PieRequestType_WF_Next"
    },
    {
        Name: "PieRequestType_WF_Permis",
        DefaultValue: "",
        BindControlName: "PieRequestType_WF_Permis",
        DataSourceMember: "PieRequestType_WF_Permis"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];



export const ModalFixShipmentFeeColumnList = [
    // {
    //     Name: "AppFeedBackTypeID",
    //     type: "numeric",
    //     label: "Mã Loại phản hồi ứng dụng",
    //     maxSize: "9",
    //     DataSourceMember: "AppFeedBackTypeID",
    //     readonly: false,
    //     validatonList: ["required"]
    // },
    // {
    //     Name: "ShipmentFeeTypeID",
    //     type: "groupTextAndSelect",
    //     label: "Mã loại chi phí vận chuyển",
    //     maxSize: "9",
    //     DataSourceMember: "ShipmentFeeTypeID",
    //     readonly: false,
    //     validatonList: ["required"]
    // },
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Mã loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        //maxSize: "20",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: true,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];


export const ModalFixShipmentFeeColumnList_Edit = [
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Mã loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const FixShipmentFeeColumnList = [
    {
        Name: "chkSelectShipmentFeeTypeID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 50
    },
    {
        Name: "ShipmentFeeTypeName",
        Type: "text",
        Caption: "Loại chi phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeName",
        Width: 180
    },
    {
        Name: "OutputServiceProductID",
        Type: "text",
        Caption: "Mã sản phẩm dịch vụ cần xuất",
        DataSourceMember: "OutputServiceProductID",
        Width: 200
    },
    {
        Name: "GetFeeTypeName",
        Type: "text",
        Caption: "Kiểu lấy chi phí",
        DataSourceMember: "GetFeeTypeName",
        Width: 160
    },
    {
        Name: "FeeValue",
        Type: "text",
        Caption: "Chi phí vận chuyển",
        DataSourceMember: "FeeValue",
        Width: 200
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "EditShipmentFeeTypeID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "ShipmentFeeTypeID",
        Width: 100
    }

];

export const MLObjectAppFeedBackType_FixShipmentFee = [
    {
        Name: "AppFeedBackTypeID",
        DefaultValue: "",
        BindControlName: "AppFeedBackTypeID",
        DataSourceMember: "AppFeedBackTypeID"
    },
    {
        Name: "ShipmentFeeTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeID",
        DataSourceMember: "ShipmentFeeTypeID"
    },
    {
        Name: "ShipmentFeeTypeName",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeName",
        DataSourceMember: "ShipmentFeeTypeName"
    },
    {
        Name: "OutputServiceProductID",
        DefaultValue: "",
        BindControlName: "OutputServiceProductID",
        DataSourceMember: "OutputServiceProductID"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "FeeValue",
        DefaultValue: "",
        BindControlName: "FeeValue",
        DataSourceMember: "FeeValue"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];

export const FlexShipmentFeeColumnList = [
    {
        Name: "chkSelectFlexShipmentFeeID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "FlexShipmentFeeID",
        Width: 50
    },
    // {
    //     Name: "FlexShipmentFeeID",
    //     Type: "text",
    //     Caption: "Mã chi phí vận chuyển thay đổi",
    //     DataSourceMember: "FlexShipmentFeeID",
    //     Width: 200
    // },
    {
        Name: "ShipmentFeeTypeName",
        Type: "text",
        Caption: "Loại chi phí vận chuyển",
        DataSourceMember: "ShipmentFeeTypeName",
        Width: 220
    },
    {
        Name: "GetFeeTypeName",
        Type: "text",
        Caption: "Kiểu lấy chi phí",
        DataSourceMember: "GetFeeTypeName",
        Width: 150
    },
    {
        Name: "FeeValue",
        Type: "text",
        Caption: "Chi phí vận chuyển",
        DataSourceMember: "FeeValue",
        Width: 120
    },
    {
        Name: "IsActived",
        Type: "checkicon",
        Caption: "Kích hoạt",
        DataSourceMember: "IsActived",
        Width: 100
    },
    {
        Name: "EditFlexShipmentFeeID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "FlexShipmentFeeID",
        Width: 100
    }

];

export const ModalFlexShipmentFeeColumnList = [
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị tham số KT áp dụng",
        value: -1,
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    // {
    //     type: "select",
    //     Name: "TechspecsValueID",
    //     label: "Giá trị tham số KT áp dụng",
    //     value: -1,
    //     placeholder: "",
    //     icon: "",
    //     listoption: [],
    //     DataSourceMember: "TechspecsValueID",
    //     readonly: false,
    //     validatonList: [],
    //     IsAutoLoadItemFromCache: true,
    //     LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
    //     ValueMember: "TechSpecsValueID",
    //     NameMember: "Value"
    // },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];


export const ModalFlexShipmentFeeColumnList_Edit = [
    // {
    //     Name: "FlexShipmentFeeID",
    //     type: "text",
    //     label: "Mã chi phí vận chuyển thay đổi",
    //     DataSourceMember: "FlexShipmentFeeID",
    //     readonly: true,
    //     validatonList: []
    // },
    {
        type: "select",
        Name: "ShipmentFeeTypeID",
        label: "Loại chi phí vận chuyển",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "ShipmentFeeTypeID",
        readonly: false,
        validatonList: ["Comborequired"],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SHIPMENTFEETYPE",
        ValueMember: "ShipmentFeeTypeID",
        NameMember: "ShipmentFeeTypeName"
    },
    {
        type: "multiselect",
        Name: "MainGroupID",
        label: "Ngành hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "MainGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.MAINGROUP",
        ValueMember: "MainGroupID",
        NameMember: "MainGroupName"
    },
    {
        type: "multiselect",
        Name: "SubGroupID",
        label: "Nhóm hàng áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "SubGroupID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUP",
        ValueMember: "SubGroupID",
        NameMember: "SubGroupName"
    },
    {
        type: "multiselect",
        Name: "TechspecsID",
        label: "Thông số kỹ thuật áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.SUBGROUPTECHSPECS",
        ValueMember: "TechspecsID",
        NameMember: "TechspecsName"
    },
    {
        type: "multiselect",
        Name: "TechspecsValueID",
        label: "Giá trị tham số KT áp dụng",
        value: "",
        placeholder: "",
        icon: "",
        //listoption: [],
        DataSourceMember: "TechspecsValueID",
        readonly: false,
        validatonList: [],
        isMulti: false,
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.TECHSPECSVALUE",
        ValueMember: "TechSpecsValueID",
        NameMember: "Value"
    },
    {
        Name: "ProductID",
        type: "productbox",
        label: "Mã sản phẩm áp dụng",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "ProductID",
        readonly: false,
        validatonList: []
    },
    {
        Name: "OutputServiceProductID",
        type: "productbox",
        label: "Mã sản phẩm dịch vụ cần xuất",
        colspan: 12,
        isMulti: false,
        DataSourceMember: "OutputServiceProductID",
        readonly: false,
        validatonList: []
    },
    {
        type: "select",
        Name: "GetFeeType",
        label: "Kiểu lấy chi phí",
        value: "1",
        placeholder: "",
        icon: "",
        listoption: [{ value: 1, label: "Lấy giá trị cố định" }, { value: 2, label: "Lấy từ bảng làm giá" }],
        DataSourceMember: "GetFeeType",
        readonly: false,
        disabled: true,
        validatonList: [],
        IsAutoLoadItemFromCache: false
    },
    {
        Name: "FeeValue",
        type: "numeric",
        label: "Chi phí",
        maxSize: "19",
        DataSourceMember: "FeeValue",
        readonly: false,
        validatonList: []
    },
    {
        Name: "Note",
        type: "textarea",
        label: "Ghi chú",
        maxSize: "2000",
        DataSourceMember: "Note",
        rows: "6",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IsActived",
        type: "checkbox",
        label: "Kích hoạt",
        DataSourceMember: "IsActived",
        readonly: false,
        validatonList: [],
        value: true
    },
    {
        Name: "IsSystem",
        type: "checkbox",
        label: "Hệ thống",
        DataSourceMember: "IsSystem",
        readonly: false,
        validatonList: [],
        value: false
    }
];

export const MLObjectAppFeedBackType_FlexShipmentFee = [
    {
        Name: "FlexShipmentFeeID",
        DefaultValue: "",
        BindControlName: "FlexShipmentFeeID",
        DataSourceMember: "FlexShipmentFeeID"
    },
    {
        Name: "AppFeedBackTypeID",
        DefaultValue: "",
        BindControlName: "AppFeedBackTypeID",
        DataSourceMember: "AppFeedBackTypeID"
    },
    {
        Name: "ShipmentFeeTypeID",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeID",
        DataSourceMember: "ShipmentFeeTypeID"
    },
    {
        Name: "ShipmentFeeTypeName",
        DefaultValue: "",
        BindControlName: "ShipmentFeeTypeName",
        DataSourceMember: "ShipmentFeeTypeName"
    },
    {
        Name: "MainGroupID",
        DefaultValue: "",
        BindControlName: "MainGroupID",
        DataSourceMember: "MainGroupID"
    },
    {
        Name: "SubGroupID",
        DefaultValue: "",
        BindControlName: "SubGroupID",
        DataSourceMember: "SubGroupID"
    },
    {
        Name: "TechspecsID",
        DefaultValue: "",
        BindControlName: "TechspecsID",
        DataSourceMember: "TechspecsID"
    },
    {
        Name: "TechspecsValueID",
        DefaultValue: "",
        BindControlName: "TechspecsValueID",
        DataSourceMember: "TechspecsValueID"
    },
    {
        Name: "ProductID",
        DefaultValue: "",
        BindControlName: "ProductID",
        DataSourceMember: "ProductID"
    },
    {
        Name: "OutputServiceProductID",
        DefaultValue: "",
        BindControlName: "OutputServiceProductID",
        DataSourceMember: "OutputServiceProductID"
    },
    {
        Name: "GetFeeType",
        DefaultValue: "",
        BindControlName: "GetFeeType",
        DataSourceMember: "GetFeeType",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "FeeValue",
        DefaultValue: "",
        BindControlName: "FeeValue",
        DataSourceMember: "FeeValue"
    },
    {
        Name: "Note",
        DefaultValue: "",
        BindControlName: "Note",
        DataSourceMember: "Note"
    },
    {
        Name: "IsActived",
        DefaultValue: "",
        BindControlName: "IsActived",
        DataSourceMember: "IsActived"
    },
    {
        Name: "IsSystem",
        DefaultValue: "",
        BindControlName: "IsSystem",
        DataSourceMember: "IsSystem"
    },
    {
        Name: "CreatedDate",
        DefaultValue: "",
        BindControlName: "CreatedDate",
        DataSourceMember: "CreatedDate"
    },
    {
        Name: "CreatedUser",
        DefaultValue: "",
        BindControlName: "CreatedUser",
        DataSourceMember: "CreatedUser"
    }
];

