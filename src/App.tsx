import "antd/dist/reset.css";
import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { lazy } from "react";
import RoutedTabs from "./components/RoutedTabs";

//const NotFound = lazy(() => import("../components/NotFound/index"));
const HotelSearch = lazy(() => import("./pages/HotelSearch"));
const Cart = lazy(() => import("./pages/Cart"));
const Booked = lazy(() => import("./pages/Booked"));
const FlightSearch = lazy(() => import("./pages/FlightSearch"));

function App() {
  return (
    <Row justify={"center"} align={"middle"}>
      <Col>
        <Layout>
          <Header className="bg-white">
            <RoutedTabs
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
          <Content></Content>
        </Layout>
      </Col>
    </Row>
  );
}

export default App;
