import React from 'react'
import { Table } from 'semantic-ui-react'
import { Company } from 'types/common'
import CenterLoader from 'components/CenterLoader'

const companyList: React.FC<{ items: Company[], isLoading: boolean }> = ({ items, isLoading }) => {
    const table = items.length > 0 ? (
        <Table striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    ) : (<></>)
    return (        
        <>
            {table}
            <CenterLoader isLoading={isLoading}/>
        </>
    )
}

export default companyList