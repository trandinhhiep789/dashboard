import { ERPCOMMONCACHE_COORDINATORGROUP } from '../../../../../../constants/keyCache'

export const APIHostName = "TMSAPI";

export const listelement = [
    {
        type: "ComboBox",
        name: "cbCoordinatorGroupID",
        DataSourceMember: "CoordinatorGroupID",
        colspan: 6,
        value: -1,
        isMultiSelect: false,
        placeholder: "---Nhóm điều phối---",
        listoption: [],
        IsAutoLoadItemFromCache: true,
        LoadItemCacheKeyID: ERPCOMMONCACHE_COORDINATORGROUP,
        ValueMember: "CoordinatorGroupID",
        NameMember: "CoordinatorGroupName",

    }
];

export const MLObjectDefinition = [
    {
        Name: "CoordinatorGroupID",
        DefaultValue: "",
        BindControlName: "cbCoordinatorGroupID"
    }
];

export const listColumn = [
    {
        Name: "chkSelectUserName",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserName",
        Width: 60
    },
    {
        Name: "UserName",
        Type: "text",
        Caption: "Mã nhân viên giao hàng",
        DataSourceMember: "UserName",
        Width: 200
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Tên nhân viên giao hàng",
        DataSourceMember: "FullName",
        Width: 300
    }
];