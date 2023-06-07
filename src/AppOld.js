import './App.css';
import  HeaderContainer  from './components/Header/HeaderContainer';
import { Navbar } from './components/Navbar/Navbar'
import { NavbarTab } from './components/Navbar/NavbarTab';
import { Content } from './components/Content';
import { LeftBar } from './components/LeftBar/LeftBar';
import { RightBar } from './components/RightBar/RightBar';
import { useMatchMedia } from './hooks';
import { connect } from 'react-redux'
import { auth } from './redux/auth-reducer';

const App = (props) => { 
 auth()
  const { isMobile, isTablet, isDesktop } = useMatchMedia();
  return (
    <div className="App">
      { isDesktop &&
        <>
          <HeaderContainer />
          <LeftBar />
          <Navbar />
          <Content store={props.store}/>
          <RightBar />
        </>
      }
      { isTablet &&
        <>
          <HeaderContainer />
          <NavbarTab />
          <Content store={props.store}/>
          <RightBar/>
        </>
      }
      { isMobile &&
        <>
          <HeaderContainer />
          {/* <LeftBar /> */}
          {/* <Navbar /> */}
          <Content store={props.store}  />
          {/* <RightBar appState={props.appState} /> */}
        </>
      }
    </div>

  );
}

export default connect( null, {auth} )(App);


// function App(props) {

//   return (
//     <div className="App">
//       <Header />
//         <LeftBar />
//         <Navbar />
//         <Content appState={props.appState} addPost={props.addPost} addMessage={props.addMessage} updateNewPostText={props.updateNewPostText}/>
//         <RightBar appState={props.appState} />
//     </div>
//   );
// }

// export default App;
