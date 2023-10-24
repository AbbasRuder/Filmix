import { useState, useEffect } from "react";
import "./style.scss";
// -icons
import { HiOutlineSearch } from "react-icons/hi";
import { SlInfo, SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
// -react-router-dom
import { useLocation, useNavigate } from "react-router-dom";
// -components
import { ContentWrapper } from "../../components"
// -assets
import logo from "../../assets/movix-logo.svg"

export default function Header() {
  const [navbarView, setNavbarView] = useState("blur")
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [query, setQuery] = useState("")
  const [showSearch, setShowSearch] = useState("")

  const navigate = useNavigate()
  const location = useLocation()

  // -whenever location changes,  the page should start from the top. 
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])

  // -Navbar starts with 'blur', if scrolling down then hide the navbar and if scrolling up then show the navbar
  const controlNavbarOnScroll = () => {
    setLastScrollY(window.scrollY)
    if(window.scrollY > 200) {
      if(window.scrollY > lastScrollY && !mobileMenu) {
        setNavbarView("hide")
      } else {
        setNavbarView("solid")
      }
    } else {
      setNavbarView("blur")
    }
  }
 
  useEffect(() => {
    document.addEventListener('scroll', controlNavbarOnScroll)
    return () => document.removeEventListener('scroll', controlNavbarOnScroll)
  }, [lastScrollY])

  // -open the search bar(on navigation)
  const openSearch = () => {
    setMobileMenu(false)
    setShowSearch(true)
  }

  // -open menu items
  const openMobileMenu = () => {
    setMobileMenu(true)
    setShowSearch(false)
  }

  // -handles search input and search navigation
  const handleSearchQuery = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      navigate(`/search/${query}`)
      setTimeout(() => {
        setShowSearch(false)
      }, 1000);
    }
  }

  const handleNavigation = (mediaType) => {
    if(mediaType === 'movie') {
      navigate('/explore/movie')
    } else {
      navigate('/explore/tv')
    }
    setMobileMenu(false)
  }
  return (
    <header className={`header ${mobileMenu && 'mobileView'} ${navbarView}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => handleNavigation('movie')}>
            Movies
          </li>
          <li className="menuItem" onClick={() => handleNavigation('tv-shows')}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch}/>
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder='Search for a movie or a TV show'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchQuery}
              />
              <VscChromeClose color="black" onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>)}
    </header>
  )
}
