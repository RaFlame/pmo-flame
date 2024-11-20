import React, { useState } from 'react';

    function Header() {
      const [isProfileOpen, setIsProfileOpen] = useState(false);

      const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
      };

      return (
        <div className="header">
          <div className="profile-menu" onClick={toggleProfile}>
            Profile
            {isProfileOpen && (
              <ul className="profile-dropdown">
                <li>Settings</li>
                <li>Logout</li>
              </ul>
            )}
          </div>
        </div>
      );
    }

    export default Header;
