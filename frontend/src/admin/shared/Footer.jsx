// @ts-check

/** @typedef {import('../types').Theme } Theme */

/**
 * @typedef { Object } Props
 * @property { Theme } theme
 */

import { cn } from 'cn'
import { bg, color } from '../utils'

/** @param { Props } */
export const Footer = ({ theme }) => {
  return (
    <>
      <footer>
        <p
          className="text-center font-bold"
          style={{ textTransform: 'capitalize' }}
        >
          <span
            className="uppercase"
            id="logo"
          >
            apv
          </span>{' '}
          - administrar pacientes de{' '}
          <span
            className={cn(color[theme])}
            id="keyword"
          >
            veterinaria.
          </span>
        </p>
      </footer>
    </>
  )
}
