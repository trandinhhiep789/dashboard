import React from 'react'

export const TemplateExport = ({ formData }) => {
    console.log('TemplateExport', formData)
    const Row = (item, index) => {

        return (
            <tr key={index} className='even'>
                <td> {index + 1} </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.zipcode}</td>
            </tr>
        )
    }

    const CustomerTable = formData.map((item, index) => Row(item, index))

    const tableHeader = <thead className='bgvi'>
        <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Zipcode</th>
        </tr>
    </thead>

    return (
        <table>
            {tableHeader}
            <tbody>
                {CustomerTable}
            </tbody>
        </table>
    )
}