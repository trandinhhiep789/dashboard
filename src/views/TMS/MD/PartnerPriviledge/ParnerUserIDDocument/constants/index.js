export const APIHostName = "TMSAPI";
export const AddAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Add";
export const UpdateAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Update";
export const DeleteAPIPath_PartnerUserIDDocument = "api/PartnerUser_IDDocument/Delete";
import { CDN_LOGO_IMAGE } from '../../../../../../constants/systemVars';

//------------- giấy tờ tùy thân người dùng -----------------------------------------------

export const Modal_PartnerUserIDDocument_Add = [
    {
        type: "select",
        Name: "IDDocumentTypeID",
        label: "Loại giấy tờ tùy thân",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "IDDocumentTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.IDDOCUMENTTYPE",
        ValueMember: "IDDocumentTypeID",
        NameMember: "IDDocumentTypeName"
    },
    {
        Name: "IDDocumentNumber",
        type: "text",
        label: "Số giấy tờ tùy thân",
        maxSize: "19",
        DataSourceMember: "IDDocumentNumber",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "FullNameOnIDDocument",
        type: "text",
        label: "Tên trên giấy tờ tùy thân",
        maxSize: "200",
        DataSourceMember: "FullNameOnIDDocument",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "FrontIDDocumentImageURL",
        NameMember: "FrontIDDocumentImageURL",
        label: "Ảnh mặt trước giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "FrontIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "BackSideIDDocumentImageURL",
        NameMember: "BackSideIDDocumentImageURL",
        label: "Ảnh mặt sau giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "BackSideIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IDDocumentImageFormatName",
        type: "text",
        label: "Tên định dạng giấy tờ tùy thân",
        maxSize: "50",
        DataSourceMember: "IDDocumentImageFormatName",
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


export const Modal_PartnerUserIDDocument_Edit = [
    {
        type: "select",
        Name: "IDDocumentTypeID",
        label: "Loại giấy tờ tùy thân",
        value: -1,
        placeholder: "",
        icon: "",
        listoption: [],
        DataSourceMember: "IDDocumentTypeID",
        readonly: false,
        validatonList: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: "ERPCOMMONCACHE.IDDOCUMENTTYPE",
        ValueMember: "IDDocumentTypeID",
        NameMember: "IDDocumentTypeName"
    },
    {
        Name: "IDDocumentNumber",
        type: "text",
        label: "Số giấy tờ tùy thân",
        maxSize: "19",
        DataSourceMember: "IDDocumentNumber",
        readonly: false,
        validatonList: ["number"]
    },
    {
        Name: "FullNameOnIDDocument",
        type: "text",
        label: "Tên trên giấy tờ tùy thân",
        maxSize: "200",
        DataSourceMember: "FullNameOnIDDocument",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "FrontIDDocumentImageURL",
        NameMember: "FrontIDDocumentImageURL",
        label: "Ảnh mặt trước giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "FrontIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        type: "singleFileUpload",
        Name: "BackSideIDDocumentImageURL",
        NameMember: "BackSideIDDocumentImageURL",
        label: "Ảnh mặt sau giấy tờ tùy thân",
        value: "",
        placeholder: "",
        icon: "",
        cdn: CDN_LOGO_IMAGE,
        listoption: {},
        DataSourceMember: "BackSideIDDocumentImageURL",
        readonly: false,
        validatonList: []
    },
    {
        Name: "IDDocumentImageFormatName",
        type: "text",
        label: "Tên định dạng giấy tờ tùy thân",
        maxSize: "50",
        DataSourceMember: "IDDocumentImageFormatName",
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

export const PartnerUserIDDocument_DataGrid_ColumnList = [
    {
        Name: "chkSelectIDDocumentID",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "IDDocumentID",
        Width: 50
    },
    {
        Name: "IDDocumentTypeName",
        Type: "text",
        Caption: "Loại giấy tờ tùy thân",
        DataSourceMember: "IDDocumentTypeName",
        Width: 150
    },
    {
        Name: "IDDocumentNumber",
        Type: "text",
        Caption: "Số giấy tờ tùy thân",
        DataSourceMember: "IDDocumentNumber",
        Width: 150
    },
    {
        Name: "FullNameOnIDDocument",
        Type: "text",
        Caption: "Tên trên giấy tờ tùy thân",
        DataSourceMember: "FullNameOnIDDocument",
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
        Name: "EditIDDocumentID",
        Type: "edit",
        Caption: "Sửa",
        DataSourceMember: "IDDocumentID",
        Width: 100
    }

];

export const MLObject_PartnerUserIDDocument = [
    {
        Name: "IDDocumentID",
        DefaultValue: "",
        BindControlName: "",
        DataSourceMember: "IDDocumentID"
    },
    {
        Name: "UserName",
        DefaultValue: "",
        BindControlName: "UserName",
        DataSourceMember: "UserName"
    },
    {
        Name: "IDDocumentTypeID",
        DefaultValue: "",
        BindControlName: "IDDocumentTypeID",
        DataSourceMember: "IDDocumentTypeID"
    },
    {
        Name: "IDDocumentTypeName",
        DefaultValue: "",
        BindControlName: "IDDocumentTypeName",
        DataSourceMember: "IDDocumentTypeName"
    },
    {
        Name: "IDDocumentNumber",
        DefaultValue: "",
        BindControlName: "IDDocumentNumber",
        DataSourceMember: "IDDocumentNumber",
        // Label: "Kiểu lấy chi phí",
        // ValidationList: ["required"]
    },
    {
        Name: "FullNameOnIDDocument",
        DefaultValue: "",
        BindControlName: "FullNameOnIDDocument",
        DataSourceMember: "FullNameOnIDDocument"
    },
    {
        Name: "FrontIDDocumentImageURL",
        DefaultValue: "",
        BindControlName: "FrontIDDocumentImageURL",
        DataSourceMember: "FrontIDDocumentImageURL"
    },
    {
        Name: "BackSideIDDocumentImageURL",
        DefaultValue: "",
        BindControlName: "BackSideIDDocumentImageURL",
        DataSourceMember: "BackSideIDDocumentImageURL"
    },
    {
        Name: "IDDocumentImageFormatName",
        DefaultValue: "",
        BindControlName: "IDDocumentImageFormatName",
        DataSourceMember: "IDDocumentImageFormatName"
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
