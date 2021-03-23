import React, { useState } from 'react'
import { connect } from 'react-redux'

export const FormItem = (props) => {
    const [value, setValue] = useState(props.value[props.name] ? props.value[props.name] : "");
    const { name, disabled } = props;

    console.log("FormItem")

    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, {
            name,
            value: value,
            onChange: handleChange,
            disabled
        });
    })

    return (
        <React.Fragment>
            <label>
                {props.label}
                {children}
                {props.rules && (<div>
                    {props.rules.required && props.rules.message}
                </div>)}
            </label>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FormItem)
