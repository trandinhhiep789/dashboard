import React from "react";
import { connect } from 'react-redux';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link } from "react-router-dom";

import { PagePath } from "./constants";
import { updatePagePath } from "../../actions/pageAction";
import { SidebarAccountInfo } from './constants';
import AccountInfo from './AccountInfo';
import ChangePassword from './ChangePassword';
import VideoInfo from './VideoInfo';
import NotFound from '../NotFound';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class AccountCom extends React.Component {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        console.log("AccountCom", SidebarAccountInfo)
        this.props.updatePagePath(PagePath);
    }

    render() {
        return (
            // <div className="col-12 account-site">
            //     <div className="card card-tabs">
            //         <div className="card-body row">
            //             <div className="col-2">
            //                 <div className="nav flex-column mb-3 nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            //                     <a className="nav-link active" id="v-pills-abum-tab" data-toggle="pill" href="#abum" role="tab" aria-controls="v-pills-abum" aria-selected="true">Thông tin chung</a>
            //                     <a className="nav-link" id="v-pills-image-tab" data-toggle="pill" href="#image" role="tab" aria-controls="v-pills-image" aria-selected="false">Đổi mật khẩu</a>
            //                     <a className="nav-link" id="v-pills-video-tab" data-toggle="pill" href="#video" role="tab" aria-controls="v-pills-video" aria-selected="false">Video</a>
            //                 </div>
            //             </div>
            //             <div className="col-10">
            //                 <div className="tab-content mb-9" id="v-pills-tabContent">
            //                     <div className="tab-pane fade show active" id="abum" role="tabpanel" aria-labelledby="v-pills-abum-tab">
            //                         thông tin nhan viên
            //                     </div>
            //                     <div className="tab-pane fade" id="image" role="tabpanel" aria-labelledby="v-pills-image-tab">
            //                         thông tin nhan viên
            //                     </div>
            //                     <div className="tab-pane fade" id="video" role="tabpanel" aria-labelledby="v-pills-video-tab">
            //                         thông tin nhan viên
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            <div className="col-12 account-site">
                <div className="card card-tabs">
                    <div className="card-body row">
                        <Layout>
                            <Sider className="site-layout-background" width={200}>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={[SidebarAccountInfo[0].SubMenu.MenuName]}
                                    defaultOpenKeys={[SidebarAccountInfo[0].MenuName]}
                                    style={{ height: '100%' }}
                                >
                                    {
                                        SidebarAccountInfo.map(item => {
                                            if (item.SubMenu.length > 0) {
                                                return <SubMenu key={item.MenuName} title={item.MenuTitle}>
                                                    {
                                                        item.SubMenu.length > 0 && item.SubMenu.map(subItem => <Menu.Item key={subItem.MenuName}>
                                                            <Link to={`${subItem.LinkTo}`}>{subItem.MenuTitle}</Link>
                                                        </Menu.Item>)
                                                    }
                                                </SubMenu>
                                            } else {
                                                return <Menu.Item key={item.MenuName}>
                                                    <Link to={`${item.LinkTo}`}>{item.MenuTitle}</Link>
                                                </Menu.Item>
                                            }
                                        })
                                    }
                                </Menu>
                            </Sider>

                            <Content>
                                <Switch>
                                    <Route exact path="/accountinfo" component={AccountInfo} />
                                    <Route exact path="/accountinfo/changepassword" component={ChangePassword} />
                                    <Route exact path="/accountinfo/video" component={VideoInfo} />
                                    <Route path="*" component={NotFound} />
                                </Switch>
                            </Content>
                        </Layout>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        AuthenticationInfo: state
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updatePagePath: pagePath => {
            dispatch(updatePagePath(pagePath));
        },

    };
};


const Account = connect(mapStateToProps, mapDispatchToProps)(AccountCom);
export default Account;
