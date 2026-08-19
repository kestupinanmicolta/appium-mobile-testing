# Appium Mobile Testing

Suite completa de testing móvil con Appium para Android. Incluye tests de login, catálogo y carrito contra la app FlowersApp.

## Características

- **Appium 9**: Testing móvil cross-platform
- **Android**: Pruebas en emulador o dispositivo real
- **Page Object Model**: Arquitectura mantenible
- **TestNG**: Organización de tests
- **Allure Reports**: Reportes visuales detallados

## Requisitos

- JDK 21
- Appium Server instalado (`npm install -g appium`)
- Android SDK con emulador
- Drivers de Appium (`appium driver install uiautomator2`)

## Instalación

```bash
# Instalar Appium
npm install -g appium

# Instalar driver de Android
appium driver install uiautomator2

# Iniciar servidor Appium
appium
```

## Ejecución

```bash
# Ejecutar todos los tests
mvn clean test

# Ejecutar con Allure
mvn clean test
mvn allure:serve
```

## Configuración del emulador

1. Abrir Android Studio
2. Tools > Device Manager
3. Crear/iniciar un emulador (Pixel 5, API 33+)

## Estructura

```
src/test/java/com/karen/mobile/
├── pages/
│   ├── LoginPage.java
│   ├── CatalogPage.java
│   └── CartPage.java
├── tests/
│   ├── LoginTest.java
│   ├── CatalogTest.java
│   └── CartTest.java
└── utils/
    └── DriverManager.java
```

## Configuración

El `testng.xml` define los parámetros:
- `platformName`: Android
- `automationName`: UiAutomator2
- `deviceName`: emulator-5554
- `appPackage`: com.flowersapp
- `appActivity`: .ui.LoginActivity

<!-- lastupdate: 2026-08-18 21:18 -->
