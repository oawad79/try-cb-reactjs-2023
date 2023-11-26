import { Tabs } from "antd";
import { ReactElement, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { activeTab } from "../redux/slices/tabsSlice";
import _ from "lodash";

type RoutedTabsType = {
  tabs: { label: string; component: ReactNode; url: string }[];
  extra?: ReactElement;
};

const RoutedTabs = ({ tabs, extra }: RoutedTabsType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.tabs);
  const location = useLocation();

  useEffect(() => {
    const index = tabs.findIndex((element) => {
      return element.url === location.pathname;
    });
    dispatch(activeTab({ activeTab: String(index + 1) }));
  }, [dispatch, location, tabs]);

  const handleOnChange = (key: string) => {
    dispatch(activeTab({ activeTab: key }));
    navigate(tabs[Number(key) - 1].url);
  };

  const items = tabs.map((entry, index) => {
    const id = String(index + 1);
    return {
      label: entry.label,
      key: id,
      children: entry.component,
    };
  });

  return (
    <Tabs
      tabBarExtraContent={extra}
      activeKey={state.activeTab}
      type="card"
      size="large"
      items={items}
      onChange={handleOnChange}
    />
  );
};

export default RoutedTabs;
