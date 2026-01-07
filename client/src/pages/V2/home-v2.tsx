import HeaderV2 from "./components/Header-v2";
import SideMenuV2 from "./components/SideMenu-v2";
import ContentV2 from "./components/Content-v2";

export default function HomeV2() {
  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col overflow-hidden">
      <HeaderV2 />
      <div className="flex-1 flex overflow-hidden">
        <SideMenuV2 />
        <ContentV2 />
      </div>
    </div>
  );
}
