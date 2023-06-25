// import Chat from '../ChatGPT/ChatGPT';
import './leftbar.css'
// import { useMatchMedia } from "../../hooks";
// import { Weather } from './Weather';
import WeatherWidget from './Weather2';
import Counter from './counter';

export const LeftBar = () => {
  // const { isMobile, isTablet, isDesktop } = useMatchMedia();

  // console.log(isMobile);

  return (
    <div className="l">
      <WeatherWidget />
      {/* <Chat /> */}
      {/* <Weather/> */}

      {/* <h1>Hello CodeSandbox</h1> */}
      {/* {isMobile && <h2>Hello from mobile</h2>}
      {isTablet && <h2>Hello from tablet</h2>}
      {isDesktop && <h2>Hello from desktop</h2>} */}
      <h1 className='leftBarH1'>React Suspense & Lazy</h1>
      <h1 className='leftBarH1'>Валидация форм для Contacts</h1>
      <h1 className='leftBarH1'>Галерея загрузка</h1>
      <h1 className='leftBarH1'>Network error для Users</h1>
      <Counter />
    </div>
  );
}
