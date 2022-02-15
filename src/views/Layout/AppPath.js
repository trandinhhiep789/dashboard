import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Breadcrumb, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
class AppPathCom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagePath: this.props.PageInfo.PagePath ? this.props.PageInfo.PagePath : ''
    }
  }

  componentDidUpdate() {
    const { PageInfo } = this.props

    //Begin customize the Title of Any Page
    let arrPageInfoTitle = document.title.split('|')
    let pageInfoTitle = arrPageInfoTitle[arrPageInfoTitle.length - 1]
    PageInfo.PagePath.forEach((pageInfo, index) => {
      if (index != 0) {
        pageInfoTitle = `${pageInfo.Title} | ${pageInfoTitle}`
      }
    })
    document.title = pageInfoTitle
    //End customize the Title of Any Page
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.PageInfo) !== JSON.stringify(nextProps.PageInfo)) {
      this.setState({
        pagePath: nextProps.PageInfo.PagePath
      })
    }
  }

  render() {
    let { pagePath } = this.state
    if (!pagePath || pagePath.length == 0) {
      pagePath = [{ Link: '/', Title: 'Trang chủ', icon: 'fa fa-home' }]
    }
    return (
      <div className="">
        <div className="">
          <Breadcrumb>
            {pagePath.map((item, index) =>
              index == 0 ? (
                <Breadcrumb.Item href={item.Link} key={index}>
                  <HomeOutlined />
                  <span>{item.Title}</span>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item>
                  <Typography.Text strong>{item.Title}</Typography.Text>
                </Breadcrumb.Item>
              )
            )}
          </Breadcrumb>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    PageInfo: state.PageInfo
  }
}

const AppPath = connect(mapStateToProps, null)(AppPathCom)
export default AppPath
