import { Col, Container, Row, CardGroup } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';
import { api } from '../utilities/common_api';
import React, { useEffect, useState } from 'react';

interface Cat {
    _id: string;
    name: string;
    age: number;
    breed: string;
    image: string;
}

interface Props {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export function Store({ searchValue, setSearchValue }: Props) {
    const [catList, setCatList] = useState<Cat[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${api.uri}/cats/list`);
                if (response.ok) {
                    const json = await response.json();
                    setCatList(json);
                } else {
                    throw new Error('Unable to retrieve cat data');
                }
            } catch (error) {
                console.error(error);
                // Display error message to user
                throw new Error('something wrong!!');
            }
        }
        fetchData();
    }, []);

    const filteredCatList = catList.filter((cat) =>
        cat.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <Container>
            <h1 className="mb-4">Cat List</h1>
            <Row>
                {filteredCatList.map((cat, index) => {
                    if (index % 3 === 0) {
                        return (
                            <React.Fragment key={cat._id}>
                                {index > 0 && <CardGroup className="my-4" />}
                                <Row>
                                    <Col md={4}>
                                        <StoreItem {...cat} />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        );
                    } else if ((index + 1) % 3 === 0 || index === filteredCatList.length - 1) {
                        return (
                            <React.Fragment key={cat._id}>
                                <Col md={4}>
                                    <StoreItem {...cat} />
                                </Col>
                            </React.Fragment>
                        );
                    } else {
                        return (
                            <React.Fragment key={cat._id}>
                                <Col md={4}>
                                    <StoreItem {...cat} />
                                </Col>
                            </React.Fragment>
                        );
                    }
                })}
            </Row>
        </Container>
    );
}