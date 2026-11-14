import React from 'react'

/**
 * Proveedor del contexto de autenticación.
 * @typedef {Object} AuthProvider
 * @property {React.PropsWithChildren} children Contenido que tendrá acceso al contexto.
 * @returns {JSX.Element} Componente proveedor del contexto de autenticación.
 */

/**
 * @typedef { Object } User
 * @property { string } _id
 * @property { string } nombre
 * @property { string } email
 * @property { string } telefono
 * @property { string } web
 */

/**
 * @typedef {Object} AuthHeaders
 * @property {string} [Authorization]
 * @property {string} [Content-Type]
 */

/**
 * @typedef {Object} UserState
 * @property {string|null} [_id]
 * @property {string} [nombre]
 * @property {string} [email]
 * @property {string|null} [telefono]
 * @property {string|null} [web]
 * @property {string} [createdAt]
 * @property {string} [updatedAt]
 */

// @returns {Record<string, never>} cuando se devuleve un objecto con una coleccion de propiedades

export {}
