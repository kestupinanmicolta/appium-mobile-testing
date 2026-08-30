# Appium Mobile Testing

Testing móvil con **Appium**, **WebdriverIO** y **Cucumber** para la app Android **FlowersApp** (FlorAbby). Incluye 9 escenarios BDD que cubren login, catálogo y carrito.

## Tecnologías

- **Appium 2** + UiAutomator2 — testing móvil nativo Android
- **WebdriverIO v9** — test runner y cliente WebDriver
- **Cucumber** — BDD con Gherkin
- **TypeScript** — tipado estático

## Requisitos

- Node.js 18+
- Appium Server (puerto 4723)
- Android SDK con emulador o dispositivo físico
- Driver UiAutomator2 (`appium driver install uiautomator2`)

## Instalación

```bash
npm install
```

## Ejecución

```bash
# Asegurar que Appium esté corriendo en puerto 4723
npx appium &

# Ejecutar todos los tests
npm test
```

## Estrucura

```
├── features/
│   ├── flowersapp.feature          # 9 escenarios BDD
│   └── step-definitions/
│       └── steps.ts                # Implementación de steps
├── wdio.conf.ts                    # Configuración WebdriverIO
├── tsconfig.json                   # Configuración TypeScript
├── package.json
└── .github/workflows/
    └── test-and-deploy.yml         # CI/CD + GitHub Pages
```

## Escenarios

| # | Módulo | Escenario | Descripción |
|---|--------|-----------|-------------|
| 1 | Login | Password corta | Valida que < 6 caracteres muestra error |
| 2 | Login | Credenciales inválidas | Valida error de autenticación |
| 3 | Login | Login exitoso | Valida navegación al catálogo |
| 4 | Catálogo | Listar productos | Verifica que hay al menos 1 producto |
| 5 | Catálogo | Ver detalle | Click en producto muestra detalle |
| 6 | Catálogo | Filtrar categoría | Filtra por categoría específica |
| 7 | Catálogo | Ir al carrito | Navega del catálogo al carrito |
| 8 | Carrito | Ver carrito | Verifica pantalla de carrito |
| 9 | Carrito | Volver del carrito | Navega de vuelta al catálogo |

## Reporte

**Ver en vivo**: https://kestupinanmicolta.github.io/appium-mobile-testing/

<!-- lastupdate: 2026-08-30 -->
