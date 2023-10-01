import "./SettingSidebar.css";
import Drawer from "@mui/joy/Drawer";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { useState } from "react";


const SettingSidebar = (props) => {
  const [open, setOpen] = useState(false);


  const onSettingProfile = () => {
    props.setSettingPage('Profile')
  }

  const onSettingDelete = () => {
    props.setSettingPage('Delete') 
  }

  const onSettingLog = () => {
    props.setSettingPage('Log')
  }

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <div className="settingSidebar">
      <Box sx={{ display: 'flex' }}>
            <button className="settingDrawerButton" onClick={toggleDrawer(true)}>
                <svg width="35" height="35" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            </button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <div className="settingSidebarbuttons">
                <button 
                    onClick={onSettingProfile}
                    style={{ color: props.settingPage === 'Profile' ? 'black' : '#999999'}} 
                    ><svg 
                    width="55" 
                    height="45" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                    Profile
                </button>
                <button 
                    onClick={onSettingDelete}
                    style={{ color: props.settingPage === 'Delete' ? 'black' : '#999999'}}
                    ><svg 
                    width="55" 
                    height="45" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                    Delete
                </button>
                <button 
                    onClick={onSettingLog}
                    style={{ color: props.settingPage === 'Log' ? 'black' : '#999999'}}
                    ><svg 
                    width="55" 
                    height="45" 
                    viewBox="0 0 15 15" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                    </svg>
                    Log-Out
                </button>
            </div>
          </Box>
        </Drawer>
      </Box>
    </div>
  );
};

export default SettingSidebar;
