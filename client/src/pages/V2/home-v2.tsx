import HeaderV2 from "./components/Header-v2";
import SideMenuV2 from "./components/SideMenu-v2";
import ContentV2 from "./components/Content-v2";

export default function HomeV2() {
  return (
    <div style={{width: '100%', height: '100vh', background: '#081028', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
      <HeaderV2 />
      <div style={{flex: 1, display: 'flex', overflow: 'hidden'}}>
        <div style={{width: 300, height: '100%'}}>
          <SideMenuV2 />
        </div>
        <div style={{flex: 1, height: '100%'}}>
          <ContentV2 />
        </div>
      </div>
    </div>
  );
}
