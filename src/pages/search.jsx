import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, { useState, useEffect } from 'react'

// TODO  增加热门词条、点击即填入state并同时触发搜索

const SearchBarExample = ()  => {
  const [state, setState] = useState({
    value: '美食',

  })

  useEffect(() => {
    autoFocusInst.focus()
  }, [])

  onChange= (value) => {
    setState({ value });
  };
  clear = () => {
    setState({ value: '' });
  };
  handleClick = () => {
    this.manualFocusInst.focus();
  }

    return (<div>
      <WingBlank><div className="sub-title">Normal</div></WingBlank>
      <SearchBar placeholder="Search" maxLength={8} />
      <WhiteSpace />
      <WingBlank>
        <Button
          onClick={this.handleClick}
        >click to focus</Button>
      </WingBlank>
      <WhiteSpace />
      <WingBlank><div className="sub-title">Show cancel button</div></WingBlank>
      <SearchBar
        value={state.value}
        placeholder="Search"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => console.log('onCancel')}
        showCancelButton
        onChange={this.onChange}
      />
    </div>);
}

export default SearchBarExample
