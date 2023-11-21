import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { ErrorBoundary } from "react-error-boundary";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import { PersistGate } from "redux-persist/integration/react";

//ErrorBoundary is used to handle rendering issues Does not handle async
//issues like Sagas or other issues
ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback={<Spin />}>
        <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
          <PersistGate loading={<Spin />} persistor={persistor}>
            <App />
          </PersistGate>
        </ErrorBoundary>
      </Suspense>
    </Provider>
  </BrowserRouter>
);
