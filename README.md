# Appium Mobile Testing

Testing móvil con **Serenity BDD**, **Appium**, **Cucumber** y **Java** para la app Android **FlowersApp**. Incluye 9 escenarios BDD que cubren login, catálogo y carrito, con reporte HTML generado automáticamente.

## Tecnologías

- **Serenity BDD** — framework de reportes y Screenplay pattern
- **Appium 2** + UiAutomator2 — testing móvil nativo Android
- **Cucumber** — BDD con Gherkin
- **Java 17** + Maven
- **Selenium WebDriver** — integración con Appium

## Requisitos

- Java 17+
- Maven 3.6+
- Appium Server (puerto 4723)
- Android SDK con dispositivo físico o emulador
- Driver UiAutomator2 (`appium driver install uiautomator2`)

## Estructura

```
├── src/
│   └── test/
│       ├── java/
│       │   ├── runners/
│       │   │   └── TestRunner.java        # Runner Serenity + Cucumber
│       │   └── steps/
│       │       └── FlowersAppSteps.java   # Step definitions (Appium + Screenplay)
│       └── resources/
│           └── features/
│               └── flowersapp.feature     # 9 escenarios BDD
├── src/main/resources/
│   └── serenity.conf                      # Configuración Serenity
├── pom.xml                                # Dependencias Maven
├── screenshots/                           # Screenshots de cada escenario
└── .github/workflows/
    └── test-and-deploy.yml               # CI/CD + GitHub Pages
```

## Ejecución

```bash
# Asegurar que Appium esté corriendo en puerto 4723
appium &

# Ejecutar tests + generar reporte
mvn clean verify

# Ver reporte
open target/site/serenity/index.html
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

<!-- lastupdate: 2026-09-01 -->
