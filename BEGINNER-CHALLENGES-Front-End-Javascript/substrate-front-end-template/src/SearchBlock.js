import React, { useEffect, useState } from 'react';
import { Table, Card, Input, Form, Button, Container } from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

function SearchBlock(props) {
    const { api } = useSubstrate();
    //let blockData = undefined;
    const [blockData, setBlockData] = useState(null);
    let searchParamRef = React.createRef();

    function isHash(param) {
        return param.startsWith('0x');
    }
    async function searchBlock() {
        console.log(searchParamRef.current.value);
        const searchParam = searchParamRef.current.value;
        let tempDate;
        if (isHash(searchParam)) {
            tempDate = await searchByHash(searchParam);
        }
        else {
            tempDate = await searchByBlockNumber(searchParam);
        }
        tempDate = Object.fromEntries(tempDate);
        tempDate = {
            "number": tempDate.block.header.number.toString(),
            "hash": tempDate.block.header.hash.toString(),
            "stateRoot": tempDate.block.header.stateRoot.toString(),
            "parentHash": tempDate.block.header.parentHash.toString(),
            "extrinsicsRoot": tempDate.block.header.extrinsicsRoot.toString()
        }
        setBlockData(tempDate);
        console.log(blockData);
    }
    async function searchByBlockNumber(blockNumber) {
        const api = await getApi();
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const block = await api.rpc.chain.getBlock(blockHash);
        console.log(`Result for search by number for ${blockNumber} is ${block}`);
        return block;
    }

    async function searchByHash(blockHash) {
        const api = await getApi();
        const block = await api.rpc.chain.getBlock(blockHash);
        console.log(`Result for search by hash for ${blockHash} is ${block}`);
        console.log(typeof (block));
        console.log(block.block.header);
        return block;
    }
    async function getApi() {
        return api;
    }

    const cardStyles = {
        width: 'auto'
    };
    const formStyles = {
        marginTop: '15px'
    }
    return (
        <Container>
            <Card style={cardStyles}>
                <Card.Content textAlign='center'>
                    <Card.Header>Search for block by Height or Hash</Card.Header>
                    <Form style={formStyles}>
                        <Form.Field>
                            <input icon='search' placeholder='Block Height or Hash...' ref={searchParamRef} />
                        </Form.Field>
                        <Button primary onClick={() => searchBlock()}>Seach</Button>
                    </Form>
                </Card.Content>
            </Card >
            {blockData ?
                <Card style={cardStyles}>
                    <Card.Content textAlign='center'>
                        <Card.Header>Searched Block Data</Card.Header>
                        <Table celled padded>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>Key</Table.HeaderCell>
                                    <Table.HeaderCell>Value</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        Block Number
                                </Table.Cell>
                                    <Table.Cell>
                                        {blockData?.number}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Block Hash
                                </Table.Cell>
                                    <Table.Cell>
                                        {blockData?.hash}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Parent Hash
                                </Table.Cell>
                                    <Table.Cell>
                                        {blockData?.parentHash}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        State Root
                                </Table.Cell>
                                    <Table.Cell>
                                        {blockData?.stateRoot}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        Extrinsics Root
                                </Table.Cell>
                                    <Table.Cell>
                                        {blockData?.extrinsicsRoot}
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Card.Content>
                </Card>
                : <span></span>
            }
        </Container>
    );
}

export default SearchBlock;
