import { Result, Button } from "antd";
//import useLanguage from '@/locale/useLanguage';
import { useNavigate } from "react-router-dom";

export default function NotFound({ entity }) {
  //const translate = useLanguage();

  const navigate = useNavigate();

  return (
    <Result
      status="404"
      // title={translate('error_404')}
      title="Not Found"
      // subTitle={translate('Sorry the Page you requested does not exist')}
      subTitle="Sorry the Page you requested does not exist"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate(`/${entity?.toLowerCase()}`);
          }}
        >
          {/* {translate('Back')} */}
          Back
        </Button>
      }
    />
  );
}
