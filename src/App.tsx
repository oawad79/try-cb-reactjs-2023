import "antd/dist/reset.css";
import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { lazy } from "react";
import RoutedTabs from "./components/RoutedTabs";
import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import Login from "./pages/Login";

//const NotFound = lazy(() => import("../components/NotFound/index"));
const HotelSearch = lazy(() => import("./pages/HotelSearch"));
const Cart = lazy(() => import("./pages/Cart"));
const Booked = lazy(() => import("./pages/Booked"));
const FlightSearch = lazy(() => import("./pages/FlightSearch"));

function App() {
  const dispatch = useAppDispatch();

  return (
    <Row justify={"center"} align={"middle"}>
      <Col>
        <Layout>
          <Header className="bg-white">
            <RoutedTabs
              extra={
                <div>
                  <Link to="/">Login</Link>
                  <Link
                    to="/"
                    onClick={() => {
                      dispatch({ type: "RESET" });
                    }}
                  >
                    Logout
                  </Link>
                </div>
              }
              tabs={[
                {
                  label: "Flights",
                  component: <FlightSearch />,
                  url: "/flights",
                },
                {
                  label: "Cart",
                  component: <Cart />,
                  url: "/cart",
                },
                {
                  label: "Booked",
                  component: <Booked />,
                  url: "/booked",
                },
                {
                  label: "Hotels",
                  component: <HotelSearch />,
                  url: "/hotels",
                },
              ]}
            />
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </Content>
        </Layout>
      </Col>
    </Row>
  );
}

export default App;
