// @ts-check

/** @typedef {import('../types').Theme } Theme */

/**
 * @typedef { Object } Props
 * @property { Theme } theme
 */

import { cn } from 'cn'
import { bg, color, bgDarker, colorDarker, hoverClassMap } from '../utils'

/** @param { Props } */
export const Header = ({ theme }) => {
  const headerBg = bg?.[theme]
  const textColor = color?.[theme]
  const textColorDarker = colorDarker?.[theme]
  const headerBgDarker = bgDarker?.[theme]

  const navItems = ['pacientes', 'perfil']

  console.log(theme)

  return (
    <header className={cn('border-b border-slate-200 shadow-sm', headerBg)}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg  text-lg font-bold text-white',
              headerBgDarker,
            )}
          >
            APV
          </div>
          <span
            className={cn('hidden md:flex text-xl font-bold', textColorDarker)}
          >
            Administrador de pacientes de Veterinaria
          </span>
        </div>

        <nav
          aria-label="Navegación principal"
          className="items-center gap-8 flex"
        >
          {navItems.map(item => (
            <a
              key={item}
              href="#"
              style={{
                textTransform: 'uppercase',
              }}
              className={cn(
                'text-sm text-white nt-medium transition-colors',
                hoverClassMap[theme],
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            className={cn(
              'rounded-md bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:cursor-pointer',
              textColor,
              hoverClassMap[theme],
            )}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}
