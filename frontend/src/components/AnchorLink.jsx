/** @typedef { 'confirm' | 'alert' } Types */

/**
 * @typedef {Object} AnchorLinkProps
 * @property {string} question
 * @property {string} action
 * @property {string} href
 * @property { Types } type
 */

import { Link } from 'react-router'

/**
 * @param {AnchorLinkProps} props
 * @returns {import('react').JSX.Element}
 */
const AnchorLink = ({ question = '', action = '', href, type }) => {
  return (
    // <nav className="md:flex md:justify-between">
    <span className="block text-center text-gray-500">
      {type === 'confirm' ? `¿${question}?` : `${question}`}
      <Link
        to={href}
        className="text-indigo-500 font-extrabold"
      >
        {' '}
        {action}
      </Link>
    </span>
    // </nav>
  )
}

export default AnchorLink
