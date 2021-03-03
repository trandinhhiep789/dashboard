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
                        MenuName: 'ShipmentOrderStatusGroup',
                        MenuTitle: 'Danh sách nhóm trạng thái yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStatusGroup',
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
                    },
                    {
                        MenuName: 'ShipmentSetupType',
                        MenuTitle: 'Loại lắp đặt',
                        LinkTo: '/ShipmentSetupType',
                        MenuIcon: '',
                        SubMenu: []
                    },

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
                        MenuName: 'ShipmentOrderStepGroup',
                        MenuTitle: 'Nhóm bước xử lý yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStepGroup',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ShipmentOrderStep',
                        MenuTitle: 'Bước xử lý yêu cầu vận chuyển',
                        LinkTo: '/ShipmentOrderStep',
                        MenuIcon: '',
                        SubMenu: []
                    },


                ]
            },
            {
                MenuName: 'AppFeedBack',
                MenuTitle: 'Phản hồi ứng dụng',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'AppFeedBackType',
                        MenuTitle: 'Loại phản hồi ứng dụng',
                        LinkTo: '/AppFeedBackType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackPriority',
                        MenuTitle: 'Độ ưu tiên phản hồi',
                        LinkTo: '/AppFeedBackPriority',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackStatus',
                        MenuTitle: 'Trạng thái phản hồi',
                        LinkTo: '/AppFeedBackStatus',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackQuality',
                        MenuTitle: 'Chất lượng xử lý phản hồi',
                        LinkTo: '/AppFeedBackQuality',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackPermission',
                        MenuTitle: 'Quyền trên phản hồi',
                        LinkTo: '/AppFeedBackPermission',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackStep',
                        MenuTitle: 'Bước xử lý phản hồi',
                        LinkTo: '/AppFeedBackStep',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackGroup',
                        MenuTitle: 'Phân loại phản hồi',
                        LinkTo: '/AppFeedBackGroup',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AppFeedBackCategory',
                        MenuTitle: 'Danh mục phản hồi',
                        LinkTo: '/AppFeedBackCategory',
                        MenuIcon: '',
                        SubMenu: []
                    },
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
                        MenuName: 'MTReturnRequestType',
                        MenuTitle: 'Loại yêu cầu nhập trả vật tư',
                        LinkTo: '/MTReturnRequestType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'InstallBundle',
                        MenuTitle: 'Danh sách gói sản phẩm lắp đặt kèm theo',
                        LinkTo: '/InstallBundle',
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
                    }
                    // ,{
                    //     MenuName: 'UserGroup',
                    //     MenuTitle: 'Cấp quyền nhân viên theo kho',
                    //     LinkTo: '/UserGroup',
                    //     MenuIcon: '',
                    //     SubMenu: []
                    // }

                ]
            },
            {
                MenuName: 'Reward',
                MenuTitle: 'Thưởng nhân viên',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'RewardCompute',
                        MenuTitle: 'Tính thưởng',
                        LinkTo: '/RewardCompute',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardType',
                        MenuTitle: 'Loại thưởng',
                        LinkTo: '/RewardType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardPriceType',
                        MenuTitle: 'Loại đơn giá thưởng',
                        LinkTo: '/RewardPriceType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardPosition',
                        MenuTitle: 'Vị trí thưởng',
                        LinkTo: '/RewardPosition',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardPosition_User',
                        MenuTitle: 'Vị trí thưởng của 1 nhân viên',
                        LinkTo: '/RewardPosition_User',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'PeriodUserRWPosition',
                        MenuTitle: 'Vị trí thưởng của 1 nhân viên theo khoảng thời gian',
                        LinkTo: '/PeriodUserRWPosition',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'UserRewardStore',
                        MenuTitle: 'Kho thưởng của nhân viên quản lý',
                        LinkTo: '/UserRewardStore',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardComputeSchedule',
                        MenuTitle: 'Lịch tính thưởng',
                        LinkTo: '/RewardComputeSchedule',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'FuelPrice',
                        MenuTitle: 'Bảng giá nhiêu liệu',
                        LinkTo: '/FuelPrice',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardPriceTable',
                        MenuTitle: 'Đơn giá thưởng giao hàng và lắp đặt',
                        LinkTo: '/RewardPriceTable',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'PNServicePriceTable',
                        MenuTitle: 'Bảng giá dịch vụ của đối tác',
                        LinkTo: '/PNServicePriceTable',
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
                    // {
                    //     MenuName: 'UserLimitTest',
                    //     MenuTitle: 'Giới hạn theo người dùng test' ,
                    //     LinkTo: '/UserLimitTest',
                    //     MenuIcon: '',
                    //     SubMenu: []
                    // },



                ]
            },

            {
                MenuName: 'Advance',
                MenuTitle: 'Tạm ứng',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'AdvanceRequestType',
                        MenuTitle: 'Loại yêu cầu tạm ứng',
                        LinkTo: '/AdvanceRequestType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'DestroyRequestType',
                        MenuTitle: 'Loại yêu cầu hủy vật tư',
                        LinkTo: '/DestroyRequestType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'InventoryRequestType',
                        MenuTitle: 'Loại yêu cầu kiểm kê',
                        LinkTo: '/InventoryRequestType',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
            {
                MenuName: 'TMSConfig',
                MenuTitle: 'Cấu hình hệ thống TMS',
                LinkTo: '/TMSConfig',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'DeliveryDateUpdate',
                MenuTitle: 'Cập nhật giờ giao hàng',
                LinkTo: '/DeliveryDateUpdate',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'DeliveryDateUpdateType',
                        MenuTitle: 'Loại cập nhật giờ giao hàng',
                        LinkTo: '/DeliveryDateUpdateType',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'DeliveryDateUpdateReason',
                        MenuTitle: 'Lý do cập nhật giờ giao hàng',
                        LinkTo: '/DeliveryDateUpdateReason',
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
        MenuName: 'ShipmentOrder',
        MenuTitle: 'Vận chuyển',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'ShipmentOrderdeltai',
                MenuTitle: 'Yêu cầu vận chuyển',
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
                MenuName: 'ServiceAgreement',
                MenuTitle: 'Danh sách hợp đồng',
                LinkTo: '/ServiceAgreement',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'WorkingPlan',
                MenuTitle: 'Danh sách đăng ký ca làm việc',
                LinkTo: '/WorkingPlan',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'PP',
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
            },
            {
                MenuName: 'Advance',
                MenuTitle: 'Tạm ứng',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'AdvanceRequestAdd',
                        MenuTitle: 'Thêm yêu cầu tạm ứng',
                        LinkTo: '/AdvanceRequest/Add',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'AdvanceRequest',
                        MenuTitle: 'Danh sách Yêu cầu tạm ứng',
                        LinkTo: '/AdvanceRequest',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
            {
                MenuName: 'Reward',
                MenuTitle: 'Thưởng',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                   
                    {
                        MenuName: 'RewardShipmentOrder',
                        MenuTitle: 'Tổng thưởng giao hàng',
                        LinkTo: '/RewardShipmentOrder',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardShipmentOrderByUser',
                        MenuTitle: 'Thưởng giao hàng theo NV',
                        LinkTo: '/RewardShipmentOrderByUser',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardShipmentOrderByType',
                        MenuTitle: 'Thưởng giao hàng theo loại',
                        LinkTo: '/RewardShipmentOrderByType',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
            {
                MenuName: 'DestroyRequest',
                MenuTitle: 'Danh sách yêu cầu hủy vật tư',
                LinkTo: '/DestroyRequest',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'CurrentAdvanceDebt',
                MenuTitle: 'Thông kê hạn mức tạm ứng',
                LinkTo: '/CurrentAdvanceDebt',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'InventoryRequest',
                MenuTitle: 'Danh sách yêu cầu kiểm kê',
                LinkTo: '/InventoryRequest',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'RefundSupplies',
                MenuTitle: 'Nhập trả vật tư',
                LinkTo: '/RefundSupplies',
                MenuIcon: '',
                SubMenu: []
            },
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
                MenuName: 'CallLog',
                MenuTitle: 'Nhật ký gọi API',
                LinkTo: '/CallLog',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'RewardComputeLog',
                MenuTitle: 'Nhật ký tính thưởng',
                LinkTo: '/RewardComputeLog',
                MenuIcon: '',
                SubMenu: []
            },

        ]
    },
    // {
    //     MenuName: 'UseGuide',
    //     MenuTitle: 'Hướng dẫn sử dụng',
    //     LinkTo: '/UseGuide',
    //     MenuIcon: '',
    //     SubMenu: []
    // },
    {
        MenuName: 'ShipmentOrderNew',
        MenuTitle: 'Điều phối giao hàng',
        LinkTo: '/ShipmentOrder',
        MenuIcon: '',
        SubMenu: []
    },
    {
        MenuName: 'Reward',
        MenuTitle: 'Thưởng',
        LinkTo: '',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'RewardShipmentOrder',
                MenuTitle: 'Tổng thưởng giao hàng',
                LinkTo: '/RewardShipmentOrder',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'RewardShipmentOrderByUser',
                MenuTitle: 'Thưởng giao hàng theo NV',
                LinkTo: '/RewardShipmentOrderByUser',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'RewardShipmentOrderByType',
                MenuTitle: 'Thưởng giao hàng theo loại',
                LinkTo: '/RewardShipmentOrderByType',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'personnel',
                MenuTitle: 'Nhân sự',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'TotalRewardExport',
                        MenuTitle: 'Xuất tổng thưởng',
                        LinkTo: '/TotalRewardExport',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'RewardDetailExport',
                        MenuTitle: 'Xuất chi tiết thưởng',
                        LinkTo: '/RewardDetailExport',
                        MenuIcon: '',
                        SubMenu: []
                    }
                ]
            },
            {
                MenuName: 'RewardPointReview',
                MenuTitle: 'Kiểm tra điểm thưởng',
                LinkTo: '/RewardPointReview',
                MenuIcon: '',
                SubMenu: []
            },


        ]
    },
    {
        MenuName: 'Reports',
        MenuTitle: 'Báo cáo',
        LinkTo: '/',
        MenuIcon: '',
        SubMenu: [
            {
                MenuName: 'ReportShipmentOrder',
                MenuTitle: 'Thống kê vận đơn',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'ReportByDate',
                        MenuTitle: 'Theo ngày',
                        LinkTo: '/ReportByDate',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ReportByStore',
                        MenuTitle: 'Theo kho',
                        LinkTo: '/ReportByStore',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ReportByUser',
                        MenuTitle: 'Nhân viên',
                        LinkTo: '/ReportByUser',
                        MenuIcon: '',
                        SubMenu: []
                    },
                ]
            },
            {
                MenuName: 'ReportCoordinatorUser',
                MenuTitle: 'Thống kê vận đơn theo TN',
                LinkTo: '',
                MenuIcon: '',
                SubMenu: [
                    {
                        MenuName: 'ReportCoordinatorByDate',
                        MenuTitle: 'Theo ngày',
                        LinkTo: '/ReportCoordinatorByDate',
                        MenuIcon: '',
                        SubMenu: []
                    },
                    {
                        MenuName: 'ReportCoordinatorByUser',
                        MenuTitle: 'Nhân viên',
                        LinkTo: '/ReportCoordinatorByUser',
                        MenuIcon: '',
                        SubMenu: []
                    },
                ]
            },
            {
                MenuName: 'DebtByUser',
                MenuTitle: 'Thống kê công nợ theo NV',
                LinkTo: '/DebtByUser',
                MenuIcon: '',
                SubMenu: []
            },

            {
                MenuName: 'StaffDebt',
                MenuTitle: 'Quản lý công nợ',
                LinkTo: '/StaffDebt',
                MenuIcon: '',
                SubMenu: []
            },

            {
                MenuName: 'ReportShipmentOrderExport',
                MenuTitle: 'Xuất danh sách đơn hàng',
                LinkTo: '/ReportShipmentOrderExport',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'InvestigationShipmentOrderStatus',
                MenuTitle: 'Tra cứu trạng thái vận đơn',
                LinkTo: '/InvestigationShipmentOrderStatus',
                MenuIcon: '',
                SubMenu: []
            },
            {
                MenuName: 'InventoryMaterials',
                MenuTitle: 'Báo cáo tồn kho vật tư',
                LinkTo: '/InventoryMaterials',
                MenuIcon: '',
                SubMenu: []
            }
        ]
    }

];

export default AppMenu;