import React, { useState } from 'react'
import { connect } from 'react-redux'

import FormItem from './FormItem'

export const FormContainer = (props) => {
    const [valuesForm, setValuesForm] = useState(props.initialValues)

    console.log("FormContainer")

    const handleSubmit = (event) => {
        console.log(valuesSubmit)
        event.preventDefault();
    }

    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            value: valuesForm,
            // onChange: handleOnChange
        });
    })

    return (
        <React.Fragment>
            <div className={props.classNameForm}>{props.FormName}</div>
            <form>
                {children}
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

FormContainer.Item = FormItem;

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer)
