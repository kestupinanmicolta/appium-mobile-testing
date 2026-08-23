# Appium Mobile Testing

Suite completa de testing móvil con Appium para Android usando **Serenity.js** y **TypeScript**. Incluye tests de login, catálogo y carrito contra la app FlowersApp.

## Características

- **Serenity.js**: Framework BDD con Screenplay Pattern
- **Appium 2**: Testing móvil cross-platform
- **TypeScript**: Type safety y mejor DX
- **Cucumber**: BDD con Gherkin
- **Android**: Pruebas en emulador (API 29, Pixel 7 Pro)
- **Screenplay Pattern**: Arquitectura mantenible (Actors, Tasks, Questions, Interactions)
- **Serenity Reports**: Reportes HTML interactivos

## Requisitos

- Node.js 18+
- Appium Server (`npm install -g appium`)
- Android SDK con emulador
- Driver UiAutomator2 (`appium driver install uiautomator2`)

## Instalación

```bash
# Instalar dependencias
npm install

# Instalar Appium globalmente (opcional)
npm install -g appium

# Instalar driver de Android
appium driver install uiautomator2
```

## Ejecución

```bash
# Ejecutar todos los tests
npm test

# Ejecutar solo tests de login
npm run test:login

# Ejecutar solo tests de catálogo
npm run test:catalog

# Ejecutar solo tests de carrito
npm run test:cart

# Generar reporte
npm run report
```

## Estructura del Proyecto

```
├── src/
│   ├── features/              # Cucumber feature files
│   │   ├── login.feature
│   │   ├── catalog.feature
│   │   └── cart.feature
│   └── screenplay/            # Screenplay Pattern
│       ├── actors/
│       │   └── Performer.ts
│       ├── interactions/
│       │   └── UseTheApp.ts
│       ├── tasks/
│       │   ├── Login.ts
│       │   ├── BrowseCatalog.ts
│       │   └── ManageCart.ts
│       └── questions/
│           ├── CatalogItems.ts
│           ├── CartItems.ts
│           └── LoginStatus.ts
├── test/
│   └── steps/                 # Step definitions
│       ├── login.steps.ts
│       ├── catalog.steps.ts
│       └── cart.steps.ts
├── serenity.conf.js           # Configuración Serenity.js
├── tsconfig.json              # Configuración TypeScript
└── package.json
```

## Configuración

`serenity.conf.js` define las capacidades del emulador:
- **platformName**: Android
- **automationName**: UiAutomator2
- **deviceName**: emulator-5554
- **appPackage**: com.flowersapp
- **appActivity**: .ui.LoginActivity

## Reportes

Los reportes se generan en `target/site/serenity/` y se despliegan automáticamente a GitHub Pages.

**Ver reporte en vivo**: https://kestupinanmicolta.github.io/appium-mobile-testing/

<!-- lastupdate: 2026-08-23 -->
