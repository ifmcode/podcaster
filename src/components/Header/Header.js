import { useEffect, useRef } from 'react';
import { Link, useNavigation } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  const navigationIndicatorRef = useRef(null),
    navigation = useNavigation(),
    IDLE_STATUS = "idle";

  useEffect(() => {
    console.log(navigation.state);
    navigationIndicatorRef.current.className = (navigation.state !== IDLE_STATUS)
      ? "header-indicator visible"
      : "header-indicator";
  }, [navigation.state]);

  return (
    <header className="header-wrapper">
      <Link to="/" className="header-logo">Podcaster</Link>
      <div className="header-indicator" ref={navigationIndicatorRef}></div>
    </header>
  );
}

export default Header;