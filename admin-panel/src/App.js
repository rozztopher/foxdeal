import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import SigninForm from "./components/SigninForm";

function App() {
	return (
		<Container>
			<Row>
        <Col>
          <SigninForm>
          </SigninForm>
        </Col>
      </Row>
		</Container>
	);
}

export default App;
