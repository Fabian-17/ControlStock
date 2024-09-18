# ControlStock

ControlStock es una aplicación web para gestionar el inventario de productos, diseñada para ser eficiente y fácil de usar. La aplicación está dividida en dos partes: el servidor (backend) y el cliente (frontend). El servidor maneja la lógica de negocio y las interacciones con la base de datos, mientras que el cliente proporciona la interfaz de usuario.

## Requisitos previos
Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 16 o superior)
- npm (incluido con Node.js)
- MySQL para la base de datos

## Configuración del servidor (Backend)
### 1. Clonar el repositorio

```bash
git clone https://github.com/Fabian-17/ControlStock.git
cd ControlStock/server
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno
Crea un archivo `.env` en el directorio server/ con la siguiente estructura y ajusta los valores según tu configuración:

```bash
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=controlstock_db
PORT=4000
SECRET_KEY=tu_clave_secreta_jwt
```

### 5. Iniciar el servidor

```bash
npm start
```
El servidor se ejecutará en `http://localhost:4000`.

## Configuración del cliente (Frontend)
### 1. Navegar al directorio del cliente
Desde el directorio raíz del proyecto, navega al directorio `client/`:

```bash
cd ../client
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar la aplicación cliente

```bash
npm start
```
El servidor se ejecutará en `http://localhost:7000`.