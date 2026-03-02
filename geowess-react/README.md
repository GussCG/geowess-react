# GeoWess - Sistema de Gestión de Obra Pública

Es un sistema integral para la gestión y seguimiento de proyectos de obra pública en la Ciudad de México, diseñado bajo los lineamientos de la Ley de Obras Públicas local.

## Descripción

La plataforma centraliza:

- Control administrativo
- Seguimiento operativo
- Gestión presupuestal
- Generación automática de reportes
- Cálculo de estimaciones monetarias

Esta versión corresponde a la migración arquitectónica moderna hacia React + TypeScript + Supabase.

## Arquitectura del Sistema

Arquitectura desacoplada basada en:

- Frontend SPA en React 19 + TypeScript
- Backend-as-a-Service con Supabase
- Base de datos PostgreSQL administrada
- Autenticación y control de acceso basado en roles

## Stack Tecnológico

React 19, TypeScript, Vite, Supabase, React Hook Form + Zod, Recharts (visualización de KPIs), Framer Motion, SASS, React Router

## Funcionalidades

- Sistema multirol con permisos dinámicos
- Gestión de proyectos y fases
- Control presupuestal
- Generación automática de reportes mensuales
- Cálculo de estimaciones monetarias
- Dashboard con KPIs dinámicos
- Visualización gráfica del avance del proyecto
- Arquitectura escalable basada en servicios

## Evolución Arquitectónica

Esta versión representa:

- Migración desde arquitectura monolítica (Node + Handlebars)
- Separación clara frontend/backend
- Modernización del stack
- Mejora en escalabilidad y mantenibilidad
- Tipado estricto con TypeScript
- Uso de validaciones robustas con Zod

## Instalación

```bash
 npm install
 npm run dev
```

Variables de entorno necesarias:

`VITE_SUPABASE_URL`
`VITE_SUPABASE_ANON_KEY`
