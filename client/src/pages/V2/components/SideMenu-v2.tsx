export default function SideMenuV2() {
  return (
    <div style={{width: '100%', height: '100%', paddingTop: 20, paddingBottom: 16, paddingLeft: 14, paddingRight: 14, background: '#081028', outline: '1px rgba(255, 255, 255, 0.08) solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: 'rgba(255, 255, 255, 0.04)', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #55D6FF solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#55D6FF', fontSize: 16, fontFamily: 'Inter', fontWeight: '600', wordWrap: 'break-word'}}>Home</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', opacity: 0, overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #55D6FF solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Conversions</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 5.33, height: 10.67, left: 1.33, top: 9.33, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Date Converter</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>JSON - YAML</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Timezone Converter</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: '#081028', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Unit Converter</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>URL to JSON</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>CSV to JSON</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', height: 44, paddingTop: 12, paddingBottom: 12, paddingLeft: 58, paddingRight: 20, background: 'rgba(10, 19, 48, 0)', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 20, display: 'flex', cursor: 'pointer'}}>
            <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 20, display: 'inline-flex'}}>
              <div style={{color: '#AEB9E1', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Number Base Converter</div>
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Formatters</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Encoders</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 17.50, left: 1, top: 1, position: 'absolute', borderRadius: 1, outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Text Tools</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Time Tools</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 20, height: 16, left: 0, top: 2, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Financial Tools</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>Color Tools</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', height: 46, paddingLeft: 16, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: '#081028', borderRadius: 12, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute'}}>
                <div style={{width: 18, height: 18, left: 1, top: 1, position: 'absolute', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
              </div>
            </div>
            <div style={{color: '#AEB9E1', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', wordWrap: 'break-word'}}>System</div>
          </div>
          <div style={{width: 16, height: 16, position: 'relative', transform: 'rotate(-90deg)', transformOrigin: 'top left', overflow: 'hidden'}}>
            <div style={{width: 13.33, height: 13.33, left: 1.33, top: 1.33, position: 'absolute'}}>
              <div style={{width: 10.67, height: 5.33, left: 4, top: 12, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #AEB9E1 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 16.35, height: 16.35, left: 1.83, top: 1.83, position: 'absolute', background: '#99A0AE'}} />
          </div>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
            <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', color: '#99A0AE', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: '20px', wordWrap: 'break-word'}}>Settings</div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex', cursor: 'pointer'}}>
          <div style={{width: 20, height: 20, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 15, height: 14.25, left: 2.50, top: 2.50, position: 'absolute', background: '#99A0AE'}} />
          </div>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 6, display: 'flex'}}>
            <div style={{justifyContent: 'flex-end', display: 'flex', flexDirection: 'column', color: '#99A0AE', fontSize: 14, fontFamily: 'Inter', fontWeight: '500', lineHeight: '20px', wordWrap: 'break-word'}}>Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
