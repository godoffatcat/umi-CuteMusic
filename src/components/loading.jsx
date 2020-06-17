import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

function loadingToast() {
  Toast.loading('Loading...', 1, () => {
    console.log('Load complete !!!');
  });
}

class ToastExample extends React.Component {
  componentDidMount() {
    Toast.loading('元气加载中...', 300, () => {
      // console.log('Load complete !!!');
    });
    setTimeout(() => {
      Toast.hide();
    }, 3000);
  }
  render() {
    return (
      <div></div>
      // <WingBlank>
      // </WingBlank>
    );
  }
}

export default ToastExample
