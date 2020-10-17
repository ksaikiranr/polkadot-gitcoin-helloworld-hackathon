import React, { useEffect, useState } from 'react';
import { Table, Card} from 'semantic-ui-react';
import { useSubstrate } from './substrate-lib';

function LatestBlock(){
    const { api } = useSubstrate();
    const [blockNumberTimer, setBlockNumberTimer] = useState(0);
    const [blockNumber, setBlockNumber] = useState('');
    const [blockHash, setBlockHash] = useState('');
    const [parentHash, setParentHash] = useState('');
    const [stateRoot, setStateRoot] = useState('');
    const [extrinsicsRoot, setExtrinsicsRoot] = useState('');


    const getBlock = async () => {
        const latestBlock = await api.rpc.chain.getHeader();
        console.log(latestBlock);
        setBlockNumber(latestBlock.number.toString());
        setBlockHash(latestBlock.hash.toString());
        setParentHash(latestBlock.parentHash.toString());
        setStateRoot(latestBlock.stateRoot.toString());
        setExtrinsicsRoot(latestBlock.extrinsicsRoot.toString());
    }

    const cardClass = {
        width: 'auto'
    };

    useEffect(() => {
        getBlock();
    })
    const timer = () => {
        setBlockNumberTimer(time => time + 1);
      };
    
      useEffect(() => {
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
      }, []);

    return (
            <Card centered style={cardClass}>
                <Card.Content textAlign='center'>
                    <Card.Header>Latest Block Data</Card.Header>
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
                                    {blockNumber}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Block Hash
                                </Table.Cell>
                                <Table.Cell>
                                    {blockHash}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Parent Hash
                                </Table.Cell>
                                <Table.Cell>
                                    {parentHash}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    State Root
                                </Table.Cell>
                                <Table.Cell>
                                    {stateRoot}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    Extrinsics Root
                                </Table.Cell>
                                <Table.Cell>
                                    {extrinsicsRoot}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
    );
}

export default  LatestBlock;
