import React from 'react';
import './index.less';
import {Button} from 'antd'
import {
  history,
  useModel,
  IndexModelState,
  ConnectProps,
  Loading,
  connect,
} from 'umi';

const StylePage = () => {
  const model = useModel('hookModel');

  console.log(model, 'model');

  return (
    <div>
      {model.loading ? 'show' : 'hide'}
      <Button
        onClick={() => {
          model.show();
        }}
      >
        model show
      </Button>

      <Button
        onClick={() => {
          model.hide();
        }}
      >
        model hide
      </Button>

      <Button
        onClick={() => {
          history.push('/');
        }}
      >
        TO INDEX
      </Button>
      <div className="between">
        <div className="box"></div>
        <div className="box"></div>
      </div>
      <div className="text">
        <div className="ellipsis">aaaaaaa超出省略</div>
      </div>
      <div className="center">
        <div className="box"></div>
      </div>
      <div className="center2">
        <div className="box"></div>
      </div>
      <div className="center3">
        <div className="box"></div>
      </div>

      <div className="center4">
        <div className="box"></div>
      </div>
    </div>
  );
};

export default StylePage;

// export default connect(({ index, loading }) => ({
//   index,
//   loading: loading.models.index,
// }))(StylePage);
