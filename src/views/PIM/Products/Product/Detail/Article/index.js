import React, { Component } from "react";
import { connect } from 'react-redux';
import { callFetchAPI } from "../../../../../../actions/fetchAPIAction";

import {
    InputProductArticleColumnList, GridMLObjectArticleDefinition
} from "../../Constants";
import InputGridNew from "../../../../../../common/components/FormContainer/FormControl/InputGridNew";

class ArticleCom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LstProduct_Article: this.props.Article
        }
    }


    render() {
        let Article;
        if (this.state.LstProduct_Article) {
            Article = this.state.LstProduct_Article;
        }

        return (
            <InputGridNew name="LstProduct_Article" controltype="GridControl"
            title="bài Viết"
            listColumn={InputProductArticleColumnList}
            dataSource={Article}
            Ispopup={true}
            MLObjectDefinition={GridMLObjectArticleDefinition}
            IsAutoPaging={false}
            RowsPerPage={100}
            colspan="10"
            IsPermisionAdd={true}
            IsPermisionDelete={true}
        />
        );
    }
}

const mapStateToProps = state => {
    return {
        AppInfo: state,
        FetchAPIInfo: state.FetchAPIInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        callFetchAPI: (hostname, hostURL, postData) => {
            return dispatch(callFetchAPI(hostname, hostURL, postData));
        }

    }
}


const Article = connect(mapStateToProps, mapDispatchToProps)(ArticleCom);
export default Article;