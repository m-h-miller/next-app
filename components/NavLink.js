import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ href, as, children }) => { 
  const router = useRouter()
  const { asPath } = router;

  return (
    <Link href={href} as={as} passHref legacyBehavior>
      <a className={`nav-link ${
          encodeURIComponent(asPath) === encodeURIComponent(href) && `active`
        }`}>
        {children}
      </a>
    </Link>
  )
}

export default NavLink