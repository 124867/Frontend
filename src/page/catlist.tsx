import { Col, Container, Row, CardGroup } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import catlist from "../data/cat.json"

export function Store() {
  return (
    <Container >
      <h1 className="mb-4">Cat List</h1>
      <Row xs={1} md={2} lg={3}>
        {catlist.map(item => (
          <Col className="col-sm-3" key={item.id} >
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}