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
                MenuTitle: 'Vận chuyển',
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
                    },
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
                    },
                    {
                        MenuName: 'ShipmentOrderStatus',
                        MenuTitle: 'Danh sách trạng thái yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStatus',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ShipmentFeeType',
                        MenuTitle: 'Danh sách loại phí vận chuyển',
                        LinkTo: '/ShipmentFeeType',
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
                MenuTitle: 'Vật tư lắp đặt',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'MaterialGroup',
                        MenuTitle: 'Nhóm vật tư',
                        LinkTo: '/MaterialGroup',
                        MenuIcon: '',
                        SubMenu: []
                    },
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
            {
                MenuName: 'Service',
                MenuTitle: 'Dịch vụ',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'ServiceType',
                        MenuTitle: 'Loại dịch vụ',
                        LinkTo: '/ServiceType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ServiceSeasonType',
                        MenuTitle: 'Loại mùa dịch vụ',
                        LinkTo: '/ServiceSeasonType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ServiceAgreementType',
                        MenuTitle: 'Loại hợp đồng dịch vụ',
                        LinkTo: '/ServiceAgreementType',
                        MenuIcon: '',
                        SubMenu: []
                    }

                ]
            },
            {
                MenuName: 'grantrights',
                MenuTitle: 'Cấp quyền',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'UserCoordinator',
                        MenuTitle: 'Cấp quyền nhóm quyền và kho',
                        LinkTo: '/UserCoordinator',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'UserGroup',
                        MenuTitle: 'Cấp quyền nhân viên theo kho',
                        LinkTo: '/UserGroup',
                        MenuIcon: '',
                        SubMenu: []
                    }

                ]
            },
            {
                MenuName: 'CoordinatorStore',
                MenuTitle: 'Kho điều phối giao hàng',
                LinkTo: '/CoordinatorStore',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'Vehicle',
                MenuTitle: 'Danh sách xe',
                LinkTo: '/Vehicle',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'WorkingShift',
                MenuTitle: 'Ca làm việc',
                LinkTo: '/WorkingShift',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'Skills',
                MenuTitle: 'Kỹ năng',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'Skill',
                        MenuTitle: 'Danh sách kỹ năng',
                        LinkTo: '/Skill',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'SkillCategory',
                        MenuTitle: 'Danh mục kỹ năng',
                        LinkTo: '/SkillCategory',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'SkillRank',
                        MenuTitle: 'Cấp bậc kỹ năng',
                        LinkTo: '/SkillRank',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'UserSkill',
                        MenuTitle: 'Kỹ năng của một nhân viên',
                        LinkTo: '/UserSkill',
                        MenuIcon: '',
                        SubMenu: []
                    },
                ]
            },
            {
                MenuName: 'Area',
                MenuTitle: 'Khu vực',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'AreaList',
                        MenuTitle: 'Danh sách khu vực',
                        LinkTo: '/Area',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AreaType',
                        MenuTitle: 'Loại khu vực',
                        LinkTo: '/AreaType',
                        MenuIcon: '',
                        SubMenu: []
                    },

                ]
            },
            {
                MenuName: 'Limit',
                MenuTitle: 'Giới hạn',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'LimitType',
                        MenuTitle: 'Loại giới hạn',
                        LinkTo: '/LimitType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'UserLimit',
                        MenuTitle: 'Giới hạn theo người dùng',
                        LinkTo: '/UserLimit',
                        MenuIcon: '',
                        SubMenu: []
                    },

                ]
            }
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
                MenuTitle: 'Nhóm quyền nhà cung cấp',
                LinkTo: '/PartnerPriviledgeGroup',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerPriviledge',
                MenuTitle: 'Quyền nhà cung cấp',
                LinkTo: '/PartnerPriviledge',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerRole',
                MenuTitle: 'Vai trò nhà cung cấp',
                LinkTo: '/PartnerRole',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerUser',
                MenuTitle: 'Người dùng của nhà cung cấp',
                LinkTo: '/PartnerUser',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'IDDocumentType',
                MenuTitle: 'Loại giấy tờ tùy thân',
                LinkTo: '/IDDocumentType',
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
                MenuTitle: 'Điều phối giao hàng',
                LinkTo: '/ShipmentOrder',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'ShipmentOrderControl',
                MenuTitle: 'Kiểm soát giao hàng',
                LinkTo: '/ShipmentOrderControl',
                MenuIcon: '',
                SubMenu: []
            },

        ]
    },
    {
        MenuName: 'WorkingPlan',
        MenuTitle: 'Đăng ký ca làm việc',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'WorkingPlan',
                MenuTitle: 'Danh sách nhân viên đăng ký ca làm việc',
                LinkTo: '/WorkingPlan',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    },
    {
        MenuName: 'History',
        MenuTitle: 'Nhật ký',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'PartnerTransaction',
                MenuTitle: 'Lịch sử giao dịch với đối tác',
                LinkTo: '/PartnerTransaction',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'ApiCallLog',
                MenuTitle: 'Nhật ký gọi API',
                LinkTo: '/ApiCallLog',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'AdvanceRequest',
                MenuTitle: 'Xem yêu cầu tạm ứng',
                LinkTo: '/AdvanceRequest',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    },
    {
        MenuName: 'PartnerPayable',
        MenuTitle: 'Chi phí dịch vụ',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'PartnerPayable',
                MenuTitle: 'Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo tháng',
                LinkTo: '/PartnerPayable',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PartnerPayableDetail',
                MenuTitle: 'Danh sách tiền phải trả cho nhà cung cấp dịch vụ theo ngày',
                LinkTo: '/PartnerPayableDetail',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'Compute',
                MenuTitle: 'Danh sách chi phí',
                LinkTo: '/Compute',
                MenuIcon: '',
                SubMenu: []
            },
        ]
    }
   
];

export default AppMenu;