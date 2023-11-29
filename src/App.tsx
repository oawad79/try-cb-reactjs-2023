import "antd/dist/reset.css";
import { Col, Layout, Row } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { lazy } from "react";
import RoutedTabs from "./components/RoutedTabs";
import { Link, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import Login from "./pages/Login";

//const NotFound = lazy(() => import("../components/NotFound/index"));
const HotelSearch = lazy(() => import("./pages/HotelSearch"));
const Cart = lazy(() => import("./pages/Cart"));
const Booked = lazy(() => import("./pages/Booked"));
const FlightSearch = lazy(() => import("./pages/FlightSearch"));

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const isLoggedIn = () => {
    return auth.token && auth.token.length > 0;
  };

  return (
    <Row justify={"center"} align={"middle"}>
      <Col>
        <Layout>
          <Header className="bg-white">
            <RoutedTabs
              extra={
                <div>
                  {!isLoggedIn() && <Link to="/">Login</Link>}
                  {isLoggedIn() && (
                    <Link
                      to="/"
                      onClick={() => {
                        dispatch({ type: "RESET" });
                      }}
                    >
                      Logout ({auth.username})
                    </Link>
                  )}
                </div>
              }
              tabs={[
                {
                  label: "Flights",
                  component: <FlightSearch />,
                  url: "/flights",
                  disabled: false,
                },
                {
                  label: "Cart",
                  component: <Cart />,
                  url: "/cart",
                  disabled: !isLoggedIn(),
                },
                {
                  label: "Booked",
                  component: <Booked />,
                  url: "/booked",
                  disabled: !isLoggedIn(),
                },
                {
                  label: "Hotels",
                  component: <HotelSearch />,
                  url: "/hotels",
                  disabled: false,
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
