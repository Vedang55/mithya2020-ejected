import { SearchBar } from 'react-native-elements';
import React from 'react'
import { Keyboard } from 'react-native';


export default class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.searchBarRef = React.createRef();
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidHide() {
    this.searchBarRef.current.blur();
  }

  updateSearch = search => {
    this.setState({ search });
    this.props.searchFilterFunction(search);
  };

  storeRef = (ref1) => {
    this.searchBarRef.current = ref1;
  }

  render() {
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Search Event"
        autoCorrect={false}
        platform="android"
        round
        lightTheme={false}
        onChangeText={text => { this.updateSearch(text) }}
        value={search}
        ref={ref1 => { this.storeRef(ref1) }}
        inputStyle={{
          fontFamily: 'Raleway-Regular',
          color:'white'
        }}
        placeholderTextColor='white'
        searchIcon={{color:'white'}}
        cancelIcon={{color:'white'}}
        inputContainerStyle={{height:50,}}
        {...this.props}
      />

    );
  }
}