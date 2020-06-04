const AppMenu = [
    {
        MenuName: 'dashboard',
        MenuTitle: 'Trang chủ',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [

        ]
    },
    {
        MenuName: 'MD',
        MenuTitle: 'Khai báo',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'PartnerType',
                MenuTitle: 'Đối tác',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'PartnerType',
                        MenuTitle: 'Danh sách loại đối tác',
                        LinkTo: '/PartnerType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'Partner',
                        MenuTitle: 'Danh sách đối tác',
                        LinkTo: '/Partner',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
            {
                MenuName: 'CarrierType',
                MenuTitle: 'vận chuyển',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'CancelDeliveryReason',
                        MenuTitle: 'Danh sách lý do hủy giao hàng',
                        LinkTo: '/CancelDeliveryReason',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'CarrierType',
                        MenuTitle: 'Danh sách loại phương tiện vận chuyển',
                        LinkTo: '/CarrierType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'PackageType',
                        MenuTitle: 'Danh sách loại đóng gói hàng hóa vận chuyển',
                        LinkTo: '/PackageType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ShipmentFeePaymentMethod',
                        MenuTitle: 'Danh sách phương thức thanh toán chi phí vận chuyển',
                        LinkTo: '/ShipmentFeePaymentMethod',
                        MenuIcon: '',
                        SubMenu: []
                    } ,
                    {
                        MenuName: 'ShipmentServiceType',
                        MenuTitle: 'Danh sách loại dịch vụ vận chuyển',
                        LinkTo: '/ShipmentServiceType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ShipmentGoodsType',
                        MenuTitle: 'Danh sách loại hàng hóa vận chuyển',
                        LinkTo: '/ShipmentGoodsType',
                        MenuIcon: '',
                        SubMenu: []
                    } ,
                    {
                        MenuName: 'ShipmentOrderStatus',
                        MenuTitle: 'Danh sách trạng thái yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStatus',
                        MenuIcon: '',
                        SubMenu: []
                    }

                ]
            },
            {
                MenuName: 'ShipmentOrderType',
                MenuTitle: 'Yêu cầu vận chuyển',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'ShipmentOrderType',
                        MenuTitle: 'Loại yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ShipmentOrderStep',
                        MenuTitle: 'Danh sách bước xử lý yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStep',
                        MenuIcon: '',
                        SubMenu: []
                    }

                ]
            },
            {
                MenuName: 'INSTALL',
                MenuTitle: 'Thông tin lắp đặt',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'InstallBundle',
                        MenuTitle: 'Danh sách gói sản phẩm lắp đặt kèm theo',
                        LinkTo: '/InstallBundle',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'InstallMaterial',
                        MenuTitle: 'Danh sách nhóm sản phẩm cần vật tư lắp đặt',
                        LinkTo: '/InstallMaterial',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
        ]
    },
    {
        MenuName: 'PartnerPriviledge',
        MenuTitle: 'Nhà cung cấp',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'PartnerPriviledgeGroup',
                MenuTitle: 'Danh sách nhóm quyền nhà cung cấp',
                LinkTo: '/PartnerPriviledgeGroup',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerPriviledge',
                MenuTitle: 'Danh sách quyền nhà cung cấp',
                LinkTo: '/PartnerPriviledge',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerRole',
                MenuTitle: 'Danh sách vai trò nhà cung cấp',
                LinkTo: '/PartnerRole',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerUser',
                MenuTitle: 'Danh sách người dùng của nhà cung cấp',
                LinkTo: '/PartnerUser',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    },
    {
        MenuName: 'HD',
        MenuTitle: 'Hợp đồng',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'ServiceAgreement',
                MenuTitle: 'Danh sách hợp đồng',
                LinkTo: '/ServiceAgreement',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    },
    {
        MenuName: 'ShipmentOrder',
        MenuTitle: 'Vận chuyển',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'ShipmentOrder',
                MenuTitle: 'Danh sách yêu cầu vận chuyển',
                LinkTo: '/ShipmentOrder',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    }
   
];

export default AppMenu;