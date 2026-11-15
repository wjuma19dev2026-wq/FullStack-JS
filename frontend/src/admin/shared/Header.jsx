// @ts-check

/** @typedef {import('../types').Theme } Theme */

/**
 * @typedef { Object } Props
 * @property { Theme } theme
 */

import { cn } from 'cn'
import { bg, color } from '../utils'

/** @param { Props } */
export const Header = ({ theme }) => {
  return (
    <>
      <header className={cn('h-15', bg[theme])}></header>
    </>
  )
}
