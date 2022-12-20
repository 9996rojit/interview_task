import React from 'react';
import Navbar from './navBar';
import SideBar from './sideBar';
interface Iprops {
  children: React.ReactElement | React.ReactNode;
}
const index = (props: Iprops) => {
  return (
    <>
      <Navbar />
      <div>
        <SideBar>{props.children}</SideBar>
      </div>
    </>
  );
};

export default index;
