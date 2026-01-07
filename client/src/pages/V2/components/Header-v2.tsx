export default function HeaderV2() {
  return (
    <div style={{width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
      <div style={{width: 300, height: 82, paddingTop: 12, paddingBottom: 12, paddingLeft: 16, paddingRight: 24, position: 'relative', background: '#081028', borderRight: '1px rgba(255, 255, 255, 0.08) solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>
        <div style={{width: 260, height: 0, left: 20, top: 82, position: 'absolute', outline: '1px #111F49 solid', outlineOffset: '-0.50px'}}></div>
        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div style={{padding: 5, background: '#00C2FF', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <img style={{width: 32, height: 32}} src="/assets/android-chrome-192x192.png" alt="Logo" />
          </div>
          <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
            <div style={{color: 'white', fontSize: 20, fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>FreeDevTool</div>
            <div style={{alignSelf: 'stretch', color: 'white', fontSize: 10, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Secure Developer Tools</div>
          </div>
        </div>
        <div style={{width: 20, height: 20, position: 'relative', transform: 'rotate(180deg)', transformOrigin: 'top left', cursor: 'pointer'}}>
          <div style={{width: 16.67, height: 15, left: 1.67, top: 2.50, position: 'absolute', outline: '1.47px #AEB9E1 solid', outlineOffset: '-0.73px'}} />
          <div style={{width: 0.83, height: 2.50, left: 15, top: 5.83, position: 'absolute', outline: '1.47px #AEB9E1 solid', outlineOffset: '-0.73px'}} />
        </div>
      </div>
      <div style={{width: 1140, height: 82, paddingTop: 16, paddingBottom: 16, paddingLeft: 42, paddingRight: 32, background: '#081028', borderBottom: '1px #111F49 solid', justifyContent: 'space-between', alignItems: 'center', display: 'flex'}}>
        <div style={{width: 360, height: 48, paddingTop: 13, paddingBottom: 13, paddingLeft: 14, paddingRight: 100, background: 'rgba(255, 255, 255, 0.07)', boxShadow: '0px 2px 4px rgba(1, 5, 17, 0.20)', borderRadius: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 16.67, height: 16.67, left: 1.67, top: 1.67, position: 'absolute'}}>
                <div style={{width: 15, height: 15, left: 0.89, top: 0.83, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{opacity: 0.60, justifyContent: 'center', display: 'flex', flexDirection: 'column', color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Search 47 tools... (Ctrl+S)</div>
          </div>
        </div>
        <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
          <div style={{height: 46, paddingLeft: 17.59, paddingRight: 17.59, paddingTop: 12, paddingBottom: 12, background: 'linear-gradient(168deg, #6366F1 0%, #8B5CF6 100%)', boxShadow: '0px 2.931162118911743px 14.655810356140137px rgba(99, 102, 241, 0.30)', borderRadius: 12, justifyContent: 'flex-start', alignItems: 'center', gap: 5.86, display: 'flex', cursor: 'pointer'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 20, height: 20, left: 0, top: 0, position: 'absolute', outline: '1.50px white solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', color: 'white', fontSize: 15.26, fontFamily: 'Arial', fontWeight: '700', wordWrap: 'break-word'}}>Demo Tour (47 tools)</div>
          </div>
          <div style={{width: 48, height: 48, padding: 11.75, background: 'rgba(255, 255, 255, 0.07)', overflow: 'hidden', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 9.40, display: 'flex', cursor: 'pointer'}}>
            <div style={{width: 30, height: 30, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 19.50, height: 19.50, left: 5.25, top: 5.25, position: 'absolute', background: '#AEB9E1'}} />
            </div>
          </div>
          <div style={{width: 48, height: 48, padding: 11.75, background: 'rgba(255, 255, 255, 0.07)', overflow: 'hidden', borderRadius: 12, justifyContent: 'center', alignItems: 'center', gap: 9.40, display: 'flex', cursor: 'pointer'}}>
            <div style={{width: 30, height: 30, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 18.56, height: 20, left: 5, top: 23.56, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left'}}>
                <div style={{width: 15, height: 16.67, left: 2.50, top: 1.67, position: 'absolute', outline: '1.47px #AEB9E1 solid', outlineOffset: '-0.73px'}} />
                <div style={{width: 2.50, height: 0.83, left: 11.67, top: 15, position: 'absolute', outline: '1.47px #AEB9E1 solid', outlineOffset: '-0.73px'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
